import {items_DB} from '../db/db.js'
import ItemModel from '../model/ItemModel.js'




// TODO: Save Item
let itemSaveBtn = $(".item_Save_Clicked");
let itemTable = $(".item_Table");

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

    let data = `
            <tr>
            <th scope="row">${itemID}</th>
            <td>${itemName}</td>
            <td>${itemPrice}</td>
            <td>${itemQty}</td>
            </tr>
    `
    itemTable.append(data)
    let itemModel = new ItemModel(itemID, itemName, itemPrice, itemQty);
    items_DB.push(itemModel);
    localStorage.setItem('items_data', JSON.stringify(items_DB));
    console.log(JSON.stringify(items_DB));

    Swal.fire({
        title: "Item Saved!",
        icon: "success",
        draggable: true
    });

})