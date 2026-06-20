let balance = 0;
function tracker() {
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const balanceElement = document.getElementById("balance");


    const descriptionText = descriptionInput.value;
    const amountValue = amountInput.value;


    console.log(descriptionText);
    console.log(amountValue);


    if (descriptionText === "" || amountValue === "") {
    alert("Please fill all fields");
    return;
    console.log(descriptionText === "");
    console.log(amountValue === "");
}




    const li = document.createElement("li");
    li.textContent = descriptionText + " - ₹" + amountValue;


    balance = balance + Number(amountValue);
    console.log("Amount:", amountValue);
    console.log("Type:", typeof amountValue);


    console.log(balanceElement);


    balanceElement.textContent = "Balance: ₹" + balance;
    console.log("Balance:", balance);
   


   


    const list = document.getElementById("list");
    list.appendChild(li);


    console.log(li);


    descriptionInput.value = "";
    amountInput.value = "";


   


}


