import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import Block from './Block'
import axios from 'axios'
import { Button } from 'react-bootstrap';

const Blocks =()=>{
    const [blocks, setBlocks] = useState([])
    const [blocksLength, setBlocksLength] = useState(0)

    useEffect(()=>{
        axios.get('/api/blocks/length')
        .then(res=>{
            setBlocksLength(res.data)
        })
        .catch(err=>console.log(err))
        fetchPaginatedBlocks(1)
    },[])

    const fetchPaginatedBlocks = id=>{
        axios.get(`/api/blocks/${id}`)
        .then(res=>{
            setBlocks(res.data)
        })
        .catch(err=>console.log(err))
    }

    return  <div>
    <div><Link href='/'>Home</Link></div>
    <h3>Blocks</h3>
    <div>
      {
        [...Array(Math.ceil(blocksLength/5)).keys()].map(key => {
            const paginatedId = key+1;

          return (
            <span key={key} onClick={()=>fetchPaginatedBlocks(paginatedId)}>
              <Button bsSize="small" bsStyle="danger">
                {paginatedId}
              </Button>{' '}
            </span>
          )
        })
      }
    </div>
    {
      blocks.map(block => {
        return (
          <Block key={block.hash} block={block} />
        );
      })
    }
  </div>
}

export default Blocks