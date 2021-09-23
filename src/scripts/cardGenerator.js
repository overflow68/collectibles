/* eslint-disable default-case */
import images from './storageImg.js'


function Card( damage, hitpoints, luck, rarity, image) {
    this.damage = damage;
    this.hitpoints = hitpoints;
    this.rarity = rarity;
    this.luck = luck
    this.image = image
  }
  
  
  let rarities = ["card common", "card rare", "card epic", "card legendary"];
  
  let extras = [
    " + 10% damage",
    " + 15% damage",
    " + 20% damage",
    " + 25% damage",
    " + 30% damage",
  
    " + 10% hitpoints",
    " + 15% hitpoints",
    " + 20% hitpoints",
    " + 25% hitpoints",
    " + 30% hitpoints",
  
    "+ 10% Damage resistance",
    "+ 20% Damage resistance",
    "+ 30% Damage resistance",
    "+ 40% Damage resistance",
    "+ 50% Damage resistance",
  
  
  ];
  
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
      templateCard.damage,
      templateCard.hitpoints,
      templateCard.luck,
      templateCard.rarity,
      templateCard.image
    );
  
    return newCard;
  }
  
  
  let teste =[{
    damage: "92",
    hitpoints:"97",
    luck: "47",
    extra: "+ 50% Crit. damage",
    rarity:"card common",
    image: 2
  
  },{
    damage: "92",
    hitpoints:"97",
    luck: "47",
    extra: "+ 50% Crit. damage",
    rarity:"card rare",
    image: 32
  
  },
  {
    damage: "92",
    hitpoints:"97",
    luck: "47",
    extra: "+ 50% Crit. damage",
    rarity:"card epic",
    image: 15
  
  }
 ]

  

  export default createCard