let balance = 0;
let transactions = [];
let editId = null;




function tracker() {


    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const isExpense = document.getElementById("isExpense").checked;
   


    const categoryInput = document.getElementById("category");
const categoryText = categoryInput.value;
console.log("Category:", categoryText);


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




      if (editId !== null) {


    let item = transactions.find(function(t) {
        return t.id === editId;
    });




    item.description = descriptionText;
    item.amount = Number(amountValue);
    item.category = categoryText;
    item.date = dateValue;




    editId = null;




    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );




    renderTransactions();


    return;


}
console.log("New Category:", categoryText);
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
console.log("renderTransactions चला");
    let incomeTotal = 0;
    let expenseTotal = 0;


   const filterValue = document.getElementById("filter").value;


    const list = document.getElementById("list");
    const balanceElement = document.getElementById("balance");
    const counterElement = document.getElementById("counter");
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const sortValue = document.getElementById("sortAmount").value;


const dateFilterValue =
document.getElementById("dateFilter").value;








   


    const categoryFilterValue =
    document.getElementById("categoryFilter").value;
   




   
   


    list.innerHTML = "";
    balance = 0;


   


let filteredTransactions = transactions;




if (searchValue !== "") {


    filteredTransactions =
    filteredTransactions.filter(function(item) {


        return (
            item.description.toLowerCase().includes(searchValue) ||
            item.category.toLowerCase().includes(searchValue) ||
            item.type.toLowerCase().includes(searchValue)
        );


    });


}




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


if (dateFilterValue === "today") {


    const today =
    new Date().toISOString().split("T")[0];


    filteredTransactions =
    filteredTransactions.filter(function(item) {


        return item.date === today;


    });


}






if (sortValue === "high") {


    filteredTransactions.sort(function(a, b) {
        return b.amount - a.amount;
    });


}


