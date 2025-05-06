import {items_DB} from '../db/db.js'
import ItemModel from '../model/ItemModel.js'


let selectedItemID = null;
let selectedItemName = null;

function loadData() {
    items_DB.length = 0;
    let itemsData = localStorage.getItem('items_data');
    if(itemsData) {
        items_DB.push(...JSON.parse(itemsData));
    }
}

loadData();
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

    let itemModel = new ItemModel(itemID, itemName, itemPrice, itemQty);
    items_DB.push(itemModel);
    localStorage.setItem('items_data', JSON.stringify(items_DB));

    Swal.fire({
        title: "Item Saved!",
        icon: "success",
        draggable: true
    });

    loadData();
    loadItemsTable();

})