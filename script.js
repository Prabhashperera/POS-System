let customerBtn = document.getElementsByClassName("customer_Clicked")[0];
let homeBtn = document.getElementsByClassName("home_Clicked")[0];
let customerSection = document.getElementsByClassName("customer_Section")[0];
let homePageSection = document.getElementsByClassName("homePage_Section")[0];


let customerID = document.getElementsByClassName("customer_ID")[0];
let customerName = document.getElementsByClassName("customer_Name")[0];
let customerAddress = document.getElementsByClassName("customer_Address")[0];
let customerNumber = document.getElementsByClassName("customer_Number")[0];



customerBtn.addEventListener("click" , () => {
    customerSection.style.display = "block";
    homePageSection.style.display = "none";
    console.log("Clicked");
})

homeBtn.addEventListener("click" , () => {
    customerSection.style.display = "none";
    homePageSection.style.display = "block"
})