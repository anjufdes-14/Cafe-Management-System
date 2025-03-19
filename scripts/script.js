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

    let cart = [];

    function updateCart() {
        cartItemsList.innerHTML = "";  // Clear previous cart items
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = "<li>Your cart is empty</li>";
            totalPriceDisplay.innerHTML = "<strong>Total Price: Rs. 0</strong>";
            addressForm.style.display = "none"; // Hide address form if cart is empty
            return;
        }

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.quantity} x ${item.name} - Rs. ${item.totalPrice}`;

            // Add remove button
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.style.marginLeft = "10px";
            removeButton.addEventListener("click", () => removeItem(index));

            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
            totalPrice += item.totalPrice;
        });

        totalPriceDisplay.innerHTML = `<strong>Total Price: Rs. ${totalPrice}</strong>`;
        addressForm.style.display = "block"; // Show address form when items are in cart
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

        alert('Your order has been placed!');

        // Clear everything
        cart = [];
        addressInput.value = "";
        updateCart();
    });

    // Initialize cart view
    updateCart();
});

//jQuery to show success message on form submission
$(document).ready(function () {
    $("#contactForm").submit(function (event) {
        event.preventDefault();
        $("#successMessage").fadeIn().delay(3000).fadeOut();
        this.reset();
    });
});

//jQuery for smooth scroll effect
$(document).ready(function () {
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: $(this.hash).offset().top
            }, 800);
        }
    });
});


    // jQuery for menu search 
    $(document).ready(function () {
        // Remove existing search box if it exists
        $("#searchBox").remove();
      
        // Append search bar before the menu list
        $(".menu-items").before('<input type="text" id="searchBox" placeholder="Search menu..." style="margin: 20px auto; display: block; padding: 8px; width: 80%; border: 1px solid #ccc; border-radius: 5px;">');
    
        // Search function
        $("#searchBox").on("keyup", function () {
            let query = $(this).val().toLowerCase();
            
            $(".menu-item").each(function () {
                $(this).toggle($(this).text().toLowerCase().includes(query));
            });
        });
    });
    
    let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach(slide => slide.style.display = "none");

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

document.addEventListener("DOMContentLoaded", showSlides);