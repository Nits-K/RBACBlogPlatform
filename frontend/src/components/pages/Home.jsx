import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Blog from './Blog'
const Home = () => {
  const {user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
  useEffect(()=>{
    if(user?.role==='admin')
    {
     navigate("/admin/"); 
    }
  },[]);
  return (
    <div>
        <Navbar/>
        <Blog />
        <Footer />
    </div>
  )
}

export default Home