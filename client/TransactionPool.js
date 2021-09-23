import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'

const POLL_INERVAL_MS = 10000;

const TransactionPool = () => {
    const [transactionPoolMap, setTransactionPoolMap] = useState({})
    const history = useRouter()

    const fetchTransactionPoolMap = () => {
        axios.get('/api/transaction-pool-map')
            .then(res => {
                setTransactionPoolMap(res.data)
            })
    }

    const fetchMineTransactions = () => {
        axios.get('/api/mine-transactions')
            .then(res => {
                if (res.status === 200) {
                    alert('success');
                    history.push('/blocks');
                } else {
                    alert('The mine-transactions block request did not complete.');
                }
            })
    }

    useEffect(()=>{
        fetchTransactionPoolMap();
        
        let fetchPoolMapInterval = setInterval(
            () => fetchTransactionPoolMap(),
            POLL_INERVAL_MS
          );

          return ()=>{
              clearInterval(fetchPoolMapInterval)
          }
    },[])


    return <div className='TransactionPool'>
    <div><Link href='/'>Home</Link></div>
    <h3>Transaction Pool</h3>
    {
      Object.values(transactionPoolMap).map(transaction => {
        return (
          <div key={transaction.id}>
            <hr />
            <Transaction transaction={transaction} />
          </div>
        )
      })
    }
    <hr />
    <Button
      bsStyle="danger"
      onClick={fetchMineTransactions}
    >
      Mine the Transactions
    </Button>
  </div>
}

export default TransactionPool