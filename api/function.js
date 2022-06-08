const isNumeric = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const sql_clean = function(val){
	if ((typeof val !== 'undefined') && (!isNumeric(val))) val = val.replace(/'/g, "''")

	return val;
}

const prepareEmail = function(transporter,Email,from_email){
    email = new Email({
	  message: {
	    from: 'Nude <' + from_email + '>'
	  },
	  transport: transporter,
	  send:true,
	  preview: false,
	  views: {
	    options: {
	      extension: 'ejs'
	    }
	  }
	});
	
	return email;
}

const sendInvitationUser = async function(res,transporter,Email,reset_link,from_email, to_email,name,name_from){
    email = prepareEmail(transporter,Email,from_email)
    
    try {
	   await email.send({
	    template: 'invitationUser',
	    message: {
	      to: to_email
	    },
	    locals: {
		 name_from: name_from,
		  name: name,
		  email: to_email,
	      login_link: reset_link,
	      subject:'ampersound - invitation de ' + name_from,
		  url_site:'ampersound.onoci.net',
		  name_site:'ampersound',
	    }
	    
	  })
	  return true;
	  }
	  catch (e) {
		  return false;
	  }
	}

	
const sendConfirmUser = function(res,transporter,Email,confirmation_link,from_email, to_email,name){
    email = prepareEmail(transporter,Email,from_email)

	email.send({
	    template: 'confirmationUser',
	    message: {
	      to: to_email
	    },
	    locals: {
		  name: name,
		  email: to_email,
	      confirmation_link: confirmation_link,
		  subject:'ampersound - confirmation de votre compte',
		  url_site:'ampersound.onoci.net',
		  name_site:'ampersound',
	    }
	  })
	  .then(() => {
	      return true;
	    })
	    .catch((error) => {
	      return false;
	    })
	}

	
	
  const sendResetMail  = async function(res,transporter,Email,reset_link,from_email, to_email,color_text,color_bg){
    email =  prepareEmail(transporter,Email,from_email)
	try {
	   await email.send({
	    template: 'resetPassword',
	    message: {
	      to: to_email
	    },
	    locals: {
		  email: to_email,
	      reset_link: reset_link,
	      subject:'ampersound - réinitialisation de votre mot de passe',
		  url_site:'ampersound.onoci.net',
		  name_site:'ampersound',
		  color_text:color_text,
		  color_bg:color_bg,
	    }
	    
	  })
	  return true;
	  }
	  catch (e) {
		  return false;
	  }
	}
    
    module.exports ={
        sql_clean,prepareEmail,sendResetMail,sendInvitationUser,sendConfirmUser
  }
