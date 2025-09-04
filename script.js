let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";

    const grouped = {};

    cart.forEach(({ item, price }) => {
        if (!grouped[item]) {
            grouped[item] = { count: 1, price };
        } else {
            grouped[item].count += 1;
        }
    });

    for (const item in grouped) {
        const li = document.createElement("li");
        const totalItemPrice = grouped[item].price * grouped[item].count;
        li.innerHTML = `
      ${item} × ${grouped[item].count} = ₹${totalItemPrice}
      <button onclick="removeItem('${item}')">Remove</button>
    `;
        cartList.appendChild(li);
    }

    document.getElementById("total").textContent = `Total: ₹${total}`;
}

function removeItem(itemName) {
    const index = cart.findIndex(entry => entry.item === itemName);
    if (index !== -1) {
        total -= cart[index].price;
        cart.splice(index, 1);
        updateCart();
    }
}

function clearCart() {
    if (cart.length === 0) {
        alert("Your cart is already empty!");
        return;
    }

    if (confirm("Are you sure you want to clear the cart?")) {
        cart = [];
        total = 0;
        updateCart();
    }
}



function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out.");
        return;
    }

    alert("Order placed! Thank you for choosing Samosa Man.");
    cart = [];
    total = 0;
    updateCart();
}
let orderCount = 0;
let orderRevenue = 0;


function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const pickup = document.getElementById("pickup").value;

    if (cart.length === 0) {
        alert("Please add items to your cart before placing an order.");
        return;
    }

    if (!name || !phone || !pickup) {
        alert("Please fill in all customer details before placing an order.");
        return;
    }

    // Proceed with confirmation
    document.getElementById("customer-name").textContent = name;
    document.getElementById("pickup-time").textContent = pickup;
    document.getElementById("order-form").style.display = "none";
    document.querySelector(".cart").style.display = "none";
    document.getElementById("confirmation").style.display = "block";

    // ✅ Send WhatsApp message if checkbox is checked
    if (document.getElementById("send-whatsapp").checked) {
        const message = `New Order from ${name}\nPickup Time: ${pickup}\nItems:\n` +
            cart.map(item => `- ${item.item} ₹${item.price}`).join('\n') +
            `\nTotal: ₹${total}`;

        const whatsappURL = `https://wa.me/919384930851?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }

    // ✅ Send WhatsApp message to customer
    if (document.getElementById("send-customer-whatsapp")?.checked) {
        const customerMessage = `Hi ${name}, your order has been placed successfully!\nPickup Time: ${pickup}\nItems:\n` +
            cart.map(item => `- ${item.item} ₹${item.price}`).join('\n') +
            `\nTotal: ₹${total}\nThank you for choosing Samosa Man 🥟`;

        const customerPhone = phone.replace(/\D/g, ''); // Remove non-digit characters
        const customerWhatsAppURL = `https://wa.me/91${customerPhone}?text=${encodeURIComponent(customerMessage)}`;
        window.open(customerWhatsAppURL, '_blank');
    }




    // Update dashboard
    orderCount += 1;
    orderRevenue += total;
    document.getElementById("order-count").textContent = orderCount;
    document.getElementById("order-revenue").textContent = orderRevenue;

    cart = [];
    total = 0;
    updateCart();
}


function addCustomItem(item, price, selectId, qtyId) {
    const option = document.getElementById(selectId).value;
    const quantity = parseInt(document.getElementById(qtyId).value);

    if (!option) {
        alert(`Please select a type for ${item}`);
        return;
    }

    if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    for (let i = 0; i < quantity; i++) {
        cart.push({ item: `${item} (${option})`, price });
        total += price;
    }

    updateCart();
}


function showCustomerForm() {
    document.querySelector(".customer-form").scrollIntoView({ behavior: "smooth" });
}


window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
    }, 4000); // 4 seconds
});



