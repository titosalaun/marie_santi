
const moment = require('moment');

const Setting = function(setting) {
  this.id_setting = setting.id_setting;
  this.titre = setting.titre;
  this.address = setting.address;
  this.email = setting.email;
  this.instagram = setting.instagram;
  this.spotify = setting.spotify;
  this.visuel = setting.visuel;
};

Setting.getSetting = (connection,Fct,para, res) => {
  	var id_setting = para.id_setting;
  	var resultat = new Array();

  	var sql = "select * from setting where id_setting = " + id_setting;
  	console.log(sql)
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : setting inconnue' }, null);
	      return;
	    }
	    
	    if (result.length != 0) resultat = result[0];
	    res(null, { result: resultat });
    });
};

Setting.addSetting = async (connection,Fct,tools,nconf,para, res) => {
  	var sql = '';
	var id_setting = para.id_setting;
	var titre = para.titre;
	var address = para.address;
	var email = para.email;
	var instagram = para.instagram;
	var spotify = para.spotify;
	var visuel = para.visuel;
	var about = para.about;

  	sql = "UPDATE `setting` set titre = '" + tools.sql_clean(titre) + "', address = '" + tools.sql_clean(address) + "', email = '" + tools.sql_clean(email) + "', instagram = '" + tools.sql_clean(instagram) + "', spotify = '" + tools.sql_clean(spotify) + "', visuel = '" + tools.sql_clean(visuel) + "', about = '" + tools.sql_clean(about) + "' where id_setting = " + id_setting;
  	
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : update setting' }, null);
	      return;
	    }
	    
	    res(null, { id_setting: id_setting });
    });
};





module.exports = Setting;