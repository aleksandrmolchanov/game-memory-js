const cardsArray = [
    {
        name: '01',
        image: 'images/01.png'
    },
    {
        name: '02',
        image: 'images/02.png'
    },
    {
        name: '03',
        image: 'images/03.png'
    },
    {
        name: '04',
        image: 'images/04.png'
    },
    {
        name: '05',
        image: 'images/05.png'
    },
    {
        name: '06',
        image: 'images/06.png'
    }
]

let cardsToDisplay = cardsArray.reduce(function (res, el) {
    return res.concat([el, el]);
}, []);
cardsToDisplay = shuffle(cardsToDisplay)
const display = document.querySelector('#grid')
const resultToDisplay = document.querySelector('#result')
const cardsChoosen = []
const cardsChoosenIds = []
const cardsWon = []

function createBoard(){
    for (let i = 0; i < cardsToDisplay.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blanc.png')
        card.setAttribute('data-id', i)
        card.classList.add('pointer')
        card.addEventListener('click', flipCard)
        display.append(card)
    }
}

function flipCard(){
    if(cardsChoosen.length < 2){
        let cardId = this.getAttribute('data-id')

        if(cardsChoosen.length === 1 && cardsChoosenIds[0] === cardId){
            return
        }
        
        cardsChoosen.push(cardsToDisplay[cardId].name)
        cardsChoosenIds.push(cardId)
        this.setAttribute('src', cardsToDisplay[cardId].image)
    
        if(cardsChoosen.length === 2){
            setTimeout(checkMatch, 500)
        }
    }
}

function checkMatch(){
    const cards = document.querySelectorAll('#grid img')

    if(cardsChoosen[0] === cardsChoosen[1]){
        alert('You found a match!')
        cards[cardsChoosenIds[0]].setAttribute('src', 'images/white.png')
        cards[cardsChoosenIds[0]].removeEventListener('click', flipCard)
        cards[cardsChoosenIds[1]].setAttribute('src', 'images/white.png')
        cards[cardsChoosenIds[1]].removeEventListener('click', flipCard)
        cards[cardsChoosenIds[0]].classList.remove('pointer')
        cards[cardsChoosenIds[1]].classList.remove('pointer')
        cardsWon.push(cardsChoosen)
        resultToDisplay.textContent = cardsWon.length
    }
    else{
        cards[cardsChoosenIds[0]].setAttribute('src', 'images/blanc.png')
        cards[cardsChoosenIds[1]].setAttribute('src', 'images/blanc.png')
    }
    
    cardsChoosen.length = cardsChoosenIds.length = 0;

    if(cardsWon.length === cardsArray.length){
        resultToDisplay.textContent = 'You found them all!'
    }
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

createBoard()