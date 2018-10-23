<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();
$r=$m->getDepartementList();
$i=1;
$n=count($r);
?>
{'data':[
<?php
if($n>0)
{
?>
{'idDepartement':'<?php echo $r[0][0]; ?>', 'nomDepartement':'<?php echo $r[0][1]; ?>', 'abreviationDepartement':'<?php echo str_replace('"','\"',$r[0][2]); ?>'}
<?php
while($i<$n)
{
?>
,{'idDepartement':'<?php echo $r[$i][0]; ?>', 'nomDepartement':'<?php echo $r[$i][1]; ?>', 'abreviationDepartement':'<?php echo str_replace('"','\"',$r[$i][2]); ?>'}
<?php
$i++;
}
}
?>
]}