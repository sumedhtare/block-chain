import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Link from 'next/link'

const App = () => {
  const [walletInfo, setWalletInfo] = useState({})

  useEffect(() => {
    axios.get('/api/wallet-info')
      .then(res => {
          console.log('wallet-info',res)
        setWalletInfo(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return <div className='App'>
    {/* <img className='logo' src={logo}></img> */}
    <br />
    <div>
      Welcome to the blockchain...
    </div>
    <br />
    <div><Link href='/blocks'>Blocks</Link></div>
    <div><Link href='/conduct-transaction'>Conduct a Transaction</Link></div>
    <div><Link href='/transaction-pool'>Transaction Pool</Link></div>
    <br />
    <div className='WalletInfo'>
      <div>Address: {walletInfo.address}</div>
      <div>Balance: {walletInfo.balance}</div>
    </div>
  </div>

}
export default App