import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

    const [data,setData] = useState({
        first_name: "",
        last_name:"",
        email: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = []
        food_list.map((item)=>{
            if(cartItems[item._id]){
                let  itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {address: data, items:orderItems, amount: getTotalCartAmount()+2}
        let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
        if(response.data.success){
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        else{
            alert("Error");
        }

    }

    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate('/cart');
        }
        else if(getTotalCartAmount()===0){
            navigate('/cart');
        }
    },[token])


  return (
    <form className='place-order' onSubmit={placeOrder}>
        <div className='place-order-left'>
            <p className='title'>Delivery Information</p>
            <div className='multi-fields'>
                <input  required name='first_name' onChange={onChangeHandler} value={data.first_name} type='text' placeholder='First Name'/>
                <input  required name='last_name' onChange={onChangeHandler} value={data.last_name} type='text' placeholder='Last Name'/>
            </div>
            <input  required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email Address'/>
            <input  required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='street'/>
            <div className='multi-fields'>
                <input required  name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City'/>
                <input  required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State'/>
            </div>
            <div className='multi-fields'>
                <input  required name='zip_code' onChange={onChangeHandler} value={data.zip_code} type='text' placeholder='Zip-Code'/>
                <input  required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country'/>
            </div>
            <input  required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone'/>
        </div>
        <div className='place-order-right'>
        <div className='cart-total'>
            <h2>Cart Total</h2>
            <div>
            <div className="cart-total-details">
                    <p>Sub-Total</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr/>
                <div className="cart-total-details">
                    <p>Delivery-Fee</p>
                    <p>${getTotalCartAmount()===0?0:2}</p>
                </div>
                <hr/>
                <div className="cart-total-details">
                    <b>Total</b>
                    <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder