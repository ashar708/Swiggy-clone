import React from 'react'
import './footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
            <img src={assets.logo}/>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi alias iusto cum sit assumenda neque tempora, optio cupiditate quod voluptate reiciendis laborum perferendis est, placeat iure! Ullam accusantium deleniti consequatur!</p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>Get In Touch</h2>
            <ul>
                <li>64594-4574854</li>
                <li>aarya@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 @ Tomato.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
