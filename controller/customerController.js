import {customers_DB} from "../db/db.js"
import CustomerModel from "../model/CustomerModel.js"


let selectedCustomerId = null;
let selectedCustomerName = null;

function loadData() {
    customers_DB.length = 0;
    const savedCustomers = localStorage.getItem('customers_data');
    if (savedCustomers) {
    customers_DB.push(...JSON.parse(savedCustomers)); // Now it's an array again!
    }
}

loadData();
loadCustomerTable();

// Load Customer Table
function loadCustomerTable() {
    let customerTable = $(".customer_Table").empty();
    customers_DB.map((customer) => {  //Map All the data from DB Array and assign it to Customer Table
        let id = customer.cust_ID;
        let name = customer.cust_Name;
        let address = customer.cust_Address;
        let number = customer.cust_Number;

        let data = `
        <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${address}</td>
        <td>${number}</td>
        </tr>
        `

        customerTable.append(data);

    });

        //Table Row selection
        $('.customer_Table').on('click', 'tr', function(){
            $('.customer_Table tr').removeClass('table-active'); // clear previous selection
            $(this).addClass('table-active'); // highlight selected row
    
            selectedCustomerId = $(this).find('td:eq(0)').text().trim();
            selectedCustomerName = $(this).find('td:eq(1)').text().trim();
            let selectedCustomerAddress = $(this).find('td:eq(2)').text().trim();
            let selectedCustomerNumber = $(this).find('td:eq(3)').text().trim(); 
            console.log("Row selected");
            console.log(selectedCustomerId);
            console.log(selectedCustomerName);

            if(selectedCustomerId != null) {
                $(".customer_ID").val(selectedCustomerId);
                $(".customer_Name").val(selectedCustomerName);
                $(".customer_Address").val(selectedCustomerAddress);
                $(".customer_Number").val(selectedCustomerNumber);
            }
        });

}


// TODO: Save Customer
let customerSaveBtn = $(".customer_Save_Clicked");

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


// TODO: Delete Customer

let customerRemoveBtn = $(".customer_Remove_Clicked");

customerRemoveBtn.on("click", () => {
    let storageCustomers = localStorage.getItem('customers_data');
    let customersArray = [];
    if(storageCustomers) {
        customersArray.push(...JSON.parse(storageCustomers));
    }
    let updatedArray = customersArray.filter((customers) => customers.cust_ID !== selectedCustomerId)
    localStorage.setItem('customers_data' , JSON.stringify(updatedArray));

    Swal.fire({
        title: "Customer Removed!",
        icon: "success"
    });

    loadData();
    loadCustomerTable();
})
