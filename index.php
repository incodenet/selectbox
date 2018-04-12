<?php require("style.php"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>Selectbox</title>
	<link rel="stylesheet" href="styles/style.css">
</head>
<body>
	<h1>This is the selcetbox.</h1>
	



	<form name="my" action="" method="get">
		<div>
			<input type="text" placeholder="Name" name="name">
			<input type="text" placeholder="Surname" name="surname">
		</div><br><br>
	
		<div style="display: flex;justify-content: space-around;width: 1200px;max-width:100%;margin: 0 auto;">
			<div>
				<div>Default selectbox:</div>
			   <div class='selectbox' name="Fruits">
					<span class='selectedOption'>-- Select the fruit --</span>
					<div class="select">
						<span class="selectOption" data="1">Banana</span>
						<span class="selectOption" data="2">Apple</span>
						<span class="selectOption disabled" data="3">Orange</span>
						<span class="selectOption" data="4">Pinapple</span>
					</div>
				</div>
			</div>
			
			<div>
				<div>Default multple selectbox:</div>
				<div class='selectbox multiple-default' name="Names">
					<span class='selectedOption'>-- Select the name --</span>
					<div class="select">
						<span class="selectOption" data="11">Erik</span>
						<span class="selectOption" data="12">Սաշա</span>
						<span class="selectOption" data="13">Егор</span>
						<span class="selectOption" data="14">Greg</span>
						<span class="selectOption" data="15">Bred</span>
						<span class="selectOption" data="16">Zedd</span>
					</div>
				</div>
			</div>
			
			<div>
				<div>Multple selectbox:</div>
				<div class='selectbox multiple' name="Cars">
					<span class='selectedOption'>-- Select the car --</span>
					<div class="select">
						<span class="selectOption" data="21">Nissan</span>
						<span class="selectOption" data="22">Bentley</span>
						<span class="selectOption" data="23">Rolls-Royce</span>
						<span class="selectOption" data="24">Bugatti</span>
						<span class="selectOption" data="25">Pagani</span>
						<span class="selectOption" data="26">Spyker</span>
						<span class="selectOption" data="27">Koenigsegg</span>
					</div>
				</div>
			</div>
		</div>

			<select class="select">
				<option value="Bentley">Bentley</option>
				<option value="Bugatti" selected>Bugatti</option>
				<option value="Pagani" disabled>Pagani</option>
				<option value="Koenigsegg" selected>Koenigsegg</option>
			</select>

		<input type="submit" value="Submit" class="submit">

  	</form>

	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>	
	<script src="js/jquery-main.js"></script>
</body>
</html>