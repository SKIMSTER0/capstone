<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * controls logic for opener collection grid, supporting ratings and favorites
 */
class Collection extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('collection_model', 'collection');
        $this->load->model('profile_model', 'profile');

        $this->TPL['title'] = 'PCO Collection';
        $this->TPL['userId'] = $_SESSION['userId'];
        $this->TPL['jsToLoad'] = array('config.js', 'collection.js', 'collectionIndex.js');
        $this->TPL['jsToLoadExternal'] = array();
    }

	public function index()
	{
        $this->template->show('collection', $this->TPL);
	}

    /**
     * xhr post request endpoint
     * submits rating to user profile
     */
    public function submitRating(){
        try {
            $inputStream = json_decode(file_get_contents('php://input'), true);
            $inputStream = $this->security->xss_clean($inputStream);

            $ratingData = array(
                "userId" => $_SESSION["userId"],
                "openerId" => $inputStream["openerId"],
                "rating" => $inputStream["rating"],
                "favorited" => $inputStream["favorited"]
            );
            $this->collection->insertRating($ratingData);

        } catch (Exception $e) {
            show_error('Could not insert rating', 400);
        }
    }

    /**
     * xhr post request endpoint
     * delete favorite/rating status of an opener for a user
     */
    public function deleteRating(){
        try {
            $inputStream = json_decode(file_get_contents('php://input'), true);
            $inputStream = $this->security->xss_clean($inputStream);

            $ratingData = array(
                "userId" => $_SESSION["userId"],
                "openerId" => $inputStream["openerId"],
            );
            $this->collection->insertRating($ratingData);
        } catch (Exception $e) {
            show_error('Could not delete rating', 400);
        }
    }

    /**
     * xhr get request endpoint
     * request all opener data for given user
     */
    public function getOpeners(){
        try {
            echo json_encode($this->collection->getOpeners());
        } catch (Exception $e) {
            show_error('Could not retrieve openers', 400);
        }
    }

    /**
     * xhr get request endpoint
     * retrieve all ratings data
     * @param mixed userId
     */
    public function getRatings($userId){
        try {
            $userId = intval($this->security->xss_clean($userId));
            echo json_encode($this->collection->getRatings($userId));
        } catch (Exception $e) {
            show_error('Could not retrieve ratings', 400);
        }
    }

    /**
     * xhr get request endpoint
     * retrieve all ratings data
     * @param mixed userId
     */
    public function getFavorited($userId){
        try {
            $userId = intval($this->security->xss_clean($userId));
            echo json_encode($this->collection->getFavorited($userId));
        } catch (Exception $e) {
            show_error('Could not retrieve favorited collection', 400);
        }
    }
}
