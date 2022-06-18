let p5;
let delegate;
let mic;
let micLevel;
let font;
let fontSize;
let string;
let stringArray;
let ecart;

let textColor;
let bgColor;

let textToPointsOptions = {

  sampleFactor : 1.5,
  simplifyThreshold:0
}

export function main(_p5) {
  p5 = _p5

   p5.preload = _ => {
    font = p5.loadFont("UniversalSansDisplayTrial491-Regular.otf");
	  fontSize = 50;
	  string="je m'appelle tito"
	  
	  fontSize = 250;
	  ecart=250

	   p5.noLoop();
  }
  
  p5.setup = _ => {
	  console.log("WITH : " + p5.displayWidth)
	  console.log("Height : " + p5.displayHeight)
  	let canvas = p5.createCanvas(800, 500);
  	canvas.parent("p5Canvas_99");
	  //microSetup(canvas)
	  p5.textFont(font);
	  p5.textSize(fontSize);
	  
	  
	stringArray = font.textToPoints(string,0, fontSize, fontSize, textToPointsOptions)
	 console.log("stringArray : " + stringArray)
  }

  p5.draw = _ => {
  	  //microUpdate()
	  p5.background(bgColor);
	  p5.stroke(textColor)
		  stringArray.forEach(
	    (element, indexPosition) =>{
	      //Effet avec des cercles
	      let nextEl = stringArray[indexPosition]
	     p5.stroke(textColor)
	      p5.strokeWeight(1.5)
	      
	      if (micLevel == 'undefined') micLevel = 0;
	  if (micLevel == '') micLevel = 0;
	       
	
	      p5.line(element.x, element.y, nextEl.x, nextEl.y)
	      
	p5.stroke(textColor);
	
	                  p5.line(element.x , element.y +micLevel*ecart, nextEl.x, nextEl.y+ micLevel*ecart)
	      
	                        p5.line(element.x , element.y -micLevel*ecart, nextEl.x, nextEl.y- micLevel*ecart)
	
	
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

