<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getCategorieList();
$i=1;
$n=count($r);
$response = array();
foreach ($r as list($a, $b, $c, $d, $e)) {
	array_push($response, array(
		'idCategorie' => $a,
		'idGroupeCategorie' => $b,
		'categorieProfessionnelle' => $c,
		'descriptionCategorie' => $d,
		'nomGroupe' => $e
	));
}

$arr['data'] = array_values($response);

$arr = json_encode($arr);
echo $arr;
?>
