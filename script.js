// ================================
// SV BUSINESS MANAGER
// ================================

let products = JSON.parse(localStorage.getItem("svProducts") || "[]");

window.openSection = function(section) {
  if (section === "Products") window.showProducts();
  if (section === "Sales") window.showSales();
  if (section === "Expenses") window.showExpenses();
  if (section === "Reports") window.showReports();
  if (section === "Settings") window.showSettings();
};
window.showSettings = function() {
  const profile = JSON.parse(
    localStorage.getItem("svBusinessProfile") || "{}"
  );

  document.body.innerHTML = `
    <div class="topbar">
      <h1>⚙️ Settings</h1>
      <p>Manage your business settings</p>
    </div>

    <div class="dashboard">

      <div class="card">
        <h2>🏢 Business Profile</h2>

        <label>Business Name</label>
        <input
          type="text"
          id="businessName"
          value="${profile.name || ""}"
          placeholder="Enter business name"
        >

        <br><br>

        <label>Mobile Number</label>
        <input
          type="tel"
          id="businessMobile"
          value="${profile.mobile || ""}"
          placeholder="Enter mobile number"
        >

        <br><br>

        <label>Address</label>
        <textarea
          id="businessAddress"
          placeholder="Enter business address"
        >${profile.address || ""}</textarea>

        <br><br>

        <button onclick="saveBusinessProfile()">
          💾 Save Profile
        </button>
      </div>

      <div class="card" onclick="showAppSettings()">
        <h2>⚙️ App Settings</h2>
        <p>Manage app preferences</p>
      </div>

      <div class="card" onclick="goHome()">
        <h2>← Back</h2>
        <p>Back to dashboard</p>
      </div>

    </div>
  `;
};


window.saveBusinessProfile = function() {
  const profile = {
    name: document.getElementById("businessName").value.trim(),
    mobile: document.getElementById("businessMobile").value.trim(),
    address: document.getElementById("businessAddress").value.trim()
  };

  localStorage.setItem(
    "svBusinessProfile",
    JSON.stringify(profile)
  );

  alert("Business Profile Saved Successfully ✅");
};


window.showAppSettings = function() {
  document.body.innerHTML = `
    <div class="topbar">
      <h1>⚙️ App Settings</h1>
      <p>Manage your app preferences</p>
    </div>

    <div class="dashboard">

      <div class="card">
        <h2>📱 App Information</h2>
        <p>SV Business Manager</p>
        <p>Version 1.0</p>
      </div>

      <div class="card" onclick="showSettings()">
        <h2>← Back</h2>
        <p>Back to Settings</p>
      </div>

    </div>
  `;
};
window.saveBusinessProfile = function() {
  const profile = {
    name: document.getElementById("businessName").value.trim(),
    mobile: document.getElementById("businessMobile").value.trim(),
   address: document.getElementById("businessAddress").value.trim(),
type: document.getElementById("businessType").value.trim() 
  };

  localStorage.setItem(
    "svBusinessProfile",
    JSON.stringify(profile)
  );

  alert("Business Profile Saved Successfully ✅");
};
window.showProducts = function() {
  products = JSON.parse(localStorage.getItem("svProducts") || "[]");
  let list = "";

  if (products.length === 0) {
    list = "<p>No products found.</p>";
  } else {
    products.forEach(function(product) {
      list += `
        <div class="card">
          <h3>📦 ${product.name}</h3>
          <p>Purchase Price: ₹${product.purchasePrice}</p>
          <p>Sale Price: ₹${product.salePrice}</p>
          <p>Stock: ${product.quantity}</p>
        </div>`;
    });
  }

  document.body.innerHTML = `
    <div class="topbar"><h1>📦 Products</h1><p>Manage your products</p></div>
    <div class="dashboard">
      <div class="card">
        <h2>➕ Add Product</h2><br>
        <label>Product Name</label>
        <input type="text" id="productName" placeholder="Enter product name"><br><br>
        <label>Purchase Price</label>
        <input type="number" id="purchasePrice" placeholder="Enter purchase price"><br><br>
        <label>Sale Price</label>
        <input type="number" id="salePrice" placeholder="Enter sale price"><br><br>
        <label>Quantity</label>
        <input type="number" id="productQuantity" placeholder="Enter quantity"><br><br>
        <button onclick="saveProduct()">Save Product</button>
      </div>
      <div class="card"><h2>📋 Product List</h2>${list}</div>
      <div class="card" onclick="goHome()"><h2>← Back</h2><p>Back to dashboard</p></div>
    </div>`;
};

window.saveProduct = function() {
  const name = document.getElementById("productName").value.trim();
  const purchasePrice = Number(document.getElementById("purchasePrice").value);
  const salePrice = Number(document.getElementById("salePrice").value);
  const quantity = Number(document.getElementById("productQuantity").value);

  if (!name) return alert("Please enter product name");
  if (purchasePrice < 0 || salePrice < 0) return alert("Please enter valid price");
  if (!quantity || quantity < 0) return alert("Please enter valid quantity");

  products.push({id: Date.now(), name, purchasePrice, salePrice, quantity});
  localStorage.setItem("svProducts", JSON.stringify(products));
  alert("Product saved successfully ✅");
  showProducts();
};

