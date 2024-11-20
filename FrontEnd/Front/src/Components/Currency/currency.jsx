import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies,addNewCurrency } from '../../reducer/currencyReducer';
import DataTable from "react-data-table-component";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from 'reactjs-popup';
import './currency.css';
import RUB from './money/rub.jpg';
import CNY from './money/cny.jpg';
import USD from './money/usd.jpg';
import EURO from './money/euro.jpg';

const columns = (DeleteById,UpdateById , GetById) => [
    {
        name: 'Id',
        selector:row=>row.id,
        sortable: true
    },
    {
        name: 'Currency Name',
        width: '180px',
        selector:row=>row.currency_name,
        sortable: true
    },
    {
        name: 'Selling Rate',
        width: '180px',
        selector:row=>row.selling_rate,
        sortable: true
    },
    {
        name: 'Buying Rate',
        width: '180px',
        selector:row=>row.buying_rate,
        sortable: true
    },
    {
        name: 'Delete',
        width: '200px',
        cell: row => (
            <>
                <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>DeleteById(row.id)}>
                    Delete
                </Button>
            </>    
        )
    },
    {
        name: 'Update',
        width: '200px',
        cell: row => (
            <>
                <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>UpdateById(row)}>
                    Update
                </Button>
            </>    
        )
    },
    {
        name: 'Get Info',
        width: '200px',
        cell: row => (
            <>
                <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>GetById(row)}>
                    Get id
                </Button>
            </>    
        )
    }
]

const customStyles = {
    headCells:{
      style:{
        backgroundColor: "black",
        color: "white",
        fontSize: "17px",
        fontWeight: "bold"
      }
    }
} 

