// ─── STATE ───────────────────────────────────────────────────────────────
// Load from localStorage, or start with empty array
let transactions = JSON.parse(localStorage.getItem('et_transactions') || '[]');
let currentType = 'income';
let currentFilter = 'all';

// ─── SAVE ───────────────────────────────────────────────────────────────
// Called after every change — persists to localStorage
function save() {
  localStorage.setItem('et_transactions', JSON.stringify(transactions));
}

// ─── FORMAT ──────────────────────────────────────────────────────────────
function fmt(n) {
  return '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) +
         ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

// ─── TYPE TOGGLE ─────────────────────────────────────────────────────────
function setType(type) {
  currentType = type;
  document.getElementById('btnIncome').className  = 'type-btn' + (type === 'income'  ? ' active-income'  : '');
  document.getElementById('btnExpense').className = 'type-btn' + (type === 'expense' ? ' active-expense' : '');
  
  // Show category dropdown only for expenses
  const catField = document.getElementById('catField');
  if (type === 'expense') {
    catField.style.display = 'block';
  } else {
    catField.style.display = 'none';
  }
}

// ─── ADD TRANSACTION ───────────────────────────────────────────────────────
function addTransaction() {
  const desc = document.getElementById('desc').value.trim();
  const amt  = parseFloat(document.getElementById('amt').value);
  const cat  = currentType === 'expense' ? document.getElementById('cat').value : '💰 Income';

  if (!desc)       return shake('desc');
  if (!amt || amt <= 0) return shake('amt');

  // Build transaction object
  const tx = {
    id:     Date.now(),          // unique ID using timestamp
    desc,
    amount: currentType === 'expense' ? -Math.abs(amt) : Math.abs(amt),
    cat,
    type:   currentType,
    date:   new Date().toISOString()
  };

  transactions.unshift(tx);     // add to front of array
  save();                        // persist to localStorage
  render();

  // Reset inputs
  document.getElementById('desc').value = '';
  document.getElementById('amt').value  = '';
}

// ─── DELETE TRANSACTION ──────────────────────────────────────────────────────
function deleteTransaction(id) {
  // filter() returns new array without the deleted item
  transactions = transactions.filter(tx => tx.id !== id);
  save();
  render();
}

function showConfirm() {
  document.getElementById('clearConfirm').style.display = 'block';
}

function hideConfirm() {
  document.getElementById('clearConfirm').style.display = 'none';
}

// ─── CLEAR ALL ─────────────────────────────────────────────────────────────
function clearAll() {
  transactions = [];
  save();
  hideConfirm();
  render();
}

// ─── FILTER ──────────────────────────────────────────────────────────────
function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

// ─── COMPUTE TOTALS ────────────────────────────────────────────────────────
function getTotals() {
  return transactions.reduce((acc, tx) => {
    if (tx.amount > 0) acc.income  += tx.amount;
    else               acc.expense += Math.abs(tx.amount);
    return acc;
  }, { income: 0, expense: 0 });
}

// ─── RENDER ──────────────────────────────────────────────────────────────
function render() {
  // 1. Update summary cards
  const { income, expense } = getTotals();
  const balance = income - expense;

  const balEl = document.getElementById('balance');
  balEl.textContent = (balance < 0 ? '−' : '') + fmt(balance);
  balEl.style.color = balance < 0 ? 'var(--expense)' : balance > 0 ? 'var(--income)' : 'var(--text)';
  document.getElementById('totalIncome').textContent  = fmt(income);
  document.getElementById('totalExpense').textContent = fmt(expense);

  // 2. Spending bar
  const pct = income > 0 ? Math.min((expense / income) * 100, 100) : 0;
  document.getElementById('spendBar').style.width = pct.toFixed(1) + '%';
  document.getElementById('spendPct').textContent  = pct.toFixed(0) + '% of income spent';

  // 3. Filter transactions
  const filtered = currentFilter === 'all'
    ? transactions
    : transactions.filter(tx => tx.type === currentFilter);

  // 4. Render list
  const list = document.getElementById('txList');
  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty"><div class="e-icon">📭</div><p>${
      transactions.length === 0 ? 'No transactions yet. Add one!' : 'No ' + currentFilter + ' transactions.'
    }</p></div>`;
  } else {
    list.innerHTML = filtered.map(tx => `
      <div class="tx-item">
        <div class="tx-icon ${tx.type}">${tx.cat.split(' ')[0]}</div>
        <div class="tx-info">
          <div class="tx-name">${tx.desc}</div>
          <div class="tx-meta">${tx.cat.slice(tx.cat.indexOf(' ')+1)} · ${fmtDate(tx.date)}</div>
        </div>
        <div class="tx-amount ${tx.type}">${tx.type === 'income' ? '+' : '−'}${fmt(tx.amount)}</div>
        <button class="tx-del" onclick="deleteTransaction(${tx.id})" title="Delete">✕</button>
      </div>`).join('');
  }

  // 5. Show/hide clear button
  document.getElementById('clearWrap').style.display = transactions.length ? 'block' : 'none';
  if (!transactions.length) hideConfirm();
}

// ─── SHAKE ANIMATION (validation feedback) ────────────────────────────────────
function shake(id) {
  const el = document.getElementById(id);
  el.style.borderColor = 'var(--expense)';
  el.style.animation = 'none';
  setTimeout(() => {
    el.style.animation = '';
    el.style.borderColor = '';
  }, 600);
  el.focus();
}

// ─── ENTER KEY ON INPUTS ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('desc').addEventListener('keydown', e => { if (e.key === 'Enter') addTransaction(); });
  document.getElementById('amt').addEventListener('keydown',  e => { if (e.key === 'Enter') addTransaction(); });

  // ─── INITIAL RENDER ───────────────────────────────────────────────────────
  render();
});