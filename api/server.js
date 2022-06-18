const express = require('express');
const multer = require('multer');
const cors = require("cors");
const path = require("path");
const sizeOf = require('image-size');
const fs = require('fs');
const imageType = require('image-type');
const readChunk = require('read-chunk');
const isImage = require('is-image');
const mysql = require('mysql2');
const mysql_p = require('mysql2/promise');
const crypto = require('crypto');
var AdmZip = require('adm-zip');
var async = require("async");

var nconf = require('nconf');
var fetch = require('isomorphic-fetch');
const sharp = require('sharp');

var fichier = '';
var path_folder = 'public';
const app = express();
app.use(cors());


app.use(express.static(__dirname + '/public'));
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json());

nconf.file('config.json');
const dbConfig = require("./db.config.js");


var url_server = nconf.get('url_server');
const PORT = nconf.get('port');
process.env.SECRET = nconf.get('SECRET');
process.env.url_server = url_server;

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: nconf.get('host_smtp'),
  port: nconf.get('port_smtp'),
  secure: true,
  auth: {
    user: nconf.get('user_smtp'),
    pass: nconf.get('pass_smtp')
  }
});

const Email = require('email-templates');

const tools= require("./function.js");




const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  socketPath: dbConfig.SOCKET,
  multipleStatements: true
});

/*const connectionPromise =  mysql_p.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  socketPath: dbConfig.SOCKET
});*/


var path_folder = 'upload/';

//local
//var path_www = '../static/webfonts/';
//var path_upload = '../static/upload/';

//server
//var path_www = '../webfonts/';

var path_upload = '../static/upload/';
//var path_upload = '../ampersound.onoci.net/upload/';


var fichier = '';

const fileFilterFont = (req, file, cb) => {
  const filetypes = /woff|woff2|otf|zip/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(extname){
    cb(null,true);
  } else {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
}

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|gif|png|pdf|mp4|mp3/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(extname){
    cb(null,true);
  } else {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
}

const uploadFontFile = multer({
  storage: multer.diskStorage({
	  	destination: (req, file, callback) => {
	      let path =  path_www + 'font_' + req.query.id_font + '/';
	      if (!fs.existsSync(path)) fs.mkdirSync(path);
	      callback(null, path);
	    },
	    filename: function(req, file, cb){
		    fichier = 'file-' + Date.now() +     path.extname(file.originalname);
	        cb(null, fichier);
	    }
	}),
  fileFilterFont,
  limits: { fileSize: 100 * 1024 * 1024}
}).single('file');





function optimizeFile(path_zip,file,res)
{
	//toFile(path_zip + "S_" + path.basename(file)).then(({ data, info }) => {
		
	 sharp(path_zip + path.basename(file)).resize(250).toFormat('jpg').jpeg({
	    quality: 100
		  }).toFile(path_zip + "S_" + path.basename(file), function(err){
			  if(err){
	                res.status(400).json({ optimize: false,file:path.basename(file)});
	                return;
	            }
	            res.status(200).json({ optimize: true});
		  });	
		  
		  
}

const uploadFile = multer({
  storage: multer.diskStorage({
	  	destination: (req, file, callback) => {
	      let path =  path_upload;
	      callback(null, path);
	    },
	    filename: function(req, file, cb){
		    fichier = 'file-' + Date.now() +     path.extname(file.originalname);
	        cb(null, fichier);
	    }
	}),
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024}
}).single('file');



const resizeImage = (input,output,width) => {
	console.log(input + ' - ' + output)
	
   var dimensions = sizeOf(input)
  var height = null;
  if (dimensions.width < dimensions.height) {
	  height = width;
	  width = null;
  }

  const resize = sharp(input).resize(width,height).toFile(output)

}

app.get('/optimizeFile', (req, res) => { 
	var fichier = req.query.fichier;
	
  	resizeImage(path_upload + fichier,path_upload + fichier.replace('file-','file-v-'),300);
	resizeImage(path_upload + fichier,path_upload + fichier.replace('file-','file-s-'),600);
	resizeImage(path_upload + fichier,path_upload + fichier.replace('file-','file-m-'),1200);
	resizeImage(path_upload + fichier,path_upload + fichier.replace('file-','file-b-'),1920);
	
	res.status(200).json({ message: "ok"});
    
  
});

