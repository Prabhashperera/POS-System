import {customers_DB} from "../db/db.js"
import CustomerModel from "../model/CustomerModel.js"


let selectedCustomerId = null;
let selectedCustomerName = null;

loadCustomerTable();

//TODO: Load Customer Table
function loadCustomerTable() {
    let customerTable = $(".customer_Table").empty();
    if(customers_DB != null) {
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
    }

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

            //After Selecting Customer.. all the inputs takes the values
            if(selectedCustomerId != null) {
                $(".customer_ID").val(selectedCustomerId);
                $(".customer_Name").val(selectedCustomerName);
                $(".customer_Address").val(selectedCustomerAddress);
                $(".customer_Number").val(selectedCustomerNumber);
                $(".customer_ID").prop("disabled", true); //Disable ID Field
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

    if (customerID == '' || customerName == '' || customerAddress == '' || customerNumber == '') {
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
        refreshPage(); //Load Table
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
    let updatedArray = customers_DB.filter((customers) => customers.cust_ID !== selectedCustomerId)
    customers_DB.length = 0;
    customers_DB.push(...updatedArray);

    Swal.fire({
        title: "Customer Removed!",
        icon: "success",
        draggable: true
    });

    refreshPage();
})

//TODO: Update Customer
let customerUpdateBtn = $(".customer_Update_Clicked");

customerUpdateBtn.on("click", () => {
    if(selectedCustomerId != null) {
        let foundIndex = customers_DB.findIndex((c) => c.cust_ID === selectedCustomerId);
        if(foundIndex != -1) {
            customers_DB[foundIndex].cust_Name = $(".customer_Name").val();
            customers_DB[foundIndex].cust_Address = $(".customer_Address").val();
            customers_DB[foundIndex].cust_Number = $(".customer_Number").val();

            refreshPage();

            Swal.fire({
                title: "Updated Customer!",
                icon: "success",
                draggable: true
            });
        }else {
            Swal.fire({
                title: "Not Updated!",
                icon: "warning",
                draggable: true
            });
        }

    }else {
        Swal.fire({
            title: "Select A Customer!",
            icon: "warning",
            draggable: true
        });
    }
});

// TODO: Refresh
let refreshBtn = $(".customer_Refresh_Clicked");
refreshBtn.on("click", () => {
    refreshPage();
})

function refreshPage () {
    $(".customer_ID").val('');
    $(".customer_ID").prop("disabled", false);
    $(".customer_Name").val('');
    $(".customer_Address").val('');
    $(".customer_Number").val('');
    loadCustomerTable();
}
