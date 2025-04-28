let customerBtn = document.getElementsByClassName("customer_Clicked")[0];
let homeBtn = document.getElementsByClassName("home_Clicked")[0];
let customerSection = document.getElementsByClassName("customer_Section")[0];
let homePageSection = document.getElementsByClassName("homePage_Section")[0];


customerBtn.addEventListener("click" , () => {
    customerSection.style.display = "block";
    homePageSection.style.display = "none";
    console.log("Clicked");
})

homeBtn.addEventListener("click" , () => {
    customerSection.style.display = "none";
    homePageSection.style.display = "block"
})

//Save
let customerSaveBtn = $("customer_Save_Clicked");
let customerTable = $(".customer_Table");

customerSaveBtn.addEventListener("click" , () => {

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