const Currency = ()=>{
    const [cashier,setCurrencies] = useState([]);
    const [currency_name, setCurrencyName] = useState("");
    const [selling_rate, setSellingRate] = useState("");
    const [buying_rate, setBuyingRate] = useState("");

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null); 
    const [filterCurrencyName, setFilterCurrencyName] = useState("");
    const [filterSellingRate, setFilterSellingRate] = useState("");
    const [filterBuyingRate, setFilterBuyingRate] = useState("");

    const [idsetCurrencyName, setIdSetCurrencyName] = useState("");
    const [idsetSellingRate, setIdSetSellingRate] = useState("");
    const [idsetBuyingRate, setIdSetBuyingRate] = useState("");
    const [openup, setOpenUp] = useState(false);

    const dispatch = useDispatch();
    const {currencies, loading, error} = useSelector( (state) => state.currency)

    // useEffect(()=>{
    //     Currencies();
    // },[filterCurrencyName, filterSellingRate,filterBuyingRate]);

    useEffect(()=>{

        const fetchData = async () =>{
            const params = {};
            if (currency_name) params.currency_name = currency_name;
            if (selling_rate) params.selling_rate = parseFloat(selling_rate);
            if (buying_rate) params.buying_rate = parseFloat(buying_rate);

            await dispatch(fetchCurrencies(params));
        }
        fetchData();
    },[currency_name, selling_rate, buying_rate, dispatch]);

    const Currencies = async ()=>{
        const response = await axios.get("http://localhost:9000/currency",{
            params:{
                currency_name: filterCurrencyName,
                selling_rate: filterSellingRate ? parseFloat(filterSellingRate) : undefined,
                buying_rate: filterBuyingRate ? parseFloat(filterBuyingRate) : undefined
            }
        });
        setCurrencies(response.data);
    };

    const handledAddCurrency=async(e)=>{
        e.preventDefault();
        const data = {currency_name:currency_name, selling_rate: selling_rate, buying_rate: buying_rate}
        await dispatch(addNewCurrency(data));
        setCurrencyName("");
        setSellingRate("");
        setBuyingRate("");
        dispatch(fetchCurrencies({}));
    }
    const GetById=(currency)=>{
        setIdSetCurrencyName(currency.currency_name);
        setIdSetSellingRate(currency.selling_rate);
        setIdSetBuyingRate(currency.buying_rate);
        setOpenUp(true);  
        console.log("Name -",currency.currency_name);
    };

    const postData = async (e)=>{
        e.preventDefault();
        const url = "http://localhost:9000/currency";
        const data = {
            currency_name: currency_name,
            selling_rate: selling_rate,
            buying_rate: buying_rate
        };
        console.log("Adding currency:", data);
        try{
            const response = await axios.post(url,data);
            console.log("response", response.data);
        }
        catch(error){
            console.error("ERROR", error);
        }
        // setCurrencyName("");
        // setSellingRate("");
        // setBuyingRate("");
        Currencies();
    };

    const DeleteById = async (id)=>{
        if(confirm("Are you sure?")){
            const url = `http://localhost:9000/currency/${id}`;
            try{
                await axios.delete(url);
                // Currencies();
                dispatch(fetchCurrencies({}));
            }
            catch(error){
                console.error("ERROR", error);
            }
        }
        
    };

    const UpdateById = async (rowData)=>{
        setEditId(rowData.id);
        // setCurrencyName(rowData.full_name);
        setSellingRate(rowData.buying_rate);
        setBuyingRate(rowData.selling_rate);
        setOpen(true);
    };
    
   const handleUpdate = async ()=>{
    console.log("Full - ",currency_name);

    if(editId){
        const url = `http://localhost:9000/currency/${editId}`;
        const data = {
            currency_name: currency_name,
            selling_rate: selling_rate,
            buying_rate: buying_rate,
        };

        try{
            await axios.put(url,data);
            
            setOpen(false);
            setCurrencyName("");
            setSellingRate("");
            setBuyingRate("");
            setEditId(null);
            // Currencies();
            dispatch(fetchCurrencies({}));
        }
        catch(error){
            console.error("ERROR", error);
        }
    }
};
   const currencyImages={
        USD:USD,
        EUR: EURO,
        RUB: RUB,
        CNY: CNY,
   }
    
    return(
        <div className="client">
            <h1>Currency Rates</h1>
            <div className="filter">
                <form action="" onSubmit={handledAddCurrency} className="form-submit">
                        <div>
                            <label htmlFor="">Full Name : </label>
                            <input className="fullname" type="text" value ={currency_name} onChange={(e)=>setCurrencyName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Selling Rate : </label>
                            <input className="fullname" type="text" value={selling_rate} onChange={(e)=>setSellingRate(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Buying Rate : </label>
                            <input className="fullname" type="text" value={buying_rate} onChange={(e)=>setBuyingRate(e.target.value)} />
                        </div>
                        <div>
                            <button className="btn-submit" type="submit">Add Currency</button>
                        </div>
                </form>
                <div>
                    <label>Filter by Currency Name : </label>
                    <input className="fullname" type="text" value={currency_name} onChange={(e) => setCurrencyName(e.target.value)} />
                </div>
                <div>
                    <label>Filter by Buying Rate : </label>
                    <input className="fullname" type="text" value={buying_rate} onChange={(e) => setBuyingRate(e.target.value)} />
                </div>
                <div>
                    <label>Filter by Selling Rate : </label>
                    <input className="fullname" type="text" value={selling_rate} onChange={(e) => setSellingRate(e.target.value)} />
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
       
             <DataTable columns={columns(DeleteById, UpdateById, GetById)} 
             data = {currencies} 
             customStyles = {customStyles} 
             pagination  />
             <Popup open = {open} onClose ={()=> setOpen(false)} model nested>
                    <div className="update">
                            <h2>Update Info...</h2>
                            {/* <label htmlFor="">Full Name</label><input type="text" onChange={(e)=>setCurrencyName(e.target.value)} /> */}
                            <label htmlFor="">Selling Rate</label><input type="text" onChange={(e)=>setSellingRate(e.target.value)} />
                            <label htmlFor="">Buying Rate</label><input type="text" onChange={(e)=>setBuyingRate(e.target.value)} />
                            <button onClick={handleUpdate}>Click to update</button>
                    </div>
              </Popup>
            
                <Popup className="pop-up" open = {openup} onClose ={()=> setOpenUp(false)} model nested>
                        <div className="display">
                                <img 
                                    src={currencyImages[idsetCurrencyName]} 
                                    alt={idsetCurrencyName}
                                    style={{ width: '200px', height: 'auto' }} 
                                />
                                <h2>Display....</h2>
                                <h2>Name - {idsetCurrencyName}</h2>
                                <h2>Buying Rate - {idsetBuyingRate}</h2>
                                <h2>Selling Rate - {idsetSellingRate}</h2>                                
                        </div>
                </Popup>
        </div>
    );
}

export default Currency;