window.showSales = function(selectedProductId) {
  products = JSON.parse(localStorage.getItem("svProducts") || "[]");
  let options = "";
  let sales = JSON.parse(localStorage.getItem("svSales") || "[]");

  products.forEach(function(product) {
    options += `<option value="${product.id}" ${product.id === selectedProductId ? "selected" : ""}>${product.name} - Stock: ${product.quantity}</option>`;
  });

  if (products.length === 0) options = `<option value="">No products available</option>`;

  document.body.innerHTML = `
    <div class="topbar"><h1>🛒 Sales</h1><p>Manage your sales</p></div>
    <div class="dashboard">
      <div class="card">
        <h2>📊 Sales Summary</h2>
        <p>💰 Total Sales: ₹${sales.reduce((t,s)=>t+(Number(s.totalAmount)||(Number(s.salePrice)*Number(s.quantity))),0)}</p>
        <p>📦 Items Sold: ${sales.reduce((t,s)=>t+Number(s.quantity||0),0)}</p>
        <p>🧾 Transactions: ${sales.length}</p>
      </div>
      <div class="card">
        <h2>➕ New Sale</h2><br>
        <label>Select Product</label><select id="saleProduct">${options}</select><br><br>
        <label>Quantity Sold</label><input type="number" id="saleQuantity" placeholder="Enter quantity"><br><br>
        <button onclick="saveSale()">Save Sale</button>
      </div>
      <div class="card"><h2>📋 Sales List</h2><p>View your saved sales</p><button onclick="showSalesList()">View Sales</button></div>
      <div class="card" onclick="goHome()"><h2>← Back</h2><p>Back to dashboard</p></div>
    </div>`;
};

