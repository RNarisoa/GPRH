<?php
require_once '../DataAccessObject.php';

$m = new DataAccessObject();

$model = json_decode($_POST['model']);
$key = "infoRequest";
$infoRequest = $model -> $key;

if ($infoRequest == 2) {
	$data_key = "data";
	$data = $model -> $data_key;
	SaveOrUpdate($m, $data);
}

/*
 * Save or update changed data from Centre grid in Tab Panel
 * 
 */
function SaveOrUpdate($dao, $data) {
	$SoU = $dao -> saveOrUpdateDepartement(
		$data -> idDepartement,
		$data -> nomDepartement,
		$data -> abreviationDepartement
	);
	echo $SoU;
}
?>
