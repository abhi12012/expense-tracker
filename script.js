let balance = 0;
let transactions = [];
let editId = null;




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
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const sortValue = document.getElementById("sortAmount").value;


const dateFilterValue =
document.getElementById("dateFilter").value;


console.log(dateFilterValue);




   


    const categoryFilterValue =
    document.getElementById("categoryFilter").value;
    console.log(categoryFilterValue);




   
   


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


document.getElementById("income").textContent = incomeTotal;
document.getElementById("expense").textContent = expenseTotal;






let categoryTotals = {};


transactions.forEach(function(item) {


    if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
    }


    categoryTotals[item.category] += item.amount;


});


console.log(categoryTotals);




const chartData = [];


for (let category in categoryTotals) {


    chartData.push({
        category: category,
        amount: categoryTotals[category]
    });


}


console.log(chartData);


const chartArea = document.getElementById("chartArea");


chartArea.innerHTML = "<h3>Category Chart</h3>";






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
    console.log("renderFiltered chal raha hai");


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


window.onload = function() {


    const savedData =
        localStorage.getItem("transactions");


    if (savedData) {
        transactions = JSON.parse(savedData);
    }


    renderTransactions();
};






document
.getElementById("searchInput")
.addEventListener(
    "input",
    renderTransactions
   
);




