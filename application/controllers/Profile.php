<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Profile extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Profile';
        $this->TPL['jsToLoad'] = array();
    }

	public function index()
	{
        //if not logged in, deny access
        if ($this->session->)
        $this->template->show('profile', $this->TPL);
	}

}
