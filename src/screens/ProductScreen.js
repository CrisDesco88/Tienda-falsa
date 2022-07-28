import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";
import  Rating from "../components/Rating";

const ProductScreen = {
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
                            <div>
                                ${product.description}
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
                            Status: 
                            ${product.countInStock > 0 ? 
                                `<span class="in-stock">Hay Stock</span>` : 
                                `<span class="out-of-stock">Sin Stock</span>`
                            }
                        </li>
                        <li>
                            <button id="add-button" class="primary">Agregar al carrito</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    },
};

export default ProductScreen;