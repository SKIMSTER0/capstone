<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Leaderboard extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Leaderboards';
    }

	public function index()
	{
        $this->template->show('leaderboard', $this->TPL);
	}
}
