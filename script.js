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




    let dateValue = document.getElementById("date").value;


if (!dateValue) {
    dateValue = new Date().toISOString().split("T")[0];
}




    if (descriptionText === "" || amountValue === "") {
        alert("Please fill all fields");
        return;
    }


      transactions.push({
        id: Date.now(),
        description: descriptionText,
        amount: Number(amountValue),
        type: isExpense ? "expense" : "income",
        category: categoryText,
        date: dateValue || new Date().toISOString().split("T")[0]
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


   
   


    const categoryFilterValue =
    document.getElementById("categoryFilter").value;
    console.log(categoryFilterValue);




   
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
    filteredTransactions =
        transactions.filter(
            item => item.type === filterValue
        );
}


if (categoryFilterValue !== "all") {


    filteredTransactions =
        filteredTransactions.filter(
            item => item.category === categoryFilterValue
        );


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
        li.textContent =
item.description +
" - ₹" + item.amount +
" (" + item.type + ")" +
" [" + item.category + "]" +
" 📅 " + (item.date || "No Date")


console.log("ITEM =", item);


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


const categoryFilter = document.getElementById("categoryFilter");


categoryFilter.innerHTML =
'<option value="all">All Categories</option>';


const uniqueCategories = [...new Set(
    transactions.map(item => item.category)
)];




uniqueCategories.forEach(function(category) {


    const option =
        document.createElement("option");


    option.value = category;
    option.textContent = category;


    categoryFilter.appendChild(option);


});




const summaryArea = document.getElementById("summaryArea");


summaryArea.innerHTML =
"<h3>Category Summary</h3>";


for (let category in categoryTotals) {


    summaryArea.innerHTML +=
    `<p>${category}: ₹${categoryTotals[category]}</p>`;


}




    balanceElement.textContent = "Balance: ₹" + balance;
    counterElement.textContent = "Transactions: " + filteredTransactions.length;
}






function showToday() {
    setActiveButton("btnToday");


    const today = new Date().toISOString().split("T")[0];


    const filtered = transactions.filter(item => item.date === today);


    renderFiltered(filtered);
}


function showMonth() {
    setActiveButton("btnMonth");


    const currentMonth = new Date().toISOString().slice(0,7);


    const filtered = transactions.filter(item =>
        item.date && item.date.slice(0,7) === currentMonth
    );


    renderFiltered(filtered);
}


function renderFiltered(filteredTransactions) {
 
    setActiveButton("btnAll");  // 👈 यही add करना है


    let incomeTotal = 0;
    let expenseTotal = 0;


    const list = document.getElementById("list");
    list.innerHTML = "";


    filteredTransactions.forEach(function(item) {


        const li = document.createElement("li");


        li.textContent =
        item.description +
        " - ₹" + item.amount +
        " (" + item.type + ")" +
        " [" + item.category + "]" +
        " 📅 " + item.date;


        list.appendChild(li);
    });
}






function setActiveButton(activeId) {


    document.getElementById("btnAll").classList.remove("active");
    document.getElementById("btnToday").classList.remove("active");
    document.getElementById("btnMonth").classList.remove("active");


    document.getElementById(activeId).classList.add("active");
}


window.onload = function() {


    const savedData =
        localStorage.getItem("transactions");


    if (savedData) {
        transactions = JSON.parse(savedData);
    }


    renderTransactions();
};



