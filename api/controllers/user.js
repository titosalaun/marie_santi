const md5 = require('md5');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User = function(user) {
  this.nom = user.nom;
  this.prenom = user.prenom;
  this.email = user.email;
  this.password = user.password;
  this.date_creation = user.date_creation;
  this.id_droit = user.id_droit;
  this.id_status = user.id_status;
  this.invitation = user.invitation;
  this.notification = user.notification;
  this.token = user.token;
  this.online = user.online;
};



User.login = (connection,Fct,nconf,para, res) => {
  sql = "select * from user where online=1 and email = '" + para.username + "' and password = '" + md5(para.password) + "'";
  connection.execute(sql, function (err, result) {
	    if (err) {
	      console.log("error: ", err);
	      res({ message: 'Erreur : lecture de la base de données' }, null);
	      return;
	    }
	    
	    if (result.length == 0) {
		    res({ message: 'Incorrect email or password' }, null);
			return;
	    }
	    
	    var id_user = result[0].id_user;
	    
	    if (result[0].id_status < 2) {
		    sql = "update user set id_status = 2  where id_user = " + id_user;
			connection.query(sql, function (err, result) {
				if (err) {
			      res({ message: 'Erreur : mise à jour du profil' }, null);
			      return;
			    }
			});
	    }
	    

	    const token = jwt.sign({
	        id: id_user,
	        username: result[0].prenom + ' ' + result[0].nom,
	        isAdmin: result[0].id_droit
	    }, nconf.get('SECRET'), { expiresIn: '3 hours' })
	    res(null, { access_token: token });


    });
};

User.passwordForgot = (connection,Fct,nconf,tools,transporter,Email,para, res) => {
	var color_text = para.color_text;
	var color_bg = para.color_bg;
	
	console.log("COLOR : " + color_text + ' / ' + color_bg)
	  sql =  "select id_user,email from user where online=1 and email = '" + para.username + "'";
	  
	  connection.execute(sql, function (err, result) {
		    if (err) {
		      res({ message: 'Erreur : lecture de la base de données i' }, null);
		      return;
		    }
		    
		    if (result.length == 0) {
			    res({ message: 'Unknown email address.' }, null);
				return;
		    }
		    
		    var email = result[0].email;
		    var id_user = result[0].id_user;
		    
		    var tokenObject = {
	           email: email,
	           id_user: id_user
	        };
			var secret = id_user + '_' + email + '_' + new Date().getTime();
			var token = jwt.sign(tokenObject, nconf.get('SECRET'), { expiresIn: '1 hours' });
			//var url_link = nconf.get('url_server').replace("api/","app/") + 'resetPassword?token=' + token;
			var url_link = nconf.get('url_server').replace("api/","") + 'resetPassword?token=' + token;
	        url_link = 'https://ampersound.onoci.net/' + 'resetPassword?token=' + token;
	       sql = "UPDATE `user` set token = '" + token  + "' where id_user = " + id_user;
	       console.log(sql)
	       connection.query(sql, function (err, result) {
		       if (err) {
			      res({ message: 'Erreur : lecture de la base de données, update mot de passe oublié' }, null);
			      return;
			    }
			    
			    tools.sendResetMail(res,transporter,Email,url_link,nconf.get('email_from'),email,color_text,color_bg).then((message) => {
				    if (!message) {
					    res({ message: "Erreur lors de l'envoi de l'e-mail" }, null);
					}
					else {
						res(null,{ message: "An email has just been sent to you with instructions to reset your password" });
					}
			    })
				.catch((e) =>
				  console.log("erreur fin : " + e)
				);
		       
		       /*erreur = await tools.sendResetMail(res,transporter,Email,url_link,nconf.get('email_from'),email) ;
		       console.log("ERREUR EMAIL : " + erreur)
				if (erreur) res({ message: "Erreur lors de l'envoi de l'e-mail" }, null);
			    return res(null, { message: message });*/
		    });
	
	
	    });
};


User.verifPasswordForgot = (connection,Fct,nconf,para, res) => {
  var id_user = 0;
  
  sql = "select id_user,email from user where token = '" + para.token + "'";
  connection.execute(sql, function (err, result) {
	    if (err) {
	      console.log("error: ", err);
	      res({ message: 'Erreur : lecture de la base de données' }, null);
	      return;
	    }
	    
	    if (result.length > 0) {
		    const verify = jwt.verify( para.token, nconf.get('SECRET') );
		    if (verify) id_user = result[0].id_user;
	    }

		res(null, { id_user: id_user });

    });
};

User.updatePassword = (connection,Fct,para, res) => {
  var id_user = 0;
  
  sql = "update user set token='',password = '" + md5(para.password) + "' where id_user = " + para.id_user;
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données' }, null);
	      return;
	    }

		res(null, { id_user: para.id_user });

    });
};

