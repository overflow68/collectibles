import React, {useState} from "react"
import Card from './card'
import {FaArrowRight} from 'react-icons/fa'
import {FaArrowLeft} from 'react-icons/fa'
import EmptyCard from "./emptyCard";
import uniqid from 'uniqid';
import { useCollection } from "../CollectionProvider";

export default function Collection(){
    const [currentPage, setCurrentPage] = useState({first: 0, last:10});
    const [pageNumber,setPageNumber] = useState(1)
    const templateArray=["","","","","","","","","","",]
    const {userData} = useCollection()
    


    
    const forwardPage = () => {
        let copyPage = { ...currentPage };
        if (copyPage.last < 91) {
          copyPage.first += 10;
          copyPage.last += 10;
          setPageNumber(pageNumber+1)
          setCurrentPage(copyPage);
        }
      };
      const backPage = () => {
        let copyPage = { ...currentPage };
        if (copyPage.first > 9) {
          copyPage.first -= 10;
          copyPage.last -= 10;
          setPageNumber(pageNumber-1)
          setCurrentPage(copyPage);
        }
      };

  


    return(
      <div className="big-cont">
        <div className="user-info">
        <div className="user">{userData.name}</div>
        
        </div>
        <div className="cont-cont">
        <FaArrowLeft
          onClick={backPage}
          className="right"
          size="50"
        ></FaArrowLeft>

        <div className="collection-container">
          {userData.collection ? userData.collection
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
              if (index > userData.collection.slice(currentPage.first,currentPage.last).length-1){
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
      <div className="page-num">{pageNumber}/10</div>
      </div>
    )
}