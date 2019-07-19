let canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext("2d");

//    function to create circle objects
function Circle(x, y, xd, yd, radius){

    this.x = x;
    this.y = y;
    this.xd =xd;
    this.yd = yd;
    this.radius = radius;

    // code to draw each circle including color and start location
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = "#0ac2ff";
        c.fillStyle = "#d6f5ff";
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
    }
} 

// for loop creates an array with all circles to be drawn 
let circleArr = [];

for( let i = 0; i < 600; i ++){
    let radius = 25
    let x = (Math.random() * (innerWidth - radius *2)) + radius;
    let xd = (Math.random() - 0.5) * 2;
    let y = (Math.random() * (innerHeight - radius *2)) + radius;
    let yd = (Math.random() - 0.5) * 2;

    circleArr.push(new Circle(x, y, xd, yd, radius))
}


// continuous loop to clear canvas and calls update function on each circle object 
function animate(){
    requestAnimationFrame(animate);
    
    c.clearRect(0, 0, innerWidth, innerHeight);

    for ( let i = 0; i < circleArr.length; i++){
        circleArr[i].update();
    }
}
animate();