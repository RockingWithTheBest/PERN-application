import React, {useState} from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import './logincashier.css';

const Login =()=>{
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("");
    const [openclose, setOpenClose] = useState(false);
    const [token, setToken] = useState("");
    const navigate = useNavigate();

 

    const API_URL = "http://localhost:2222";

    const handleOpenning=  ()=>{
        setOpenClose(true);
    }

    const handleLogin= async(e) =>{
        e.preventDefault();
        try{
            const data ={
                password: password,
            }
            const response = await axios.post(`${API_URL}/login` , data);
            console.log("Login Successful", response.data.refreshToken);
            
            const token = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            setMessage("Login Successful");
            setToken(refreshToken);
            if(token){
                alert("Correct details about to login");
                navigate(`/identify-cashier/${token}`);
                console.log("Navigate to Identify");
                return;
            }

            setOpenClose(false);
        }
        catch(error){
            console.error("ERROR", error);
            setMessage("Login failed: ", error.message);
        }

            
      
    }
    return(
        <div>
            <button onClick={handleOpenning}>Click here</button>
            <Popup open = {openclose} onClose={()=>setOpenClose(false)} model nested>
                <form action="" onSubmit={handleLogin} className='form-login'>
                    <input 
                        type="text" 
                        placeholder="Passwordr" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                    <button type='submit'>Login</button>
                    <button onClick={()=>setOpenClose(false)}>Close</button>
                    
                </form>
            </Popup>
            {/* {message &&<p>{message}</p>}          */}
            {message && (
            <p style={{ color: message.includes("failed") ? "red" : "green" }}>
                {message}
            </p>
        )}

        </div>
    )
}

export default Login;