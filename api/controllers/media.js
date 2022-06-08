
const moment = require('moment');

const Media = function(media) {

};


Media.getMedias = (connection,Fct,para, res) => {
  	var resultat = new Array();
  	var liste = new Array();
  	var css = new Array();
  	var style = '';
  	var id_parent = para.id_parent;
  	var source = para.source;

  sql = "select d.* from document d where d.source = '" + source + "' and d.id_parent = " + id_parent + " group by d.id_document order by d.position ASC ";
  console.log(sql)
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : media' }, null);
	      return;
	    }
		
	    for (var i = 0; i < result.length; i++) {
		     var tmp = new Object();
		      tmp.id_document = result[i].id_document;
		      tmp.fichier = result[i].fichier;
		      console.log("VAL : " + result[i].fichier)
		      tmp.embed = result[i].embed;
		      tmp.poster = result[i].poster;
		      tmp.autoplay = result[i].autoplay;
		      tmp.legende = result[i].legende;
		        		      
		      resultat.push(tmp);

	     }
	    
	    res(null, { result: resultat,liste: liste,css: css });
    });
};

Media.getMedia = (connection,Fct,para, res) => {
  	var id_document = para.id_document;
  	var resultat = new Array();

  	var sql = "select * from document where id_document = " + id_document;
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : media inconnu' }, null);
	      return;
	    }
	    
	    if (result.length != 0) resultat = result[0];
	    res(null, { result: resultat });
    });
};

Media.delMedia = (connection,Fct,para, res) => {
  	var id_document = para.id_document;

  	var sql = "delete from document where id_document = " + id_document;  	
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: "Erreur : lecture de la suppression du media" }, null);
	      return;
	    }
	    
	    res(null, { id_document: id_document });
    });
};

Media.addMedia = async (connection,Fct,tools,nconf,para, res) => {
  	var sql = '';
	var id_document = para.id_document;
	var id_parent = para.id_parent;
	var source = para.source;
	var fichier = para.fichier;
	var embed = para.embed;
	var poster = para.poster;
	var autoplay = para.autoplay;
	if (autoplay == '') autoplay = 0;
	var legende = para.legende;
	var position = 0;
	var isNew = para.isNew;

  	if (isNew) {
	  	await Fct.getPosition(connection,Fct,"document","", (err, data) => {
		    position = data.position;
		});
	  	sql = "INSERT INTO `document` VALUES (NULL,'" + id_parent  + "','" + tools.sql_clean(source)  + "','" + tools.sql_clean(fichier)  + "','" + tools.sql_clean(embed)  + "','" + tools.sql_clean(poster)  + "','" + autoplay  + "','" + tools.sql_clean(legende)  + "','" + position + "');";	  			 
	}
	else {
		sql = "UPDATE `document` set fichier = '" + tools.sql_clean(fichier) + "', embed = '" + tools.sql_clean(embed) + "', poster = '" + tools.sql_clean(poster) + "', autoplay = '" + autoplay + "', legende = '" + tools.sql_clean(legende) + "' where id_document = " + id_document;
	}
	
	console.log(sql)

  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : ajout media' }, null);
	      return;
	    }
	    if (id_document == 0) id_document = result.insertId;
	    
	    res(null, { id_document: id_document });
    });
};

Media.updatePosition = (connection,Fct,para, res) => {
  	var list = para.list;
  	var sql = '';
  	
  	list.forEach((key, index) => {
	    sql += "update `document` SET `position` = " + (index+1) + " WHERE `document`.`id_document` = " + key.id_document + ";";
	});

  	connection.query(sql, function (err, result) {
	    if (err) {
	      res({ message: "Erreur : lecture de la mise à jour de la position des medias : " + err }, null);
	      return;
	    }
	    
	    res(null, { list: list });
    });
};


module.exports = Media;