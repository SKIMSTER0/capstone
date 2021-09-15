<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->load->model('access_model', 'access');

        $this->TPL['title'] = 'Login Page';
        $this->TPL['jsToLoad'] = array();
        $this->TPL['error'] = '';
    }

	public function index()
	{
        $this->template->show('login', $this->TPL);
	}

    public function loginUser()
    {
        $this->userauth->register(
            $this->input->post('username'),
            $this->input->post('password'));
        $this->TPL['error'] = $this->userauth->get_error_message();


        $this->template->show('register', $this->TPL);
    }

    public function logout()
    {
        $this->userauth->logout();
    }
}
