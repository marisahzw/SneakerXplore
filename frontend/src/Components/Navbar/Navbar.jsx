import React, { useState } from "react";
import './Navbar.css';
import logo from '../Assets/BGNoT.png';
import { Link } from "react-router-dom";


const Navbar = () => {

    const[menu,setMenu] = useState("home");

    return(
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
            </div>
            <ul className="nav-menu">
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("sneakers")}}><Link style={{textDecoration:'none'}} to='/sneakers'>Sneakers</Link>{menu==="sneakers"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("calendar")}} ><Link style={{textDecoration:'none'}} to='/calendar'>Calendar</Link>{menu==="calendar"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("resell")}} ><Link style={{textDecoration:'none'}} to='/resell'>Resell</Link>{menu==="resell"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login">
                <Link to='/login'><button>Login</button></Link>

            </div>


        </div>

        
    )
}

export default Navbar