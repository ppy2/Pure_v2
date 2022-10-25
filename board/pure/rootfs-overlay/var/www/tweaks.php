
<head>
<title>Pure Tweaks</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
<link type="text/css" rel="stylesheet" href="style.css">
<script src="javascript.js"></script>
<?php
$update = 0;
include 'variables.php';
$checked = array();
$audioDataDisplay='none';
$rebootButtonDisplay='none';
foreach(range(0, 1) as $rating){
	$checked[$rating] = null;
	if(isset($_POST['rating'])){
		if(is_array($_POST['rating']) && in_array($rating, $_POST['rating']) ){
			$checked[$rating] = 'checked';
			if($rating==0){
				$rebootButtonDisplay='table-cell';
			};
			if($rating==1){
				$audioDataDisplay='table-cell';
			};
		};
	} else if (isset($_POST['empty'])){

	} else {
		if($valuesArray[$rating]==true){
			$checked[$rating] = 'checked';
			if($rating==0){
				$rebootButtonDisplay='table-cell';
			};
			if($rating==1){
				$audioDataDisplay='table-cell';
			};
		} else {
			$checked[$rating] = null;
		};
	};
};
?>
<?php include ($_SERVER['DOCUMENT_ROOT']."/var/www/plugins.php");?>
</head>



<body bgcolor="#565656" onload='pageLoad()'>
<div id='clickDisabler'>
</div>
<div id='fullContainer'>
	<div id='middleContainer'>
		<div id='preloadBack' >
			<div id='preload' >
			</div>
		</div>
		<table id='mainContent' cellspacing="0" cellpadding="0">
			<tr id='optionsTop' >
				<td id='audioTabInactive' >
					<span>
						<?php
						 $server = $_SERVER['HTTP_HOST'];
						 echo "&emsp;<a href=http://" ;
						 echo $server ;
						 echo "/tabs.php>Audio</a>";
						?>
					</span>
				</td>
				<td>

				</td>
				<td>
				</td>
				<td  id='superuserTab' class="active">
					<span>Tweaks</span>
				</td>
			</tr>
			<tr>
				<td colspan=4 id='contentCell' >

					<div id='superuserSel'>
						<div class='row'>
						</div>
						<div class='row'>
							<div id='output'>
								<span class="title">Plugin selection:</span>
								<div>
									<form method="post" action="" onchange="showResult()">
										<div>
											<label>
												<input type="hidden" name="empty" value="1"/>
												<input type="checkbox" name="rating[]" value="0" <?php echo $checked[0]; ?>>
												Reset button
											</label>
											<label>
												<input type="checkbox" name="rating[]" value="1" <?php echo $checked[1]; ?>>
												Audio bitrate
											</label>
											<input type="submit" id="editPluginsText" name="editPlugins" value="Save" class="selButtonText"/>

										</div>
									</form>
								</div>
							</div>
						</div>
						<div class='row'>
							<div id='editInternalSettings' >
								<span class="warn title">Attention!</font></span>
								<span>This command will erase all data on eMMC!</span>
								<form method="post">
									<div class='buttonSpacer'><input type="submit" name="eraseEmmc" id="eraseEmmc" value="Erase eMMC" /><br></div>
								</form>

							</div>
						</div>
						<div class='row'>

						</div>
					</div>
					<div id='sign'>
						<div></div><span>Pure</span>
					</div>
				</td>
			</tr>
		</table>
	</div>
</div>

</body>
<script>
function showResult()
{

document.getElementByName("resetButton");

}
</script>
<?php
	if($_POST['editPlugins']){
		//$values = array();
		foreach(range(0, 1) as $rating){
			if( isset($_POST['rating']) && is_array($_POST['rating']) && in_array($rating, $_POST['rating']) ){
				$valuesArray[$rating] = true;
			} else {
				$valuesArray[$rating] = false;
			};
		};
		$var_str = var_export($valuesArray, true);
		$var = "<?php\n\n\$valuesArray = $var_str;\n\n?>";
		file_put_contents('variables.php', $var);
	} else if($_POST['eraseEmmc']){
		$EMMC = `ls /dev/mmcblk1` ;
		$ROOT = `grep mmcblk0 /proc/cmdline` ;
		if (empty($EMMC)) {
		echo '<br><font color = "white">You don`t have built-in eMMC memory.</font>' ;
		} else {
			{`echo 1 > /sys/class/gpio/gpio113/value ;
			dd if=/dev/zero of=/dev/mmcblk1 bs=1M count=10 ;
			reboot ; ` ;  };
			echo '<script type="text/javascript">updatePage();</script>';
			echo '<script type="text/javascript">setTimeout(function() {window.location = window.location.href; }, 15000);</script>';
		};
	}
?>