<!DOCTYPE html>
<html>
<head>
	<title>Puissance 4</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="jquery.js"></script>
	<script type="text/javascript" src="puissance4.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">


</head>
<body>
	<div class="header">
		<h1>Puissance 4</h1>
	</div>

	<div class="options">
		<form method="post">
			<label>Rows</label>
			<select name="row"><?php for($i = 6 ; $i <= 15; $i++){
				echo "<option value='".$i."'>". $i ."</option>"; } ?>
			</select>
			<label>Columns</label>
			<select name="col"><?php for($i = 7 ; $i <= 15; $i++){
				echo "<option value='".$i."'>". $i ."</option>"; } ?>
			</select>
			<input type="submit" name="go">
		</form>
	</div>
	<div id="container">
	</div>
	<?php
	if(!empty($_POST['go'])){
	echo"<script>
		
		$('#container').puissance_4(".$_POST['row'].",".$_POST['col'].");
		</script>"; 
	}?>

	<div class=""></div>
	
</body>
</html>