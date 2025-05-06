let customerBtn = $(".customer_Clicked");
let homeBtn = $(".home_Clicked");
let itemBtn = $(".item_Clicked");
let orderBtn = $(".order_Clicked");
let customerSection = $(".customer_Section");
let homePageSection = $(".homePage_Section");
let itemPageSection = $(".items_Section");
let orderPageSection = $(".orders_Section");


itemBtn.on("click" , () => {
    homePageSection.css("display" , "none");
    customerSection.css("display" , "none");
    itemPageSection.css("display" , "block");
    orderPageSection.css("display" , "none");
})

customerBtn.on("click" , () => {
    customerSection.css("display" , "block");
    homePageSection.css("display" , "none");
    itemPageSection.css("display" , "none");
    orderPageSection.css("display" , "none");
})

homeBtn.on("click" , () => {
    itemPageSection.css("display" , "none");
    customerSection.css("display" , "none");
    homePageSection.css("display" , "block");
    orderPageSection.css("display" , "none");

})

orderBtn.on("click", () => {
    itemPageSection.css("display" , "none");
    customerSection.css("display" , "none");
    homePageSection.css("display" , "none");
    orderPageSection.css("display" , "block");
})
