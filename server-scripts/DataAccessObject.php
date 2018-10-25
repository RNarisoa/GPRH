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
		return (($this -> IsNullOrEmptyString($id) > 0) ? $this -> lastInsertId()[0][0] : $id);
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
	// Function for checking all actif parameters value if their exist, they will be removed before inserting new one
	function CheckExistActif($table, $field, $condition) {
		$this -> _query = "SELECT $field FROM $table WHERE $conditions";

		return $this -> select();
	}

	function Montant($str) {
		return str_replace(' ', '', $str);
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

	function getDepartementList() {
		$this -> _query = "SELECT ID_DEPARTEMENT, NOM_DEPARTEMENT, ABREVIATION_DEPARTEMENT FROM departement ORDER BY NOM_DEPARTEMENT desc";
		return $this -> select();
	}

	function saveOrUpdateCentre($idCentre, $nomCentre, $abreviationCentre, $adresseCentre) {
		if ($this -> IsNullOrEmptyString($idCentre) > 0) {
			// ID_CENTRE is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO centre (NOM_CENTRE, ABREVIATION_CENTRE, ADRESSE_CENTRE) values ('$nomCentre', '$ABREVIATION_CENTRE', '$adresseCentre')";
		} else {
			// UPDATE WHERE ID_CENTRE is
			$this -> _query = "UPDATE centre SET NOM_CENTRE='$nomCentre',ABREVIATION_CENTRE='$abreviationCentre',ADRESSE_CENTRE='$adresseCentre' WHERE ID_CENTRE='$idCentre'";
		}
		
		return $this -> update($ID_CENTRE);
	}

	function saveOrUpdateDepartement($idDepartement, $nomDepartement, $abreviationDepartement) {
		if ($this -> IsNullOrEmptyString($idDepartement) > 0) {
			// ID_DEPARTEMENT is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO departement(NOM_DEPARTEMENT, ABREVIATION_DEPARTEMENT) VALUES ('$nomDepartement','$abreviationDepartement')";
		} else {
			// UPDATE WHERE ID_DEPARTEMENT is
			$this -> _query = "UPDATE departement SET NOM_DEPARTEMENT='$nomDepartement',ABREVIATION_DEPARTEMENT='$abreviationDepartement' WHERE ID_DEPARTEMENT='$idDepartement'";
		}
		
		return $this -> update($idDepartement);
	}

	function getCnapsList()	{
		$this -> _query = "SELECT ID_CNAPS, ID_ADES, PLAFOND_CNAPS, POURCENTAGE_EMPLOYE_CNAPS, POURCENTAGE_EMPLOYEUR_CNAPS, DATE_PRISE_EFFET_CNAPS, ACTIF_CNAPS FROM cnaps WHERE 1 ORDER BY DATE_PRISE_EFFET_CNAPS asc";

		return $this -> select();
	}

	function saveOrUpdateCnaps($idCnaps, $idAdes, $plafondCnaps, $pourcentageEmployeCnaps, $pourcentageEmployeurCnaps, $datePriseEffetCnaps, $actifCnaps) {
		if ($this -> IsNullOrEmptyString($idCnaps) > 0) {
			// ID_CNAPS is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO cnaps (ID_ADES, PLAFOND_CNAPS, POURCENTAGE_EMPLOYE_CNAPS, POURCENTAGE_EMPLOYEUR_CNAPS, DATE_PRISE_EFFET_CNAPS, ACTIF_CNAPS) VALUES ($idAdes, '$plafondCnaps', '$pourcentageEmployeCnaps', '$pourcentageEmployeurCnaps', '$datePriseEffetCnaps', $actifCnaps)";
		} else {
			// UPDATE WHERE ID_CNAPS is
			$this -> _query = "UPDATE cnaps SET ID_ADES='$idAdes',PLAFOND_CNAPS='$plafondCnaps',POURCENTAGE_EMPLOYE_CNAPS='$pourcentageEmployeCnaps',POURCENTAGE_EMPLOYEUR_CNAPS='$pourcentageEmployeurCnaps',DATE_PRISE_EFFET_CNAPS='$datePriseEffetCnaps',ACTIF_CNAPS=$actifCnaps WHERE ID_CNAPS='$idCnaps'";
		}
		
		return $this -> update($idCnaps);
	}

	function getIrsaList() {
		$this -> _query = "SELECT ID_IRSA, ID_ADES, PLAFOND, POURCENTAGE_EMPLOYE_IRSA, POURCENTAGE_EMPLOYEUR_IRSA, DEDUCTION_ENFANT, DATE_PRISE_EFFET_IRSA, ACTIF_IRSA FROM irsa WHERE 1 ORDER BY DATE_PRISE_EFFET_IRSA asc";

		return $this -> select();
	}

	function saveOrUpdateIrsa($idIrsa, $idAdes, $plafond, $pourcentageEmployeIrsa, $pourcentageEmployeurIrsa, $deductionEnfant, $datePriseEffetIrsa, $actifIrsa) {
		if ($this -> IsNullOrEmptyString($idIrsa) > 0) {
			// ID_IRSA is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO irsa (ID_ADES, PLAFOND, POURCENTAGE_EMPLOYE_IRSA, POURCENTAGE_EMPLOYEUR_IRSA, DEDUCTION_ENFANT, DATE_PRISE_EFFET_IRSA, ACTIF_IRSA) VALUES ($idAdes,'$plafond','$pourcentageEmployeIrsa','$pourcentageEmployeurIrsa','$deductionEnfant','$datePriseEffetIrsa',$actifIrsa)";
		} else {
			// UPDATE WHERE ID_IRSA is
			$this -> _query = "UPDATE irsa SET ID_ADES='$idAdes',PLAFOND='$plafond',POURCENTAGE_EMPLOYE_IRSA='$pourcentageEmployeIrsa',POURCENTAGE_EMPLOYEUR_IRSA='$pourcentageEmployeurIrsa',DEDUCTION_ENFANT='$deductionEnfant',DATE_PRISE_EFFET_IRSA='$datePriseEffetIrsa',ACTIF_IRSA=$actifIrsa WHERE ID_IRSA='$idIrsa'";
		}
		
		return $this -> update($idIrsa);
	}
	
	function getHopitalList()
	{
		$this -> _query = "SELECT ID_HOPITAL, ID_ADES, POURCENTAGE_EMPLOYE_HOPITAL, POURCENTAGE_EMPLOYEUR_HOPITAL, DATE_PRISE_EFFET_HOPITAL, ACTIF_HOPITAL FROM Hopital WHERE 1 ORDER BY DATE_PRISE_EFFET_HOPITAL asc";

		return $this -> select();
	}

	function saveOrUpdateHopital($idHopital, $idAdes, $pourcentageEmployeHopital, $pourcentageEmployeurHopital, $datePriseEffetHopital, $actifHopital) {
		if ($this -> IsNullOrEmptyString($idHopital) > 0) {
			// ID_HOPITAL is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO Hopital (ID_ADES, POURCENTAGE_EMPLOYE_HOPITAL, POURCENTAGE_EMPLOYEUR_HOPITAL, DATE_PRISE_EFFET_HOPITAL, ACTIF_HOPITAL) VALUES ($idAdes,'$pourcentageEmployeHopital','$pourcentageEmployeurHopital','$datePriseEffetHopital',$actifHopital)";
		} else {
			// UPDATE WHERE ID_HOPITAL is
			$this -> _query = "UPDATE Hopital SET ID_ADES='$idAdes',POURCENTAGE_EMPLOYE_HOPITAL='$pourcentageEmployeHopital',POURCENTAGE_EMPLOYEUR_HOPITAL='$pourcentageEmployeurHopital',DATE_PRISE_EFFET_HOPITAL='$datePriseEffetHopital',ACTIF_HOPITAL=$actifHopital WHERE ID_HOPITAL='$idHopital'";
		}
		
		return $this -> update($idHopital);
	}

	function getGroupeList()
	{
		$this -> _query = "SELECT ID_GROUPE_CATEGORIE, NOM_GROUPE FROM groupe_categorie WHERE 1 ORDER BY NOM_GROUPE asc";

		return $this -> select();
	}

	function saveOrUpdateGroupe($idGroupeCategorie, $nomGroupe) {
		if ($this -> IsNullOrEmptyString($idGroupeCategorie) > 0) {
			// ID_GROUPE_CATEGORIE is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO groupe_categorie(NOM_GROUPE) VALUES ('$nomGroupe')";
		} else {
			// UPDATE WHERE ID_GROUPE_CATEGORIE is
			$this -> _query = "UPDATE groupe_categorie SET NOM_GROUPE='$nomGroupe' WHERE ID_GROUPE_CATEGORIE='$idGroupeCategorie'";
		}
		
		return $this -> update($idGroupeCategorie);
	}

	function getCategorieList()	{
		$this -> _query = "SELECT c.ID_CATEGORIE, c.ID_GROUPE_CATEGORIE, c.CATEGORIE_PROFESSIONNELLE, c.DESCRIPTION_CATEGORIE, g.NOM_GROUPE FROM categorie c JOIN groupe_categorie g on c.ID_GROUPE_CATEGORIE = g.ID_GROUPE_CATEGORIE WHERE 1 ORDER BY ID_GROUPE_CATEGORIE asc";

		return $this -> select();
	}

	function saveOrUpdateCategorie($idCategorie, $idGroupeCategorie, $categorieProfessionnelle, $descriptionCategorie) {
		if ($this -> IsNullOrEmptyString($idCategorie) > 0) {
			// ID_CATEGORIE is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO categorie(ID_GROUPE_CATEGORIE, CATEGORIE_PROFESSIONNELLE, DESCRIPTION_CATEGORIE) VALUES ('$idGroupeCategorie','$categorieProfessionnelle','$descriptionCategorie')";
		} else {
			// UPDATE WHERE ID_CATEGORIE is
			$this -> _query = "UPDATE categorie SET ID_GROUPE_CATEGORIE='$idGroupeCategorie',CATEGORIE_PROFESSIONNELLE='$categorieProfessionnelle',DESCRIPTION_CATEGORIE='$descriptionCategorie' WHERE ID_CATEGORIE='$idCategorie'";
		}
		
		return $this -> update($idCategorie);
	}

	function getSmieList() {
		$this -> _query = "SELECT ID_SMIE, NOM_SMIE, PLAFOND_SMIE, DEDUCTION_EMPLOYE, DEDUCTION_EMPLOYEUR, COUT_EXCEDENTAIRE, FRANCHISE_COUT_EXCENDENTAIRE, DATE_PRISE_EFFET_SMIE, ACTIF_SMIE FROM smie WHERE 1 ORDER BY DATE_PRISE_EFFET_SMIE asc";

		return $this -> select();
	}

	function saveOrUpdateSmie($idSmie, $nomSmie, $plafondSmie, $deductionEmploye, $deductionEmployeur, $coutExcedentaire, $franchiseCoutExcendentaire, $datePriseEffetSmie, $actifSmie) {
		if ($this -> IsNullOrEmptyString($idSmie) > 0) {
			// ID_IRSA is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO smie(NOM_SMIE, PLAFOND_SMIE, DEDUCTION_EMPLOYE, DEDUCTION_EMPLOYEUR, COUT_EXCEDENTAIRE, FRANCHISE_COUT_EXCENDENTAIRE, DATE_PRISE_EFFET_SMIE, ACTIF_SMIE) VALUES ('$nomSmie','$plafondSmie','$deductionEmploye','$deductionEmployeur','$coutExcedentaire','$franchiseCoutExcendentaire','$datePriseEffetSmie',$actifSmie)";
		} else {
			// UPDATE WHERE ID_IRSA is
			$this -> _query = "UPDATE smie SET NOM_SMIE='$nomSmie',PLAFOND_SMIE='$plafondSmie',DEDUCTION_EMPLOYE='$deductionEmploye',DEDUCTION_EMPLOYEUR='$deductionEmployeur',COUT_EXCEDENTAIRE='$coutExcedentaire',FRANCHISE_COUT_EXCENDENTAIRE='$franchiseCoutExcendentaire',DATE_PRISE_EFFET_SMIE='$datePriseEffetSmie',ACTIF_SMIE=$actifSmie WHERE ID_SMIE=$idSmie";
		}
		
		return $this -> update($idSmie);
	}
	
	function getSalaireBaseList()	{
		$this -> _query = "SELECT g.ID_LIGNE_GRILLE, g.ID_GROUPE, g.ID_CATEGORIE, g.SALAIRE_BASE_MINIMUM, g.SALAIRE_BASE_3, g.SALAIRE_BASE_4, g.SALAIRE_BASE_5, g.ACTIF_LIGNE_GRILLE, g.DATE_PRISE_EFFET_GRILLE, gc.NOM_GROUPE, c.CATEGORIE_PROFESSIONNELLE FROM grille g JOIN groupe_categorie gc ON g.ID_GROUPE = gc.ID_GROUPE_CATEGORIE JOIN categorie c on g.ID_CATEGORIE = g.ID_CATEGORIE WHERE 1 ORDER BY DATE_PRISE_EFFET_CNAPS asc";

		return $this -> select();
	}

	function saveOrUpdateSalaireBase($idLigneGrille, $idGroupe, $idCategorie, $salaireBaseMinimum, $salaireBase3, $salaireBase4, $salaireBase5, $actifLigneGrille, $datePriseEffetGrille) {
		if ($this -> IsNullOrEmptyString($idLigneGrille) > 0) {
			// ID_LIGNE_GRILLE is empty or null then INSERT new raw
			$this -> _query = "INSERT INTO grille(ID_GROUPE, ID_CATEGORIE, SALAIRE_BASE_MINIMUM, SALAIRE_BASE_3, SALAIRE_BASE_4, SALAIRE_BASE_5, ACTIF_LIGNE_GRILLE, DATE_PRISE_EFFET_GRILLE) VALUES ('$idGroupe','$idCategorie','$salaireBaseMinimum','$salaireBase3','$salaireBase4','$salaireBase5',$actifLigneGrille,'$datePriseEffetGrille')";
		} else {
			// UPDATE WHERE ID_LIGNE_GRILLE is
			$this -> _query = "UPDATE grille SET ID_GROUPE='$idGroupe',ID_CATEGORIE='$idCategorie',SALAIRE_BASE_MINIMUM='$salaireBaseMinimum',SALAIRE_BASE_3='$salaireBase3',SALAIRE_BASE_4='$salaireBase4',SALAIRE_BASE_5='$salaireBase5',ACTIF_LIGNE_GRILLE=$actifLigneGrille,DATE_PRISE_EFFET_GRILLE='$datePriseEffetGrille' WHERE ID_LIGNE_GRILLE=$idLigneGrille";
		}
		
		return $this -> update($idLigneGrille);
	}
}
?>
