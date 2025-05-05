document.addEventListener("DOMContentLoaded", () => {
    const prices = {
        espresso: 150,
        cappuccino: 200,
        mocha: 180,
        americano: 140,
        croissant: 100,
        "chocolate brownie": 120,
        "blueberry muffin": 130,
        "grilled cheese sandwich": 180
    };

    const addToCartButton = document.getElementById("add-to-cart");
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceDisplay = document.getElementById("total-price");
    const addressForm = document.getElementById("address-form");
    const itemSelect = document.getElementById("item");
    const quantityInput = document.getElementById("quantity");
    const addressInput = document.getElementById("address");
    const orderSummary = document.getElementById("order-summary"); // optional div for showing response

    let cart = [];

    function updateCart() {
        cartItemsList.innerHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = "<li>Your cart is empty</li>";
            totalPriceDisplay.innerHTML = "<strong>Total Price: Rs. 0</strong>";
            return;
        }

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.quantity} x ${item.name} - Rs. ${item.totalPrice}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.style.marginLeft = "10px";
            removeButton.addEventListener("click", () => removeItem(index));

            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
            totalPrice += item.totalPrice;
        });

        totalPriceDisplay.innerHTML = `<strong>Total Price: Rs. ${totalPrice}</strong>`;
    }

    function removeItem(index) {
        cart.splice(index, 1);
        updateCart();
    }

    addToCartButton.addEventListener("click", () => {
        const item = itemSelect.value;
        const quantity = parseInt(quantityInput.value);
        if (quantity < 1) return;

        const itemPrice = prices[item];
        const totalPrice = itemPrice * quantity;

        const existingItem = cart.find(cartItem => cartItem.name === item);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice = existingItem.quantity * itemPrice;
        } else {
            cart.push({
                name: item,
                quantity: quantity,
                totalPrice: totalPrice
            });
        }

        updateCart();
    });

    addressForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty. Add items before placing an order.");
            return;
        }

        if (!addressInput.value.trim()) {
            alert("Please enter your delivery address.");
            return;
        }

        const formData = new FormData();
        cart.forEach(item => {
            formData.append("items[]", item.name);
            formData.append("quantities[]", item.quantity);
        });
        formData.append("address", addressInput.value);

        fetch("order.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (orderSummary) {
                orderSummary.innerHTML = data;
            } else {
                alert("Order placed successfully!");
                console.log(data);
            }

            cart = [];
            updateCart();
            addressInput.value = "";
        })
        .catch(error => {
            alert("An error occurred.");
            console.error(error);
        });
    });

    updateCart();
});

// jQuery section for contact form and UI enhancements
$(document).ready(function () {
    // Contact form submission (if present)
    $("#contactForm").submit(function (event) {
        event.preventDefault();
    
        $.post("submit_contact.php", $(this).serialize(), function (data) {
            if (data.trim() === "success") {
                $("#successMessage").fadeIn().delay(3000).fadeOut();
                $("#contactForm")[0].reset();
            } else if (data.trim() === "unauthorized") {
                alert("You must be logged in to send a message.");
            } else {
                alert("There was an issue submitting the form.");
                console.error("Server response:", data);
            }
        });
    });
    

    // Smooth scroll
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: $(this.hash).offset().top
            }, 800);
        }
    });

    // Menu search
    $("#searchBox").remove();
    $(".menu-items").before('<input type="text" id="searchBox" placeholder="Search menu..." style="margin: 20px auto; display: block; padding: 8px; width: 80%; border: 1px solid #ccc; border-radius: 5px;">');

    $("#searchBox").on("keyup", function () {
        let query = $(this).val().toLowerCase();
        $(".menu-item").each(function () {
            $(this).toggle($(this).text().toLowerCase().includes(query));
        });
    });
});

// Optional: slideshow handler
let slideIndex = 0;
function showSlides() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.style.display = "none");

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
}
document.addEventListener("DOMContentLoaded", showSlides);
