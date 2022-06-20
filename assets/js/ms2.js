let p5;
let delegate;
let mic;
let micLevel;
let canvas;
let id_canvas;
let font;
let fontSize;
let mon_texte = '';
let Ttexte;
let stringArray = [];
let bounds = [];
let indexLoad;

let textColor;
let bgColor;

let index_x = 0;
let index_y = 0;
let delta_x = 0;
let delta_y = 0;
let c_width = 0;
let c_height = 0;
let cmp_col = 0;
let interlignage = 20;
let interlettrage = 10;




let ecart;
let deg;


let grain = [];
let point_x_max;
let point_x_min;
let point_x;
let point_x_direction;
let point_y_max;
let point_y_min;
let point_y;
let point_y_direction;

let string;

let textToPointsOptions = {
  sampleFactor : 0.35,

  simplifyThreshold:0
}

export function main(_p5) {
  p5 = _p5

   p5.preload = _ => {
    font = p5.loadFont("UniversalSansDisplayTrial491-Regular.otf");
	  fontSize = 250;
	  string="je m'appelle tito"
	  
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
	  let canvas = p5.createCanvas(c_width, c_height);
  	canvas.parent("p5Canvas_" + id_canvas);
	  //microSetup(canvas)
	  p5.textFont(font);
	  p5.textSize(fontSize);
	  p5.stroke(33, 150, 243)
	  
	stringArray = font.textToPoints(string,0, fontSize, fontSize, textToPointsOptions)
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

function setDecibel(val) {
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

function setTexte(val,Tval,index) {
    mon_texte = val;
    Ttexte = Tval;
	indexLoad = index;
}

function setTextColor(val)
{
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

function setInterlettrage(val)
{
	interlettrage = parseInt(val);
}

function setInterlignage(val)
{
	interlignage = parseInt(val);
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

export function setFctTexte(val,Tval,index) {
    setTexte(val,Tval,index);

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

export function setFctInterlignage(val) {
    setInterlignage(val);

}

export function setFctInterlettrage(val) {
    setInterlettrage(val);

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

export function setFctDecibel(val) {
	
    setDecibel(val);

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



