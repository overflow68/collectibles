import React from "react"


export default function Square(props){
    return(
        <div id={props.idd} className="square">
          {props.multiplier}
        </div>
    )
    }