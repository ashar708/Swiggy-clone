import React, { useContext, useEffect, useState } from 'react'
import './myorders.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const [data,setData] = useState([]);
    const {url,token} = useContext(StoreContext);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userOrders", {}, {headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    } 

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

  return (
    <div className='myorders'>
        <h2>My Orders</h2>
        <div className='container'>
            {
                data.map((order,idx)=>{
                    return (
                        <div className='myorders-order' key={idx}>
                            <img src={assets.parcel_icon} alt=''/>
                            <p>
                                {order.items.map((item,idx)=>{
                                    if(idx===order.items.length-1){
                                        return item.name+ "x" + item.quantity
                                    }
                                    else{
                                        return item.name+ "x" + item.quantity + ","
                                    }
                                })}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MyOrders
