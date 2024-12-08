import React from 'react';
import Cashier from '../identifyCashier/identifyCashier';
import {Link} from 'react-router-dom'

const job =()=>{
    return(
        <div>
            <Cashier />
            <div>
                <div style={{display:'flex', flexDirection:'column',gap:'20px'}}>
                    <Link to='/client'><button>Clients</button></Link>
                    {/* <Link to='currency'><button>Currency</button></Link> */}
                    <Link to='/transaction'><button>Transaction</button></Link>
                </div>
            </div>
        </div>
    )
}

export default job;