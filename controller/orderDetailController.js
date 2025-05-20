import {orders_DB} from '../db/db.js'
import OrderModel from '../model/OrderModel.js'


let orderDetailsSection = $(".order_Details_Clicked");
orderDetailsSection.on('click', () => {
    loadOrdersTable();
});

function loadOrdersTable() {
    console.log(orders_DB);
    orders_DB.map((orders) => {
        let order_ID = orders.order_ID;
        let order_Date = orders.order_Date;
        let order_Price = orders.total_order_amount;
        let customer_Name = orders.customer_Name;

        let data = `
        <tr>
        <td>${order_ID}</td>
        <td>${order_Date}</td>
        <td>${order_Price}</td>
        <td>${customer_Name}</td>
        </tr>
        `;
        $(".orders_Table").append(data);
    });
}

loadOrdersTable();