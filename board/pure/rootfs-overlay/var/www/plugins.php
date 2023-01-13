<?php
$update = 0;
include 'variables.php';
?>
<script src="javascript.js"></script>
<script type="text/javascript">

	var audioDataDisplay = "<?php echo $audioDataDisplay; ?>";
	var rebootButtonDisplay = "<?php echo $rebootButtonDisplay; ?>";

	var audioDataToSplit = '';

	function getAudioData(path) {

		var outputSelectedElement = document.getElementsByClassName("unselOutputText");
		if (outputSelectedElement.length > 0){
			var outputSelectedText = outputSelectedElement[0].innerText;
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						var rawAudioData = xhr.responseText;
						audioDataToSplit = rawAudioData.replace(/(\r\n|\n|\r)/gm, " , ");
						formatAudioData();
					} else {
						console.log('error getting data');
					}
				}
			};

			xhr.open("POST", path, true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			if (outputSelectedText.substring(0,3) == 'I2S'){
				xhr.send('interface=I2S');
			} else if ( outputSelectedText == 'USB' ) {
				xhr.send('interface=USB');
			} else if ( outputSelectedText == 'SPDIF' ) {
				xhr.send('interface=SPDIF');
			}
		}
	}

	function UpdateFireBox(){
			getAudioData("getMusicFormat.php");
			setTimeout(function() {
			UpdateFireBox();
			}, 2000)
    }

	function formatAudioData(){
		if (audioDataToSplit !== '' ){
			var audioDataToFormat = audioDataToSplit.split(' , ');
			if ( audioDataToFormat.length > 2  ){
				var srSplitText = audioDataToFormat[4].split(' ');
				var bitSplitText = audioDataToFormat[1].split(' ');
				var chSplitText = audioDataToFormat[3].split(' ');
				var finalAudioString = [];
				if (srSplitText.length > 1){
					if( bitSplitText[0] == 'DSD' ){
						finalAudioString.push('DSD' + (parseInt(srSplitText[1])/1378.125).toString());
					} else {
						finalAudioString.push(srSplitText[1]);
					}
				}
				if (bitSplitText.length > 1){
					if( bitSplitText[0] == 'DSD' ){
						finalAudioString.push( bitSplitText[1].substr(5, 6) );
					} else {
						finalAudioString.push( bitSplitText[1].substr(1, 2) );
					}
				}
				if (chSplitText.length > 1){
					finalAudioString.push('Ch' + chSplitText[1]);
				}
				para.innerHTML = finalAudioString.join(' | ');
				if (rebootButtonDisplay==0){
					document.getElementById('sign').getElementsByTagName('span')[0].style.setProperty('padding-left', 10);
				}
				para.style.setProperty('display', audioDataDisplay);
			} else {
				para.style.setProperty('display', audioDataDisplay);
				if (rebootButtonDisplay==0){
					document.getElementById('sign').getElementsByTagName('span')[0].style.setProperty('padding-left', 0);
				}
			}
		} else {
			para.style.setProperty('display', audioDataDisplay);
		}
	}

	function launchAudioDataDisplay(){
		para = document.createElement("div");
		para.id = 'audioData';
		document.getElementById("sign").appendChild(para);
		para.style.cssText = "display: table-cell;vertical-align: middle;background: rgb(58, 58, 58);box-shadow: none;color: rgb(177, 177, 177);text-shadow: 0px 2px 0px rgb(0, 0, 0);white-space: nowrap;padding: 0 10px;background: transparent;";
		para.style.setProperty('display', rebootButtonDisplay);
		UpdateFireBox();
	}

	function updatePageReboot() {
		document.getElementById("preloadBack").style.display="block";
		document.getElementById("clickDisabler").style.display="block";
		document.getElementById("mainContent").style.webkitFilter = "blur(10px)";
	}

	async function removeday(e) {
    e.preventDefault();
		updatePageReboot();
		setTimeout(function() {getUpdateOutput(); }, 3000);
    // await fetch('?reboot=1');
	}

	function launchrebootButtonDisplayDisplay(){
    form = document.createElement("form");
		form.method = "post";
		// form.action = " ";
		// form.setAttribute("onSubmit", "event.preventDefault()");
		form.style.cssText = `
			display: table;
    	height: 100%;
    	margin-block-end: 0em;
		`;
		but = document.createElement("input");
		but.id = 'rebootButtonDisplay';
		but.name="resButton";
		but.type = "submit";
		but.value = "Pure";
		// but.innerHTML="Pure";
		// but.onclick=removeday;
		but.style.cssText = `
			cursor: pointer;
			border: 0;
			display: table-cell;
			margin: 0 0 0 -3px;
			height: 100%;
			padding: 0px 10px 0px 31px;
			vertical-align: middle;
			color: rgb(14, 14, 14);
			text-shadow: 0px 1px 0px rgb(78 78 78);
			background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAARCAYAAAACCvahAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIzQUU0MzM3NDg3MDExRUM5QUNDQjg4MTM1NDY5NTNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIzQUU0MzM4NDg3MDExRUM5QUNDQjg4MTM1NDY5NTNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjNBRTQzMzU0ODcwMTFFQzlBQ0NCODgxMzU0Njk1M0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjNBRTQzMzY0ODcwMTFFQzlBQ0NCODgxMzU0Njk1M0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5P7RA2AAACeUlEQVR42nRTS2hTURB9972kSZqYtFWs1BaqBT87TRSNOxE/YOtGdyLiwkUtii6kiuJCNwpdKyhCq7jThVRRTBeCEDFEpR8NVdOkiBHb5DUxeblJ3s8zj2vponlwOJmZM3PvzJ1IUpPPHu49DMwCR5pp5CZ+pcCt3eAtas1h12oi14qTvKAbwCd2J/v6m6p3RDd6pNmC3gGfV9wgAtxEnK88memWfRd8tW7ap8D+harZRoE8d9gP/0nwFejukX45efFCT79bZmc03c6dj6mjcAXp6hSzbIeDQ28KY5WGlYPuNPQD/5MVOM6RMZIoxR9MlsnnRtJyR2Q/nKooI4m/cXIIvYt6DsCIVHWbP5qppGH/BjQUSWq6tfnJV+0j2eQfQ/zynhCHPkytUHLIrUhrMF2+VLOmYf8AzFdzPAOM4/ccUCF/qW5NlRsWb/fKAcqjK7ai11qwRfZFNnjysIviJCqSEEx2MdzZshjyyD5u2HXKc3r+ruq5VjfzXouGdsI2AArOA58Fk21c39cW9rmYL71k5CiPkk308oEGsbfLc3F+sHubGBK9ZUmwnR3s3or4JdKNTjt6k96rBxh4caLz7NE+3w7TdgY2rDApJloIwXcIfBu+rpdpPtn/9M992ONMvGkU1znw/Pj6/Qd7fbvE+6gI5sHrwLRl0kSWJ489W3iLnidgvldEj7phSf7HXzS9WLeyfe0uze+WA4yxtQ3T5pmSkboVL70biqkp6GagT9LyMbEIHmAT3QDYDrQANSpKO0G7DTSAFJ0IZGiIikg2gTJQEG9qifWURZFfYvJ04k8xfYmt8i/z05DoHUUBKlwVk9dEm873T4ABAEUzEf3shBVTAAAAAElFTkSuQmCC') no-repeat top 6px left 10px
		`;
		sign = document.getElementById("sign");
		document.getElementById("sign").children[0].style.float='left';
		signSpan = sign.getElementsByTagName('span')[0];
		form.appendChild(but);
		signSpan.parentElement.replaceChild(form, signSpan);
	}

	if (audioDataDisplay=="table-cell"){
		document.addEventListener("DOMContentLoaded", function() {launchAudioDataDisplay();});
	}

	if (rebootButtonDisplay=="table-cell"){
		document.addEventListener("DOMContentLoaded", function() {launchrebootButtonDisplayDisplay();});
	}

</script>
 <?php

  // if (isset($_GET['reboot'])) {
		// `sync && reboot` ;
	//} else 
	if (isset($_POST['resButton'])) {
		echo '<script type="text/javascript">updatePage();</script>';
		echo '<script type="text/javascript">setTimeout(function() {getUpdateOutput(); }, 12000);</script>';
    exec ('/opt/reboot.sh' . '>/dev/null &');
    // `reboot`;
  };
?>
