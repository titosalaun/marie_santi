

let p5;
let delegate;
let mic;
let micLevel;


var f;
var path;
var polys;
var drawing = false;
var params;
var seed;

let textColor;
let bgColor;

export function main(_p5) {
  p5 = _p5

   p5.preload = _ => {
    font = p5.loadFont("UniversalSansDisplayTrial491-Regular.otf");
	  fontSize = 100;
	  string=""
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
	  
	  
	stringArray = font.textToPoints(string,0, 100, fontSize, textToPointsOptions)
	  ///console.log("stringArray : " + stringArray)
  }

  p5.draw = _ => {
  	  //microUpdate()
	  p5.background(bgColor);
	  p5.stroke(textColor)
	  

	  if (micLevel == 'undefined') micLevel = 0;
	  if (micLevel == '') micLevel = 0;
	  //console.log("micLevel : " + micLevel)
	  stringArray.forEach(
	    (element, indexPosition) =>{
	
	     p5.line(element.x, element.y, element.x+micLevel*250, element.y)
		 p5.line(element.x, element.y, element.x-micLevel*250, element.y)
		 p5.line(element.x, element.y, element.x, element.y+micLevel*250)
		 p5.line(element.x, element.y, element.x, element.y-micLevel*250)
	
	
	
	    }
	  )
  }
}

function getPoints(){
    drawing = false;
    // create new font : we use rune
    console.log(params.font);
    f = new Rune.Font(params.font) 
    // load the font
    f.load(function(err){     
        path = f.toPath(params.message, 0, 0, params.size) // this is a rune function
        polys = path.toPolygons({ spacing:params.spacing }) // this is anoteher handy function to get polygons coordinates
        // now we can draw
        drawing = true;
    })
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

