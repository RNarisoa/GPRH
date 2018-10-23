<?php
require_once '../DataAccessObject.php';

$m=new DataAccessObject();

$nomUtilisateur = $_POST['nomUtilisateur'];
$motDePasse = $_POST['motDePasse'];

$r=$m->verifLogin($nomUtilisateur, $motDePasse);
if ($r[0][0] > 0) {
?>
	{
		'success': true,
		'nomUtilisateur': '<?php echo $r[0][1];?>',
		'avatar': '<?php echo $r[0][2];?>',
	}
<?php	
}
else {
?>
	{'failure':true}
<?php
}
?>