let favoriteIds = JSON.parse(localStorage.getItem("favoriteIds")) || [];

function formatPrice(price) {
    return "$" + price;
}

function findTourById(id) {
    return tours.find(function (tour) {
        return tour.id === id;
    });
}

function isFavorite(id) {
    return favoriteIds.includes(id);
}

function getFilteredTours(searchText, type) {
    const result = [];
    const text = searchText.trim().toLowerCase();

    for (const tour of tours) {
        const matchesName = tour.name.toLowerCase().includes(text);
        const matchesType = type === "All" || tour.type === type;

        if (matchesName && matchesType) {
            result.push(tour);
        }
    }
    return result;
}

function createTourCard(tour) {
    const col = document.createElement("div");
    col.className = "col-md-6 mb-4";

    const saved = isFavorite(tour.id);

    col.innerHTML = `
        <div class="card h-100 shadow-sm tour-card">
            <img src="${tour.img}" class="card-img-top" alt="${tour.name}">
            <div class="card-body d-flex flex-column">
                <h5 class="fw-bold">${tour.name}</h5>
                <p class="text-muted mb-1">${tour.type} · ${tour.days} days</p>
                <p class="fs-5"><b>${formatPrice(tour.price)}</b></p>
                <button type="button" class="btn ${saved ? "btn-danger" : "btn-outline-danger"} fav-btn mt-auto" data-id="${tour.id}">
                    ${saved ? "❤️ Saved" : "🤍 Add to Favorites"}
                </button>
            </div>
        </div>
    `;
    return col;
}
function renderTours() {
    const container = document.getElementById("tours-container");
    const searchText = document.getElementById("search-tour").value;
    const type = document.getElementById("type-filter").value;
    const noResults = document.getElementById("no-results");
    const resultCount = document.getElementById("result-count");

    const filtered = getFilteredTours(searchText, type);

    container.innerHTML = "";
    filtered.forEach(function (tour) {
        container.appendChild(createTourCard(tour));
    });

    resultCount.textContent = "Showing " + filtered.length + " of " + tours.length + " tours";

    if (filtered.length === 0) {
        noResults.classList.remove("d-none");
    } else {
        noResults.classList.add("d-none");
    }
}

function fillTypeFilter() {
    const select = document.getElementById("type-filter");

    tourTypes.forEach(function (type) {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        select.appendChild(option);
    });
}

function renderFavorites() {
    const list = document.getElementById("favorites-list");
    const empty = document.getElementById("fav-empty");
    const count = document.getElementById("fav-count");
    const total = document.getElementById("fav-total");

    list.innerHTML = "";
    let totalPrice = 0;

    for (let i = 0; i < favoriteIds.length; i++) {
        const tour = findTourById(favoriteIds[i]);
        if (!tour) continue;

        totalPrice += tour.price;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center px-0";

        const name = document.createElement("span");
        name.textContent = tour.name + " (" + formatPrice(tour.price) + ")";

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn btn-sm btn-outline-secondary remove-fav";
        removeBtn.textContent = "✕";
        removeBtn.setAttribute("aria-label", "Remove " + tour.name);
        removeBtn.setAttribute("data-id", tour.id);

        li.appendChild(name);
        li.appendChild(removeBtn);
        list.appendChild(li);
    }

    count.textContent = favoriteIds.length;
    empty.style.display = favoriteIds.length === 0 ? "block" : "none";
    total.textContent = favoriteIds.length > 0 ? "Total: " + formatPrice(totalPrice) : "";
}

function saveFavorites() {
    localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));
}

function toggleFavorite(id) {
    if (isFavorite(id)) {
        removeFavorite(id);
        return;
    }
    favoriteIds.push(id);
    saveFavorites();
    renderTours();
    renderFavorites();
}

function removeFavorite(id) {
    favoriteIds = favoriteIds.filter(function (favId) {
        return favId !== id;
    });
    saveFavorites();
    renderTours();
    renderFavorites();
}


document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("tours-container");
    if (!container) return; 

    fillTypeFilter();
    renderTours();
    renderFavorites();

    document.getElementById("search-tour").addEventListener("input", renderTours);

    document.getElementById("type-filter").addEventListener("change", renderTours);

    container.addEventListener("click", function (event) {
        const btn = event.target.closest(".fav-btn");
        if (btn) {
            toggleFavorite(Number(btn.dataset.id));
        }
    });

    document.getElementById("favorites-list").addEventListener("click", function (event) {
        const btn = event.target.closest(".remove-fav");
        if (btn) {
            removeFavorite(Number(btn.dataset.id));
        }
    });
});
