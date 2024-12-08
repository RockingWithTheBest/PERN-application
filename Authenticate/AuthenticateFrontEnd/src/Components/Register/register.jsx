import React, {useState} from 'react';
import './register.css';
import axios from 'axios';

const Register=()=>{
    const [passport_number,setPassportNumber] = useState("")
    const  [full_name, setFullname] = useState("");
    const [message, setMessage] = useState("");
    const API_URL = "http://localhost:2111";

    const handleRegister= async() =>{
        const user ={
            full_name:full_name,
            passport_number:passport_number,
        }
        try{
            const response = await axios.post(`${API_URL}/register`, user);
            setMessage("Successfully registrated ", response.data);
        }
        catch(error){
            console.error("ERROR", error);
            setMessage("Registration failed: ", error.message);
        }
    }

    return(
        <div>
            <h2>Client Registry</h2>
            <input 
                type="text" 
                placeholder='Enter passport number' 
                value={passport_number} 
                onChange={(e)=> setPassportNumber(e.target.value)}
            />
            <input 
                type="text" 
                placeholder='Enter Full Names' 
                value={full_name} 
                onChange={(e)=> setFullname(e.target.value)}
            />
            <button onClick={handleRegister}>+Register</button>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Register;