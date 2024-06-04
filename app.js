let button = document.getElementById('button');
let dateInput = document.getElementById('dataInput');
let amountInput = document.getElementById('amountInput');
let descriptionInput = document.getElementById('descriptionInput');
let typeInput = document.getElementById('type');
let table = document.getElementById('table');
let classNames = {
    'Food': 'food',
    'Clothing': 'clothing',
    'Transportation': 'transportation',
    'Debt': 'debt',
    'Education': 'education',
    'Miscellaneous': 'miscellaneous'
};
let expenseRecords = [];

if (localStorage.getItem('expense_records')) {
    expenseRecords = JSON.parse(localStorage.getItem('expense_records'));
    renderTable();
}

function addExpense() {
    let date = dateInput.value || 'N/A';
    let type = typeInput.value || 'N/A';
    let amount = amountInput.value || 'N/A';
    let description = descriptionInput.value || 'N/A';
    let className = classNames[type] || '';

    expenseRecords.push({ date, type, amount, description, className });
    updateLocalStorage();
    renderTable();

    // Clear input fields
    dateInput.value = '';
    amountInput.value = '';
    descriptionInput.value = '';
    typeInput.value = '';
}

function deleteExpense(index) {
    expenseRecords.splice(index, 1);
    updateLocalStorage();
    renderTable();
}

function renderTable() {
    table.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
        </tr>
    `;

    expenseRecords.forEach((expense, index) => {
        table.innerHTML += `
            <tr>
                <td class="${expense.className}">${expense.date}</td>
                <td class="${expense.className}">${expense.type}</td>
                <td class="${expense.className}">${expense.amount}</td>
                <td class="${expense.className}">${expense.description}</td>
                <td class="${expense.className}">
                    <button onClick="deleteExpense(${index})" class="btn btn-primary btn-sm">Delete</button>
                </td>
            </tr>
        `;
    });
}

function updateLocalStorage() {
    localStorage.setItem('expense_records', JSON.stringify(expenseRecords));
}

button.addEventListener('click', addExpense);