import {items_DB} from '../db/db.js'
import ItemModel from '../model/ItemModel.js'


let selectedItemID = null;
let selectedItemName = null;

$(".item_ID").val(generateNextItemID());


loadItemsTable();

function loadItemsTable() {
    let itemTable = $(".item_Table").empty();
    items_DB.map((items) => {
        let itemID = items.item_ID;
        let itemName = items.item_Name;
        let itemPrice = items.item_Price;
        let itemQty = items.item_Qty;

        let data = `
        <tr>
        <td>${itemID}</td>
        <td>${itemName}</td>
        <td>${itemPrice}</td>
        <td>${itemQty}</td>
        </tr>
        `
        itemTable.append(data);
    });

    //Table Row selection
    $('.item_Table').on('click', 'tr', function(){
        $('.item_Table tr').removeClass('table-active'); // clear previous selection
        $(this).addClass('table-active'); // highlight selected row

        selectedItemID = $(this).find('td:eq(0)').text().trim();
        selectedItemName = $(this).find('td:eq(1)').text().trim();
        let selectedItemPrice = $(this).find('td:eq(2)').text().trim();
        let selectedItemQty = $(this).find('td:eq(3)').text().trim(); 
        console.log("Row selected");
        console.log(selectedItemID);
        console.log(selectedItemName);

        //After Selecting Customer.. all the inputs takes the values
        if(selectedItemID != null) {
            $(".item_ID").val(selectedItemID);
            $(".item_Name").val(selectedItemName);
            $(".item_Price").val(selectedItemPrice);
            $(".item_Qty").val(selectedItemQty);
            $(".item_ID").prop("disabled", true); //Disable ID Field
        }
    });
}


$(".item_ID").on("input", function () {
    const value = $(this).val();
    if (value.trim() === "") {
        $(this).css("border", "2px solid red");
        $(".item-id-error").text("Item ID cannot be empty.");
    } else {
        $(this).css("border", "2px solid green");
        $(".item-id-error").text("");
    }
});

$(".item_Name").on("input", function () {
    const name = $(this).val();
    if (!/^[A-Za-z\s]{3,}$/.test(name)) {
        $(this).css("border", "2px solid red");
        $(".item-name-error").text("Name must be at least 3 letters.");
    } else {
        $(this).css("border", "2px solid green");
        $(".item-name-error").text("");
    }
});

$(".item_Price").on("input", function () {
    const price = $(this).val();
    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
        $(this).css("border", "2px solid red");
        $(".item-price-error").text("Enter a valid price (e.g., 10.99).");
    } else {
        $(this).css("border", "2px solid green");
        $(".item-price-error").text("");
    }
});

$(".item_Qty").on("input", function () {
    const qty = $(this).val();
    if (!/^\d+$/.test(qty) || parseInt(qty) <= 0) {
        $(this).css("border", "2px solid red");
        $(".item-qty-error").text("Quantity must be a positive number.");
    } else {
        $(this).css("border", "2px solid green");
        $(".item-qty-error").text("");
    }
});


