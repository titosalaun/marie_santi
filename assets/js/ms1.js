

let p5;
let delegate;
let mic;
let micLevel;


let font;
let fontSize;
let string;
let stringArray;

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
	  fontSize = 200;
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
	  console.log("fontSize : " + fontSize)
	  p5.textSize(fontSize);
	  
	  
	stringArray = font.textToPoints(string,0, fontSize, fontSize, textToPointsOptions)
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

function setFontSize(val)
{
	console.log("SIZE : " + val)
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

export function setFctFontSize(val) {
    setFontSize(val);

}

export function setDelegate(_delegate) {
  delegate = _delegate;
}

