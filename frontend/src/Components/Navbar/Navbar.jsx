import React, { useContext, useState } from 'react'
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }


    const [menu,setMenu] = useState("Home");

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt='logo'/></Link>
      
      <ul className="navbar-menu">
        <Link to='/'><li className={menu==="Home"?"active":""} onClick={()=>setMenu(
            "Home"
        )}>Home</li></Link>
        
        <li className={menu==="Menu"?"active":""} onClick={()=>setMenu(
            "Menu"
        )}>Menu</li>
        <li className={menu==="Mobile App"?"active":""} onClick={()=>setMenu(
            "Mobile App"
        )}>Mobile App</li>
        <li className={menu==="Contact Us"?"active":""} onClick={()=>setMenu(
            "Contact Us"
        )}>Contact Us</li>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon}/>
        <div className='navbar-search-icon'>
            <Link to='/cart'><img src={assets.basket_icon}/></Link>
            
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {
          !token?<button onClick={()=>

            setShowLogin(true)
        }>Sign In</button>: <div className='navbar-profile'>
          <img src={assets.profile_icon}/>
          <ul className='nav-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon}/><p>Orders</p></li>
            <hr/>
            <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
          </ul>
        </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar
