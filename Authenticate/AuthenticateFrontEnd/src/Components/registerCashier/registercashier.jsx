import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register=()=>{
    const [password,setPassword] = useState("")
    const  [full_name, setFullname] = useState("");
    const [message, setMessage] = useState("");
    const API_URL = "http://localhost:2222";
    const navigate = useNavigate();

    const handleRegister= async() =>{
        const user ={
            full_name: full_name,
            password: password,
        }
        try{
            const response = await axios.post(`${API_URL}/register`, user);
            setMessage("Successfully registrated ", response.data);
            if(confirm("Login to see what cashier does")){
                navigate("/login-cashier");
            }
        }
        catch(error){
            console.error("ERROR", error);
            setMessage("Registration failed: ", error.message);
        }
    }

    return(
        <div>
            <h2>Cashier Registry</h2>
            <input 
                type="text" 
                placeholder='Enter password' 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
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