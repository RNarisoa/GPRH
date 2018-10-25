<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getIrsaList();
$i=1;
$n=count($r);
$response = array();
foreach ($r as list($a, $b, $c, $d, $e, $f, $g, $h)) {
	array_push($response, array(
		'idIrsa' => $a,
		'idAdes' => $b,
		'plafond' => $c,
		'pourcentageEmployeIrsa' => $d,
		'pourcentageEmployeurIrsa' => $e,
		'deductionEnfant' => $f,
		'datePriseEffetIrsa' => $g,
		'actifIrsa' => $h > 0 ? true : false,
	));
}

$arr['data'] = array_values($response);

$arr = json_encode($arr);
echo $arr;
?>
