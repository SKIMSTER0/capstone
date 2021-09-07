<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Admin Profile';
    }

	public function index()
	{
        $this->template->show('admin', $this->TPL);
	}

    public function logout()
    {
        $this->userauth->logout();
    }
}
