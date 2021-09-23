import React, {useState,useEffect} from "react"
import Card from './card'
import {FaArrowRight} from 'react-icons/fa'
import {FaArrowLeft} from 'react-icons/fa'

export default function Collection(props){
    const [currentPage, setPage] = useState({first: 0, last:10})
    const [cards, setCards]=useState(props.cards.slice(0,10));
    const [loading,setLoading] = useState(true);

    
    return(
        <div className="cont-cont">
            <FaArrowLeft className="right"  size="50"></FaArrowLeft>

        <div className="collection-container">
            {cards.length? cards.map(item=>{
            return <Card classs={item.rarity} img ={item.image} dmg={item.damage} hp={item.hitpoints} lck={item.luck} />
          }):console.log("errou")
            }
        </div>

        <FaArrowRight className="right"  size="50"></FaArrowRight>
       
        </div>
    )
}