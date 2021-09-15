<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Register extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Register';
        $this->TPL['jsToLoad'] = array();
        $this->TPL['error'] = '';

        $this->load->model('access_model', 'access');
    }

	public function index()
	{
        $this->template->show('register', $this->TPL);
	}

    public function registerUser()
    {
        $this->userauth->register(
            $this->input->post('username'),
            $this->input->post('password'));
        $this->TPL['error'] = $this->userauth->get_error_message();

        //if ($this->access->)
        $this->template->show('register', $this->TPL);
    }

    public function logout()
    {
        $this->userauth->logout();
    }
}
