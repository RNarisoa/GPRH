<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getDepartementList();
$i=1;
$n=count($r);
$response = array();
foreach ($r as list($a, $b, $c)) {
	array_push($response, array(
		'idDepartement' => $a,
		'nomDepartement' => $b,
		'abreviationDepartement' => $c,
	));
}

$arr['data'] = array_values($response);

$arr = json_encode($arr);
echo $arr;
?>
