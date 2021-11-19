<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * controls login/register/logout logic
 */
class Access extends CI_Controller {
    protected array $loginRules, $registerRules;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'Register';
        $this->TPL['jsToLoad'] = array();
        $this->TPL['error'] = '';

        $this->load->model('access_model', 'access');

        $this->loginRules = array(
            array(
                'field' => 'username',
                'label' => 'Username',
                'rules' => 'required|min_length[2]|max_length[20]',
                'errors' => array(
                )
            ),
            array(
                'field' => 'password',
                'label' => 'Password',
                'rules' => 'required|min_length[5]|max_length[20]',
                'errors' => array(
                )
            ),
        );

        $this->registerRules = array(
            array(
                'field' => 'username',
                'label' => 'Username',
                'rules' => 'required|min_length[2]|max_length[20]',
                'errors' => array(
                )
            ),
            array(
                'field' => 'password',
                'label' => 'Password',
                'rules' => 'required|min_length[5]|max_length[20]',
                'errors' => array(
                )
            ),
            array(
                'field' => 'passwordConfirm',
                'label' => 'Confirm Password',
                'rules' => 'required|matches[password]',
                'errors' => array(
                    'matches' => 'Passwords do not match.'
                )
            )
        );
    }

	public function index()
	{
        $this->template->show('register', $this->TPL);
	}

    /**
     * display login page
     */
    public function loginPage(){
        $this->TPL['title'] = 'Login';
        $this->template->show('login', $this->TPL);
    }

    /**
     * display register page
     */
    function registerPage(){
        $this->TPL['title'] = 'Register';
        $this->template->show('register', $this->TPL);
    }

    /**
     * validates register form
     * @return Boolean whether correctly applied form validation rules
     */
    private function validateRegisterForm(){
        $this->form_validation->set_rules($this->registerRules);
        $this->form_validation->set_rules('username', 'username', 'callback_checkUniqueUsername');
        return $this->form_validation->run();

    }

    /**
     * checks if username is unique
     * @return Boolean whether correctly applied form validation rules
     */
    public function checkUniqueUsername($username){
        if (!$this->access->checkUniqueUsername($username)){
            $this->form_validation->set_message('checkUniqueUsername', 'Username is not unique');
            return false;
        } else {
            return true;
        }
    }

    /**
     * checks if username matches one in users table
     * @return Boolean whether correctly applied form validation rules
     */
    public function checkMatchingUsername($username){
        if ($this->access->checkUniqueUsername($username)){
            $this->form_validation->set_message('checkMatchingUsername', 'Username not found');
            return false;
        } else {
            return true;
        }
    }

    /**
     * checks if given password matches one in users table
     * @return Boolean whether correctly applied form validation rules
     */
    public function verifyPassword(){
        $username = $this->input->post('username');
        $password = $this->input->post('password');

        $username = filter_var($username, FILTER_SANITIZE_STRING);
        $password = filter_var($password, FILTER_SANITIZE_STRING);

        if ($this->access->verifyPassword($username, $password)){
            return true;
        } else {
            $this->form_validation->set_message('verifyPassword', 'Password does not match!');
            return false;
        }
    }

    /**
     * validates login form
     * @return Boolean whether correctly applied form validation rules
     */
    public function validateLoginForm(){
        $this->form_validation->set_rules($this->loginRules);
        $this->form_validation->set_rules('username', 'Username', 'callback_checkMatchingUsername');
        $this->form_validation->set_rules('password', 'Password', 'callback_verifyPassword');
        return $this->form_validation->run();
    }

    /**
     * logs in user after validating form, returns to home page if successful, stays otherwise
     */
    public function login(){
        if ($this->validateLoginForm()){
            $username = $this->input->post('username');
            $password = $this->input->post('password');

            $username = filter_var($username, FILTER_SANITIZE_STRING);
            $password = filter_var($password, FILTER_SANITIZE_STRING);

            if ($this->access->verifyPassword($username, $password)){
                $userSessionData = $this->access->getUser($username);
                $this->setUserSession((array)$userSessionData[0]);

                return redirect('/');
            } else {
                $this->form_validation->set_message('test', 'Password does not match!');
                $this->form_validation->run();
            }
        }

        $this->loginPage();
    }

    public function test(){
        return true;
    }

    /**
     * registers user after validating form
     * @return redirect redirect to main page if successful registration, stay on page otherwise
     */
    public function register(){
        if ($this->validateRegisterForm()) {
            $username = $this->input->post('username');
            $password = $this->input->post('password');
            $passwordConfirm = $this->input->post('passwordConfirm');

            $username = filter_var($username, FILTER_SANITIZE_STRING);
            $password = filter_var($password, FILTER_SANITIZE_STRING);
            $passwordConfirm = filter_var($passwordConfirm, FILTER_SANITIZE_STRING);
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            $accessLevel = 'member';

            $user = array(
                'username' => $username,
                'password_hash' => $passwordHash,
                'access_level' => $accessLevel
            );

            $this->access->insertUser($user);
            return redirect('/login');
        }

        $this->registerPage();
    }

    /**
     * initializes current session with validated login data
     * @param array $userData object containing user id, username, access level, and ip
     */
    private function setUserSession(array $userData){
        $sessionData = [
            'userId' => $userData['user_id'],
            'username' => $userData['username'],
            'accessLevel' => $userData['access_level'],
            'isLoggedIn' => true,
            'ip' => $_SERVER['REMOTE_ADDR'],
        ];
        $this->session->set_userdata($sessionData);
    }

    /**
     * destroy current session and return to main screen
     * @return redirect redirect to main page if successful registration, stay on page otherwise
     */
    public function logout()
    {
        session_destroy();
        return redirect()->to('/');
    }
}