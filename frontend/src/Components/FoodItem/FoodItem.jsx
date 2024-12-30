import React, { useContext } from 'react'
import './fooditem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
        <img className='food-item-image' src={url+"/images/" + image} alt=''/>
        {
            !cartItems[id]
            ?<img src={assets.add_icon_white} alt='white_icon' className='add' onClick={()=>addToCart(id)}/>
            :
            <div className='food-item-counter'>
                <img src={assets.remove_icon_red} alt='remove' onClick={()=>removeFromCart(id)}/>
                <p>{cartItems[id]}</p>
                <img src={assets.add_icon_green} alt='green' onClick={()=>addToCart(id)}/>
            </div>
        }
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
            <p>{name}</p>
            <img src={assets.rating_starts}/>
        </div>
        <p className='food-item-description'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
