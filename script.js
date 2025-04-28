let customerBtn = $(".customer_Clicked");
let homeBtn = $(".home_Clicked");
let itemBtn = $(".item_Clicked");
let customerSection = $(".customer_Section");
let homePageSection = $(".homePage_Section");
let itemPageSection = $(".items_Section");


itemBtn.on("click" , () => {
    homePageSection.css("display" , "none");
    customerSection.css("display" , "none")
    itemPageSection.css("display" , "block");
})

customerBtn.on("click" , () => {
    customerSection.css("display" , "block");
    homePageSection.css("display" , "none");
    itemPageSection.css("display" , "none")
})

homeBtn.on("click" , () => {
    itemPageSection.css("display" , "none")
    customerSection.css("display" , "none");
    homePageSection.css("display" , "block");
})

//Customer Save
let customerSaveBtn = $(".customer_Save_Clicked");
let customerTable = $(".customer_Table");

customerSaveBtn.on("click" , () => {

    $(".customer_ID").val("C001");
    let customerID = $(".customer_ID").val();
    let customerName = $(".customer_Name").val();
    let customerAddress = $(".customer_Address").val();
    let customerNumber = $(".customer_Number").val();

    let data = `
            <tr>
            <th scope="row">${customerID}</th>
            <td>${customerName}</td>
            <td>${customerAddress}</td>
            <td>${customerNumber}</td>
            </tr>
    `
    customerTable.append(data) 
    console.log(data);

})

// Item Save

let itemSaveBtn = $(".item_Save_Clicked");
let itemTable = $(".item_Table");

itemSaveBtn.on("click" , () => {

    $(".item_ID").val("I001");
    let itemID = $(".item_ID").val();
    let ItemName = $(".item_Name").val();
    let ItemPrice = $(".item_Price").val();
    let ItemQty = $(".item_Qty").val();

    let data = `
            <tr>
            <th scope="row">${itemID}</th>
            <td>${ItemName}</td>
            <td>${ItemPrice}</td>
            <td>${ItemQty}</td>
            </tr>
    `
    itemTable.append(data) 
    console.log(data);

})


