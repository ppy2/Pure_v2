<?php
include 'variables.php';
$interfaceReceived = $_POST["interface"];
if ( $valuesArray['out'] == "i2sOutput"){
	$musicData = `cat /proc/asound/card0/pcm0p/sub0/hw_params` ;
} else if ( $valuesArray['out'] == "usbOutput"){
	if(is_dir("/proc/asound/card1/") && is_writeable("/proc/asound/card1/")){
		$musicData = `cat /proc/asound/card1/pcm0p/sub0/hw_params` ;
	} else {
		$musicData = `cat /proc/asound/card0/pcm0p/sub0/hw_params` ;
	}
} else if ( $valuesArray['out'] == "spdifOutput"){
	if(is_dir("/proc/asound/card1/") && is_writeable("/proc/asound/card1/")){
		$musicData = `cat /proc/asound/card1/pcm0p/sub0/hw_params` ;
	} else {
		$musicData = `cat /proc/asound/card0/pcm0p/sub0/hw_params` ;
	}
}
echo $musicData;
?>
