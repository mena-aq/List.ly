import React from 'react'
import './Profile.css'
import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Icons from '../utils/icons'

export default function Profile(){

    const [showPassword,setShowPassword] = useState(false);
    const [profile, setProfile] = useState(null);

    //load info
    useEffect(()=>{
        const fetchProfile = async()=>{
            try{
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5050/api/auth/profile',{
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await res.json();
                setProfile(data);  
                console.log(profile.username);       
            }catch(err){
                console.error(err);
            }
        }
        fetchProfile();
    },[]);

    if (!profile) return <div  className='container profile'>Loading...</div>;
    return(
        <div className='container profile'>
            <Navbar/>
            <div className='profile-container'>
                <h1>Welcome back to List.ly!</h1>
                <div className='card profile-card'>
                    <h2>{profile.username}</h2>
                    <span className='profile-icon'><Icons.Account/></span>
                    <span>{profile.email}</span>
                </div>
            </div>
        </div>
    )

}