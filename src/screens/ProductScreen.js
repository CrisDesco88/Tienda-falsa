import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";
import  Rating from "../components/Rating";

const ProductScreen = {

    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById('add-button').addEventListener('click', () => {
          document.location.hash = `/cart/${request.id}`;
        })
    },
    
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        if (product.error) {
            return `<h1>${product.error}</h1>`;
        }

        return `
        <div class="content">
            <div class="back-home">
                <a href="/#/">Volver al inicio</a>
            </div>
            <div class="details">
                <div class="details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="details-info">
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({ 
                                value: product.rating, 
                                text: `${product.numReviews} reviews` 
                            })}
                        </li>
                        <li>
                            Precio: <strong>$${product.price}</strong>
                        </li>
                        <li>
                            Descripción:
                            <div>
                                ${product.brand}
                            </div> 
                        </li>
                    </ul>
                </div>
                <div class="details-actions">
                    <ul>
                        <li>
                            Precio: $${product.price}
                        </li>
                        <li>
                            Stock: 
                            ${product.countInStock > 0 ? 
                                `<span class="in-stock">Hay Stock</span>` : 
                                `<span class="out-of-stock">Sin Stock</span>`
                            }
                        </li>
                        <li>
                            <button id="add-button" class="fw primary">Agregar al carrito</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        `;
    },
};

export default ProductScreen;