let balance = 0;
let transactions = [];


function tracker() {


    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const isExpense = document.getElementById("isExpense").checked;
   


    const categoryInput = document.getElementById("category");
const categoryText = categoryInput.value;


    const descriptionText = descriptionInput.value;
    const amountValue = amountInput.value;


    if (descriptionText === "" || amountValue === "") {
        alert("Please fill all fields");
        return;
    }


    transactions.push({
    id: Date.now(),
    description: descriptionText,
    amount: Number(amountValue),
    type: isExpense ? "expense" : "income",
    category: categoryText
});
    localStorage.setItem("transactions", JSON.stringify(transactions));


    renderTransactions();


   
    descriptionInput.value = "";
    amountInput.value = "";


   
}
function renderTransactions() {


    let incomeTotal = 0;
    let expenseTotal = 0;


   const filterValue = document.getElementById("filter").value;


    const list = document.getElementById("list");
    const balanceElement = document.getElementById("balance");
    const counterElement = document.getElementById("counter");


    const chartArea = document.getElementById("chartArea");


    chartArea.innerHTML =
`
<h3>Chart Data</h3>
<p>Income: ₹${incomeTotal}</p>
<p>Expense: ₹${expenseTotal}</p>
`;






    list.innerHTML = "";
    balance = 0;


    let filteredTransactions = transactions;


if (filterValue !== "all") {
    filteredTransactions = transactions.filter(item => item.type === filterValue);
}


transactions.forEach(function(item) {


    console.log(
        item.category,
        item.amount
    );
console.log(500);
});


    filteredTransactions.forEach(function(item) {


       
        const li = document.createElement("li");
        li.textContent = item.description +
" - ₹" + item.amount +
" (" + item.type + ")" +
" [" + item.category + "]";


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


        if (item.type === "income") {
    balance += item.amount;
    incomeTotal += item.amount;
} else {
    balance -= item.amount;
    expenseTotal += item.amount;
}
    });


document.getElementById("income").textContent = incomeTotal;
document.getElementById("expense").textContent = expenseTotal;


const chartData = [
    {
        type: "Income",
        amount: incomeTotal
    },
    {
        type: "Expense",
        amount: expenseTotal
    }
];


let categoryTotals = {};


transactions.forEach(function(item) {


    if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
    }


    categoryTotals[item.category] += item.amount;


});


console.log(categoryTotals);




    balanceElement.textContent = "Balance: ₹" + balance;
    counterElement.textContent = "Transactions: " + filteredTransactions.length;
}
















window.onload = function() {


    const savedData =
        localStorage.getItem("transactions");


    if (savedData) {
        transactions = JSON.parse(savedData);
    }


    renderTransactions();
};

