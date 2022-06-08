let p5;
let delegate;
let mic;
let micLevel;
let ecart;
let deg;

let font;
let fontSize;
let string;
let stringArray;

let grain = [];
let point_x_max;
let point_x_min;
let point_x;
let point_x_direction;
let point_y_max;
let point_y_min;
let point_y;
let point_y_direction;

let textColor;
let bgColor;

let textToPointsOptions = {
  sampleFactor : 0.35,

  simplifyThreshold:0
}

export function main(_p5) {
  p5 = _p5

   p5.preload = _ => {
    font = p5.loadFont("UniversalSansDisplayTrial491-Regular.otf");
	  fontSize = 50;
	  string="je m'appelle tito"
	  
	  fontSize = 150;
  ecart=100;
  point_x_max = 40;
  point_x_min = -15;
  point_x = 0;
  point_x_direction = true;
  
  point_y_max = 40;
  point_y_min = -15;
  point_y = 0;
  point_y_direction = false;
  deg = 0;
	   p5.noLoop();
  }
  
  p5.setup = _ => {
	  console.log("WITH : " + p5.displayWidth)
	  console.log("Height : " + p5.displayHeight)
  	let canvas = p5.createCanvas(1000, 500);
  	canvas.parent("p5Canvas");
	  //microSetup(canvas)
	  p5.textFont(font);
	  p5.textSize(fontSize);
	  p5.stroke(33, 150, 243)
	  
	stringArray = font.textToPoints(string,0, 200, fontSize, textToPointsOptions)
	 console.log("stringArray : " + stringArray)
  }

  p5.draw = _ => {
  	  //microUpdate()
	  p5.background(bgColor);

	  stringArray.forEach(
	    (element, indexPosition) =>{
	      //Effet avec des cercles
	      let nextEl = stringArray[indexPosition]
		  p5.stroke(textColor)
	      p5.strokeWeight(2)
	      
	      if (micLevel == 'undefined') micLevel = 0;
	  if (micLevel == '') micLevel = 0;
	       
	       
	      p5.line(element.x , element.y, element.x + point_x , element.y + point_y )
	      
	
	      if(point_x_direction === true) {
		      
	        point_x += p5.cos(1)/10000 * micLevel *100 + p5.cos(1)/10000;
	        console.log("avant : " + point_x)
	      } else {
	        point_x -= p5.cos(1)/10000 * micLevel *100 + p5.cos(1)/10000 ;
	        console.log("apres : " + point_x)
	      }
	      
	      if (point_x > point_x_max) {
	        point_x_direction = false;
	      } else if(point_x < point_x_min) {
	        point_x_direction = true;
	
	      }
	      
	      if(point_y_direction === true) {
	        point_y += p5.sin(1)/10000 * micLevel *800 + p5.sin(1)/10000;
	      } else {
	        point_y -= p5.sin(1) /10000 * micLevel *800 + p5.sin(1)/10000;
	      }
	      
	      if (point_y > point_y_max) {
	        point_y_direction = false;
	      } else if(point_y < point_y_min) {
	        point_y_direction = true;
	
	      }
	      
	    }
	  )
  }
}

function microSetup(canvas) {
  canvas.mousePressed(p5.userStartAudio())
  mic = new P5.AudioIn();
  mic.start();
}

function microUpdate() {
    micLevel = mic.getLevel()

}

function notifyCurrentTime() {
  if (delegate !== undefined) {
    const message = p5.hour() + ":" + p5.minute() + ":" + p5.second();

    delegate(message);
  }
  
}

function setSound(val) {
    micLevel = val

}

function startP5() {
    p5.loop();

}

function stopP5() {
    p5.noLoop();

}

function setTexte(val) {
	console.log("CHARGE TEXTE")
    string = val

}

function setTextColor(val)
{
	console.log("CHARGE textColor : " + val)
	textColor = val;
}

function setBgColor(val)
{
	console.log("CHARGE bgColor : " + val)
	bgColor = val;
}


export function startLoopP5() {
    startP5();

}

export function setFctTexte(val) {
    setTexte(val);

}

export function setFctSound(val) {
    setSound(val);

}

export function stopLoopP5() {
    stopP5();

}

export function setFctTextColor(val) {
    setTextColor(val);

}

export function setFctBgColor(val) {
    setBgColor(val);

}

export function setDelegate(_delegate) {
  delegate = _delegate;
}

