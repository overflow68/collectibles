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
    const[sessionResult,setResult] = useState(0)
    const moreMult = ()=>{
        if (multiplier<8){
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
        if (userData.gold > 0 && userData.gold > inputData && inputData > 0){
            let cpuNum = Math.floor(Math.random() * multiplier);
            let playerNum = Math.floor(Math.random() * multiplier);

            if (cpuNum === playerNum){
                let copyData = {...userData};
                copyData.gold += inputData * multiplier;
                setUserData(copyData)
                setResult(sessionResult+(inputData*multiplier))
                saveChanges()
                
            }else{
                let copyData = {...userData};
                copyData.gold -= inputData;
                setUserData(copyData)
                setResult(sessionResult-inputData)
                saveChanges()
                
            }

        }
    }
    return(
        <div className="game-cont">
            <div className="result-cont">
            <div className="sess-results">Session results:</div>
            <div className="result-wrap"><div className="positive">{sessionResult}<RiCopperCoinLine className="coinn"></RiCopperCoinLine></div></div>
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
                   <button className="game-button" onClick={moreMult}>+1</button>
                   <button className="game-button" onClick={lessMult}>-1</button>
               </div>
               <div className="bet-btn-cont">
               <div>2. Enter the amount you want to bet</div>
                   <input value={inputData} onChange={setNum}></input>
                   <button onClick={placeBet}  className="bet-btn">Place bet</button>
               </div>
               
        </div>
    )
    }