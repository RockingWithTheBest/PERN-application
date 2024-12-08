import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import './identifycashier.css';



const Identity = ()=>{
    const [records, setRecords] = useState([]);
    const [selectedpassword, setSelectedPassword] = useState([]);
    const [data, setData] = useState([]);
    const API_URL = "http://localhost:2223/identity";
    const {token} = useParams();


    const loadClient =async()=>{
        if(token)
            {
            try{
                const response = await axios.get(API_URL,{
                    headers: { Authorization: `Bearer ${token}`}
                });
                setSelectedPassword(response.data);
                setRecords(response.data)
                console.log(response.data);
        
            }
            catch(error){
                console.error("ERROR", error.message);
            }
        }
    
    }
    const handleRefreshToken = async()=>{
        console.log("Pass",selectedpassword[0].password)
       
        const url = "http://localhost:2222/login";
        try{
            const response = await axios.post(url,{
                password: selectedpassword[0].password
            });
            console.log("HEY");
            const refreshToken = {
                refreshToken: response.data.refreshToken
            }
            alert(`Ваш токен был успешно обновлен ${refreshToken.refreshToken}` )
            console.log("REEEE", refreshToken);
                try{
                    const tokenUrl = "http://localhost:2223/tokengenerate";
                    const access = await axios.post(tokenUrl, refreshToken);
                     try{
                        const response = await axios.get(API_URL,{
                            headers: { Authorization: `Bearer ${access.data.accessToken}`}
                        });
                        setRecords(response.data)
                       
                        console.log("refreshedThough ", response.data);    
                        setData(response.data)            
                    }
                    catch(error){
                        console.error("ERROR", error.message);
                    }
                }
                catch(error){
                    console.error("ERROR", error.message);
                }
        }
        catch(error){
            console.error("ERROR", error);
        }
    }

    useEffect(()=>{
        loadClient();
        handleRefreshToken();
    },[token])
 
    return (
        <div  className='panelmenu'>
            <div>
                <button onClick={loadClient}>RunPage</button>
                <h1>Identity</h1>
                {records.map(record=>{
                    //setPassword(record.password);
                    return(
                        <div key={record.id}>
                            ID : {record.id}<br/>
                            Full Name: {record.full_name} <br/>
                            Password: {record.password} <br/>   
                            <button onClick={()=>setSelectedPassword(record.password)}>Select Password</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={handleRefreshToken}>Refresh Token</button>
            </div>
            {/* {data && data.map(record=>{
                return(
                    <div key={record.id}>
                        ID : {record.id}<br/>
                        Full Name: {record.full_name} <br/>
                        Passport Number: {record.passport_number} <br/>
                    </div>
                )
            })      
            }  */}
        </div>
    )
}

export default Identity;