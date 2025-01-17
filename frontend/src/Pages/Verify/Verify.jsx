import React, { useContext, useEffect} from 'react'
import './verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
          navigate('/myorder');
        }
        else{
        navigate('/');
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className='spinner'>

        </div>
    </div>
  )
}


export default Verify