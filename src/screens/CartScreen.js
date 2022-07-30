import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

const addToCart = (item, forceUpdate = false) =>{ 
     let cartItems = getCartItems();
     const existingItem = cartItems.find(cartItem => cartItem.product === item.product);
     if (existingItem) {
        if(forceUpdate) {
           cartItems = cartItems.map(cartItem => 
            cartItem.product === existingItem.product ? item : cartItem
     ); 
    }
      
    } else {
        cartItems = [...cartItems, item];
    };

    setCartItems(cartItems);

    if(forceUpdate) {
        rerender(CartScreen);
    }

    
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter(cartItem => cartItem.product !== id));
    if(id === parseRequestUrl().id) {
        document.location.hash = '/cart';
    }else{
        rerender(CartScreen);
    }
}

const CartScreen = {
    after_render: () => {
        const qtySelects = document.getElementsByClassName('qty-select');
        Array.from(qtySelects).forEach(qtySelect => {
            qtySelect.addEventListener('change', (e) => {
                const item = getCartItems().find(cartItem => cartItem.product === qtySelect.id);
                addToCart({ ...item, qty: Number(e.target.value)}, true);

            });
        });

        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach(deleteButton => {
            deleteButton.addEventListener('click', () => {
                removeFromCart(deleteButton.id);
            });
        });

        const checkoutButton = document.getElementById('checkout-button');
        checkoutButton.addEventListener('click', () => {
            document.location.hash = '/signin';
        });
    },
    render: async () => {
        const request = parseRequestUrl();
        if(request.id) {
            const product = await getProduct(request.id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            });
        }

        const cartItems = getCartItems();

        return `
        <div class="cart content">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h2>Carrito</h2>
                        <div>Precio</div>
                    </li>
                    ${
                        cartItems.length === 0 ?
                        '<div>El carrito esta vacio. <a href="">Go shopping</a></div>' :
                        cartItems.map(item => `
                        <li>
                            <div class="cart-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-name">
                                <div>
                                    <a href="/#/product/${item.product}">
                                        ${item.name}
                                    </a>
                                </div>
                                <div>
                                    Cantidad: 
                                    <select class="qty-select" id="${item.product}">
                                        ${
                                            [...Array(item.countInStock).keys()].map(i => item.qty === i + 1 ?
                                            `<option value="${i + 1}" selected>${i + 1}</option>` :
                                            `<option value="${i + 1}">${i + 1}</option>`)
                                        }
                                    </select>
                                    <button type="button" class="delete-button" id="${item.product}">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                            <div class="cart-price">
                                $${item.price}
                            </div>
                        </li>
                        `).join('\n')
                    }
                </ul>
            </div>
            <div class="cart-action">
                   <h3>
                        Subtotal: (${cartItems.reduce((acc, curr) => acc + curr.qty,0)} items) :
                        $${cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0)}
                   </h3>
                   <button id="checkout-button" class="primary fw">
                        Comprar
                   </button> 
            </div>
        </div>
        `;
    },
}

export default CartScreen;