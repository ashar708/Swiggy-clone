import React from 'react'
import './orders.css';
import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useEffect } from 'react';
import {assets} from '../../assets/assets';

const Orders = ({url}) => {
  const[data,setData] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if(response.data.success){
      setData(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error");
    }
  }

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status", {orderId,status:event.target.value});
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {
          data.map((order,idx)=>{
            return (
              <div className='order-item' key={idx}>
                <img src={assets.parcel_icon}/>
                <div>
                  <p className='order-item-food'>
                    {order.items.map((item,idx)=>{
                      if(idx===order.items.length-1){
                        return item.name + "x" + item.quantity;
                      }
                      else{
                        return item.name + "x" + item.quantity + ","
                      }
                    })}
                  </p>
                  <p className='order-item-name'>
                    {order.address.first_name + " " + order.address.last_name}
                  </p>
                  <div className='order-item-address'>
                    <p>{order.address.street + ", "}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zip_code}</p>
                  </div>
                  <p className='order-item-phone'>{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>${order.amount}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders