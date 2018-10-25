<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getSalaireBaseList();
$i=1;
$n=count($r);
$response = array();
foreach ($r as list($a, $b, $c, $d, $e, $f, $g, $h, $i)) {
	array_push($response, array(
		'idLigneGrille' => $a,
		'idGroupe' => $b,
		'idCategorie' => $c,
		'salaireBase3' => $d,
		'salaireBase4' => $e,
		'salaireBase5' => $f,
		'actifLigneGrille' => $g > 0 ? true : false ,
		'datePriseEffetGrille' => $h,
		'nomGroupe' => $i,
		'categorieProfessionnelle' => $j

	));
}

$arr['data'] = array_values($response);

$arr = json_encode($arr);
echo $arr;
?>