if (sortValue === "low") {
console.log("HIGH WORKING");
    filteredTransactions.sort(function(a, b) {
        return a.amount - b.amount;
    });


}


    filteredTransactions.forEach(function(item) {


       
        const li = document.createElement("li");
        li.textContent =
item.description +
" - ₹" + item.amount +
" (" + item.type + ")" +
" [" + item.category + "]" +
" 📅 " + (item.date || "No Date")






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


document.getElementById("income").textContent = "TEST " + incomeTotal;
document.getElementById("expense").textContent = "TEST " + expenseTotal;










let categoryTotals = {};


filteredTransactions.forEach(function(item) {


    if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
    }


    categoryTotals[item.category] += item.amount;
   
});








const chartData = [];


for (let category in categoryTotals) {


    chartData.push({
        category: category,
        amount: categoryTotals[category]
    });


}






const chartArea = document.getElementById("chartArea");




let highestCategory = "";
let highestAmount = 0;


for (let category in categoryTotals) {


    if (categoryTotals[category] > highestAmount) {


        highestAmount = categoryTotals[category];
        highestCategory = category;


    }


}




let totalIncome = 0;
let totalExpense = 0;


transactions.forEach(function(item) {


    if (item.type === "income") {
        totalIncome += item.amount;
    } else {
        totalExpense += item.amount;
    }


});


let savings = totalIncome - totalExpense;




const analyticsArea =
document.getElementById("analyticsArea");


analyticsArea.innerHTML = `
<h3>📊 Analytics</h3>


<p>🏆 Highest Category: ${highestCategory}</p>


<p>💰 Highest Amount: ₹${highestAmount}</p>


<p>💾 Savings: ₹${savings}</p>


`;






chartArea.innerHTML = `
<h3>💰  Analytics Charts</h3>
`;










let totalAmount = 0;


for (let category in categoryTotals) {
    totalAmount += categoryTotals[category];
}
chartData.forEach(function(item) {


     const percentage =
    ((item.amount / totalAmount) * 100).toFixed(1);


    let color = "#4CAF50";


if (item.category.toLowerCase() === "food") {
    color = "orange";
}


if (item.category.toLowerCase() === "travel") {
    color = "blue";
}


if (item.category.toLowerCase() === "salary") {
    color = "green";
}


    chartArea.innerHTML += `
        <div style="margin-bottom:10px;">
           <p>
${item.category}: ₹${item.amount}
(${percentage}%)
</p>






            <div style="
                background:#ddd;
                height:20px;
                width:300px;
            ">
                <div style="
                    background:${color};
                    height:20px;
                    width:${item.amount / 10}px;
                "></div>
            </div>
        </div>
    `;


});




let incomeExpenseData = [
    {
        type: "Income",
        amount: incomeTotal
    },
    {
        type: "Expense",
        amount: expenseTotal
    }
];




incomeExpenseData.forEach(function(item) {


    chartArea.innerHTML += `


    <div style="margin-bottom:10px;">


        <p>
        ${item.type}: ₹${item.amount}
        </p>


        <div style="
            background:#ddd;
            height:20px;
            width:300px;
        ">


            <div style="
                background:green;
                height:20px;
                width:${item.amount / 10}px;
            ">
            </div>


        </div>


    </div>


    `;


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




    balanceElement.textContent =
"TEST Balance: ₹" + balance;
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






function showCustomRange() {




const fromDate =
document.getElementById("fromDate").value;


const toDate =
document.getElementById("toDate").value;


if (!fromDate || !toDate) {


    alert("Please select both dates");
    return;


}


const filtered =
transactions.filter(function(item) {


    return item.date >= fromDate &&
           item.date <= toDate;


});


renderFiltered(filtered);




}








function renderFiltered(filteredTransactions) {
    console.log("renderFiltered chal raha hai");
     console.log(filteredTransactions);
   
   


    let incomeTotal = 0;
    let expenseTotal = 0;


    balance = 0;
 


    const list = document.getElementById("list");
    list.innerHTML = "";




    filteredTransactions.forEach(function(item) {


        const li = document.createElement("li");


       li.textContent =
item.description +
" - ₹" + item.amount +
" (" + item.type + ")" +
" [" + item.category + "]" +
" 📅 " + (item.date || "No Date");




const editBtn = document.createElement("button");
editBtn.textContent = "✏️";




editBtn.addEventListener("click", function() {
   
    editId = item.id;


    document.getElementById("description").value = item.description;
    document.getElementById("amount").value = item.amount;
    document.getElementById("category").value = item.category;
    document.getElementById("date").value = item.date;


});




const deleteBtn = document.createElement("button");
deleteBtn.textContent = "❌";




deleteBtn.addEventListener("click", function() {




   if (!confirm("Are you sure?")) {
    return;
}


    transactions = transactions.filter(function(t) {
        return t.id !== item.id;
    });




    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );




    showToday();


});






li.appendChild(editBtn);
li.appendChild(deleteBtn);


list.appendChild(li);


        if (item.type === "income") {


            incomeTotal += item.amount;
            balance += item.amount;


        } else {


            expenseTotal += item.amount;
            balance -= item.amount;


        }


    });






    document.getElementById("income").textContent = incomeTotal;


    document.getElementById("expense").textContent = expenseTotal;


    document.getElementById("balance").textContent =
    "Balance: ₹" + balance;






    document.getElementById("counter").textContent =
    "Transactions: " + filteredTransactions.length;


}






function setActiveButton(activeId) {


    document.getElementById("btnAll").classList.remove("active");
    document.getElementById("btnToday").classList.remove("active");
    document.getElementById("btnMonth").classList.remove("active");


    document.getElementById(activeId).classList.add("active");
}








document
.getElementById("searchInput")
.addEventListener(
    "input",
    renderTransactions
   
);


function exportCSV() {


    let csv =
    "Description,Amount,Type,Category,Date\n";


    transactions.forEach(function(item) {


        csv +=
        item.description + "," +
        item.amount + "," +
        item.type + "," +
        item.category + "," +
        item.date + "\n";


    });


    const blob = new Blob(
        [csv],
        { type: "text/csv" }
    );


    const url =
    window.URL.createObjectURL(blob);


    const a =
    document.createElement("a");


    a.href = url;
    a.download = "expenses.csv";


    a.click();


    window.URL.revokeObjectURL(url);


}






function showMonthSummary() {


    const today = new Date();


    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();


    console.log(transactions);
    console.log("All Transactions:", transactions);




    const monthTransactions = transactions.filter(function(item) {


        const itemDate = new Date(item.date);


        return (
            itemDate.getMonth() === currentMonth &&
            itemDate.getFullYear() === currentYear
        );


    });




    console.log(monthTransactions);


    let monthIncome = 0;
let monthExpense = 0;




monthTransactions.forEach(function(item) {


    if (item.type === "income") {


        monthIncome += item.amount;


    } else {


        monthExpense += item.amount;


    }


});




let monthSavings = monthIncome - monthExpense;




console.log("Month Income:", monthIncome);
console.log("Month Expense:", monthExpense);
console.log("Month Savings:", monthSavings);


const summaryArea = document.getElementById("summaryArea");


summaryArea.innerHTML = `


<h3>📅 This Month Summary</h3>


<p>🟢 Income: ₹${monthIncome}</p>


<p>🔴 Expense: ₹${monthExpense}</p>


<p>💰 Savings: ₹${monthSavings}</p>


<p>📌 Transactions: ${monthTransactions.length}</p>


`;






}








function importCSV() {


    const file =
    document.getElementById("csvFile").files[0];


    if (!file) {
        alert("Please select a CSV file");
        return;
    }


    const reader = new FileReader();


    reader.onload = function(event) {


        const csvData = event.target.result;


        const rows =
        csvData.split("\n");


        transactions = [];


        for (let i = 1; i < rows.length; i++) {


            const cols =
            rows[i].split(",");


            if (cols.length < 5) continue;


            transactions.push({
                id: Date.now() + i,
                description: cols[0],
                amount: Number(cols[1]),
                type: cols[2],
                category: cols[3],
                date: cols[4].trim()
            });


        }


        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );


        renderTransactions();


        alert("CSV Imported Successfully!");


    };


    reader.readAsText(file);


}


window.onload = function() {


const savedTheme =
localStorage.getItem("theme");


if (savedTheme === "dark") {
document.body.classList.add("dark");
}




    const savedData =
        localStorage.getItem("transactions");


    if (savedData) {
        transactions = JSON.parse(savedData);


        transactions = transactions.map(function(item) {


    if (!item.category || item.category === "") {


        item.category = "Other";


    }


    return item;


});
    }


    renderTransactions();
};








function toggleTheme() {




document.body.classList.toggle("dark");


if (document.body.classList.contains("dark")) {


    localStorage.setItem("theme", "dark");


} else {


    localStorage.setItem("theme", "light");


}


}
