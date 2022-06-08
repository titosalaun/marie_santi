
const moment = require('moment');

const Sound = function(son) {
  this.id_sound = son.id_sound;
  this.id_user = son.id_user;
  this.titre = son.titre;
  this.fichier = son.fichier;
  this.date_creation = son.date_creation;
};


Sound.getSounds = (connection,Fct,para, res) => {
  	var resultat = new Array();
  	var id_user = para.id_user;
  	
  sql = "select * from sound where id_user =   " + id_user + " order by date_creation DESC ";
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : sound' }, null);
	      return;
	    }
	    
	    res(null, { result: result });
    });
};



Sound.getSound = (connection,Fct,para, res) => {
  	var id_sound = para.id_sound;
  	var resultat = new Array();

  	var sql = "select * from sound  where id_sound = " + id_sound;
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : son inconnu' }, null);
	      return;
	    }
	    
	    if (result.length != 0) resultat = result[0];
	    res(null, { result: resultat });
    });
};

Sound.delSound = (connection,Fct,para, res) => {
  	var id_sound = para.id_sound;

  	var sql = "delete from sound where id_sound = " + id_sound + ";";  	
  	//sql += "delete from interview_tranche where id_interview = " + id_interview + ";";
  	connection.query(sql, function (err, result) {
	    if (err) {
	      res({ message: "Erreur : lecture de la suppression d'un son" }, null);
	      return;
	    }
	    
	    res(null, { id_sound: id_sound });
    });
};

Sound.addSound= async (connection,mysql,Fct,tools,nconf,para, res) => {
  	var sql = '';
	var id_sound = para.id_sound;
	var id_user = para.id_user;
	var titre = para.titre;
	var fichier = para.fichier;
	var date_creation = para.date_creation;
	var isNew = para.isNew;

  	if (id_sound == 0) {
	  	sql = "INSERT INTO `sound` VALUES (NULL,'" + tools.sql_clean(id_user)  + "','" + tools.sql_clean(titre)  + "','" + tools.sql_clean(fichier)  + "','" + tools.sql_clean(date_creation)  + "');";	 	 			 
	}
	else {
		sql = "UPDATE `sound` set titre = '" + tools.sql_clean(titre) + "',fichier = '" + tools.sql_clean(fichier) + "'  where id_sound = " + id_sound;
	}

console.log(sql)
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : ajout son' }, null);
	      return;
	    }
	    if (id_sound == 0) id_sound = result.insertId;

		res(null, { id_sound: id_sound });
    });
};




module.exports = Sound;