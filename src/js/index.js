import { fetchData } from "./api.js";
import { showDescription } from "./description.js";
import { button, modal, btnClose, cards, botonUp, closeModal, descModal, templateCarrito, templateFooter, fragment, footerCart, items, totalProducts, buttonBuy } from "./nodes.js";

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
    //call api
    fetchData();
     
    //localstorage
    if (localStorage.getItem('carrito')) {
        cart = JSON.parse(localStorage.getItem('carrito'));
    //render cart
        renderCart();
    }
  
    
});
//show modal window shopping cart
button.addEventListener("click", ()=>{
    modal.style.clipPath= "polygon(50% 0%, 100% 0, 100% 60%, 100% 100%, 0 100%, 0% 60%, 0 0)";
});
//hide modal window shopping cart
btnClose.addEventListener("click", () =>{
    modal.style.clipPath= "polygon(50% 0%, 50% 47%, 100% 60%, 50% 47%, 50% 47%, 0% 60%, 50% 47%)";
});
//hide modal window description
closeModal.addEventListener("click", () => {
    descModal.style.clipPath= "polygon(50% 0%, 50% 47%, 100% 60%, 50% 47%, 50% 47%, 0% 60%, 50% 47%)";
})

cards.addEventListener("click", e => {
    //call to function showCart
    showCart(e);
    //call to function showDescription
    showDescription(e);
    
})
//click button to up 
botonUp.addEventListener("click", () => {
    window.scrollTo(0, 0);
})
///click button to add / less cant
items.addEventListener('click', e => { 
    //call to function btnAumentarDisminuir
    btnAumentarDisminuir(e); 
})

//function that detects when the buy button is clicked
const showCart = e => {
    
    if (e.target.classList.contains('buy')){
        //call to function setCart
        setCart(e.target.parentElement);
    }

    e.stopPropagation();
    
}
//function that builds the elements of the clicked product and that will be displayed in the modal window of the shopping cart
const setCart = objeto => {
    
    const producto = {
        id: objeto.querySelector('button').dataset.id,
        thumbnailUrl: objeto.querySelector('img').getAttribute("src"),
        title: objeto.querySelector('h3').textContent,
        price: objeto.querySelector('span').textContent,
        cant: 1
    }
    if (cart.hasOwnProperty(producto.id)) {
        producto.cant = cart[producto.id].cant + 1;
    }
    
    cart[producto.id] = { ...producto };
    //call to function renderCart
    renderCart();
}
//function that renders the products and displays it in the template tag (templateCarrito) 
const renderCart = () => {
    items.innerHTML = '';
    
    Object.values(cart).forEach(producto => {
        templateCarrito.querySelector('img').setAttribute("src", producto.thumbnailUrl);
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cant;
        templateCarrito.querySelector('span').textContent = (producto.price * producto.cant).toFixed(2);
        
        //buttons + and -
        templateCarrito.querySelector('.btn-more').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-minus').dataset.id = producto.id;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);
    //call to renderFooter
    renderFooter();
    //set localstorage
    localStorage.setItem('carrito', JSON.stringify(cart));
    
}
//function that renders the footer of the shopping cart modal window and displays the total products and total prices in the template tag(templateFooter)
const renderFooter = () => {
    footerCart.innerHTML = '';
    
    if (Object.keys(cart).length === 0) {
        footerCart.innerHTML = `
        <th scope="row" colspan="5">Empty cart</th>
        `;
        totalProducts.querySelector('strong').textContent = '0';
        buttonBuy.querySelector('button').style.display = 'none';
        return
    }
    
    //show button buy when exists products
    buttonBuy.querySelector('button').style.display = 'block';

    // add cant y add totals
    const nCantidad = Object.values(cart).reduce((acc, { cant }) => acc + cant, 0);
    const nPrecio = Object.values(cart).reduce((acc, {cant, price}) => acc + cant * price ,0);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio.toFixed(2);

    //show total
    totalProducts.querySelector('strong').textContent = nCantidad;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);

    footerCart.appendChild(fragment);
    //click to clear the products in the modal window y localstorage
    const boton = document.querySelector('#vaciar-carrito');
    boton.addEventListener('click', () => {
        cart = {};
        renderCart();
    })
    //click to buy and clear the products in the modal window y localstorage
    const btnbuy = document.querySelector('#btnbuy');
    btnbuy.addEventListener("click", () => {
        cart = {};
        renderCart();
    })
    
}
//function to add / less products cant
const btnAumentarDisminuir = e => {
    
    if (e.target.classList.contains('btn-more')) {
        const producto = cart[e.target.dataset.id];
        producto.cant++;
        cart[e.target.dataset.id] = { ...producto };
        renderCart();
    }

    if (e.target.classList.contains('btn-minus')) {
        const producto = cart[e.target.dataset.id];
        producto.cant--;
        if (producto.cant === 0) {
            delete cart[e.target.dataset.id];
        } else {
            cart[e.target.dataset.id] = {...producto};
        }
        renderCart();
    }
    e.stopPropagation();
}