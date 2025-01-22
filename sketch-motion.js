/*Julia Correia || May 2022
Interactive Art Piece Displaying the Dangers of Plastic Pollution*/

let poseNet;
let front, back, mask, imgR, imgL, hole = 250;
let cam;
let handL, handR;
var x=1;

let bubbles = [];


preload = () => {
    //preload all images
    front = loadImage("img/jelly.jpeg");
    back = loadImage("img/plastic.png");
    circle = loadImage("img/circle.png");
}

setup = () => {
    if(windowWidth < 1363) {
        createCanvas(windowWidth, windowWidth*0.624);
        back.resize(windowWidth, windowWidth*0.624);
        x = 850/windowWidth;
        hole=hole/x;
    } else if(windowWidth >= 1363) {
        createCanvas(1363, 850);
        back.resize(1363, 850);
    }
    
    noCursor();
    
    cam = createCapture(VIDEO);
    cam.hide();
    cam.size(windowWidth, windowHeight);
    poseNet = ml5.poseNet(cam, {
        flipHorizontal: true //flips interaction
    }, modelReady);
    poseNet.on('pose', gotPoses);
    
    //create hole
    imgR = createImage(hole, hole); 
    imgL = createImage(hole, hole); 
    
    //create 19 bubble objects
    for (var i = 0; i < 18; i++) {
        bubbles[i] = {
            h: windowHeight,
            w: random(width),
            size: random(10, 30),
            speed: random(0.5, 3),
            create: function() {
                fill(255, 255, 255, 50);
                noStroke();
                ellipse(this.w, this.h, this.size, this.size);
                },
            float: function() {
                this.h -= this.speed;
                if (this.h < 0) {
                    this.h = windowHeight;
                }
            }
        }
    }
    
    print(bubbles);
    handL = createVector(width / 2, height / 2);
    handR = createVector(width / 2, height / 2);
}

let gotPoses = (poses) => {
    //only detect if there is a person
    if (poses.length > 0) {
        handL.x = lerp(poses[0].pose.keypoints[9].position.x, handL.x, 0.5);
        handL.y = lerp(poses[0].pose.keypoints[9].position.y, handL.y, 0.5);
        handR.x = lerp(poses[0].pose.keypoints[10].position.x, handR.x, 0.5);
        handR.y = lerp(poses[0].pose.keypoints[10].position.y, handR.y, 0.5);
    }
}

let modelReady = () => {
    console.log('model ready');
}


draw = () => {
    background(front);
    
    //copy pixels around cursor location
	imgR.copy(back, handR.x - hole / 2, handR.y - hole / 2, hole, hole, 0, 0, hole, hole);
    imgL.copy(back, handL.x - hole / 2, handL.y - hole / 2, hole, hole, 0, 0, hole, hole);
    
    //mask hole to make it circular
    imgR.mask(circle);
    imgL.mask(circle);
    
    
    //draw copied image around cursor location over the background 
    image(imgR, handR.x - hole / 2, handR.y - hole / 2, [hole], [hole]);
    image(imgL, handL.x - hole / 2, handL.y - hole / 2, [hole], [hole]);
    
    
    //create and animate bubbles
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].create();
        bubbles[i].float();
    } 
}

function windowResized() {
    if(windowWidth < 1363) {
        resizeCanvas(windowWidth, windowWidth*0.624);
        back.resize(windowWidth, windowWidth*0.624);
        x = 850/windowWidth;
        hole=hole/x;
    } else if(windowWidth >= 1363) {
        createCanvas(1363, 850);
        back.resize(1363, 850);
        x = 1;
        hole = 250;
    }
  }
