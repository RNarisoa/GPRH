<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getCentreList();
$i=1;
$n=count($r);
$response = array();
foreach ($r as list($a, $b, $c, $d)) {
	array_push($response, array(
		'idCentre' => $a,
		'abreviationCentre' => $b,
		'nomCentre' => $c,
		'adresseCentre' => $d
	));
}

$arr['data'] = array_values($response);

$arr = json_encode($arr);
echo $arr;
?>
