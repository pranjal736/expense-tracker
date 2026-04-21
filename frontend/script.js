const API = "http://localhost:5000";

// ---------- DASHBOARD PAGE ----------
const welcomeUser = document.getElementById("welcomeUser");
const expenseForm = document.getElementById("expenseForm");
const list = document.getElementById("list");
let chartInstance;

if (welcomeUser) {
  welcomeUser.innerText =
    "Welcome, " + localStorage.getItem("user");
}

if (expenseForm) {
  expenseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: title.value,
      amount: Number(amount.value),
      category: category.value,
      userId: localStorage.getItem("user")
    };

    await fetch(`${API}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    title.value = "";
    amount.value = "";

    loadData();
  });
}

function addToList(e) {
  if (!list) return;

  const li = document.createElement("li");
  li.innerHTML = `
    ${e.title} - ₹${e.amount} (${e.category})
    <button onclick="deleteExpense('${e._id}')">Delete</button>
  `;
  list.appendChild(li);
}

async function deleteExpense(id) {
  await fetch(`${API}/expenses/${id}`, {
    method: "DELETE"
  });
  loadData();
}

async function loadData() {
  if (!list) return;

  const user = localStorage.getItem("user");
  const res = await fetch(`${API}/expenses?userId=${user}`);
  const data = await res.json();

  const totalEntries = document.getElementById("totalEntries");
  const totalExpense = document.getElementById("totalExpense");

  if (totalEntries) totalEntries.innerText = data.length;

  let total = 0;
  data.forEach(e => total += e.amount);

  if (totalExpense) totalExpense.innerText = "₹" + total;

  list.innerHTML = "";

  const map = {};

  data.forEach(e => {
    addToList(e);
    map[e.category] = (map[e.category] || 0) + e.amount;
  });

  const labels = Object.keys(map);
  const values = Object.values(map);

  const chartCanvas = document.getElementById("chart");

  if (chartCanvas) {
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(chartCanvas, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{ data: values }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: "white",
              font: { size: 14 }
            }
          }
        }
      }
    });
  }
}

if (document.getElementById("chart")) {
  loadData();
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ---------- REGISTER PAGE ----------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    const res = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

if (result.msg === "Already registered") {
  alert("Already registered");
} else {
  alert("Registered successfully");
  window.location.href = "login.html";
}
  });
}

// ---------- LOGIN PAGE ----------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

console.log(result);   // for checking backend response

if (result.message === "Login successful") {
  alert("Login successful");
  localStorage.setItem("user", data.email);
  window.location.href = "index.html";
} else if (result.msg === "Invalid password") {
  alert("Incorrect password");
} else if (result.msg === "User not found") {
  alert("User not found");
} else {
  alert("Login failed");
}
  });
}