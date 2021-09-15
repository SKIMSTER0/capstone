<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Home';
        $this->TPL['jsToLoad'] = array('config.js', 'game.js', 'board.js', 'player.js', 'index.js');
    }

	public function index()
	{
        $this->template->show('home', $this->TPL);
	}

}
