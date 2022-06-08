const moment = require('moment');
var nconf = require('nconf');
nconf.file('config.json');
const dbConfig = require("./../db.config.js");

const mysql = require('mysql2');
const mysql_p = require('mysql2/promise');


const Fct = function(fct) {
};

Fct.cxBase = (res) => {
  const connection = mysql.createConnection({
	  host: dbConfig.HOST,
	  port: dbConfig.PORT,
	  user: dbConfig.USER,
	  password: dbConfig.PASSWORD,
	  database: dbConfig.DB,
	  socketPath: dbConfig.SOCKET
	});
	
	return connection;
};

Fct.cxBasePromise = async (res) => {
  const mysql_p = require('mysql2/promise');
  
  const connection = await mysql_p.createConnection({
	  host: dbConfig.HOST,
	  port: dbConfig.PORT,
	  user: dbConfig.USER,
	  password: dbConfig.PASSWORD,
	  database: dbConfig.DB,
	  socketPath: dbConfig.SOCKET,
	  multipleStatements: true
	});
	
	return connection;
};

Fct.online = (connection,Fct,para, res) => {
  var sql = "select online from " + para.table + " where " + para.libelle + " = " + para.id;
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : online lecture : ' + para.table }, null);
	      return;
	    }
	    
	    var online = result[0].online;
	    if (online == 1) online = 0;
	    else online = 1;
	    
	    var id_user = result[0].id_user;
	    
	    var sql = "update " + para.table + " set online = " + online + " where " + para.libelle + " = " + para.id;
	    connection.execute(sql, function (err, result) {
	    	if (err) {
		      res({ message: 'Erreur : online maj : ' + para.table }, null);
		      return;
		    }
	    	
	    	var status = 'online';
			if (online == 0) status = 'draft';
	    	res(null, { status: status });
		});


    });
};

Fct.getPosition = async (connection,Fct,table,condition, res) => {
	
  connection = await Fct.cxBasePromise();
	
  var sql = "select position from " + table + " "  + condition + " order by position DESC  limit 1";
  var position = 1;
  
  try {
    const [rows, fields] = await connection.execute(sql);
	     
	position = rows[0].position;
    position++;
    res(null,{ position: position });

  } catch (err) {
        res({ message: 'Erreur : position lecture : ' + table }, { position: position });
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

Fct.getField = async (connection,Fct,table, field, field_id, id, res) => {
	
  connection = await Fct.cxBasePromise();
  var sql = "select file from " + table + " where " + field_id + " = " + id;
  var val = '';

  try {
    const [rows, fields] = await connection.execute(sql);
	     
	val = rows[0][field];
    res(null,{ val: val });

  } catch (err) {
        res({ message: 'Erreur : getField lecture : ' + table }, { val: val });
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



Fct.getIdByAlias =  (connection,Fct,para, res) => {
  var sql = "select id_parent from seo where source = '" + para.source + "' and url = '" + para.url + "' order by id_seo ASC LIMIT 1";
  var id_parent = 0;
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Error: get id by alias ' + + para.source }, null);
	      return;
	    }
	    
	    if (result.length > 0) id_parent = result[0].id_parent;
	    res(null, { id_parent: id_parent });
    });
}

Fct.getNextId = (connection,Fct,para, res) => {
  var sql = "SHOW TABLE STATUS LIKE '" + para.table + "'";
  var id = 0;
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : nextId : ' + para.table }, null);
	      return;
	    }
	    
	    if (result.length > 0) id = result[0].Auto_increment;
	    
	    res(null, { id: id });


    });
};

Fct.unZip = (Fct,fs,path,zip,path_zip,file, res) => {
  	
	var zipEntries = zip.getEntries(); // an array of ZipEntry records
	var optimizeFile = new Array();
	zipEntries.forEach(function(zipEntry) {
	    var isFont = true;
	    if (!zipEntry.entryName.match(/.(otf|woff|woff2)$/i)) isFont = false;
		if ((!zipEntry.isDirectory) && (zipEntry.entryName.indexOf('MACOSX') == -1) && (isFont)) {
		     file_name = 'file-' + Date.now() + path.extname(zipEntry.entryName);
		     zip.extractEntryTo(zipEntry.entryName, path_zip, /*maintainEntryPath*/true, /*overwrite*/true);

		     fs.rename(path_zip + path.basename(zipEntry.entryName), path_zip + file_name, function(err) {
			    if ( err ) console.log('ERROR: ' + err);
			});
			
			optimizeFile.push(file_name)

		}
	});
	
	fs.unlinkSync(file);

	res.status(200).json({ unzip: true,optimizeFile: optimizeFile});
};

Fct.getLangs = (connection,Fct,para, res) => {
  sql = "select * from lang order by id_lang";
  console.log(sql)
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : lang' }, null);
	      return;
	    }
	    
	    res(null, { result: result, id_lang: result[0].id_lang });
    });
};


module.exports = Fct;