<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Login Page';
    }

	public function index()
	{
        $this->template->show('login', $this->TPL);
	}

    public function loginUser()
    {
        $this->TPL['msg'] =
            $this->userauth->login($this->input->post('username'),
                                   $this->input->post('password'));

        $this->template->show('login', $this->TPL);
    }

    public function logout()
    {
        $this->userauth->logout();
    }
}
