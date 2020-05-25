//select elements on the page. canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

//setup canvas for drawing

const { width, height} = canvas; //get the width and height of the canvas
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
    // these make the line a smooth drawing
ctx.lineWidth = 50; //set the width of the cursor

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

function getRanNumX() {
    return Math.floor(Math.random()*width);
}
function getRanNumY() {
    return Math.floor(Math.random()*height);
}

let x = getRanNumX(); 
let y = getRanNumY();

ctx.beginPath(); //starts the drawing
ctx.moveTo(x, y); //starting point from top and left
ctx.lineTo(x, y);
ctx.stroke();

//write a draw function
function draw({key}) { //destructured the key object and property to a single variable
    hue = hue + 3;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    if(key.includes("ArrowDown") && y < 1000) {
        y = y + MOVE_AMOUNT;
    } else if (key.includes("ArrowUp") && y > 0) {
        y = y - MOVE_AMOUNT;
    }
    else if (key.includes("ArrowRight") && x < 1600) {
        x = x + MOVE_AMOUNT;
    }
    else if (key.includes("ArrowLeft") && x > 0) {
        x = x - MOVE_AMOUNT;
    }

    ctx.beginPath();
    ctx.moveTo(x,y)
    ctx.lineTo(x, y)
    ctx.stroke();
    
    
}
//handler for keys
function handleKey(e) {
    if(e.key.includes('Arrow')) {
        //console.log(e.key)
        e.preventDefault();
        draw({key: e.key})
    }
}
//clear/ shake function

function clearCanvas(e) {
    //console.log(e.target.parentElement.previousElementSibling)
    //const canvas = e.target.parentElement.previousElementSibling
    canvas.classList.add('shake');
    ctx.clearRect(0,0, width, height);
    canvas.addEventListener('animationend', () => {
        canvas.classList.remove('shake');
        console.log('done the shake')
    }, {once: true}); //automatically removes the event listener once the event is fired
    // setTimeout(() => {
    //     canvas.classList.remove('shake');
    // }, 500);
    
}

shakeButton.addEventListener('click', clearCanvas);
//listen for arrow keys 
window.addEventListener('keydown', handleKey);