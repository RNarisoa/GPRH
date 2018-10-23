<?php
/*$grievToken='--X85s93QSlmqpoe236iA98DgserFmpclal--';
$grievAttach='grievance-attachments/';
$host='http://www.tma-madagascar.com/lbmis/';
$workCert='photo-cert/';*/
class DataAccessObject
{
	private $_query;
	private $_mysqli;
	private $_usersession = "../usersession";
	function __construct()
	{
		$this -> _mysqli = new mysqli('localhost','root','', 'ades_v_test') or die('DB server could not be reached');
	}
	function select()
	{
		$r = mysqli_query($this -> _mysqli, $this -> _query);
		$res = array();

		while($l = mysqli_fetch_row($r))
			array_push($res, $l);

		return $res;
	}
	function update($id)
	{
		mysqli_query($this -> _mysqli, $this -> _query);
		return (($this -> IsNullOrEmptyString($id) > 0) ? $this -> lastInsertId() : $id);
	}
	function close()
	{
		$this -> _mysqli -> close();
	}
	function lastInsertId()
	{
		$this -> _query = "SELECT LAST_INSERT_ID()";

		return $this -> select();
	}
	// Function for basic field validation (present and neither empty nor only white space
	function IsNullOrEmptyString($str){
		return (!isset($str) || trim($str) === '');
	}
	/************************************************************************************************/
	function getCentreList()
	{
		$this -> _query = "SELECT ID_CENTRE, ABREVIATION_CENTRE, NOM_CENTRE, ADRESSE_CENTRE FROM centre ORDER BY NOM_CENTRE desc";
		return $this -> select();
	}

	function verifLogin($nomUtilisateur, $motDePasse)
	{
		$this -> _query = "SELECT count(*), nom_utilisateur, avatar FROM utilisateur WHERE nom_utilisateur = '$nomUtilisateur' AND mot_de_passe = PASSWORD('$motDePasse')";

		return $this -> select();
	}

	function getAdesInformations() {
		$this -> _query = "SELECT ID_ADES, RAISON_SOCIALE, ADRESSE_COMPLETE, NIF, STAT, TELEPHONE, DESCRIPTION_ADES, SITE_WEB FROM ades WHERE 1";

		return $this -> select(); 
	}

	function countEmployes() {
		$this -> _query = "SELECT count(*) FROM personnel WHERE 1";

		return $this -> select(); 
	}

	function countCentres() {
		$this -> _query = "SELECT count(*) FROM centre WHERE 1";

		return $this -> select();
	}

	function saveOrUpdateAdes($ID_ADES, $RAISON_SOCIALE, $ADRESSE_COMPLETE, $NIF, $STAT, $TELEPHONE, $DESCRIPTION_ADES, $SITE_WEB) {
		if ($this -> IsNullOrEmptyString($ID_ADES) > 0) {
			// ID_ADES is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO ades (RAISON_SOCIALE, ADRESSE_COMPLETE, NIF, STAT, TELEPHONE, DESCRIPTION_ADES, SITE_WEB) values ('$RAISON_SOCIALE', '$ADRESSE_COMPLETE', '$NIF', '$STAT', '$TELEPHONE', '$DESCRIPTION_ADES', '$SITE_WEB')";
		} else {
			// UPDATE WHERE ID_ADES is
			$this -> _query = "UPDATE ades SET RAISON_SOCIALE='$RAISON_SOCIALE',ADRESSE_COMPLETE='$ADRESSE_COMPLETE',NIF='$NIF',STAT='$STAT',TELEPHONE='$TELEPHONE',DESCRIPTION_ADES='$DESCRIPTION_ADES',SITE_WEB='$SITE_WEB' WHERE ID_ADES='$ID_ADES'";			
		}

		return $this -> update($ID_ADES);
	}

	function getDepartementList()
	{
		$this -> _query = "SELECT ID_DEPARTEMENT, NOM_DEPARTEMENT, ABREVIATION_DEPARTEMENT FROM departement ORDER BY NOM_DEPARTEMENT desc";
		return $this -> select();
	}
}
?>