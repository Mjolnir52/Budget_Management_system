document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const incomeForm = document.getElementById('incomeForm');
    const expenseForm = document.getElementById('expenseForm');
    const incomeList = document.getElementById('incomeList');
    const expenseList = document.getElementById('expenseList');
    const totalIncomeElement = document.getElementById('totalIncome');
    const totalExpenseElement = document.getElementById('totalExpense');
    const totalBalanceElement = document.getElementById('totalBalance');

    // Data storage
    let incomes = [];
    let expenses = [];
    let totalIncome = 0;
    let totalExpense = 0;
    let balance = 0;

    // Initialize the app
    function init() {
        updateSummary();
        renderLists();
    }

    // Form submission handlers
    incomeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addIncome();
    });

    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addExpense();
    });

    // Add income
    function addIncome() {
        const name = document.getElementById('incomeName').value.trim();
        const amount = parseFloat(document.getElementById('incomeAmount').value);

        if (!name || isNaN(amount) || amount <= 0) {
            alert('Please enter valid income details');
            return;
        }

        const income = {
            id: Date.now(),
            name,
            amount
        };

        incomes.push(income);
        totalIncome += amount;
        balance += amount;

        updateSummary();
        renderLists();
        incomeForm.reset();
    }

    // Add expense
    function addExpense() {
        const name = document.getElementById('expenseName').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);

        if (!name || isNaN(amount) || amount <= 0) {
            alert('Please enter valid expense details');
            return;
        }

        const expense = {
            id: Date.now(),
            name,
            amount
        };

        expenses.push(expense);
        totalExpense += amount;
        balance -= amount;

        updateSummary();
        renderLists();
        expenseForm.reset();
    }

    // Update summary
    function updateSummary() {
        totalIncomeElement.textContent = totalIncome.toFixed(2);
        totalExpenseElement.textContent = totalExpense.toFixed(2);
        totalBalanceElement.textContent = balance.toFixed(2);

        // Update balance color based on value
        if (balance < 0) {
            totalBalanceElement.style.color = 'var(--danger-color)';
        } else if (balance > 0) {
            totalBalanceElement.style.color = 'var(--success-color)';
        } else {
            totalBalanceElement.style.color = 'var(--dark-color)';
        }
    }

    // Render income and expense lists
    function renderLists() {
        // Clear lists
        incomeList.innerHTML = '';
        expenseList.innerHTML = '';

        // Render income list
        if (incomes.length === 0) {
            incomeList.innerHTML = '<li class="empty">No income added yet</li>';
        } else {
            incomes.forEach(income => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${income.name}</span>
                    <span>+$${income.amount.toFixed(2)}</span>
                    <button class="delete-btn" data-id="${income.id}" data-type="income">×</button>
                `;
                incomeList.appendChild(li);
            });
        }

        // Render expense list
        if (expenses.length === 0) {
            expenseList.innerHTML = '<li class="empty">No expenses added yet</li>';
        } else {
            expenses.forEach(expense => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${expense.name}</span>
                    <span>-$${expense.amount.toFixed(2)}</span>
                    <button class="delete-btn" data-id="${expense.id}" data-type="expense">×</button>
                `;
                expenseList.appendChild(li);
            });
        }

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', deleteItem);
        });
    }

    // Delete item
    function deleteItem(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const type = e.target.getAttribute('data-type');

        if (type === 'income') {
            const incomeIndex = incomes.findIndex(income => income.id === id);
            if (incomeIndex !== -1) {
                totalIncome -= incomes[incomeIndex].amount;
                balance -= incomes[incomeIndex].amount;
                incomes.splice(incomeIndex, 1);
            }
        } else {
            const expenseIndex = expenses.findIndex(expense => expense.id === id);
            if (expenseIndex !== -1) {
                totalExpense -= expenses[expenseIndex].amount;
                balance += expenses[expenseIndex].amount;
                expenses.splice(expenseIndex, 1);
            }
        }

        updateSummary();
        renderLists();
    }

    // Initialize the app
    init();
});


// window.onload=() => {
//     renderData();
// }

//     //Add Income
//     document.getElementById('incomeForm').addEventListener("submit" ,function(e){
//         e.preventDefault();
//         const title = document.getElementById('incomeTitle').value;
//         const amount = document.getElementById('incomeAmount').value;
//         if (title || amount <=0) return alert ("Kindly Enter Valid Details");{
//             const income = { id:Date.now(), title, amount};
//             const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
//             incomes.push(income);
//             localStorage.setItem('incomes', JSON.stringify(incomes));
//             this.reset();
//             renderData();
//         }
//     })

//     //Add Expense
//     document.getElementById('expenseForm').addEventListener("submit" ,function(e){
//         e.preventDefault();
//         const title = document.getElementById('expenseTitle').value;
//         const amount = document.getElementById('expenseAmount').value;
//         if (title || amount <=0) return alert ("Kindly Enter Valid Details");{
//             const expense = { id:Date.now(), title, amount};
//             const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
//             incomes.push(expense);
//             localStorage.setItem('expenses', JSON.stringify(expenses));
//             this.reset();
//             renderData();
//         }
//     })

//     //delete income/expense by id
//     function deleteItem(id,type){
//         let data = JSON.parse(localStorage.getItem(type)) || [];
//         data = data.filter(item => item.id !== id);
//         localStorage.setItem(type, JSON.stringify(data));
//         renderData();
//     }



// function renderData(){
//     const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
//     const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

//     const incomeList = document.getElementById('income-list');
//     incomeList.innerHTML = "";
//     let totalIncome = 0;
//     incomes.forEach(items => {totalIncome+=items.amount;
//         const li = document.createElement('li');
//         li.innerHTML = `${items.title} :${items.amount}`;        
//         <button onClick="deleteItem(${item.id})">❌</button>
//         incomeList.appendChild(li);
//     });

//     const expenseList = document.getElementById('expense-list');
//     expenseList.innerHTML = "";
//     let totalExpense = 0;
//     expenses.forEach(items => {totalExpense+=items.amount;
//         const li = document.createElement('li');
//         li.innerHTML = `${items.title} :${items.amount}`;
//         <button onClick="deleteItem(${item.id})">❌</button>
//         expenseList.appendChild(li);
//     });

//     document.getElementById('totalIncome').innerHTML = totalIncome
//     document.getElementById('totalExpense').innerHTML = totalExpense
//     document.getElementById('balance').innerHTML = totalIncome - totalExpense
// }