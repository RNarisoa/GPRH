<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getGroupeList();
$i=1;
$n=count($r);
$response = array();
foreach ($r as list($a, $b)) {
	array_push($response, array(
		'idGroupeCategorie' => $a,
		'nomGroupe' => $b
	));
}

$arr['data'] = array_values($response);

$arr = json_encode($arr);
echo $arr;
?>
