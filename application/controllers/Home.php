<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * controller supporting live play tetris game
 */
class Home extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Home';
        $this->TPL['jsToLoad'] = array('config.js', 'game.js', 'board.js', 'player.js', 'index.js');

        $this->load->model('collection_model', 'collection');
        $this->load->model('leaderboard_model', 'leaderboard');
        $this->TPL['openers'] = $this->collection->getOpeners();
    }

	public function index()
	{
        $this->template->show('home', $this->TPL);
	}

    /**
     * xhr post request endpoint
     * submit game data to leaderboard
     */
    public function submitLeaderboard(){
        try {
            $gameData = json_decode(file_get_contents('php://input'), true);
            $gameData = $this->security->xss_clean($gameData);

            $this->leaderboard->insertScore(
                $_SESSION['userId'],
                $gameData['gameTime'],
                $gameData['score'],
                $gameData['pcoCount']
            );

        } catch (Exception $e) {
            show_error('Could not submit game to leaderboard', 400);
        }
    }
}