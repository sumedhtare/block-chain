import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { useRouter } from 'next/router'
import axios from 'axios'
const ConductTraction =()=>{
    const history = useRouter()
    const [recipient, setRecipient] =useState('')
    const [amount, setAmount]=useState(0)
    const [knownAddresses, setKnownAddresses]=useState([])

    useEffect(()=>{
        axios.get('/api/known-addresses')
        .then(res=> {
            console.log('known-addresses', res)
            setKnownAddresses(res.data)
        })
    },[])

    const updateRecipient = event =>{
        setRecipient(event.target.value)
    }

    const updateAmount = event=>{
        setAmount(Number(event.target.value))
    }

    const conductTransaction =()=>{
        axios.post('/api/transact',{recipient, amount})
        .then(res=>{
          console.log('res',res)
            alert(res.data.message || res.data.type)
            history.push('/transaction-pool');
        })
    }

    return <div className='ConductTransaction'>
    <Link href='/'>Home</Link>
    <h3>Conduct a Transaction</h3>
    <br />
    <h4>Known Addresses</h4>
    {
      knownAddresses.map(knownAddress => {
        return (
          <div key={knownAddress}>
            <div>{knownAddress}</div>
            <br />
          </div>
        );
      })
    }
    <br />
    <FormGroup>
      <FormControl
        input='text'
        placeholder='recipient'
        value={recipient}
        onChange={updateRecipient}
      />
    </FormGroup>
    <FormGroup>
      <FormControl
        input='number'
        placeholder='amount'
        value={amount}
        onChange={updateAmount}
      />
    </FormGroup>
    <div>
      <Button
        bsStyle="danger"
        onClick={conductTransaction}
      >
        Submit
      </Button>
    </div>
  </div>
}

export default ConductTraction