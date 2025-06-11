import React from "react"
import {Link,useNavigate} from "react-router-dom"
import './Navbar.css'
import Icons from '../utils/icons'

export default function Navbar(){

    const navigate = useNavigate();
    const handleLogout = ()=>{
        console.log("logging out");
        localStorage.removeItem('token'); // clear token
        navigate('/');
    }

    return (
        <nav className='navbar'>
            <Link to='/home' className='nav-link'>
                <h4>List.ly <span><Icons.Pencil /></span></h4>
            </Link>
            <div className='navbar-btn-panel'>
                <Link to='/profile' className='nav-link'>
                    <span><Icons.Account /></span>
                </Link>
                <Link to='/' onClick={()=> handleLogout()} className='nav-link'>
                    <span><Icons.Logout /></span>
                </Link>
            </div>
        </nav>
    )
}