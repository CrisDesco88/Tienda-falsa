import { signin } from "../api.js";
import { getUserInfo, setUserInfo } from "../localStorage.js";
import { hideLoading, showLoading, showMessage } from "../utils.js";

const SigninScreen = {
    after_render: () => {

        document
        .getElementById('signin-form')
        .addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await signin({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        });
        hideLoading();
        console.log(data);

            if (data.error) {
                showMessage(data.error);
            }else{
                setUserInfo(data);
                document.location.hash = '/';// redirect to home screen
            }
        });
    },
    render: () => {
        if(getUserInfo().name) {
            document.location.hash = '/';
        }
        return `
        <div class="form-container">
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                        <h1>Sign In</h1>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email"/>
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password"/>
                    </li>
                    <li>
                        <button type="submit" class="primary">Sign In</button>
                    </li>
                    <li>
                        <div>
                            Nuevo por aquí?
                            <a href="/#/register">Crear una cuenta</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>`;
    }
};

export default SigninScreen;