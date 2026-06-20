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


    if (window.editingId) {


        transactions = transactions.map(function(t) {
            if (t.id === window.editingId) {
                return {
                    id: t.id,
                    description: descriptionText,
                    amount: Number(amountValue)
                };
            }
            return t;
        });


        window.editingId = null; // reset edit mode


    } else {


        // 🆕 normal add
        transactions.push({
            id: Date.now(),
            description: descriptionText,
            amount: Number(amountValue)
        });
    }


    localStorage.setItem("transactions", JSON.stringify(transactions));


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
        li.textContent = item.description + " - ₹" + item.amount;


        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";


        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";


        // EDIT
        editBtn.addEventListener("click", function() {


            document.getElementById("description").value = item.description;
            document.getElementById("amount").value = item.amount;


            // optional: remove old item for proper update flow
            transactions = transactions.filter(t => t.id !== item.id);


            localStorage.setItem("transactions", JSON.stringify(transactions));
            renderTransactions();
        });


        // DELETE
        deleteBtn.addEventListener("click", function() {


            transactions = transactions.filter(function(t) {
                return t.id !== item.id;
            });


            localStorage.setItem("transactions", JSON.stringify(transactions));
            renderTransactions();
        });


        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);


        balance += item.amount;
    });


    balanceElement.textContent = "Balance: ₹" + balance;
    counterElement.textContent = "Transactions: " + transactions.length;
}
window.onload = function() {


    const savedData =
        localStorage.getItem("transactions");


    if (savedData) {
        transactions = JSON.parse(savedData);
    }


    renderTransactions();
};


