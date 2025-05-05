import {customers_DB} from "../db/db.js"
import CustomerModel from "../model/CustomerModel.js"

//Customer Save
let customerSaveBtn = $(".customer_Save_Clicked");


const savedCustomers = localStorage.getItem('customers_data');
if (savedCustomers) {
    customers_DB.push(...JSON.parse(savedCustomers)); // Now it's an array again!
}

loadCustomerTable();

function loadCustomerTable() {
    let customerTable = $(".customer_Table").empty();
    customers_DB.map((customer) => {  //Map All the data from DB Array and assign it to Customer Table
        let id = customer.cust_ID;
        let name = customer.cust_Name;
        let address = customer.cust_Address;
        let number = customer.cust_Number;

        let data = `
        <tr>
        <th scope="row">${id}</th>
        <td>${name}</td>
        <td>${address}</td>
        <td>${number}</td>
        </tr>
        `

        customerTable.append(data);

    })
}

customerSaveBtn.on("click" , () => {

    let customerID = $(".customer_ID").val();
    let customerName = $(".customer_Name").val();
    let customerAddress = $(".customer_Address").val();
    let customerNumber = $(".customer_Number").val();

    if (customerID == '' && customerName == '' && customerAddress == '' && customerNumber == '') {
        Swal.fire({
            title: "Cannot Saved!",
            icon: "warning",
            draggable: true
        });
        return;
    }

    const isExistID = customers_DB.some(customer => customer.cust_ID == customerID);
    if(isExistID) {
        Swal.fire({
            title: "Customer ID Exists!",
            icon: "warning",
            draggable: true
        });
    }

    let customerData = new CustomerModel(customerID, customerName, customerAddress, customerNumber);
    if(!isExistID) {
        customers_DB.push(customerData); //Push customer Data to DB
        localStorage.setItem('customers_data',  JSON.stringify(customers_DB)); //Save DB to LocalStorage
        loadCustomerTable(); //Load Table
        if(customerData != null) {
            Swal.fire({
                title: "Customer Saved!",
                icon: "success",
                draggable: true
            });
        }
    }


})