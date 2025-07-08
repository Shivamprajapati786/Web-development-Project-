const products = [
  { title: "Wireless Headphones", price: 2500, category: "Electronics", rating: 4.5, image: "headphone.jpg", description: "Comfortable and high quality sound." },
  { title: "Gaming Mouse", price: 1500, category: "Electronics", rating: 4.2, image: "mouse.jpg", description: "Fast response with RGB lighting." },
  { title: "T-Shirt", price: 700, category: "Clothing", rating: 4.0, image: "tshirt.jpg", description: "Cotton t-shirt in multiple colors." },
  { title: "Shoes", price: 3200, category: "Footwear", rating: 3.9, image: "shoes.jpg", description: "Comfortable walking shoes." },
  { title: "Smart Watch", price: 2999, category: "Electronics", rating: 4.6, image: "watch.jpg", description: "Tracks health and connects with phone." },
  { title: "Backpack", price: 1200, category: "Accessories", rating: 4.1, image: "backpack.jpg", description: "Stylish and spacious backpack." }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("search");
const filterCategory = document.getElementById("filterCategory");
const filterPrice = document.getElementById("filterPrice");
const filterRating = document.getElementById("filterRating");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalRating = document.getElementById("modalRating");
const closeModal = document.getElementById("closeModal");

function showModal(product) {
  modalTitle.textContent = product.title;
  modalImage.src = product.image;
  modalDescription.textContent = product.description;
  modalPrice.textContent = product.price;
  modalRating.textContent = product.rating;
  modal.style.display = "flex";
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

function renderProducts(data) {
  productGrid.innerHTML = "";
  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <p>₹${p.price} | ${p.rating}★</p>
    `;
    card.onclick = () => showModal(p);
    productGrid.appendChild(card);
  });
}

function populateCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filterCategory.appendChild(opt);
  });
}

function applyFilters() {
  const searchVal = searchInput.value.toLowerCase();
  const catVal = filterCategory.value;
  const priceVal = filterPrice.value;
  const ratingVal = +filterRating.value;

  let filtered = products.filter(p => 
    p.title.toLowerCase().includes(searchVal) ||
    p.description.toLowerCase().includes(searchVal)
  );

  if (catVal) filtered = filtered.filter(p => p.category === catVal);

  if (priceVal) {
    const [min, max] = priceVal.split("-").map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  if (ratingVal) filtered = filtered.filter(p => p.rating >= ratingVal);

  renderProducts(filtered);
}

searchInput.oninput = applyFilters;
filterCategory.onchange = applyFilters;
filterPrice.onchange = applyFilters;
filterRating.onchange = applyFilters;

populateCategories();
renderProducts(products);
