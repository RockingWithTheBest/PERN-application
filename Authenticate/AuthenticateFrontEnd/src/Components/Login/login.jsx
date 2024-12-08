import React, {useState} from 'react';
import axios from 'axios';
import Identify from '../Identify/identify';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';

const Login =()=>{
    const [passport_number, setPassportNumber] = useState("")
    const [message, setMessage] = useState("");
    const [openclose, setOpenClose] = useState(false);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

 

    const API_URL = "http://localhost:2111";

    const handleOpenning=  ()=>{
        setOpenClose(true);
    }

    const handleLogin= async(e) =>{
        e.preventDefault();
        try{
            const data ={
                passport_number: passport_number,
            }
            const response = await axios.post(`${API_URL}/login` , data);
            console.log("Login Successful", response.data.accessToken);
            
            const token = response.data.accessToken;
            setMessage("Login Successful");
            setToken(token);
            if(token){
                alert("Correct details about to login");
                navigate(`/identify/${token}`);
                console.log("Navigate to Identify");
                return;
            }

            setOpenClose(false);
        }
        catch(error){
            console.error("ERROR", error);
            setMessage("Login failed: "+error.message);
        }

            
      
    }
    return(
        <div>
            <button onClick={handleOpenning}>Click here</button>

            <Popup open = {openclose} onClose={()=>setOpenClose(false)} model nested>
                <form action="" onSubmit={handleLogin} className='form-login'>
                    <input 
                        type="text" 
                        placeholder="Passport Number" 
                        value={passport_number}
                        onChange={(e)=>setPassportNumber(e.target.value)}/>
                    <button type='submit'>Login</button>
                    <button onClick={()=>setOpenClose(false)}>Close</button>
                    
                </form>
            </Popup>
            {message &&<p>{message}</p>}
            {/* <div>
                   {token && <Identify token = {token}/>} 
            </div>            */}

            
        </div>
    )
}

export default Login;