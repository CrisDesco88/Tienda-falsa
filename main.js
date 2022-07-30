import './style.css'
import Error404Screen from "./src/screens/Error404Screen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import ProductScreen from "./src/screens/ProductScreen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./src/utils.js";
import CartScreen from './src/screens/CartScreen.js';
import SigninScreen from './src/screens/SigninScreen.js';
import Header from './src/components/Header.js';
import RegisterScreen from './src/screens/RegisterScreen.js';
import ProfileScreen from './src/screens/ProfileScreen.js';

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/signin': SigninScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,

};

const router = async () => {
    showLoading();
    const request = parseRequestUrl();

    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();
    const main = document.getElementById("app");
    main.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();
    hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);