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
	$val_actif = $dao -> IsNullOrEmptyString($data -> actifSmie) > 0 ? 0 : $data -> actifSmie;
	
	$SoU = $dao -> saveOrUpdateSmie(
		$data -> idSmie,
		$data -> nomSmie,
		$dao -> Montant($data -> plafondSmie),
		$data -> deductionEmploye,
		$data -> deductionEmployeur,
		$dao -> Montant($data -> coutExcedentaire),
		$dao -> Montant($data -> franchiseCoutExcendentaire),
		$data -> datePriseEffetSmie,
		$val_actif
	);
	echo $SoU;
}
?>
