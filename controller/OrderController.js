
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
        $(".order_Item_Qty").val(selectedItemQty);
        // $(".item_ID").prop("disabled", true); //Disable ID Field
    }
});