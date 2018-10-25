<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getCnapsList();
$i=1;
$n=count($r);
$response = array();
foreach ($r as list($a, $b, $c, $d, $e, $f, $g)) {
	array_push($response, array(
		'idCnaps' => $a,
		'idAdes' => $b,
		'plafondCnaps' => $c,
		'pourcentageEmployeCnaps' => $d,
		'pourcentageEmployeurCnaps' => $e,
		'datePriseEffetCnaps' => $f,
		'actifCnaps' => $g > 0 ? true : false,
	));
}

$arr['data'] = array_values($response);

$arr = json_encode($arr);
echo $arr;
?>
