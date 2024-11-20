import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import './transaction.css'

const columns = () => [
    {
        name: 'SoldCurrency',
        width: '150px',
        selector:row=>row.sold_currency_code,
        sortable: true
    },
    {
        name: 'BoughtCurrency',
        width: '150px',
        selector:row=>row.bought_currency_code,
        sortable: true
    },
    {
        name: 'CashierId',
        width: '130px',
        selector:row=>row.cashier_id,
        sortable: true
    },
    {
        name: 'ClientsId',
        width: '130px',
        selector:row=>row.client_id,
        sortable: true
    },
    {
        name: 'TransDate',
        width: '140px',
        selector:row=>row.transaction_date,
        sortable: true
    },
    {
        name: 'TransTime',
        width: '140',
        selector:row=>row.transaction_time,
        sortable: true
    },
    {
        name: 'SoldAmount',
        width: '140px',
        selector:row=>row.sold_amount,
        sortable: true
    },
    {
        name: 'BoughtAmount',
        width: '150px',
        selector:row=>row.bought_amount,
        sortable: true
    },
    // {
    //     name: 'Delete',
    //     width: '200px',
    //     cell: row => (
    //         <>
    //             <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>DeleteById(row.id)}>
    //                 Delete
    //             </Button>
    //         </>    
    //     )
    // },
    // {
    //     name: 'Update',
    //     width: '200px',
    //     cell: row => (
    //         <>
    //             <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>UpdateById(row)}>
    //                 Update
    //             </Button>
    //         </>    
    //     )
    // },
    // {
    //     name: 'Get Info',
    //     width: '200px',
    //     cell: row => (
    //         <>
    //             <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>GetById(row)}>
    //                 Get id
    //             </Button>
    //         </>    
    //     )
    // }
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

const Transaction =()=>{
    const [id,setId]= useState("");
    const [soldcurrencycode, setSoldCurrencyCode]= useState("")
    const [boughtcurrencycode, setBoughtCurrencyCode]= useState("");
    const [cashiedId, setCashiedId]= useState("");
    const  [clientId, setClientId]= useState("");
    const  [transactiondate, setTransactionDate]= useState("");
    const [transactiontime, setTransactionTime]= useState("");
    const  [soldamount , setSoldAmount]= useState("");
    const  [boughtamount, setBoughtAmount]= useState("");
    const  [records, setRecords]= useState([]);

    const [filtersoldcurrencycode, setFilterSoldCurrencyCode]= useState("")
    const [filterboughtcurrencycode, setFilterBoughtCurrencyCode]= useState("");
    const [filtercashiedId, setFilterCashiedId]= useState("");
    const [filterclientId, setFilterClientId]= useState("");
    const [filtertransactiondate, setFilterTransactionDate]= useState("");
    const [filtertransactiontime, setFilterTransactionTime]= useState("");
    const [filtersoldamount , setFitlerSoldAmount]= useState("");
    const [filterboughtamount, setFilterBoughtAmount]= useState("");

    const url  = `http://localhost:9000/transaction`;


    const Transactions =async ()=>{
       
        const response = await axios.get(url,{

            params:{
                sold_currency_code: filtersoldcurrencycode,
                bought_currency_code: filterboughtcurrencycode,
                cashier_id: filtercashiedId,
                client_id: filterclientId,
                transaction_date: filtertransactiondate,
                transaction_time: filtertransactiontime,
                sold_amount: filtersoldamount,
                bought_amount: filterboughtamount
            }
        });
        setRecords(response.data);
    };
    
    const postData = async(e)=>{
        e.preventDefault();
        const data = {
            sold_currency_code: soldcurrencycode,
            bought_currency_code:boughtcurrencycode ,
            cashier_id: cashiedId,
            client_id: clientId,
            transaction_date: transactiondate,
            transaction_time: transactiontime,
            sold_amount: soldamount,
            bought_amount:boughtamount
        };
        console.log("data", data);
        try{
            const response = await axios.post(url,data);
            console.log("response", response.data);
        }
        catch(error){
            console.error("ERROR", error);
        }
        setSoldCurrencyCode("");
        setBoughtCurrencyCode("");
        setCashiedId("");
        setClientId("");
        setTransactionDate("");
        setTransactionTime("");
        setSoldAmount("");
        setBoughtAmount("");
        Transactions();
    }

   

    useEffect(()=>{
        Transactions();
    },[filtersoldcurrencycode, filterboughtcurrencycode, filtercashiedId, filterclientId,filtertransactiondate, filtertransactiontime, filtersoldamount, filterboughtamount]
    );
  
    return(
        <div>
            <div className='filterTrans'>
                <form action="" onSubmit={postData} className='form-submit-trans'>
                    <div>
                        <label htmlFor="">Bought Currency Code : </label>
                        <input type="text" id="bought_currency_code" value={boughtcurrencycode} onChange={(e)=>setBoughtCurrencyCode(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Sold Currency Code : </label>
                        <input type="text" id="sold_currency_code" value={soldcurrencycode} onChange={(e)=>setSoldCurrencyCode(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Cashier Id : </label>
                        <input type="number" id="cashier_id" value={cashiedId} onChange={(e)=>setCashiedId(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Client Id : </label>
                        <input type="number" id="client_id" value={clientId} onChange={(e)=>setClientId(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Transaction Date : </label>
                        <input type="date" id="transaction_date" value={transactiondate} onChange={(e)=>setTransactionDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Transaction Time : </label>
                        <input type="time" id="transaction_time" value={transactiontime} onChange={(e)=>setTransactionTime(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Sold Amount : </label>
                        <input type="number" id="sold_amount" value={soldamount} onChange={(e)=>setSoldAmount(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Bought Amount : </label>
                        <input type="number" id="bought_amount" value={boughtamount} onChange={(e)=>setBoughtAmount(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" className="btn-submit">Add</button>
                    </div>
                </form>

                <div className='backpage'>
                    <div>
                        <label htmlFor="">Filter by Bought Currency Code : </label>
                        <input className="fullname" type="text" value={filtersoldcurrencycode} onChange={(e) => setFilterSoldCurrencyCode(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Filter by Sold Currency Code : </label>
                        <input className="fullname" type="text" value={filterboughtcurrencycode} onChange={(e) => setFilterBoughtCurrencyCode(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Filter by Cashier Id : </label>
                        <input className="fullname" type="number" value={filtercashiedId} onChange={(e) => setFilterCashiedId(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Filter by Client Id : </label>
                        <input className="fullname" type="number" value={filterclientId} onChange={(e) => setFilterClientId(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Filter by Transaction Date : </label>
                        <input className="fullname" type="date" value={filtertransactiondate} onChange={(e) => setFilterTransactionDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Filter by Transaction Time : </label>
                        <input className="fullname" type="time" value={filtertransactiontime} onChange={(e) => setFilterTransactionTime(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Filter by Sold Amount : </label>
                        <input className="fullname" type="number" value={filtersoldamount} onChange={(e) => setFitlerSoldAmount(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Filtet by Bought Amount : </label>
                        <input className="fullname" type="number" value={filterboughtamount} onChange={(e) => setFilterBoughtAmount(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='data-table-container'>
                <DataTable columns={columns()} 
                data = {records} 
                customStyles = {customStyles} 
                pagination  
                />
            </div>
            
        </div>
        
    );
}
export default Transaction;