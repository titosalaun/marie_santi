
const moment = require('moment');

const Seo = function(seo) {
  this.id_seo = seo.id_seo;
  this.source = seo.source;
  this.id_parent = seo.id_parent;
  this.titre = seo.titre;
  this.description = seo.description;
  this.url = seo.url;
};


Seo.getSeo = (connection,Fct,para, res) => {
  	var source = para.source;
  	var id_parent = para.id_parent;

  	var sql = "select * from seo where source = '" + source + "' and id_parent = " + id_parent;
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : seo inconnu' }, null);
	      return;
	    }
	    
	    if (result.length == 0) resultat = '';
	    else resultat = result[0];
	    
	    res(null, { result: resultat });
    });
};

Seo.isExist = async (connection,Fct,source, id_parent, res) => {
	
  connection = await Fct.cxBasePromise();
	
  var sql = "select id_seo from seo where source = '" + source + "' and id_parent = " + id_parent;
  var id_seo = 0;
  console.log(sql)
  try {
    const [rows, fields] = await connection.execute(sql);
	if (rows.length > 0) {
		id_seo = rows[0].id_seo;
	}

    res(null,{ id_seo: id_seo });

  } catch (err) {
        res({ message: 'Erreur : Seo isExist ' }, { id_seo: id_seo });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

Seo.addSeo = async (connection,Fct,tools,nconf,para, res) => {
  	var sql = '';
  	var id_seo = 0;
	var source = para.source;
	var id_parent = para.id_parent;
	var seo_title = para.seo_title;
	var seo_description = para.seo_description;
	var seo_url = para.seo_url;
		
	await Seo.isExist(connection,Fct,source,id_parent, (err, data) => {
	    id_seo = data.id_seo;
	});

  	if ((id_seo == 0)) {
	  	sql = "INSERT INTO `seo` VALUES (NULL,'" + tools.sql_clean(source)  + "','" + tools.sql_clean(id_parent)  + "','" + tools.sql_clean(seo_title)  + "','" + tools.sql_clean(seo_description)  + "','" + tools.sql_clean(seo_url)  + "');";	  			 
	}
	else {
		sql = "UPDATE `seo` set titre = '" + tools.sql_clean(seo_title) + "', description = '" + tools.sql_clean(seo_description) + "', url = '" + tools.sql_clean(seo_url) + "' where source = '" + source + "' and id_parent = " + id_parent;
	}

	console.log(sql)
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : ajout seo' }, null);
	      return;
	    }
	    
	    res(null, { id_seo: 0 });
    });
};






module.exports = Seo;