import { useState } from 'react';
import '../styles/login.css';
import LoginForm from '../features/auth/loginForm';
import RegisterForm from '../features/auth/registerForm';

function Login_Page(){
    const [authForm, setAuthForm] = useState(0);
    return(
        <div className='loginScreen'>
            <div className="loginBackground">
                <div className='loginContainer'>
                    {authForm == 0 && <LoginForm setAuthForm={setAuthForm} />}
                    {authForm == 1 && <RegisterForm setAuthForm={setAuthForm} />}
                </div>
            </div>
        </div>
    )
}


export default Login_Page;