let canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext("2d");



let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 26;

// colors for circles
let colorArr = [
    "#011627",
    "#FDFFFC",
    "#2EC4B6",
    '#E71D36',
    '#FF9F1C'
]


// tracks mouse movement 
window.addEventListener("mousemove", function(event){
    
    mouse.x = event.x;
    mouse.y = event.y;
})

// refresh when screen is resized
window.addEventListener("resize", function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    init();
})


//    function to create circle objects
function Circle(x, y, xd, yd, radius){

    this.x = x;
    this.y = y;
    this.xd =xd;
    this.yd = yd;
    this.radius = radius;
    this.outerColor = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.innerColor = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.minRadius = radius;

    // code to draw each circle including color and start location
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = this.outerColor;
        c.fillStyle = this.innerColor;
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();
    }

    //   moves circle on x and y ; changes circle direction at edge of screen; calls draw function to draw circle after canvas cleared
    this.update = function(){
        if( this.x >= (innerWidth - this.radius) || this.x <= (0 + this.radius) ){
            this.xd = -this.xd;
        }
        this.x+= this.xd;

        if( this.y >= (innerHeight - this.radius) || this.y <= (0 + this.radius) ){
            this.yd = -this.yd;
        }
        this.y+= this.yd;
        this.draw();

        //interactivity
        if ( mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50 &&
            this.radius < maxRadius ){
            this.radius += 1;
        } else if ( this. radius > this.minRadius ){
            this.radius -= 1;
        }
    }
}

// for loop creates an array with all circles to be drawn 
let circleArr = [];

function init(){
    circleArr = [];
    for( let i = 0; i < 600; i ++){
        let radius = Math.random() * 4 + 1;
        let x = (Math.random() * (innerWidth - radius *2)) + radius;
        let xd = (Math.random() - 0.5) * 2;
        let y = (Math.random() * (innerHeight - radius *2)) + radius;
        let yd = (Math.random() - 0.5) * 2;
    
        circleArr.push(new Circle(x, y, xd, yd, radius))
    }
}

init();

// continuous loop to clear canvas and calls update function on each circle object 
function animate(){
    requestAnimationFrame(animate);
    
    c.clearRect(0, 0, innerWidth, innerHeight);

    for ( let i = 0; i < circleArr.length; i++){
        circleArr[i].update();
    }
}
animate();