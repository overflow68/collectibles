/* eslint-disable default-case */
import images from './storageImg.js'
import uniqid from 'uniqid';

function Card(id, damage, hitpoints, luck, rarity, image ) {
    this.id = id;
    this.damage = damage;
    this.hitpoints = hitpoints;
    this.rarity = rarity;
    this.luck = luck
    this.image = image
  }
  
  
  let rarities = ["card common", "card rare", "card epic", "card legendary"];
  
  
  
  function checkRarity(str, hp, luck) {
    let sumStats = str + hp + luck;
  
    if (sumStats > 230) {
      return rarities[3];
    } else if (sumStats > 190 && sumStats <= 230) {
      return rarities[2];
    } else if (sumStats > 140 && sumStats <= 190) {
      return rarities[1];
    } else if (sumStats <= 140) {
      return rarities[0];
    }
  }
  
  function createCard() {
    let templateCard = {
      id: uniqid(),
      damage: Math.floor(Math.random() * 100),
      hitpoints: Math.floor(Math.random() * 100),
      luck: Math.floor(Math.random() * 51),
      rarity: "",
      image: (Math.floor(Math.random() * images.length ))
    };
  
   
    /* Add rarity*/
    templateCard.rarity = checkRarity(
      templateCard.damage,
      templateCard.hitpoints,
      templateCard.luck,
    );
  
    let newCard = new Card(
      templateCard.id,
      templateCard.damage,
      templateCard.hitpoints,
      templateCard.luck,
      templateCard.rarity,
      templateCard.image
    );
    console.log(newCard)
    return newCard;
  }
  
 

  

  export default createCard