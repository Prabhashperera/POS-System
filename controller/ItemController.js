import {items_DB} from '../db/db.js'
import ItemModel from '../model/ItemModel.js'


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
    })
}





// TODO: Save Item
let itemSaveBtn = $(".item_Save_Clicked");
itemSaveBtn.on("click" , () => {

    let itemID = $(".item_ID").val();
    let itemName = $(".item_Name").val();
    let itemPrice = $(".item_Price").val();
    let itemQty = $(".item_Qty").val();

    if (itemID == '' && itemName == '' && itemPrice == '' && itemQty == '') {
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