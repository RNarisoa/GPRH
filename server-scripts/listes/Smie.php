<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getSmieList();
$i=1;
$n=count($r);
$response = array();
foreach ($r as list($a, $b, $c, $d, $e, $f, $g, $h, $i)) {
	array_push($response, array(
		'idSmie' => $a,
		'nomSmie' => $b,
		'plafondSmie' => $c,
		'deductionEmploye' => $d,
		'deductionEmployeur' => $e,
		'coutExcedentaire' => $f,
		'franchiseCoutExcendentaire' => $g,
		'datePriseEffetSmie' => $h,
		'actifSmie' => $i > 0 ? true : false
	));
}

$arr['data'] = array_values($response);

$arr = json_encode($arr);
echo $arr;
?>
