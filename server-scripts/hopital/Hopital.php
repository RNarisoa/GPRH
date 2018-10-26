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
	$val_actif = $dao -> IsNullOrEmptyString($data -> actifHopital) > 0 ? 0 : $data -> actifHopital;

	$SoU = $dao -> saveOrUpdateHopital(
		$data -> idHopital,
		1,
		$data -> pourcentageEmployeHopital,
		$data -> pourcentageEmployeurHopital,
		$data -> datePriseEffetHopital,
		$val_actif
	);
	echo $SoU;
}
?>
