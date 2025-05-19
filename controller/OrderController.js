import {orders_DB, items_DB} from '../db/db.js'
import OrderModel from '../model/OrderModel.js'
import ItemModel from '../model/ItemModel.js'

refreshPage();

const itemsArray = [];

var cashValue = 0;

$(".order_ID").val(generateNextOrderID());


// Customer FIND
    $('.customer_Table').on('click', 'tr', function(){
    $('.customer_Table tr').removeClass('table-active'); // clear previous selection
    $(this).addClass('table-active'); // highlight selected row

    let selectedCustomerId = $(this).find('td:eq(0)').text().trim();
    let selectedCustomerName = $(this).find('td:eq(1)').text().trim();
    let selectedCustomerAddress = $(this).find('td:eq(2)').text().trim();
    let selectedCustomerNumber = $(this).find('td:eq(3)').text().trim(); 
    console.log("Row selected");
    console.log(selectedCustomerId);
    console.log(selectedCustomerName);

    //After Selecting Customer.. all the inputs takes the values
    if(selectedCustomerId != null) {
        $(".order_Customer_ID").text(selectedCustomerId);
        $(".order_Customer_Name").val(selectedCustomerName);
        $(".order_Customer_Address").val(selectedCustomerAddress);
        $(".order_Customer_Number").val(selectedCustomerNumber);
        // $(".customer_ID").prop("disabled", true); //Disable ID Field
    }
});


// Item FIND 

//Table Row selection
$('.item_Table').on('click', 'tr', function(){
    $('.item_Table tr').removeClass('table-active'); // clear previous selection
    $(this).addClass('table-active'); // highlight selected row

    let selectedItemID = $(this).find('td:eq(0)').text().trim();
    let selectedItemName = $(this).find('td:eq(1)').text().trim();
    let selectedItemPrice = $(this).find('td:eq(2)').text().trim();
    let selectedItemQty = $(this).find('td:eq(3)').text().trim(); 
    console.log("Row selected");
    console.log(selectedItemID);
    console.log(selectedItemName);

    //After Selecting Customer.. all the inputs takes the values
    if(selectedItemID != null) {
        $(".order_Item_ID").text(selectedItemID);
        $(".order_Item_Name").val(selectedItemName);
        $(".order_Item_Price").val(selectedItemPrice);
        $(".order_Item_Qty").text(selectedItemQty);
        // $(".item_ID").prop("disabled", true); //Disable ID Field
    }
});


function refreshPage() {
    $(".order_Item_ID").text('FIND');
    $(".order_Item_Name").val('');
    $(".order_Item_Price").val('');
    $(".order_Item_Qty").text('0');
    $(".ordered_QTY").val('');
}

function refreshPurchase() {
    itemsArray.length = 0;
    loadItemsTable();
    $(".order_ID").val(generateNextOrderID());
    $(".order_Balance").val('');
    $(".order_Cash").val('');
    $(".order_Discount").val('');
}


let addItemBtn = $(".order_Add_Item");
addItemBtn.on("click", () => {
    let price = $(".order_Item_Price").val();
    if(price != '') {
        setCash(price);
        saveToObj();
        setQty();
        refreshPage();
    }
});

function setCash(price) {
    if(!isNaN(price)) {
        let qty = Number.parseInt($(".ordered_QTY").val());
        cashValue += Number.parseInt(price) * qty;
        $(".order_Cash").val(cashValue);
        $(".order_Balance").val(cashValue);
        console.log(cashValue)
    };
}

function setQty() {
    let orderedQty = Number.parseInt($(".ordered_QTY").val());
    let itemID = $(".order_Item_ID").text();
    let foundedIndex = items_DB.findIndex((item) => item.item_ID === itemID);
    let storedQty = items_DB[foundedIndex].item_Qty;
    let finalQty = storedQty - orderedQty;
    items_DB[foundedIndex].item_Qty = finalQty;
    console.log("Final Qty " + items_DB[foundedIndex].item_Qty);
    refreshPage();
}


// SAVE
let orderModel = new OrderModel();

function saveToObj() {
    let itemModel = new ItemModel(
        $(".order_Item_ID").text(),
        $(".order_Item_Name").val(),
        $(".order_Item_Price").val(),
        $(".ordered_QTY").val()
    );
    // Push Items after adding items
    itemsArray.push(itemModel);
    loadItemsTable()
    orderModel.setItems = itemModel;
}

let purchaseBtn = $(".order_Purchase_Clicked");

purchaseBtn.on("click", () => {
    let orderID = $(".order_ID").val();
    let orderDate = $(".order_Date").val();
    let custID = $(".order_Customer_ID").text();
    let custName = $(".order_Customer_Name").val();
    let custAddress = $(".order_Customer_Address").val();
    let custNumber = $(".order_Customer_Number").val();

    let totalAmount = $(".order_Balance").val();
    let cash = $(".order_Cash").val();
    let discount = $(".order_Discount").val();

    orderModel.order_ID = orderID;
    orderModel.order_Date = orderDate;
    orderModel.customer_ID = custID;
    orderModel.customer_Name = custName;
    orderModel.customer_Address = custAddress;
    orderModel.customer_Number = custNumber;

    orderModel.total_order_amount = totalAmount;
    orderModel.order_cash = cash;
    orderModel.order_discount = discount;

    orders_DB.length = 0;
    orders_DB.push(orderModel);
    localStorage.setItem('orders_data', JSON.stringify(orders_DB));
    console.log(orders_DB);
    cashValue = 0;
    orderModel = new OrderModel();
    refreshPurchase();
});



$(".onTypeDiscount").on('input', () => {
    let cash = Number.parseFloat($(".order_Cash").val());
    let percentage = Number.parseFloat($(".onTypeDiscount").val());
    let percentValue = (cash * percentage) / 100;
    let balance = cash - percentValue;
    console.log(balance);
    $(".order_Balance").val(balance);
    console.log("Pressed");
});

function generateNextOrderID() {
    if (orders_DB.length === 0) return "ORD001"; // first customer

    // Get the last customer's ID
    let lastOrderID = orders_DB[orders_DB.length - 1].order_ID; // e.g., "C003"

    // Extract number, increment, pad with zeros
    let lastNumber = parseInt(lastOrderID.substring(3)); // 3
    let nextNumber = lastNumber + 1; // 4

    // Return with padding (e.g., C004)
    return "ORD" + nextNumber.toString().padStart(3, '0');
}

function loadItemsTable() {
    let itemTable = $(".order_Item_Table").empty();

    console.log(itemsArray);

    itemsArray.map((items) => {
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
        `;
        itemTable.append(data);
    });
}
