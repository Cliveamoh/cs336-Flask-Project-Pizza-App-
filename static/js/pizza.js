document.addEventListener('DOMContentLoaded', function() {
    const pizzaTypeElement = document.getElementById('pizza-type');
    const pizzaSizeElement = document.getElementById('pizza-size');
    const pizzaCrustElement = document.getElementById('pizza-crust');
    const pizzaQuantityElement = document.getElementById('pizza-quantity');
    const pizzaPriceElement = document.getElementById('pizza-price');
    const addToCartButton = document.getElementById('add-to-cart');
    const cartElement = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');

    const basePrices = {
        cheese: 8,
        pepperoni: 9,
        hawaiian: 10,
        meatlovers: 11
    };

    const sizeUpcharge = {
        small: 0,
        medium: 1,
        large: 2
    };

    const crustUpcharge = {
        regular: 0,
        thin: 1,
        thick: 1
    };

    let cart = [];
    let totalCost = 0;

    function updatePrice() {
        const pizzaType = pizzaTypeElement.querySelector('.selected').dataset.value;
        const pizzaSize = pizzaSizeElement.querySelector('.selected').dataset.value;
        const pizzaCrust = pizzaCrustElement.querySelector('.selected').dataset.value;
        const quantity = parseInt(pizzaQuantityElement.value, 10);

        const basePrice = basePrices[pizzaType];
        const sizeCharge = sizeUpcharge[pizzaSize];
        const crustCharge = crustUpcharge[pizzaCrust];

        const pricePerPizza = basePrice + sizeCharge + crustCharge;
        const totalPrice = pricePerPizza * quantity;

        pizzaPriceElement.textContent = `Price: $${totalPrice.toFixed(2)}`;
    }

    function addToCart() {
        const pizzaType = pizzaTypeElement.querySelector('.selected').dataset.value;
        const pizzaSize = pizzaSizeElement.querySelector('.selected').dataset.value;
        const pizzaCrust = pizzaCrustElement.querySelector('.selected').dataset.value;
        const quantity = parseInt(pizzaQuantityElement.value, 10);

        const basePrice = basePrices[pizzaType];
        const sizeCharge = sizeUpcharge[pizzaSize];
        const crustCharge = crustUpcharge[pizzaCrust];

        const pricePerPizza = basePrice + sizeCharge + crustCharge;
        const totalPrice = pricePerPizza * quantity;

        const pizzaDescription = `${quantity} ${pizzaSize.charAt(0).toUpperCase() + pizzaSize.slice(1)} ${pizzaCrust.charAt(0).toUpperCase() + pizzaCrust.slice(1)}-crust ${pizzaType.charAt(0).toUpperCase() + pizzaType.slice(1)}: $${totalPrice.toFixed(2)}`;
        
        cart.push(pizzaDescription);
        totalCost += totalPrice;

        renderCart();
        updateTotalPrice();

        resetForm();
    }

    function renderCart() {
        cartElement.innerHTML = '';
        cart.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            cartElement.appendChild(p);
        });
    }

    function updateTotalPrice() {
        totalPriceElement.textContent = `Total: $${totalCost.toFixed(2)}`;
    }

    function resetForm() {
        const selectedElements = document.querySelectorAll('.selected');
        selectedElements.forEach(element => element.classList.remove('selected'));

        pizzaTypeElement.querySelector('.selection-box[data-value="cheese"]').classList.add('selected');
        pizzaSizeElement.querySelector('.selection-box[data-value="small"]').classList.add('selected');
        pizzaCrustElement.querySelector('.selection-box[data-value="regular"]').classList.add('selected');

        pizzaQuantityElement.value = 1;

        updatePrice();
    }

    function handleSelection(event) {
        const parent = event.target.closest('.selection-box').parentElement;
        const selectedBox = parent.querySelector('.selected');
        if (selectedBox) {
            selectedBox.classList.remove('selected');
        }
        event.target.closest('.selection-box').classList.add('selected');
        updatePrice();
    }

    pizzaTypeElement.addEventListener('click', handleSelection);
    pizzaSizeElement.addEventListener('click', handleSelection);
    pizzaCrustElement.addEventListener('click', handleSelection);

    addToCartButton.addEventListener('click', addToCart);

    resetForm();
});
