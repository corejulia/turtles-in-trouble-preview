var front, back, mask, img, hole = 250;

var x=1;

var bubbles = [];


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
    
    //create hole
    img = createImage(hole, hole); 
    
    //create 19 bubble objects
    for (var i = 0; i < 18; i++) {
        bubbles[i] = {
            h: windowHeight,
            w: random(width),
            size: random(10/x, 30/x),
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
}


draw = () => {
    background(front);
    
    //copy pixels around cursor location

    //start of code learned from https://p5js.org/reference/#/p5/copy
	img.copy(back, mouseX - hole / 2, mouseY - hole / 2, hole, hole, 0, 0, hole, hole);
    //end of code learned from https://p5js.org/reference/#/p5/copy
    
    
    //mask hole to make it circular
    img.mask(circle);
    
    
    //draw copied image around cursor location over the background
	image(img, mouseX - hole / 2, mouseY - hole / 2, [hole], [hole]);
    
    
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

