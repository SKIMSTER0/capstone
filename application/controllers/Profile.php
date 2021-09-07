<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Profile extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Profile';
    }

	public function index()
	{
        $this->template->show('profile', $this->TPL);
	}

}