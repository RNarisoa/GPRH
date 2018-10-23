<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getCentreList();
$i=1;
$n=count($r);
?>
{'data':[
<?php
if($n>0)
{
?>
{'idCentre':'<?php echo $r[0][0]; ?>', 'abreviationCentre':'<?php echo $r[0][1]; ?>', 'nomCentre':'<?php echo str_replace('"','\"',$r[0][2]); ?>','adresseCentre':'<?php echo $r[0][3]; ?>'}
<?php
while($i<$n)
{
?>
,{'idCentre':'<?php echo $r[$i][0]; ?>', 'abreviationCentre':'<?php echo $r[$i][1]; ?>', 'nomCentre':'<?php echo str_replace('"','\"',$r[$i][2]); ?>','adresseCentre':'<?php echo $r[$i][3]; ?>'}
<?php
$i++;
}
}
?>
]}