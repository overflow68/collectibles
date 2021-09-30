import React, {useState} from 'react';
import '../style/card.css'
import {GiBroadsword} from 'react-icons/gi'
import {AiFillHeart} from 'react-icons/ai'
import {GiMineExplosion} from 'react-icons/gi'
import images from '../scripts/storageImg'
import { useCollection } from '../CollectionProvider';



export default function Card(props){
    const [hover,setHover] =useState(true);
    const {deleteCard} = useCollection()

    const toggle = ()=>{
        setHover(!hover)
    }
   
    return(
       
          
        <div onClick={toggle} className={props.classs}>
            {hover?<div>
            <div className="card-img-cont">
                <img className="card-img" alt ="" src={images[props.img]}></img>
            </div>
            <div className="card-stats">
               
                <div className="stats"><div><GiBroadsword color="orange" size ="22"></GiBroadsword></div>{props.dmg}</div>
                <div className="stats"><div><AiFillHeart color="#ff3333" size ="22"></AiFillHeart></div>{props.hp}</div>
                <div className="stats"><div><GiMineExplosion color="green" size ="22"></GiMineExplosion></div>{props.lck}%</div>
                
                
                
            </div>
            </div>:<div>
            <div id ={props.id} onClick={deleteCard} className="delete-card" >DELETE CARD</div>
            <div className="add-card-deck"></div>
            
            </div>}
            
        </div>
        
        
    )
}