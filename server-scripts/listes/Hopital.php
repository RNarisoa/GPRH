<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getHopitalList();
$i=1;
$n=count($r);
$response = array();
foreach ($r as list($a, $b, $c, $d, $e, $f)) {
	array_push($response, array(
		'idHopital' => $a,
		'idAdes' => $b,
		'pourcentageEmployeHopital' => $c,
		'pourcentageEmployeurHopital' => $d,
		'datePriseEffetHopital' => $e,
		'actifHopital' => $f > 0 ? true : false,
	));
}

$arr['data'] = array_values($response);

$arr = json_encode($arr);
echo $arr;
?>
