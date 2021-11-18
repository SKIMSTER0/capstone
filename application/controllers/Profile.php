<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * controls logic for profile collection for minified leaderboard/opener collection generation
 */
class Profile extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('collection_model', 'collection');
        $this->load->model('leaderboard_model', 'leaderboard');

        $this->TPL['title'] = 'Profile';
        $this->TPL['userId'] = $_SESSION['userId'];

        $this->TPL['jsToLoad'] = array('requestXHR.js', 'config.js', 'tables.js', 'collection.js', 'collectionMinified.js');
        $this->TPL['jsToLoadExternal'] = array(
            '<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jq-3.6.0/dt-1.11.3/r-2.2.9/sc-2.0.5/sb-1.2.2/datatables.min.js"></script>',
            '<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jq-3.6.0/dt-1.11.3/r-2.2.9/sc-2.0.5/sb-1.2.2/datatables.min.js"></script>',
            '<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/jq-3.6.0/dt-1.11.3/r-2.2.9/sc-2.0.5/sb-1.2.2/datatables.min.css"/>'
        );

        $this->TPL['leaderboardRank'] = $this->leaderboard->getLeaderboardRank($_SESSION['userId']) ?? "No Games Played";
        $this->TPL['pcoCount'] = $this->leaderboard->getBestPCOCount($_SESSION['userId']) ?? "No Games Played";
        $this->TPL['score'] = $this->leaderboard->getBestScore($_SESSION['userId']) ?? "No Games Played";
    }

	public function index()
	{
        $this->template->show('profile', $this->TPL);
	}
}
