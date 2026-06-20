let balance = 0;
let transactions = [];


function tracker() {


    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");


    const descriptionText = descriptionInput.value;
    const amountValue = amountInput.value;


    if (descriptionText === "" || amountValue === "") {
        alert("Please fill all fields");
        return;
    }


    transactions.push({
        id: Date.now(),
        description: descriptionText,
        amount: Number(amountValue)
    });
console.log(transactions);


    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );


    renderTransactions();


    descriptionInput.value = "";
    amountInput.value = "";
}




function renderTransactions() {


    const list = document.getElementById("list");
    const balanceElement = document.getElementById("balance");
    const counterElement = document.getElementById("counter");


    list.innerHTML = "";


    balance = 0;


    transactions.forEach(function(item) {


        const li = document.createElement("li");
        li.textContent =
            item.description + " - ₹" + item.amount;


        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";




        const editBtn = document.createElement("button");
editBtn.textContent = "✏️";


editBtn.addEventListener("click", function() {


    console.log(item);


});


        deleteBtn.addEventListener("click", function() {


            transactions = transactions.filter(function(t) {


                // return t.description !== item.description;


                return t.id !== item.id;


            });


            localStorage.setItem(
                "transactions",
                JSON.stringify(transactions)
            );


            renderTransactions();


        });
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);


        balance = balance + item.amount;


    });


    balanceElement.textContent =
        "Balance: ₹" + balance;


    counterElement.textContent =
        "Transactions: " + transactions.length;
}




window.onload = function() {


    const savedData =
        localStorage.getItem("transactions");


    if (savedData) {
        transactions = JSON.parse(savedData);
    }


    renderTransactions();
};


