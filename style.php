<?php
	require("pscss/scss.inc.php");
	
	$scss = new scssc();
	$scss->setFormatter("scss_formatter_compressed");
	
	$inputFiles = glob("styles/*.scss");
	
	foreach($inputFiles AS $filePath)
	{
		$outPath = str_replace(".scss", ".css", $filePath);
		$nativeCssCode = $scss->compile(file_get_contents($filePath));
		
		file_put_contents($outPath, $nativeCssCode);
	}
?>