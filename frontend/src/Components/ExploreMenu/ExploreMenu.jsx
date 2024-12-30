import React from 'react'
import './exploremenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='explore-menu' id='exploremenu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu, the delectable objects.</p>
      <div className='explore-menu-list'>
        {
            menu_list.map((item,idx)=>(
              //If we click on the button again it will set the items to all since the previous one is set to the current one only if already clicked.
                <div className='explore-menu-list-item' key={idx} onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt='menu-image'/>
                    <p>{item.menu_name}</p>
                </div>
            ))
        }
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu
