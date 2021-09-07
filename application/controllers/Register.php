<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Register';
        $this->TPL['jsToLoad'] = array();
    }

	public function index()
	{
        $this->template->show('register', $this->TPL);
	}

    public function registerUser()
    {
        $this->TPL['msg'] =
            $this->userauth->register($this->input->post('username'),
                                   $this->input->post('password'));

        $this->template->show('register', $this->TPL);
    }

    public function logout()
    {
        $this->userauth->logout();
    }
}
