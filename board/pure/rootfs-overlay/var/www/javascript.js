function updatePage () {
	document.getElementById("preloadBack").style.display="block";
	document.getElementById("clickDisabler").style.display="block";
	document.getElementById("mainContent").style.webkitFilter = "blur(10px)";
	selSystemTab();
}

function updatePageEnd () {
	
	document.getElementById("preloadBack").style.display="none";
	document.getElementById("mainContent").style.webkitFilter = "blur(0px)";
}

function removeSelButtons(){
	document.getElementById("settingsLink").style.display="none";
	var parCont = document.getElementById('iconContainer').getElementsByTagName('input');
	for (var i = 0; i < parCont.length; i++) {
		if ( parCont[i].className.includes("Text") == true ){
			parCont[i].classList.remove('selButtonText');
			parCont[i].classList.add('unselButtonText');
		} else {
			parCont[i].classList.remove('selButton');
			parCont[i].classList.add('unselButton');
		}
	}
}

function selAudioTab() {
	var protocolSel = document.getElementById("protocolSel");
	var systemSel = document.getElementById("systemSel");
	var audioTab = document.getElementById("audioTab");
	var systemTab = document.getElementById("systemTab");
	protocolSel.style.display="table";
	systemSel.style.display="none";
	audioTab.classList.add('active');
	systemTab.classList.remove('active');
	setCookie( 'activeTab', 'audio', 600 );
}

function selSystemTab() {
	var protocolSel = document.getElementById("protocolSel");
	var systemSel = document.getElementById("systemSel");
	var audioTab = document.getElementById("audioTab");
	var systemTab = document.getElementById("systemTab");
	systemSel.style.display="table";
	protocolSel.style.display="none";
	systemTab.classList.add('active');
	audioTab.classList.remove('active');
	setCookie( 'activeTab', 'system', 600 );
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function pageLoad() {
	var audioTab = document.getElementById("audioTab");
	var systemTab = document.getElementById("systemTab");
	var tabSaved = getCookie( 'activeTab' );	
	if ( tabSaved == 'audio' ){
		audioTab.classList.add('active');
		systemTab.classList.remove('active');
		selAudioTab();
	} else if ( tabSaved == 'system' ){
		systemTab.classList.add('active');
		audioTab.classList.remove('active');
		selSystemTab();
	} else {
		audioTab.classList.add('active');
		var protocolSel = document.getElementById("protocolSel");
		protocolSel.style.display="table";
	}
}