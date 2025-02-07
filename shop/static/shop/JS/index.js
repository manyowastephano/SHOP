const speechrecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const txt = document.getElementById('search-input')
const voice_search_btn = document.getElementById('voice-search')
const speech_recognition =new speechrecognition()
speech_recognition.maxResults = 15
speech_recognition.lang = 'en-US'
speech_recognition.addEventListener('result',(e)=>{
    const wordsaid = e.results[0][0].transcript
    txt.value = wordsaid
})
speech_recognition.addEventListener('start',()=>{
    console.log('Recording started')
})
speech_recognition.addEventListener('error',(e)=>{
    console.log('Errror occured during recordig',e.error)
})
voice_search_btn.addEventListener('click',()=>{
    speech_recognition.start()
})


function togglemenu(){
    var menu=document.getElementById("menu");
    var keffa=document.querySelector(".hambuger-bar");
    menu.classList.toggle("active");
   keffa.classList.toggle("active");
}

$(document).ready(function () {
    // Elements
    const addToCartButtons = $('.add-to-cart');
    const cartIcon = $('.cart-icon');
    const sidebar = $('.sidebar');
    const itemCount = $('.items-count');
    const itemsList = $('.items-list');
    const itemTotal = $('.total');
    const modalOverlay = $('.modal-overlay');
    const modal = $('.modal');
    const modalNameInput = $('#modal-item-name');
    const modalQuantityInput = $('#modal-item-quantity');
    const saveEditButton = $('#save-edit');
    const closeEditButton = $('#close-edit');
    const closecart=$('.fa-close')

    // Cart Variables
    let cartItems = [];
    let totalCost = 0;
    let currentEditIndex = null;

    // Add-to-cart event
    addToCartButtons.each(function (index) {
        $(this).on('click', function () {
            const itemName = $('.name').eq(index).text();
            const itemPriceText = $('.product-buttons span').eq(index).text().replace('K', '');
            const itemPrice = parseFloat(itemPriceText);

            if (isNaN(itemPrice)) return;

            // Check if the item is already in the cart
            const existingItemIndex = cartItems.findIndex(item => item.name === itemName);

            if (existingItemIndex !== -1) {
                alert("This item is already in the cart. Please use the edit option to update its quantity.");
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateTotalCost();
            updateCartInterface();
        });
    });

    function updateTotalCost() {
        totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    function updateCartInterface() {
        updateItemCount();
        updateCartItemsList();
        updateCartTotal();
    }

    function updateItemCount() {
        const itemCountValue = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        itemCount.text(itemCountValue);
    }

    function updateCartItemsList() {
        itemsList.empty();
        cartItems.forEach((item, index) => {
            const cartItemElement = $(`
                <div class="cart-item">
                    <span>${item.name} (${item.quantity})</span>
                    <span class="cart-item-price">K${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="edit-button" data-index="${index}"><i class="fa fa-edit"></i> Edit</button>
                    <button class="delete-button" data-index="${index}"><i class="fa fa-trash"></i> Delete</button>
                </div>
            `);
            itemsList.append(cartItemElement);
        });

        // Edit button functionality to open the modal
        $('.edit-button').on('click', function () {
            const index = $(this).data('index');
            openEditModal(index);
        });

        // Delete button functionality
        $('.delete-button').on('click', function () {
            const index = $(this).data('index');
            removeItemFromCart(index);
        });
    }

    // Function to open the edit modal
    function openEditModal(index) {
        currentEditIndex = index;
        const item = cartItems[index];
        modalNameInput.val(item.name);
        modalQuantityInput.val(item.quantity);
        modalOverlay.show();
    }

    // Save button in the modal
    saveEditButton.on('click', function () {
        const newName = modalNameInput.val();
        const newQuantity = parseInt(modalQuantityInput.val());

        if (newName && newQuantity > 0) {
            cartItems[currentEditIndex].name = newName;
            cartItems[currentEditIndex].quantity = newQuantity;
            updateTotalCost();
            updateCartInterface();
            closeEditModal();
        } else {
            alert("Please enter valid values.");
        }
    });

    // Close modal
    function closeEditModal() {
        modalOverlay.hide();
    }

    closeEditButton.on('click', closeEditModal);
    modalOverlay.on('click', function (event) {
        if (event.target === this) closeEditModal();
    });

    function removeItemFromCart(index) {
        cartItems.splice(index, 1);
        updateTotalCost();
        updateCartInterface();
    }

    function updateCartTotal() {
        itemTotal.text(`K${totalCost.toFixed(2)}`);
    }

    cartIcon.on('click', function () {
        sidebar.toggleClass('open');
    });
    $('.fa-close').on('click', function () {
        sidebar.removeClass('open');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.getElementById('search-input');
    const closeButton = document.getElementById('close-btn')
    const chartfeed = document.getElementById('chart-feed')
    const  uploadfeed = document.getElementById('upload-feed')
    const signin = document.getElementById('sign-up-option')
    searchIcon.addEventListener('click', () => {
        searchInput.style.display="block"
        chartfeed.style.display="none"
        uploadfeed.style.display="none"
        signin.style.display="none"
    });
    searchInput.addEventListener('input',()=>{
        if(searchInput.value.length>0){
            closeButton.style.display="block"
        }
        else{
            closeButton.style.display="none"
        }

    })
    closeButton.addEventListener("click",()=>{
        searchInput.value=""
        closeButton.style.display="none"
    })
});