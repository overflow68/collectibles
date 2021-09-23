import React from 'react';
import '../style/card.css'
import {GiBroadsword} from 'react-icons/gi'
import {AiFillHeart} from 'react-icons/ai'
import {GiMineExplosion} from 'react-icons/gi'
import images from '../scripts/storageImg'




export default function Card(props){



    return(
        <div className={props.classs}>
            <div className="card-img-cont">
                <img className="card-img" alt ="" src={images[props.img]}></img>
            </div>
            <div className="card-stats">
               
                <div className="stats" ><div><GiBroadsword color="yellow" size ="25"></GiBroadsword></div>{props.dmg}</div>
                <div className="stats" ><div><AiFillHeart color="#ff3333" size ="25"></AiFillHeart></div>{props.hp}</div>
                <div className="stats"><div><GiMineExplosion color="blue" size ="25"></GiMineExplosion></div>{props.lck}%</div>
                
                
                
            </div>
            
        </div>
    )
}