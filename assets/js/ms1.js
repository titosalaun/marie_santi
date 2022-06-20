

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
let erreur = [];
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

let textToPointsOptions = {
  sampleFactor : 0.35,
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
	  
	  
	//stringArray = font.textToPoints(mon_texte,0, 0, fontSize, textToPointsOptions)
	erreur = [];
	//console.log("bounds : " + bounds.x + '/' + bounds.y  + '/' + bounds.w  + '/' + bounds.h)
	for (let i = 0; i < Ttexte.length; i += 1) {
		if (Ttexte[i] == ' ') {
			erreur[i] = 'yes';
			Ttexte[i] = '.';
		}
		else erreur[i] = 'no';
		
		
		console.log("texte : " + Ttexte[i])
		stringArray[i] = font.textToPoints(Ttexte[i],0, 0, fontSize, textToPointsOptions)
		bounds[i] = font.textBounds(Ttexte[i], 0, 0, fontSize);
		console.log("Lettre : " + Ttexte[i] + ' / ' + bounds[i].w);
		
		
  	}
  }

  p5.draw = _ => {
	  //notifyCurrentTime();
	  
  	  //microUpdate()
  	  
	  p5.background(bgColor);
	  
	  p5.textSize(fontSize);
	  
	  p5.stroke(textColor)
	  

	  var pos_x = 0
	  var pos_y = 0
	  var old_x = 0;
	  var old_y = 0;
	  var isLigne = false;
	  
	  var max_width_letter = 0;
	  var max_height_letter = 0;
	  
	  for (let i = 0; i < bounds.length; i += 1) {
		  if (bounds[i].w > max_width_letter) max_width_letter = bounds[i].w;
		  if (bounds[i].h > max_height_letter) max_height_letter = bounds[i].h;
	  }
	  

	  delta_x = bounds[0].w * -1;
	  delta_y = ((max_height_letter/2) - ((fontSize*24)/100)) * -1;
	  
	  cmp_col = 0;
	  var tito = 0;
	  isLigne = false;
	  index_x = 10;
		for (let i = 0; i < Ttexte.length; i += 1) {
		  cmp_col += bounds[i].w + interlettrage; 
		  if (cmp_col > (c_width - max_width_letter)) {
			  console.log("COUPE : " + max_height_letter + ' / ' + interlignage)
			  old_y += max_height_letter + interlignage;	
			  isLigne = true;	
			  cmp_col = 0;	  
		  }
		  stringArray[i].forEach(
			  

		    (element, indexPosition) =>{
			    
			    if (erreur[i] == 'yes') p5.stroke(bgColor)
			  else p5.stroke(textColor)
			
				if (indexPosition == 0) {
					if ((i == 0) || (isLigne)) {
						old_x = 0;
						if (i==0) old_y = delta_y
						isLigne = false;	
					}
					else {
						old_x += bounds[i-1].w + interlettrage;
						delta_x = element.x
					}
					
					
				}
				else {
					//element.x = element.x - delta_x;
				}

				
				pos_x =  old_x + element.x;
				pos_y = old_y + element.y;
			//}
		
			 p5.line(pos_x+index_x, pos_y+index_y, pos_x+micLevel*250+index_x, pos_y+index_y)
			 p5.line(pos_x+index_x, pos_y+index_y, pos_x-micLevel*250+index_x, pos_y+index_y)
			 p5.line(pos_x+index_x, pos_y+index_y, pos_x+index_x, pos_y+micLevel*250+index_y)
			 p5.line(pos_x+index_x, pos_y+index_y, pos_x+index_x, pos_y-micLevel*250+index_y)
			 
			 //console.log("LETTRE : " + stringArray[i])
		    }
		    
		    
		  )
		}
	  
	 
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



