<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * controller supporting access to leaderboard database and table generation
 */
class Leaderboard extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('leaderboard_model', 'leaderboard');

        $this->TPL['title'] = 'Leaderboards';
        $this->TPL['userId'] = -1;
        $this->TPL['jsToLoad'] = array('requestXHR.js', 'tables.js');
        $this->TPL['jsToLoadExternal'] = array(
            '<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jq-3.6.0/dt-1.11.3/r-2.2.9/sc-2.0.5/sb-1.2.2/datatables.min.js"></script>',
            '<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jq-3.6.0/dt-1.11.3/r-2.2.9/sc-2.0.5/sb-1.2.2/datatables.min.js"></script>',
            '<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/jq-3.6.0/dt-1.11.3/r-2.2.9/sc-2.0.5/sb-1.2.2/datatables.min.css"/>'
        );
    }

	public function index()
	{
        $this->template->show('leaderboard', $this->TPL);
	}

    /**
     * xhr get request endpoint
     * retrieve leaderboard scores for a user
     * @param string userId -1 if entire leaderboard is desired
     */
    public function getLeaderboardUser(string $userId){
        try {
            echo json_encode($this->leaderboard->getLeaderboardUser(intval($userId)));
        } catch (Exception $e) {
            show_error('Could not retrieve leaderboard scores', 400);
        }
    }

    /**
     * xhr get request endpoint
     * retrieve all leaderboard scores
     */
    public function getLeaderboardData(){
        try {
            echo json_encode($this->leaderboard->getLeaderboardData());
        } catch (Exception $e) {
            show_error('Could not retrieve leaderboard data', 400);
        }
    }
}