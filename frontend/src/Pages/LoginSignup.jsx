import React from "react";
import './css/LoginSignup.css';


const LoginSignup = () =>{
    return (
        <div className="loginSignup">
            <div className="loginsignup-container">

                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="email" placeholder="Email Adress"/>
                    <input type="password" placeholder="Password"/>
                </div>
                <button>SignUp</button>
                <p className = "loginsignup-login"> Already have an account? <span>Log In</span> </p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id=""/>
                    <p>By continuing, l agree to the terms of use & privacy policies</p>
                </div>

            </div>
            
        </div>
    )









}
export default LoginSignup