app.post('/uploadFile', (req, res) => { 
	
  uploadFile(req, res, function (err) {
        if (err) {
          if (err.code === "INCORRECT_FILETYPE") {
		    return res.status(422).json({ message: "jpg, png, gif, pdf, mp4, mp3 allowed!" });
		  } else {
			  if (err.code === "LIMIT_FILE_SIZE") {
			    return res.status(422).json({ message: 'La taille limite du fichier doit être <= 900KB !' });
			  }
			  else return res.status(400).json({ message: "Upload error : " + err.code}) 
		  }
			  
        }
        else if (req.file) {
	        var optimizeFile = new Array();
	        var isOptimize = false;
	        
	        const filetypes = /jpg|jpeg|png/;
	        console.log("fichier : " + path.extname(fichier).toLowerCase())
			const extname = filetypes.test(path.extname(fichier).toLowerCase());
			if(extname) isOptimize = true;

		    optimizeFile.push(fichier)
		    res.status(200).json({ optimizeFile: optimizeFile,isOptimize:isOptimize});
        }

    });
    
  
});

/* Récupération du header bearer */


/* Vérification du token */




const Fct = require("./controllers/fct.js");
const User = require("./controllers/user.js");
const Setting = require("./controllers/setting.js");
const Seo = require("./controllers/seo.js");
const Message = require("./controllers/message.js");
const Sound = require("./controllers/sound.js");
const Media = require("./controllers/media.js");

app.post('/login', (req, res) => {
	User.login(connection,Fct,nconf,req.body, (err, data) => {
	    if (err) {
		    return res.status(400).json({ message: err.message})
	    } else {
		    res.json({ access_token: data.access_token })
		}
	  });
});

app.get('/me', (req, res, next) => {
	
	User.me(connection,nconf,req, res, (err, data) => {
	    if (err) {
		    console.log("erreur me")
		    return res.status(400).json({ message: err.message})
	    } else {
		    console.log("OPK : " + data.content)
		    res.json({ content: data.content })
		}
	  });
    
})





app.get('/passwordForgot', (req, res) => {
	User.passwordForgot(connection,Fct,nconf,tools,transporter,Email,req.query, (err, data) => {
	    if (err) {
		    return res.status(400).json({ message: err.message})
	    } else {
		    res.json({ message: data.message })
		}
	  });
})



app.get('/verifPasswordForgot', (req, res) => {
    var Tliste = new Array();

	User.verifPasswordForgot(connection,Fct,nconf,req.query, (err, data) => {
	    if (err) {
		    res.json({ id_user:0 })
	    } else {
		    res.json({ id_user: data.id_user })
		}
	});
})

app.post('/updatePassword', (req, res) => {
    var Tliste = new Array();

	User.updatePassword(connection,Fct,req.body, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_user: data.id_user,message:'' })
		}
	});
})


app.get('/getUsers', (req, res) => {
	User.getUsers(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/getUser', (req, res) => {
	User.getUser(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/delUser', (req, res) => {
	User.delUser(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_user: data.id_user,message:'' })
		}
	});

})

app.post('/addUser', (req, res) => {
	User.addUser(connection,Fct,tools,req.body, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_user: data.id_user,message:'' })
		}
	});

});

app.get('/invitationUser', (req, res) => {
	User.invitationUser(connection,Fct,nconf,tools,transporter,Email,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ nb_invitation: data.nb_invitation })
		}
	  });
})

/*SEO*/

app.get('/getSeo', (req, res) => {
	Seo.getSeo(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.post('/addSeo', (req, res) => {
	Seo.addSeo(connection,Fct,tools,nconf,req.body, (err, data) => {
		//console.log("retour2 : "  + data.message)
	    if (err) {
		    //res.json({message:err.message})
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_file: data.id_file,message:'' })
		}
	});

});



/*SETTINGS*/

app.get('/getSetting', (req, res) => {
	Setting.getSetting(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.post('/addSetting', (req, res) => {
	Setting.addSetting(connection,Fct,tools,nconf,req.body, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_font: data.id_font,message:'' })
		}
	});

});




/*Message*/

app.get('/getMessages', (req, res) => {
	Message.getMessages(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/getGalerie', (req, res) => {
	Message.getGalerie(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/getMessage', (req, res) => {
	Message.getMessage(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/delMessage', (req, res) => {
    Message.delMessage(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_message: data.id_message,message:'' })
		}
	});

})

app.get('/delPoster', (req, res) => {
    Message.delPoster(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_message: data.id_message,message:'' })
		}
	});

})

