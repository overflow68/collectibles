import React, {useState} from "react"
import Card from './card'
import {FaArrowRight} from 'react-icons/fa'
import {FaArrowLeft} from 'react-icons/fa'
import EmptyCard from "./emptyCard";
import uniqid from 'uniqid'

export default function Collection(props){
    const [currentPage, setCurrentPage] = useState({first: 0, last:10});
    const [templateArray,setTemplate]=useState(["","","","","","","","","","",])
    


    
    const forwardPage = () => {
        let copyPage = { ...currentPage };
        if (copyPage.last < 91) {
          copyPage.first += 10;
          copyPage.last += 10;
          setCurrentPage(copyPage);
        }
      };
      const backPage = () => {
        let copyPage = { ...currentPage };
        if (copyPage.first > 9) {
          copyPage.first -= 10;
          copyPage.last -= 10;
          setCurrentPage(copyPage);
        }
      };

  


    return(
        <div className="cont-cont">
        <FaArrowLeft
          onClick={backPage}
          className="right"
          size="50"
        ></FaArrowLeft>

        <div className="collection-container">
          {props.data? props.data
                .slice(currentPage.first, currentPage.last)
                .map((item) => {
                  return (
                    <Card
                     key={item.id}
                      id={item.id}
                      classs={item.rarity}
                      img={item.image}
                      dmg={item.damage}
                      hp={item.hitpoints}
                      lck={item.luck}
                    />
                  );
                }):null
            }
            {templateArray.map((item,index)=>{
              if (index >props.data.slice(currentPage.first,currentPage.last).length-1){
                return  <EmptyCard key ={uniqid()}/>
              }
            })}
        </div>

        <FaArrowRight
          onClick={forwardPage}
          className="right"
          size="50"
        ></FaArrowRight>
      </div>
    )
}