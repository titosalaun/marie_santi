
const moment = require('moment');

const Message = function(message) {
  this.id_message = message.id_message;
  this.id_user = message.id_user;
  this.texte = message.texte;
  this.fichier = message.fichier;
  this.duree = message.duree;
  this.date_creation = message.date_creation;
};


Message.getMessages = (connection,Fct,para, res) => {
  	var resultat = new Array();
  	var id_user = para.id_user;
  	
  sql = "select * from message where id_user =   " + id_user + " order by date_creation DESC ";
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : messages' }, null);
	      return;
	    }
	    
	    res(null, { result: result });
    });
};

Message.getGalerie = (connection,Fct,para, res) => {
  	var resultat = new Array();
  	
  sql = "select * from message where isPoster = 1 order by date_creation DESC ";
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : galerie' }, null);
	      return;
	    }
	    
	    res(null, { result: result });
    });
};



Message.getMessage = (connection,Fct,para, res) => {
  	var id_message = para.id_message;
  	var resultat = new Array();

  	var sql = "select * from message  where id_message = " + id_message;
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : message inconnu' }, null);
	      return;
	    }
	    
	    if (result.length != 0) resultat = result[0];
	    res(null, { result: resultat });
    });
};

Message.delMessage = (connection,Fct,para, res) => {
  	var id_message = para.id_message;

  	var sql = "delete from message where id_message = " + id_message + ";";  	
  	//sql += "delete from interview_tranche where id_interview = " + id_interview + ";";
  	connection.query(sql, function (err, result) {
	    if (err) {
	      res({ message: "Erreur : lecture de la suppression d'un id_message" }, null);
	      return;
	    }
	    
	    res(null, { id_message: id_message });
    });
};

Message.delPoster = (connection,Fct,para, res) => {
  	var id_message = para.id_message;

  	var sql = "update message set isPoster=0 where id_message = " + id_message + ";";  	
  	//sql += "delete from interview_tranche where id_interview = " + id_interview + ";";
  	connection.query(sql, function (err, result) {
	    if (err) {
	      res({ message: "Erreur : lecture de la suppression du poster" }, null);
	      return;
	    }
	    
	    res(null, { id_message: id_message });
    });
};

Message.addMessage= async (connection,mysql,Fct,tools,nconf,fs,path_upload,bufferSound,para, res) => {
  	var sql = '';
	var id_message = para.id_message;
	var id_user = para.id_user;
	var id_effet = para.id_effet;
	if (id_effet == '') id_effet = 1;
	var color_text = para.color_text;
	var color_bg = para.color_bg;
	var font_size = para.font_size;
	if (font_size == '') font_size = 20;
	var texte = para.texte;
	var interlignage = para.interlignage;
	var interlettrage = para.interlettrage;
	var duree = para.duree;
	var date_creation = para.date_creation;
	var isNew = para.isNew;
console.log("isNew : " + isNew)
  	if (id_message == 0) {
	  	sql = "INSERT INTO `message` VALUES (NULL,'" + tools.sql_clean(id_user)  + "','" + tools.sql_clean(id_effet)  + "','" + tools.sql_clean(color_text)  + "','" + tools.sql_clean(color_bg)  + "','" + tools.sql_clean(font_size)  + "','" + tools.sql_clean(interlignage)  + "','" + tools.sql_clean(interlettrage)  + "','" + tools.sql_clean(texte)  + "','','0','0','" + tools.sql_clean(date_creation)  + "');";	 	 			 
	}
	else {
		sql = "UPDATE `message` set id_effet = '" + tools.sql_clean(id_effet) + "',color_text = '" + tools.sql_clean(color_text) + "',color_bg = '" + tools.sql_clean(color_bg) + "',font_size = '" + tools.sql_clean(font_size) + "',interlignage = '" + tools.sql_clean(interlignage) + "',interlettrage = '" + tools.sql_clean(interlettrage) + "',texte = '" + tools.sql_clean(texte) + "',fichier = '',duree = '0',date_creation = '" + tools.sql_clean(date_creation) + "'  where id_message = " + id_message;
	}

console.log(sql)
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : ajout message' }, null);
	      return;
	    }
	    if (id_message == 0) id_message = result.insertId;
	    
	    if (bufferSound.length > 0) {
		     let uploadLocation = path_upload + 'message_' + id_message + '.webm';
			 fs.writeFileSync(uploadLocation, bufferSound); // write the blob to the server as a file
			 res(null, { id_message: id_message });
	    }
	    else {
		    res(null, { id_message: id_message });
	    }
	   
    });
};

Message.addPoster= async (connection,mysql,Fct,tools,nconf,fs,path_upload,bufferSound,para, res) => {
  	var sql = '';
	var id_message = para.id_message;

  	sql = "UPDATE `message` set isPoster = '1'  where id_message = " + id_message;

console.log(sql)
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : ajout poster' }, null);
	      return;
	    }
	    console.log("buffer : " + bufferSound.length)
	    if (para.poster  != '') {
		    
			var a =  para.poster;
			var m =  a.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
			  
			var b =  Buffer.from(m[2],'base64');



		     let uploadLocation = path_upload + 'poster_' + id_message + '.png';
			 fs.writeFileSync(uploadLocation, b); // write the blob to the server as a file
			 res(null, { id_message: id_message });
	    }
	    else {
		    res(null, { id_message: id_message });
	    }
	   
    });
};




module.exports = Message;