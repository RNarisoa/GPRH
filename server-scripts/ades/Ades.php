<?php
require_once '../DataAccessObject.php';

$m = new DataAccessObject();

$model = json_decode($_POST['model']);
$key = "infoRequest";
$infoRequest = $model -> $key;

if ($infoRequest == 1) {
	InfoRequest($m);
}
elseif ($infoRequest == 2) {
	$data_key = "data";
	$data = $model -> $data_key;
	SaveOrUpdate($m, $data);
}

function InfoRequest($dao) {
	$r = $dao -> getAdesInformations();
	$s = $dao -> countEmployes();
	$t = $dao -> countCentres();
	$n=count($r);
	if($n>0)
	{
		$response = 
		'{"data":
			{
			"ID_ADES":"'.$r[0][0].'",
			"RAISON_SOCIALE":"'.$r[0][1].'",
			"ADRESSE_COMPLETE":"'.$r[0][2].'",
			"NIF":"'.$r[0][3].'",
			"STAT":"'.$r[0][4].'",
			"TELEPHONE":"'.$r[0][5].'",
			"DESCRIPTION_ADES":"'.$r[0][6].'",
			"SITE_WEB":"'.$r[0][7].'",
			"EFFECTIF_PERSONNEL":"'.$s[0][0].'",
			"EFFECTIF_CENTRE":"'.$t[0][0].'"
			}
		}';
		echo $response;
	}
}

function SaveOrUpdate($dao, $data) {
	$SoU = $dao -> saveOrUpdateAdes(
		$data -> ID_ADES,
		$data -> RAISON_SOCIALE,
		$data -> ADRESSE_COMPLETE,
		$data -> NIF,
		$data -> STAT,
		$data -> TELEPHONE,
		$data -> DESCRIPTION_ADES,
		$data -> SITE_WEB
	);
	echo $SoU;
}
?>
