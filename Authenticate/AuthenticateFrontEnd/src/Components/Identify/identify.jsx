import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Transaction from '../transactions/transactions'
import {useParams} from 'react-router-dom';
import './identify.css';



const Identity = ()=>{
    const [records, setRecords] = useState([]);
    const API_URL = "http://localhost:1113/identity";
    const {token} = useParams();


    const loadClient =async()=>{
        if(token)
            {
            try{
                const response = await axios.get(API_URL,{
                    headers: { Authorization: `Bearer ${token}`}
                });
                setRecords(response.data)
                console.log(response.data);
            }
            catch(error){
                console.error("ERROR", error.message);
            }
        }
    
    }

    useEffect(()=>{
        loadClient();
    },[token])
 
    return (
        <div  className='panelmenu'>
            <div>
                <h1>Identity</h1>
                {records.map(record=>{
                    return(
                        <div key={record.id}>
                            ID : {record.id}<br/>
                            Full Name: {record.full_name} <br/>
                            Passport Number: {record.passport_number} <br/>
                        </div>
                    )
                })}
            </div>
            <div>
                <Transaction/>
            </div>
            
        </div>
    )
}

export default Identity;