window.saveSale = function() {
  const productId = Number(document.getElementById("saleProduct").value);
  const quantity = Number(document.getElementById("saleQuantity").value);
  if (!productId) return alert("Please select a product");
  if (!quantity || quantity <= 0) return alert("Please enter sale quantity");

  products = JSON.parse(localStorage.getItem("svProducts") || "[]");
  const product = products.find(item => item.id === productId);
  if (!product) return alert("Product not found");
  if (quantity > product.quantity) return alert("Not enough stock. Available: " + product.quantity);

  product.quantity -= quantity;
  localStorage.setItem("svProducts", JSON.stringify(products));

  let sales = JSON.parse(localStorage.getItem("svSales") || "[]");
  sales.push({
    id: Date.now(), productId: product.id, productName: product.name,
    quantity, salePrice: product.salePrice,
    totalAmount: product.salePrice * quantity,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("svSales", JSON.stringify(sales));
  alert("Sale saved successfully ✅");
  showSales(product.id);
};

window.deleteSale = function(id) {
  let sales = JSON.parse(localStorage.getItem("svSales") || "[]");
  const sale = sales.find(item => item.id == id);
  if (!sale) return alert("Sale not found");

  let products = JSON.parse(localStorage.getItem("svProducts") || "[]");
  const product = products.find(item => item.id === sale.productId);
  if (product) {
    product.quantity += sale.quantity;
    localStorage.setItem("svProducts", JSON.stringify(products));
  }

  sales = sales.filter(item => item.id != id);
  localStorage.setItem("svSales", JSON.stringify(sales));
  alert("Sale deleted and stock restored ✅");
  showSalesList();
};

window.showSalesList = function() {
  let sales = JSON.parse(localStorage.getItem("svSales") || "[]");
  let list = sales.length === 0 ? "<p>No sales found.</p>" : "";

  sales.forEach(function(sale) {
    list += `<div class="card">
      <h3>🛒 ${sale.productName}</h3>
      <p>Quantity: ${sale.quantity}</p>
      <p>Sale Price: ₹${sale.salePrice}</p>
      <p>Total Amount: ₹${sale.totalAmount ?? (sale.salePrice * sale.quantity)}</p>
      <p>Date: ${sale.date}</p>
      <button onclick="deleteSale(${sale.id})">🗑️ Delete Sale</button>
    </div>`;
  });

  document.body.innerHTML = `
    <div class="topbar"><h1>📋 Sales List</h1><p>Saved sales</p></div>
    <div class="dashboard">${list}
      <div class="card" onclick="showSales()"><h2>← Back</h2><p>Back to Sales</p></div>
    </div>`;
};

window.goHome = function() { location.reload(); };

window.showExpenses = function() {
  let expenses = JSON.parse(localStorage.getItem("svExpenses") || "[]");
  let totalExpenses = expenses.reduce((t,e)=>t+Number(e.amount||0),0);

  document.body.innerHTML = `
    <div class="topbar"><h1>💰 Expenses</h1><p>Track your expenses</p></div>
    <div class="dashboard">
      <div class="card"><h2>📊 Expense Summary</h2><p>💰 Total Expenses: ₹${totalExpenses}</p><p>🧾 Transactions: ${expenses.length}</p></div>
      <div class="card">
        <h2>➕ Add Expense</h2><br>
        <label>Expense Name</label><input type="text" id="expenseName" placeholder="Enter expense name"><br><br>
        <label>Amount</label><input type="number" id="expenseAmount" placeholder="Enter amount"><br><br>
        <button onclick="saveExpense()">Save Expense</button>
      </div>
      <div class="card" onclick="showExpenseList()"><h2>📋 Expense List</h2><p>View your saved expenses</p></div>
      <div class="card" onclick="goHome()"><h2>← Back</h2><p>Back to Home</p></div>
    </div>`;
};

window.saveExpense = function() {
  const name = document.getElementById("expenseName").value;
  const amount = Number(document.getElementById("expenseAmount").value);
  if (!name || !amount) return alert("Please enter expense name and amount");

  let expenses = JSON.parse(localStorage.getItem("svExpenses") || "[]");
  expenses.push({name, amount});
  localStorage.setItem("svExpenses", JSON.stringify(expenses));
  alert("Expense Saved Successfully");
  showExpenses();
};

window.showExpenseList = function() {
  const expenses = JSON.parse(localStorage.getItem("svExpenses") || "[]");
  document.body.innerHTML = `
    <div class="topbar"><h1>📋 Expense List</h1><p>All saved expenses</p></div>
    <div class="dashboard">
      ${expenses.length === 0 ? `<div class="card"><p>No expenses found.</p></div>` :
        expenses.map((expense,index)=>`<div class="card"><h3>${index+1}. ${expense.name}</h3><p>💰 Amount: ₹${expense.amount}</p><button onclick="deleteExpense(${index})">🗑️ Delete</button></div>`).join("")}
      <div class="card" onclick="showExpenses()"><h2>← Back</h2><p>Back to Expenses</p></div>
    </div>`;
};

window.deleteExpense = function(index) {
  let expenses = JSON.parse(localStorage.getItem("svExpenses") || "[]");
  expenses.splice(index,1);
  localStorage.setItem("svExpenses", JSON.stringify(expenses));
  showExpenseList();
};

window.showReports = function() {
  const sales = JSON.parse(localStorage.getItem("svSales") || "[]");
  const expenses = JSON.parse(localStorage.getItem("svExpenses") || "[]");
  let totalSales = 0, itemsSold = 0, totalExpenses = 0;

  sales.forEach(sale => {
    const qty = Number(sale.qty || sale.quantity || 0);
    const unitPrice = Number(sale.salePrice || sale.price || sale.sellingPrice || 0);
    const saleTotal = Number(sale.totalAmount || sale.total || sale.amount || (unitPrice * qty) || 0);
    totalSales += saleTotal;
    itemsSold += qty;
  });

  expenses.forEach(expense => totalExpenses += Number(expense.amount || 0));
  const profit = totalSales - totalExpenses;

  document.body.innerHTML = `
    <div class="topbar"><h1>📊 Reports</h1><p>Business performance</p></div>
    <div class="dashboard">
      <div class="card"><h2>💰 Total Sales</h2><h2>₹${totalSales}</h2></div>
      <div class="card"><h2>💸 Total Expenses</h2><h2>₹${totalExpenses}</h2></div>
      <div class="card"><h2>📦 Items Sold</h2><h2>${itemsSold}</h2></div>
      <div class="card"><h2>📈 Profit</h2><h2>₹${profit}</h2></div>
      <div class="card" onclick="goHome()"><h2>← Back</h2><p>Back to Home</p></div>
    </div>`;
};

function updateDashboard() {
  let sales = JSON.parse(localStorage.getItem("svSales") || "[]");
  let expenses = JSON.parse(localStorage.getItem("svExpenses") || "[]");
  let totalSales = 0, itemsSold = 0, totalExpenses = 0;

  sales.forEach(function(sale) {
    totalSales += Number(sale.totalAmount || (sale.salePrice * sale.quantity) || 0);
    itemsSold += Number(sale.quantity || 0);
  });

  expenses.forEach(function(expense) {
    totalExpenses += Number(expense.amount || 0);
  });

  const profit = totalSales - totalExpenses;

  const salesEl = document.getElementById("dashboardSales");
  const expensesEl = document.getElementById("dashboardExpenses");
  const itemsEl = document.getElementById("dashboardItems");
  const profitEl = document.getElementById("dashboardProfit");

  if (salesEl) salesEl.textContent = "₹" + totalSales;
  if (expensesEl) expensesEl.textContent = "₹" + totalExpenses;
  if (itemsEl) itemsEl.textContent = itemsSold;
  if (profitEl) profitEl.textContent = "₹" + profit;
}

updateDashboard();