// TODO: Save Item
let itemSaveBtn = $(".item_Save_Clicked");
itemSaveBtn.on("click" , () => {

    let itemID = $(".item_ID").val();
    let itemName = $(".item_Name").val();
    let itemPrice = $(".item_Price").val();
    let itemQty = $(".item_Qty").val();

    if (itemID == '' || itemName == '' || itemPrice == '' || itemQty == '') {
        Swal.fire({
            title: "All the Fileds Must Be Filled!",
            icon: "warning",
            draggable: true
        });
        return;
    }

    // Field Validation
    if (itemID == '' || itemName == '' || itemPrice == '' || itemQty == '') {
        Swal.fire({
            title: "All the Fields Must Be Filled!",
            icon: "warning",
            draggable: true
        });
        return;
    }

    // Extra Validation
    if (!/^[A-Za-z\s]{3,}$/.test(itemName)) {
        Swal.fire({
            title: "Invalid Item Name!",
            icon: "warning",
            text: "Must be letters only (min 3 characters)."
        });
        return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(itemPrice)) {
        Swal.fire({
            title: "Invalid Price Format!",
            icon: "warning",
            text: "Use numeric values like 10 or 10.99."
        });
        return;
    }

    if (!/^\d+$/.test(itemQty) || parseInt(itemQty) <= 0) {
        Swal.fire({
            title: "Invalid Quantity!",
            icon: "warning",
            text: "Quantity must be a whole number greater than 0."
        });
        return;
    }

    const isExistID = items_DB.some(item => item.item_ID == itemID);
    if (isExistID) {
        Swal.fire({
            title: "Item ID Exists!",
            icon: "warning",
            draggable: true
        });
        return;
    }

    if(!isExistID) {
        let itemModel = new ItemModel(itemID, itemName, itemPrice, itemQty);
        items_DB.push(itemModel);

        Swal.fire({
            title: "Item Saved!",
            icon: "success",
            draggable: true
        });

        refreshPage();
    }

})

// TODO: Remove Item
let itemRemoveBtn = $(".item_Remove_Clicked");

itemRemoveBtn.on("click", () => {
    if(selectedItemID == null) {
        Swal.fire({
            title: "Select a Item First!",
            icon: "warning",
            draggable: true
        });
        return;
    }

    let newDataArray = items_DB.filter((item) => item.item_ID !== selectedItemID);
    console.log(newDataArray);
    items_DB.length = 0;
    items_DB.push(...newDataArray);

    Swal.fire({
        title: "Item Removed!",
        icon: "success",
        draggable: true
    });

    refreshPage();
})

//TODO: Update Item
let itemUpdateBtn = $(".item_Update_Clicked");
itemUpdateBtn.on("click", () => {
    // let itemID = $(".item_ID").val();
    let itemName = $(".item_Name").val();
    let itemPrice = $(".item_Price").val();
    let itemQty = $(".item_Qty").val();

    let foundedIndex = items_DB.findIndex((i) => i.item_ID === selectedItemID);
    if(foundedIndex != -1) {
        items_DB[foundedIndex].item_Name = itemName;
        items_DB[foundedIndex].item_Price = itemPrice;
        items_DB[foundedIndex].item_Qty = itemQty;
    }
    
    refreshPage();
    Swal.fire({
        title: "Item Updated!",
        icon: "success",
        draggable: true
    });


});

let refreshClickedBtn = $(".item_Refresh_Clicked");
refreshClickedBtn.on("click" , () => {
    refreshPage();
});

function refreshPage() {
    clearItemForm();
    $(".item_ID").val(generateNextItemID());
    console.log("Genrated ID : " + generateNextItemID());
    $(".item_ID").prop("disabled", false);
    $(".item_Name").val('');
    $(".item_Price").val('');
    $(".item_Qty").val('');
    loadItemsTable();
    setItemsCount();
}

function generateNextItemID() {
    if (items_DB.length === 0) return "I001"; // first customer

    // Get the last customer's ID
    let lastItemID = items_DB[items_DB.length - 1].item_ID; // e.g., "C003"

    // Extract number, increment, pad with zeros
    let lastNumber = parseInt(lastItemID.substring(1)); // 3
    let nextNumber = lastNumber + 1; // 4

    // Return with padding (e.g., C004)
    return "I" + nextNumber.toString().padStart(3, '0');
}

// Validation Methods
function clearItemForm() {
    // Clear the input fields
    $(".item_ID, .item_Name, .item_Price, .item_Qty").val("");

    // Reset the borders
    $(".item_ID, .item_Name, .item_Price, .item_Qty").css("border", "");

    // Clear all error messages under inputs
    $(".item-id-error, .item-name-error, .item-price-error, .item-qty-error").text("");
}

// Item Set Count
function setItemsCount() {
    let itemsCount = 0;
    items_DB.map(() => itemsCount++);
    $(".item_Count").text(itemsCount);
}