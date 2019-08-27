class FluentRestaurants{

  constructor(jsonData) {
    this.data = jsonData;
 }


fromState(stateStr){
  let cs = []
   for(let i = 0; i < this.data.length; ++i){
     if(this.data[i].state === stateStr){
     cs.push(this.data[i])
   }
  }
  let add = new FluentRestaurants(cs);
  return add;
}

ratingLeq(rating){
   let cs = []
   for(let i = 0; i < this.data.length; ++i){
     if(this.data[i].stars <= rating){
     cs.push(this.data[i])
   }
  }
    let add = new FluentRestaurants(cs);
    return add;
  }

ratingGeq(rating){
   let cs = []
   for(let i = 0; i < this.data.length; ++i){
     if(this.data[i].stars >= rating){
     cs.push(this.data[i])
   }
  }
    let add = new FluentRestaurants(cs);
    return add;
  }

category(categoryStr){
  let boolean = true
  let answer = this.data.filter(function(x){
  let add = lib220.getProperty(x, "categories").value
  for(let i = 0; i < add.length; ++i){
    if(add[i] !== categoryStr){
      boolean = false
      return boolean
    }
    return boolean
  }
  return boolean
});
  return new FluentRestaurants(answer);
}

hasAmbience(ambienceStr){
  let count = 0;
  let ambien = []
  let boolean = true
  let answer = this.data.filter(function(x){
    let first = lib220.getProperty(x,"attributes").value
    if(!lib220.getProperty(first,"ambience").found){
      ++count
      boolean = false
      return boolean
    }
    let second = lib220.getProperty(first,"ambience").value
    if(!lib220.getProperty(second,ambienceStr).found){
      ++count
      boolean = false
      return boolean
    }
    ambien = lib220.getProperty(second,ambienceStr).value
    return ambien
  });
  return new FluentRestaurants(answer);

}

bestPlace(){
  let answer = this.data[0]
  for(let i = 0; i < this.data.length; ++i){
    let current = this.data[i]
    if(current.stars === answer.stars){
      if(current.review_count > answer.review_count){
        answer = current
      }
  }
    if(current.stars > answer.stars){
      answer === current
    }
}
  return answer;
}

}


const testData = [
 {
 name: "Applebee's",
 state: "NC",
 stars: 4,
 review_count: 6,
 },
 {
 name: "China Garden",
 state: "NC",
 stars: 4,
 review_count: 10,
 },
 {
 name: "Beach Ventures Roofing",
 state: "AZ",
 stars: 3,
 review_count: 30,
 },
 {
 name: "Alpaul Automobile Wash",
 state: "NC",
 stars: 3,
 review_count: 30,
 }
]
test('fromState filters correctly', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.fromState('NC').data;
 assert(list.length === 3);
 assert(list[0].name === "Applebee's");
 assert(list[1].name === "China Garden");
 assert(list[2].name === "Alpaul Automobile Wash");
});
test('bestPlace tie-breaking', function() {
 let tObj = new FluentRestaurants(testData);
 let place = tObj.fromState('NC').bestPlace();
 assert(place.name === 'China Garden');
});