import { getUserInfo } from "../localStorage";

const Header = {
    render: () => {
        const {name} = getUserInfo();
        return `
        <div class="brand">
            <a href="/#/">Amazinson</a>
        </div>
        <div class="user">
        ${name ? 
            `<a href="/#/profile">${name}</a>` :  
            `<a href="/#/signin"><i class="fa-solid fa-user"></i></i></a>`
        }  
            <a href="/#/cart"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
        `
    },
    after_render: () => {}
}

export default Header;