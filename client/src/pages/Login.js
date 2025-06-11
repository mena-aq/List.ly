import './Login.css';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Icons from '../utils/icons'

export default function Login({login}){

    const [isLogin, setIsLogin] = useState(true);
    localStorage.clear();

    const navigate = useNavigate();

    async function loginUser(username,password){
        try{
            const res = await fetch('/api/auth/login',{
                method:'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({username,password})
            })

            const data = await res.json();
            if (res.status === 200){
                console.log(data.message);
                //login(data._id,data.name);
                //save token
                localStorage.setItem('token',data.token);
                navigate('/home');
            }
            else{
                alert(data.message);
                console.log(data.message);
            }

        }catch(err){
            console.error("Network or server error:", err.message);
            alert("Something went wrong. Please try again later.");
        }
    }

    async function signupUser(username,password){

        const email = document.querySelector('#email-input').value;

        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(email)) {
            console.log("Valid Email address");
        } else {
            alert("Invalid Email address");
            return;
        }

        try{
            const res = await fetch('/api/auth/register',{
                method:'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({username,password,email})
            });
            const data = await res.json();
            if (res.status === 201) {
                console.log(data.message);
                setIsLogin(true);
            } else {
                console.log(data.message);
                alert(data.message);
            }
        }catch(err){
            console.error("Network or server error:", err.message);
            alert("Something went wrong. Please try again later.");
        }
        
    }   

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const username = document.querySelector('#username-input').value;
        const password = document.querySelector('#password-input').value;
        //login or signup
        if (isLogin){
            loginUser(username,password);
        }
        else{
            signupUser(username,password);
        }
    }

    return(
        <div className='container login-container'>
            <div>
                <h1 className='logo'>List.ly <span><Icons.Pencil /></span></h1>
            </div>
            <div className="tab-toggle">
                <button 
                    className={isLogin ? 'active' : ''} 
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button 
                    className={!isLogin ? 'active' : ''} 
                    onClick={() => setIsLogin(false)}
                >
                    Sign Up
                </button>
                <div className={`tab-slider ${isLogin ? 'left' : 'right'}`}></div>
             </div>
            <div className = 'card auth-container'>
                <form onSubmit={handleSubmit} className='auth-form'>
                    {!isLogin &&
                        <div>
                            <label for='name-input'>Email</label>
                            <input id='email-input' name='email' type='text' className='login-input' required/>
                        </div>
                    }
                    <div>
                        <label for='name-input'>Username</label>
                        <input id='username-input' name='username' type='text' className='login-input' required/>
                    </div>
                    <div>
                        <label for='password-input'>Password</label>
                        <input id='password-input' name='password' type='password' className='login-input' required/>
                    </div>
                    <button className='login-btn' type='submit'>{isLogin? "Login":"Signup"}</button>
                </form>
            </div>
            <div class="animated-background">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
                <div class="circle c3"></div>
            </div>
        </div>
    )
}