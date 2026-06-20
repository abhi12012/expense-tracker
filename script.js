let transactionCount = 0;
let balance = 0;


let transactions = [];




function tracker() {
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const balanceElement = document.getElementById("balance");
    const counterElement = document.getElementById("counter");




    const descriptionText = descriptionInput.value;
    const amountValue = amountInput.value;


   


    if (descriptionText === "" || amountValue === "") {
    alert("Please fill all fields");
    return;
    }


    transactions.push({
        description: descriptionText,
        amount: Number(amountValue)
    });


    localStorage.setItem("transactions", JSON.stringify(transactions));




   


    const li = document.createElement("li");
    li.textContent = descriptionText + " - ₹" + amountValue;


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";




    balance = balance + Number(amountValue);
    balanceElement.textContent = "Balance: ₹" + balance;
   
   
    transactionCount++;


counterElement.textContent = "Transactions: " + transactionCount;


   li.appendChild(deleteBtn);
   


    const list = document.getElementById("list");
    list.appendChild(li);


   
    deleteBtn.addEventListener("click", function () {
   


    balance = balance - Number(amountValue);
    balanceElement.textContent = "Balance: ₹" + balance;




    transactionCount--;


    counterElement.textContent = "Transactions: " + transactionCount;


    li.remove();


});


    descriptionInput.value = "";
    amountInput.value = "";


}
