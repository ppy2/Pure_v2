function isOnline(no,yes){
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
    xhr.onload = function(){
        if(yes instanceof Function){
            yes();
        }
    }
    xhr.onerror = function(){
        if(no instanceof Function){
            no();
        }
    }
    xhr.open("GET","../../tmp/done",true);
    xhr.send();
}

function getUpdateOutput() {
    var checkForSerer = setInterval(function() {
      isOnline(
        function(){
          console.log("Server is offline");
        },
        function(){
          console.log("Refresh page");
          setTimeout(function(){window.location = window.location.href;}, 2000);
          clearInterval(checkForSerer);
        }
      );
      console.log("waiting for refresh");
  }, 2000); }

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
	console.log("coockie audio saved")
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
	console.log("coockie system saved")
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
	var ipSetCnt = document.getElementById("ipSet")
	var tabSaved = getCookie( 'activeTab' );	

	if (ipSetCnt!=null){
		var ipSetCntChilds = ipSetCnt.getElementsByTagName("*");
		var cells = [];
		for (var i = 0; i < ipSetCntChilds.length; i++) {
	        if (ipSetCntChilds[i].className == "cellField") {
	            cells.push(ipSetCntChilds[i]);
	        }        
		};
		var checkPos = 1;
		var cellnum = 0;
		var allowkey = false;
		ipSetCnt.onkeydown = function(e) {
	        var charCode = (e.which) ? e.which : e.keyCode
	        if (charCode == 13 && charCode != 37 && charCode != 39 && charCode > 31 && ((charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105))){
	    	    e.preventDefault();
	    	    allowkey = false;
	    	} else if (charCode == 37 || charCode == 39){
	    	    allowkey = false;
	        } else if (charCode==9){
			    allowkey = false;
	        } else {
	    	    allowkey = true;
	        }
		}

		ipSetCnt.onkeyup = function(e) {

		var charCode = (e.which) ? e.which : e.keyCode
		var target = e.srcElement || e.target;
	    var maxLength = parseInt(target.attributes["maxlength"].value, 10);
			if (allowkey == true){
	    	    for(var i=0;i<cells.length;i++){
			        if(cells[i].firstChild.getAttribute("id")==document.activeElement.getAttribute("id")){
				        cellnum = i
				    }
				}
				var myLength = cells[cellnum].firstChild.value.length;
				if (myLength == 0){
		    	    checkPos -= 1;
		        } else {
		    	    checkPos = myLength + 1;
		        }
		        if (myLength >= maxLength && cellnum < cells.length) {
		  	        cellnum += 1;
		  	        checkPos = 1;
		            cells[cellnum].firstChild.focus();
		        } else if (checkPos == 0 && cellnum > 0) {
		            cellnum -= 1;
		            cells[cellnum].firstChild.focus();
		            checkPos += 1;
		        }
	        } 
		}
	}

	

	if ( tabSaved == 'audio' ){
		if (audioTab != null && systemTab != null){
			audioTab.classList.add('active');
			systemTab.classList.remove('active');
			selAudioTab();
		}
		
	} else if ( tabSaved == 'system' ){
		if (audioTab != null && systemTab != null){
			audioTab.classList.remove('active');
			systemTab.classList.add('active');
			selSystemTab();
		}
	} else {
		if (audioTab != null){
			audioTab.classList.add('active');
		}
		var protocolSel = document.getElementById("protocolSel");
		protocolSel.style.display="table";
	}

	
}

