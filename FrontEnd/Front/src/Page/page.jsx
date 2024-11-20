import React from 'react';
import {Link} from 'react-router-dom'

const page =()=>{
    return (
        <div>
            <h1>Welcome to the FrontEnd of the PERN-based application!</h1>
            <h2>Click on one oif the buttons</h2>
            <div style={{display:'flex', flexDirection:'column',gap:'20px'}}>
                <Link to ='/cashier'><button>Cashiers</button></Link>
                <Link to='/client'><button>Clients</button></Link>
                <Link to='currency'><button>Currency</button></Link>
                <Link to='/transaction'><button>Transaction</button></Link>
            </div>
            
        </div>
    )
}

export default page;