const uploadS = multer(); 

app.post('/uploadSound', uploadS.single('soundBlob'), function (req, res, next) {
  // console.log(req.file); // see what got uploaded

  let uploadLocation = path_upload + 'toto.webm' // where to save the file to. make sure the incoming name has a .wav extension

  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file
  res.sendStatus(200); //send back that everything went ok

})




/*Message*/

app.get('/getMessages', (req, res) => {
	Message.getMessages(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/getMessage', (req, res) => {
	Message.getMessage(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/delMessage', (req, res) => {
    Message.delMessage(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_message: data.id_message,message:'' })
		}
	});

})

//const uploadS = multer(); 

app.post('/addMessage', uploadS.single('soundBlob'), (req, res) => {
	bufferSound = Buffer.from('');
	if (typeof req.file !== 'undefined') bufferSound = Buffer.from(new Uint8Array(req.file.buffer))
	Message.addMessage(connection,mysql,Fct,tools,nconf,fs,path_upload,bufferSound,req.body, (err, data) => {
		//console.log("retour2 : "  + data.message)
	    if (err) {
		    //res.json({message:err.message})
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_message: data.id_message,message:'' })
		}
	});

});

app.post('/addPoster', uploadS.single('soundBlob'), (req, res) => {
	bufferSound = Buffer.from('');
	if (typeof req.file !== 'undefined') bufferSound = Buffer.from(new Uint8Array(req.file.buffer))
	Message.addPoster(connection,mysql,Fct,tools,nconf,fs,path_upload,bufferSound,req.body, (err, data) => {
		//console.log("retour2 : "  + data.message)
	    if (err) {
		    //res.json({message:err.message})
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_message: data.id_message,message:'' })
		}
	});

});


/*Sound*/

app.get('/getSounds', (req, res) => {
	Sound.getSounds(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/getSound', (req, res) => {
	Sound.getSound(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/delSound', (req, res) => {
    Sound.delSound(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_sound: data.id_sound,message:'' })
		}
	});

})

app.post('/addSound', uploadS.single('soundBlob'), (req, res) => {
	Sound.addSound(connection,mysql,Fct,tools,nconf,req.body, (err, data) => {
		//console.log("retour2 : "  + data.message)
	    if (err) {
		    //res.json({message:err.message})
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_sound: data.id_sound,message:'' })
		}
	});

});




/*MEDIAS*/

app.get('/getMedias', (req, res) => {
	Media.getMedias(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ resultat: data.result,liste: data.liste,css: data.css,message:'' })
		}
	});
	
})

app.get('/getMedia', (req, res) => {
	Media.getMedia(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})

app.get('/delMedia', (req, res) => {
    Media.delMedia(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_style: data.id_style,message:'' })
		}
	});

})

app.post('/addMedia', (req, res) => {
	Media.addMedia(connection,Fct,tools,nconf,req.body, (err, data) => {
		//console.log("retour2 : "  + data.message)
	    if (err) {
		    //res.json({message:err.message})
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_style: data.id_style,message:'' })
		}
	});

});

app.post('/updateMediaPosition', (req, res) => {
    Media.updatePosition(connection,Fct,req.body, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ list: data.list,message:'' })
		}
	});

})

app.get('/getMediaDisplay', (req, res) => {
    

	Media.getMediaDisplay(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,message:'' })
		}
	});
	
})



/*COMMUN*/

app.get('/online', (req, res) => {

	Fct.online(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ status: data.status,message:'' })
		    //return res.status(200).json({id_user: id_user});
		}
	});
});

app.get('/getNextId', (req, res) => {

	Fct.getNextId(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id: data.id,message:'' })
		    //return res.status(200).json({id_user: id_user});
		}
	});
});

app.get('/getIdByAlias', (req, res) => {

	Fct.getIdByAlias(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ id_parent: data.id_parent,message:'' })
		    //return res.status(200).json({id_user: id_user});
		}
	});
});

app.get('/getLangs', (req, res) => {
	Fct.getLangs(connection,Fct,req.query, (err, data) => {
	    if (err) {
		    res.status(400).json({ message: err.message})
	    } else {
		    res.json({ liste: data.result,id_lang: data.id_lang,message:'' })
		}
	});
	
})







app.use(function(req, res, next) {
	res.status(404);
    res.send('Page inexistante > <a href="list">Home</a>');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));




