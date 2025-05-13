import {items_DB} from '../db/db.js'
import ItemModel from '../model/ItemModel.js'


let selectedItemID = null;
let selectedItemName = null;

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

    const isExistID = items_DB.some(item => item.item_ID == itemID);
    if(isExistID) {
        Swal.fire({
            title: "Item ID Exists!",
            icon: "warning",
            draggable: true
        });
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
    loadItemsTable();
    $(".item_ID").prop("disabled", false);
    $(".item_ID").val('');
    $(".item_Name").val('');
    $(".item_Price").val('');
    $(".item_Qty").val('');
}