User.getUsers = (connection,Fct,para, res) => {
  	var resultat = new Array();
  	var recherche = para.recherche
	var sql_search = '';
	if (recherche != '') {
		sql_search = " nom like '%" + recherche + "%' ";
		sql_search += " OR prenom like '%" + recherche + "%' ";
		sql_search += " OR email like '%" + recherche + "%' ";
		
		sql_search = " where (" + sql_search + ") ";
	}
	
  sql = "select * from user " + sql_search + " order by " + para.triBy + " " + para.triMode;
  console.log(sql)
  connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : users' }, null);
	      return;
	    }
	    
	    res(null, { result: result });
    });
};

User.getUser = (connection,Fct,para, res) => {
  	var id_user = para.id_user

  	var sql = "select * from user where id_user = " + id_user;
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : user inconnu' }, null);
	      return;
	    }
	    
	    res(null, { result: result[0] });
    });
};

User.delUser = (connection,Fct,para, res) => {
  	var id_user = para.id_user

  	var sql = "delete from user where id_user = " + id_user;  	
  	connection.execute(sql, function (err, result) {
	    if (err) {
	      res({ message: "Erreur : lecture de la suppression de l'utilisateur" }, null);
	      return;
	    }
	    
	    res(null, { id_user: id_user });
    });
};



User.addUser = (connection,Fct,tools,para, res) => {
  	var sql = '';
	var id_user = para.id_user;
	var nom = para.nom;
	var prenom = para.prenom;
	var email = para.email;
	var password = '';
	var date_creation = moment().format('YYYY-MM-DD');
	var id_droit = para.id_droit;
	if (id_droit) id_droit = 1;
	else id_droit = 0;
	var id_statut = 0;
	var invitation = 0;
	var token = '';
	var online = 0;

  	if (id_user == '0') {
		 sql = "INSERT INTO `user` VALUES (NULL,'" + tools.sql_clean(nom)  + "','" + tools.sql_clean(prenom)  + "','" + email  + "','" + password  + "', '" + date_creation + "', '" + id_droit + "', '" + id_statut + "', '" + invitation + "', '0','" + token + "', '" + online + "');";
	}
	else {
		sql = "UPDATE `user` set nom = '" + tools.sql_clean(nom) + "', prenom = '" + tools.sql_clean(prenom) + "', email = '" + email + "', id_droit = '" + id_droit + "' where id_user = " + id_user;
	}
	
  	connection.execute(sql, function (err, result) {
	  	console.log(sql)
	    if (err) {
	      res({ message: 'Erreur : lecture de la base de données : ajout user' }, null);
	      return;
	    }
	    
	    if (id_user == '0') id_user = result.insertId;
	    
	    res(null, { id_user: id_user });
    });
};

User.invitationUser = (connection,Fct,nconf,tools,transporter,Email,para, res) => {
	  var id_user = para.id_user;
	  var name_from = para.name_from;
	  var sql = "select invitation,email,prenom, nom from user where id_user = " + id_user;
	  
	  connection.execute(sql, function (err, result) {
		    if (err) {
		      res({ message: 'Erreur : lecture de la base de données' }, null);
		      return;
		    }
		    
		    if (result.length == 0) {
			    res({ message: "Erreur lors de l'envoi de l'invitation : utilisateur inconnu" }, null);
		    }
		    else {
			    var email = result[0].email;
			    var name =  result[0].prenom + ' ' + result[0].nom;
			    var nb_invitation = result[0].invitation;
			    nb_invitation++;
			    
			    var url_link = nconf.get('url_server').replace("api/","edit/");
			    tools.sendInvitationUser(res,transporter,Email,url_link,nconf.get('email_from'),email,name,name_from).then((message) => {
				if (!message) {
					    res({ message: "Erreur lors de l'envoi de l'e-mail d'invitation", nb_invitation: 0 });
					}
					else {
						sql = "update user set online = 1, id_status = 1, invitation  = " + nb_invitation + " where id_user = " + id_user;
						connection.execute(sql, function (err, result) {
							if (err) throw err;
							
							res(null,{ nb_invitation: nb_invitation });
						});
					}
			    })
				.catch((e) =>
				  console.log("erreur fin : " + e)
				);
			    
		    }
		    
		    	
	
	    });
};



User.me = (connection,nconf,req, res, next) => {
	checkTokenMiddleware(nconf,req, res, next => {
		// Récupération du token
	    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
	    // Décodage du token
	    const decoded = jwt.decode(token, { complete: false })
		res.json({ content: decoded })
	   
	});
};

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

const checkTokenMiddleware = (nconf,req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    // Véracité du token
    jwt.verify(token, nconf.get('SECRET'), (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}

module.exports = User;