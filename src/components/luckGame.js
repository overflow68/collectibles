import React, {useState} from "react"
import Square from "./square"
import { RiCopperCoinLine } from "react-icons/ri";
import { useCollection } from "../CollectionProvider";
import uniqid from 'uniqid';


export default function Game(){
    const [multiplier,setMulti]=useState(2)
    const [squares, setSquares]=useState([<Square key={uniqid()} multiplier="1"/>,<Square key={uniqid()} multiplier="2" />])
    const [inputData,setData]=useState(0);
    const {userData, saveChanges, setUserData} =useCollection();
    const [won,setWon]=useState(true);
    const[sessionResult,setResult] = useState(0)
    const moreMult = ()=>{
        if (multiplier<9){
        let copySquares= [...squares];
        copySquares.push(<Square/>)
        setSquares(copySquares)
        setMulti(multiplier+1);
    }
    }
    const lessMult = ()=>{
        if (multiplier >2){
        let copySquares= [...squares];
        copySquares.shift()
        setSquares(copySquares)
        setMulti(multiplier-1);
    }
    }

    const setNum =(e)=>{
        setData(e.target.value)
    }

    const placeBet = ()=>{
        if (userData.gold > 0 && userData.gold >= inputData && inputData > 0){
            let cpuNum = Math.floor(Math.random() * (multiplier*100));
            let playerNum = Math.floor(Math.random() * (multiplier*100));

            if (cpuNum < ((multiplier *100)/multiplier) && playerNum < ((multiplier *100)/multiplier)){
                let copyData = {...userData};
                copyData.gold += inputData * multiplier;
                setUserData(copyData)
                setWon(true)
                setResult("+" + (inputData*multiplier-inputData))
                saveChanges()
                
            }else{
                let copyData = {...userData};
                copyData.gold -= inputData;
                setUserData(copyData)
                setWon(false)
                setResult("-" + inputData)
                saveChanges()
                
            }
            console.log(cpuNum)
            console.log(playerNum)
        }
    }
    return(
        <div className="game-cont">
            <div className="result-cont">
            <div className="sess-results">Session results:</div>
            <div className="result-wrap"><div className={won ? "positive" : "negative"}>{Math.round(sessionResult)}<RiCopperCoinLine className="coinn"></RiCopperCoinLine></div></div>
            </div>
           <div className="square-cont">
           <div>1. Pick the level of risk you want to take</div>
               <div className="squares">
               {squares.map((item,index)=>{
                   return <Square   key={uniqid()} multiplier ={index+1}/>
               })}
               </div>
               </div> 

           <div className="button-cont">
               <button className="game-button" onClick={lessMult}>-1</button>
                   <button className="game-button" onClick={moreMult}>+1</button>
                   
               </div>
               <div className="bet-btn-cont">
               <div>2. Enter the amount you want to bet</div>
                   <input value={inputData} onChange={setNum}></input>
                   <button onClick={placeBet}  className="bet-btn">Place bet</button>
               </div>
               
        </div>
    )
    }