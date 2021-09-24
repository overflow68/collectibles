import React, { useState, useEffect } from "react";
import "../style/dashboard.css";
import { useAuth } from "../AuthProvider";
import { initFire } from "../Firebase.js";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  setDoc,
} from "firebase/firestore";
import { RiCopperCoinLine } from "react-icons/ri";
import { CgCardSpades } from "react-icons/cg";

import createCard from "../scripts/cardGenerator";
import Card from "../components/card";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

function Dashboard() {
  const [userData, setUserData] = useState({ collection: [] });
  const [currentPage, setPage] = useState({ first: 0, last: 10 });
  const { logOut, currentUser } = useAuth();
  const db = getFirestore(initFire);
  const docRef = doc(db, "users", currentUser.uid);

  useEffect(() => {
    let timeout = setTimeout(getDocument, 500)
    return function cleanup() {
      clearTimeout(timeout);
    }
  },[]);

  const forwardPage = () => {
    let copyPage = { ...currentPage };
    if (copyPage.last < 91) {
      copyPage.first += 10;
      copyPage.last += 10;
      setPage(copyPage);
    }
  };
  const backPage = () => {
    let copyPage = { ...currentPage };
    if (copyPage.first > 9) {
      copyPage.first -= 10;
      copyPage.last -= 10;
      setPage(copyPage);
    }
  };

  async function saveChanges() {
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, currentUser.uid), {
      gold: userData.gold,
      collection: JSON.stringify(userData.collection),
    });
  }

  async function getDocument() {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().collection.length !== 0) {
        setUserData((prevState) => {
          return {
            ...prevState,
            collection: JSON.parse(docSnap.data().collection),
          };
        });
      }

      setUserData((prevState) => {
        return { ...prevState, gold: docSnap.data().gold };
      });
    } 
  }

  const logState = () => {
    let copyData = { ...userData };
    let card = createCard();
    copyData.gold = copyData.gold - 5;
    copyData.collection.push(card);
    setUserData(copyData);
    saveChanges();
  };


  return (
    <div className="dashboard">
      <div className="menu">
        <div className="stat">
          <RiCopperCoinLine className="stats-icon" size="30" />
          {userData.gold ? userData.gold : "-"}
        </div>
        <div className="stat">
          <CgCardSpades className="stats-icon" size="30" />
          {userData.collection ? userData.collection.length + "/100" : "-"}
        </div>
        <button className="menuBtn" onClick={logOut}>
          Open Packs
        </button>
        <button className="menuBtn" onClick={logOut}>
          Sign out
        </button>
        <button className="menuBtn" onClick={logState}>
          New Card
        </button>
      
      </div>

      <div className="cont-cont">
        <FaArrowLeft
          onClick={backPage}
          className="right"
          size="50"
        ></FaArrowLeft>

        <div className="collection-container">
          {userData.collection
            ? userData.collection
                .slice(currentPage.first, currentPage.last)
                .map((item) => {
                  return (
                    <Card
                      classs={item.rarity}
                      img={item.image}
                      dmg={item.damage}
                      hp={item.hitpoints}
                      lck={item.luck}
                    />
                  );
                })
            : null}
        </div>

        <FaArrowRight
          onClick={forwardPage}
          className="right"
          size="50"
        ></FaArrowRight>
      </div>
    </div>
  );
}

export default Dashboard;