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
	$val_actif = ($dao -> IsNullOrEmptyString(isset($data -> actifLigneGrille)) > 0 ? 0 : $data -> actifLigneGrille);

	$SoU = $dao -> saveOrUpdateSalaireBase(
		$data -> idLigneGrille,
		$data -> idGroupe,
		$data -> idCategorie,
		$dao -> Montant($data -> salaireBaseMinimum),
		$dao -> Montant($data -> salaireBase3),
		$dao -> Montant($data -> salaireBase4),
		$dao -> Montant($data -> salaireBase5),
		$val_actif,
		$data -> datePriseEffetGrille
	);
	echo $SoU;
}
?>
