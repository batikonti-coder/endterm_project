const destinations = [
    { id: 1, name: "Almaty Mountains", type: "Nature", price: 150, img: "https://via.placeholder.com/300x200?text=Almaty" },
    { id: 2, name: "Caspian Sea", type: "Beach", price: 300, img: "https://via.placeholder.com/300x200?text=Caspian" },
    { id: 3, name: "Charyn Canyon", type: "Nature", price: 120, img: "https://via.placeholder.com/300x200?text=Charyn" },
    { id: 4, name: "Astana City", type: "City", price: 200, img: "https://via.placeholder.com/300x200?text=Astana" }
];

let favoriteTours = [];

function getPriceString(price) {
    return "$" + price;
}

function renderTours(searchText) {
    const container = document.getElementById("tours-container");
    if (!container) return;
    
    container.innerHTML = "";

    for (let i = 0; i < destinations.length; i++) {
        let tour = destinations[i];
        
        if (tour.name.toLowerCase().includes(searchText.toLowerCase())) {
            let card = document.createElement("div");
            card.className = "col-md-4 mb-4";
            
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${tour.img}" class="card-img-top" alt="tour">
                    <div class="card-body">
                        <h5>${tour.name}</h5>
                        <p class="text-muted">${tour.type}</p>
                        <p><b>${getPriceString(tour.price)}</b></p>
                        <button class="btn btn-outline-danger fav-btn" data-id="${tour.id}">Add to Favorites</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        }
    }
    
    bindFavButtons();
}

function bindFavButtons() {
    let buttons = document.querySelectorAll(".fav-btn");
    buttons.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            let id = parseInt(event.target.getAttribute("data-id"));
            if (!favoriteTours.includes(id)) {
                favoriteTours.push(id);
                event.target.textContent = "Saved";
                event.target.className = "btn btn-danger fav-btn";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderTours("");

    let searchBox = document.getElementById("search-tour");
    if (searchBox) {
        searchBox.addEventListener("input", function(e) {
            renderTours(e.target.value);
        });
    }

    let themeBtn = document.getElementById("theme-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function() {
            document.body.classList.toggle("bg-dark");
            document.body.classList.toggle("text-white");
        });
    }

    let form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            let email = document.getElementById("user-email").value;
            let name = document.getElementById("user-name").value;
            let errorBox = document.getElementById("error-box");
            let successBox = document.getElementById("success-box");
            
            errorBox.style.display = "none";
            successBox.style.display = "none";
            
            let isOk = true;
            
            if (name.length < 3) {
                isOk = false;
                errorBox.textContent = "Name must be at least 3 characters!";
                errorBox.style.display = "block";
            } else if (!email.includes("@") || !email.includes(".")) {
                isOk = false;
                errorBox.textContent = "Enter a valid email!";
                errorBox.style.display = "block";
            }
            
            if (isOk) {
                successBox.textContent = "Successfully booked!";
                successBox.style.display = "block";
                form.reset();
            }
        });
    }
});

$(document).ready(function() {
    $(".faq-title").on("click", function() {
        let answer = $(this).next(".faq-text");
        $(this).parent().siblings().find(".faq-text").slideUp();
        answer.slideToggle();
    });

    $("img.gallery-img").on("mouseenter", function() {
        $(this).animate({ opacity: 0.7 }, "fast");
    }).on("mouseleave", function() {
        $(this).animate({ opacity: 1 }, "fast");
    });
});