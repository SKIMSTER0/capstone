<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * admin controller supporting statistics and user CRUD
 */
class Admin extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('admin_model', 'admin');
        $this->load->model('collection_model', 'collection');

        $this->TPL['title'] = 'Admin Profile';
        $this->TPL['jsToLoad'] = array('requestXHR.js', 'admin.js');
        $this->TPL['jsToLoadExternal'] = array(
            '<script src="https://www.gstatic.com/charts/loader.js"></script>'
        );
    }

	public function index()
	{
        $this->template->show('admin', $this->TPL);
	}

    /**
     * xhr get request endpoint
     * request data all users
     */
    public function getUsers(){
        try {
            echo json_encode($this->admin->getUsers());
        } catch (Exception $e) {
            show_error('Could not retrieve user data', 400);
        }
    }

    /**
     * xhr get request endpoint
     * delete all data of single user (users, leaderboards, etc)
     */
    public function deleteUser($userId){
        try {
            $this->admin->deleteUser($userId);
            return redirect('/admin');

            echo $userId;
        } catch (Exception $e) {
            show_error('Could not delete specified user '+$userId, 400);
        }
    }

    /**
     * xhr get request endpoint
     * request data for page favorited statistic
     */
    public function getFavoritedCount(){
        try {
            echo json_encode($this->admin->getFavoritedCount());
        } catch (Exception $e) {
            show_error('Could not retrieve favorited data', 400);
        }
    }


    /**
     * xhr get request endpoint
     * request data for play history calendar statistic
     */
    public function getPlayHistory(){
        try {
            echo json_encode($this->admin->getPlayHistory());
        } catch (Exception $e) {
            show_error('Could not retrieve play history data', 400);
        }
    }

    /**
     * xhr get request endpoint
     * insert opener to collection
     */
    public function insertOpener(){
        try {
            $this->collection->insertOpener();
        } catch (Exception $e) {
            show_error('Could not delete user', 400);
        }
    }
}