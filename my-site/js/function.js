var getFolderLevel = function(data, id){
	var resultat = '';
	for (const prop in data) {
		console.log("prop : " + data[prop].id)
		if (data[prop].id == id) return data[prop].files;
		else {
			var level_2 = data[prop].files
			for (const prop_2 in level_2) {
				console.log("prop_2 : " + level_2[prop_2].id)
				if (level_2[prop_2].id == id) return level_2[prop_2].files;
			}
		}
		
    // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    // consequently, `data[prop]` refers to the value of each property, i.e.
    // either `42` or the array
	}
	
	return '';
}

function displayErreur(erreur) {
	var box = document.getElementsByClassName("alertBox")[0];
	var message = document.getElementsByClassName("mes")[0];
	
	message.innerHTML = erreur;
	box.classList.remove('translate-y-full');
	
}

function ISdisplayErreur() {
	var box = document.getElementsByClassName("alertBox")[0];
	var message = document.getElementsByClassName("mes")[0];
	
	if (!box.classList.contains('hidden')) return true;
	else return false;
}

function hideErreur() {
	var box = document.getElementsByClassName("alertBox")[0];
	var message = document.getElementsByClassName("mes")[0];
	
	message.innerHTML = '';
	box.classList.add('translate-y-full');
	
	isAction('',true);
}

function clearRequired()
{
	var elems = document.querySelectorAll(".required_field");
	[].forEach.call(elems, function(el) {
	    el.classList.remove("required");
	});
}

function checkRequired()
{
	var erreur = false;
	
	var elems = document.querySelectorAll(".required_field");
	[].forEach.call(elems, function(el) {
	    if (el.classList.contains("required")) erreur = true;
	});

	return erreur;
}

function disabledActions(formClass)
{
	var formAction = document.getElementsByClassName("form-action main-action")[0];
	formAction.classList.add('animate-onWait');
	
	var elems = document.querySelectorAll(".form-action.main-action button");
	[].forEach.call(elems, function(el) {
		el.classList.add("cursornotallowed");
			el.disabled = true;
	    
	});
	 
}

function enabledActions()
{
	var formAction = document.getElementsByClassName("form-action main-action")[0];
	formAction.classList.remove('animate-onWait');
	
	var elems = document.querySelectorAll(".form-action.main-action button");
	[].forEach.call(elems, function(el) {
		el.classList.remove("cursornotallowed");
			el.disabled = false;
	    
	});
	 
}


function clearRequiredModal()
{
	var elems = document.querySelectorAll(".modalZone .required_field");
	[].forEach.call(elems, function(el) {
	    el.classList.remove("required");
	});
}

function checkRequiredModal()
{
	var erreur = false;
	
	var elems = document.querySelectorAll(".modalZone .required_field");
	[].forEach.call(elems, function(el) {
	    if (el.classList.contains("required")) {
		    console.log("ERRRRRREUURUR")
		    erreur = true;
		}
	});

	return erreur;
}

function disabledActionsModal()
{
	var formAction = document.querySelectorAll(".modalZone .form-action")[0];
	formAction.classList.add('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.add("cursornotallowed");
			el.disabled = true;
	    
	});
	 
}

function enabledActionsModal()
{
	var formAction = document.querySelectorAll(".modalZone .form-action")[0];
	formAction.classList.remove('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.remove("cursornotallowed");
			el.disabled = false;
	    
	});
	 
}


function clearRequiredModal2()
{
	var elems = document.querySelectorAll(".modalZone2 .required_field");
	[].forEach.call(elems, function(el) {
	    el.classList.remove("required");
	});
}

function checkRequiredModal2()
{
	var erreur = false;
	
	var elems = document.querySelectorAll(".modalZone2 .required_field");
	[].forEach.call(elems, function(el) {
	    if (el.classList.contains("required")) erreur = true;
	});

	return erreur;
}

function disabledActionsModal2()
{
	var formAction = document.querySelectorAll(".modalZone2 .form-action")[0];
	formAction.classList.add('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone2 .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.add("cursornotallowed");
			el.disabled = true;
	    
	});
	 
}

function enabledActionsModal2()
{
	var formAction = document.querySelectorAll(".modalZone2 .form-action")[0];
	formAction.classList.remove('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone2 .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.remove("cursornotallowed");
			el.disabled = false;
	    
	});
	 
}

function clearRequiredModal3()
{
	var elems = document.querySelectorAll(".modalZone3 .required_field");
	[].forEach.call(elems, function(el) {
	    el.classList.remove("required");
	});
}

function checkRequiredModal3()
{
	var erreur = false;
	
	var elems = document.querySelectorAll(".modalZone3 .required_field");
	[].forEach.call(elems, function(el) {
	    if (el.classList.contains("required")) erreur = true;
	});

	return erreur;
}

function disabledActionsModal3()
{
	var formAction = document.querySelectorAll(".modalZone3 .form-action")[0];
	formAction.classList.add('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone3 .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.add("cursornotallowed");
			el.disabled = true;
	    
	});
	 
}

function enabledActionsModal3()
{
	var formAction = document.querySelectorAll(".modalZone3 .form-action")[0];
	formAction.classList.remove('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone3 .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.remove("cursornotallowed");
			el.disabled = false;
	    
	});
	 
}

function isAction(message, fromError) {
	var _content = document.querySelector(".col-content");
	if ((_content) && (!fromError)) {
		if (!document.querySelector(".col-content").classList.contains('isLoad')) {
			document.querySelector(".col-content").classList.add('isLoad');
			var elems = document.querySelectorAll(".col-right > div");
			[].forEach.call(elems, function(el) {
				el.classList.add("cursornotallowed");
				el.classList.add("lock");
				el.disabled = true;
			    
			});
			console.log("ICICITITO")
			displayErreur(message)
		}
		else {
			document.querySelector(".col-content").classList.remove('isLoad');
			var elems = document.querySelectorAll(".col-right > div");
			[].forEach.call(elems, function(el) {
				el.classList.remove("cursornotallowed");
				el.classList.remove("lock");
				el.disabled = false;
			    
			});
			//displayErreur('')
		}
	}
	
}

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

var blobToBase64 = function(_parent,blob, cb) {
	console.log("BLOB : " + blob.size)
	console.log("BLOB : " + blob.type)
  if (typeof blob.size !== "undefined") {
	  var reader = new FileReader();
  
	  reader.onload = function() {
	    var dataUrl = reader.result;
	    var base64 = dataUrl.substr(dataUrl.lastIndexOf(',') + 1);
	    //var base64 = dataUrl.split(',')[1];
	    cb(base64,_parent);
	  };
	  
	  console.log(blob)
	  reader.readAsDataURL(blob);
  }
  else {
	  cb('',_parent);
  }
  
};

function convertURIToBinary(dataURI) {
  let BASE64_MARKER = ';base64,';
  let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  let base64 = dataURI.substring(base64Index);
  let raw = window.atob(base64);
  let rawLength = raw.length;
  let arr = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    arr[i] = raw.charCodeAt(i);
  }
  return arr;
}

function onload()
{
	console.log("LOAD")
}

function onerror()
{
	console.log("onerror")
}

