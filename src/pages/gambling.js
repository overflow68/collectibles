import React from "react"
import Menu from "../components/menu"

import '../style/gambling.css'
import Game from '../components/luckGame.js'

export default function Gamble(){
    return(
        <div className="gamble">
            <Menu/>
            <Game/>
        </div>
    )
    }