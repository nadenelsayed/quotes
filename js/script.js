// Elements
const siteNameInput = document.getElementById("siteName");
const siteURLInput = document.getElementById("siteURL");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const alertBox = document.getElementById("alertBox");
const closeBtn = document.querySelector(".close");

let bookmarks = [];

// Load bookmarks from localStorage
if (localStorage.getItem("bookmarks")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

// Validate URL
function isValidURL(url) {
  const pattern = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;
  return pattern.test(url);
}

// Add bookmark
addBtn.addEventListener("click", function () {
  const siteName = siteNameInput.value.trim();
  const siteURL = siteURLInput.value.trim();

  if (siteName.length < 3 || !isValidURL(siteURL)) {
    showModal();
    return;
  }

  const bookmark = {
    name: siteName,
    url: siteURL.startsWith("http") ? siteURL : `https://${siteURL}`
  };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();

  clearForm();

  // 💖 Button color changes with each click
  addBtn.style.background = randomGradient();
});

// Display bookmarks
function displayBookmarks() {
  let html = "";
  bookmarks.forEach((bookmark, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${bookmark.name}</td>
        <td><a href="${bookmark.url}" target="_blank">Visit</a></td>
        <td><button class="deleteBtn" onclick="deleteBookmark(${index})">🗑️</button></td>
      </tr>
    `;
  });
  tableBody.innerHTML = html;
}

// Delete bookmark
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
}

// Clear inputs
function clearForm() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

// Modal handling
function showModal() {
  alertBox.style.display = "flex";
}

closeBtn.addEventListener("click", function () {
  alertBox.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === alertBox) {
    alertBox.style.display = "none";
  }
});

// 🍓 Random Gradient Generator for Button
function randomGradient() {
  const gradients = [
    "linear-gradient(90deg, #f8a8b6, #ffd1dc)",
    "linear-gradient(90deg, #ffb6c1, #fff0f5)",
    "linear-gradient(90deg, #ffd5da, #ffe6eb)",
    "linear-gradient(90deg, #ffc0cb, #fff8f0)"
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}
