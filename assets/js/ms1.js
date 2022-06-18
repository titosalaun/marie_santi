

let p5;
let delegate;
let mic;
let micLevel;
let canvas;
let id_canvas;
let font;
let fontSize;
let mon_texte = '';
let stringArray;
let indexLoad;

let textColor;
let bgColor;

let index_x = 0;
let index_y = 0;
let delta_x = 0;
let delta_y = 0;
let c_width = 0;
let c_height = 0;

let textToPointsOptions = {
  sampleFactor : 0.35,
  separatePaths: true,
  simplifyThreshold:0
}

export function main(_p5) {
  p5 = _p5

   p5.preload = _ => {
    font = p5.loadFont("UniversalSansDisplayTrial491-Regular.otf");
	  //fontSize = 200;
	   p5.noLoop();
  }
  
  p5.setup = _ => {
	  console.log("SETUP : " + indexLoad)
  	let canvas = p5.createCanvas(c_width, c_height);
  	canvas.parent("p5Canvas_" + id_canvas);
	  //microSetup(canvas)
	  p5.textFont(font);
	  p5.textSize(fontSize);
	  
	  
	stringArray = font.textToPoints(mon_texte,0, 0, fontSize, textToPointsOptions)
	  ///console.log("stringArray : " + stringArray)
  }

  p5.draw = _ => {
	  notifyCurrentTime();
	  
  	  //microUpdate()
  	  
	  p5.background(bgColor);
	  
	  p5.textSize(fontSize);
	  
	  p5.stroke(textColor)
	  
	  console.log("DRAW : " + textColor)

	  var pos_x = 0
	  var pos_y = 0
	  var old_x = 0;
	  var old_y = 0;
	  var isLigne = false;
	  //console.log("micLevel : " + micLevel)
	  stringArray.forEach(
	    (element, indexPosition) =>{
		    //if (indexPosition < 500) {
				//console.log("indexPosition : " +pos_x)
				if (indexPosition == 0) {
					old_x = element.x;
					old_y = element.y;
				}
				
				if (pos_x > 600) {
					old_x = element.x;					
					
					index_y += delta_y;
					index_x = delta_x;
					isLigne = true;
				}
				
				pos_x =  element.x - old_x;
				pos_y = element.y - old_y;
				
				if (indexPosition == 0) {
					isLigne = false;
					
				}
				
				
				//else {
					//pos_x += old_x - element.x;
					//pos_y += old_y - element.y;
				//}
			//}
			
			
			     p5.line(pos_x+index_x, pos_y+index_y, pos_x+micLevel*250+index_x, pos_y+index_y)
				 p5.line(pos_x+index_x, pos_y+index_y, pos_x-micLevel*250+index_x, pos_y+index_y)
				 p5.line(pos_x+index_x, pos_y+index_y, pos_x+index_x, pos_y+micLevel*250+index_y)
				 p5.line(pos_x+index_x, pos_y+index_y, pos_x+index_x, pos_y-micLevel*250+index_y)
		 
	
	
	    }
	  )
	  
	  //p5.resizeCanvas(1000, fontSize-91, true);
  }
}

function Redraw(textColor) {
  //p5.resizeCanvas(c_width, c_height);
  console.log("REDRAW")
  p5.stroke(textColor)
  p5.redraw();
}

function microSetup(canvas) {
  canvas.mousePressed(p5.userStartAudio())
  mic = new P5.AudioIn();
  mic.start();
}

function microUpdate() {
    micLevel = mic.getLevel()

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

function saveTO(val) {
    p5.saveCanvas('myCanvas', 'jpg');

}

function setTexte(val,index) {
	console.log("CHARGE TEXTE OBJ: " + index)
    mon_texte = val
	indexLoad = index;
}

function setTextColor(val)
{
	console.log("COLORVAL : " + val)
	textColor = val;
}

function setBgColor(val)
{
	bgColor = val;
}

function setFontSize(val)
{
	fontSize = parseInt(val);
	index_x = parseInt(val/2);
	index_y = parseInt(val);
	delta_x = 0 ;
	delta_y = index_y;
}

function setCanvasId(id)
{
	id_canvas = id;
	
}

function setCanvasSize(w_width,w_height)
{
	c_width = w_width;
	c_height = w_height;
}


export function startLoopP5() {
    startP5();

}

export function setFctTexte(val,index) {
    setTexte(val,index);

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

export function setFctCanvasId(id) {
    setCanvasId(id);
}

export function setFctCanvasSize(w_width,w_height) {
    setCanvasSize(w_width,w_height);
}

export function setFctRedraw(val) {
	
    Redraw(val);

}

export function setFctSave() {
	
    saveTO();

}






export function setDelegate(_delegate) {
  delegate = _delegate;
}

function notifyCurrentTime() {
  if (delegate !== undefined) {
    const message = p5.hour() + ":" + p5.minute() + ":" + p5.second();

    delegate(message);
  }
}



