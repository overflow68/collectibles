/* eslint-disable default-case */
function Card( damage, hitpoints, luck, extra, rarity) {
    this.damage = damage;
    this.hitpoints = hitpoints;
    this.luck = luck;
    this.extra = extra;
    this.rarity = rarity;
  }
  
  let commonCount = 0;
  let rareCount = 0;
  let epicCount = 0;
  let legendCount = 0;
  
  let collection = [];
  let rarities = ["common", "rare", "epic", "legendary"];
  
  let extras = [
    "+ 5% damage",
    "+ 10% damage",
    "+ 15% damage",
    "+ 20% damage",
    "+ 25% damage",
  
    "+ 5% hitpoints",
    "+ 15% hitpoints",
    "+ 25% hitpoints",
    "+ 35% hitpoints",
    "+ 40% hitpoints",
  
    "+ 10% Crit. damage",
    "+ 20% Crit. damage",
    "+ 30% Crit. damage",
    "+ 40% Crit. damage",
    "+ 50% Crit. damage",
  
  
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
      extra: extras[(Math.floor(Math.random() * extras.length ))],
      rarity: "",
    };
  
   
    /* Add rarity*/
    templateCard.rarity = checkRarity(
      templateCard.damage,
      templateCard.hitpoints,
      templateCard.luck,
      templateCard.extra
    );
  
    let newCard = new Card(
      templateCard.damage,
      templateCard.hitpoints,
      templateCard.luck,
      templateCard.extra,
      templateCard.rarity
    );
  
    collection.push(newCard);
  }
  
  
  
  for (let i = 0; i <= 5000; i++) {
    createCard();
  }
  
  collection.forEach((item) => {
   
    switch (item.rarity) {
      case "common":
        commonCount += 1;
        break;
      case "rare":
        rareCount += 1;
        break;
      case "epic":
        epicCount += 1;
        break;
      case "legendary":
        legendCount += 1;
        break;
    }
  });
  
  console.log("common", commonCount);
  console.log("rare", rareCount);
  console.log("epic", epicCount);
  console.log("legendary", legendCount);
  
  
  console.log(
    collection.filter((card) =>{
      if (card.rarity === "legendary") {
        return true;
      }
    })
  );