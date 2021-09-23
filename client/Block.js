import React,{useState} from 'react'
import Transaction from './Transaction'
import { Button } from 'react-bootstrap';

const Block =({block})=>{
    const[displayTransaction, setDisplayTransaction] =useState(false);

    const toggleTransaction=()=> setDisplayTransaction(!displayTransaction);
    
    const ViewTrasnsaction =(displayTransaction)=>{
        const stringifiedData = JSON.stringify(data);
        const dataDisplay = stringifiedData.length > 35 ?
        `${stringifiedData.substring(0, 35)}...` :
        stringifiedData;
        if(displayTransaction){
            return <div>
            {
              data.map(transaction => (
                <div key={transaction.id}>
                  <hr />
                  <Transaction transaction={transaction} />
                </div>
              ))
            }
            <br />
            <Button
            bsStyle="danger"
            bsSize="small" onClick={toggleTransaction}>
              Show Less
            </Button>
          </div>
        }
        return <div>
        <div>Data: {dataDisplay}</div>
        <Button
            bsStyle="danger"
            bsSize="small" onClick={toggleTransaction}>
          Show More
        </Button>
      </div>
    }

    const hashDisplay = `${block.hash.substring(0, 15)}...`;

    return <div className='Block'>
    <div>Hash: {hashDisplay}</div>
    <div>Timestamp: {new Date(block.timestamp).toLocaleString()}</div>
    {ViewTrasnsaction}
  </div>
}

export default Block