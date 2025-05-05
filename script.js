let customerBtn = $(".customer_Clicked");
let homeBtn = $(".home_Clicked");
let itemBtn = $(".item_Clicked");
let customerSection = $(".customer_Section");
let homePageSection = $(".homePage_Section");
let itemPageSection = $(".items_Section");


itemBtn.on("click" , () => {
    homePageSection.css("display" , "none");
    customerSection.css("display" , "none");
    itemPageSection.css("display" , "block");
})

customerBtn.on("click" , () => {
    customerSection.css("display" , "block");
    homePageSection.css("display" , "none");
    itemPageSection.css("display" , "none");
})

homeBtn.on("click" , () => {
    itemPageSection.css("display" , "none");
    customerSection.css("display" , "none");
    homePageSection.css("display" , "block");
})



// Item Save

let itemSaveBtn = $(".item_Save_Clicked");
let itemTable = $(".item_Table");

itemSaveBtn.on("click" , () => {

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


