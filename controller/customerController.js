import {customers_DB} from "../db/db.js"
import CustomerModel from "../model/CustomerModel.js"

//Customer Save
let customerSaveBtn = $(".customer_Save_Clicked");
let customerTable = $(".customer_Table");

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

    let data = `
            <tr>
            <th scope="row">${customerID}</th>
            <td>${customerName}</td>
            <td>${customerAddress}</td>
            <td>${customerNumber}</td>
            </tr>
    `

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
        customers_DB.push(customerData);
        localStorage.setItem('customers_data',  JSON.stringify(customers_DB));
        customerTable.append(data);
        if(customerData != null) {
            Swal.fire({
                title: "Customer Saved!",
                icon: "success",
                draggable: true
            });
        }
    }


})