<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class Userauth  { 
	  
    private $login_page;
    private $logout_page;

    //global access level
    private $acl;

    private $accesslevel;
    private $username;
    private $password;

    function __construct() 
    {
      error_reporting(E_ALL & ~E_NOTICE);
      $this->login_page = base_url() . "index.php?/Login";
      $this->logout_page = base_url() . "index.php?/Home";

      //load config
      $CI =& get_instance();

      $this->acl = $CI->config->item('acl');
    }

    /**
    * @return string
    * @desc Login handling
    */
    public function login($username,$password) 
    {

      session_start();

      // User is already logged in if SESSION variables are good. 
      if ($this->validSessionExists() == true)
      {
        $this->redirect($_SESSION['basepage']);
      }

      // First time users don't get an error message.... 
      if ($_SERVER['REQUEST_METHOD'] == 'GET') return;

      // Check login form for well formedness.....if bad, send error message
      if ($this->formHasValidCharacters($username, $password) == false)
      {
         return "Username/password fields cannot be blank!";
      }

        // confirm user authentication, redirect to correct landing page
      if (!$this->validUserCheck()){
        return 'Username/Password cannot be found!';
      }
      else
      { 
        $this->writeSession();
        $this->redirect($_SESSION['basepage']);
      }
    }
	
    /**
    * @return void
    * @desc Validate if user is logged in
    */
    public function loggedin($page) 
    {

      session_start();     
   
      // Users who are not logged in are redirected out
      if ($this->validSessionExists() == false)
      {
        $this->redirect($this->login_page);
        return false;
      }
       
      // Access Control List checking, redirect if no access
      if(!$this->acl[$page][$_SESSION['accesslevel']]){
        $this->redirect($_SESSION['basepage']);
      }
      return true;
    }
	
    /**
    * @return void
    * @desc The user will be logged out.
    */
    public function logout() 
    {
      session_start(); 
      $_SESSION = array();
      session_destroy();
      header("Location: ".$this->logout_page);
    }
    
    /**
    * @return bool
    * @desc Verify if user has got a session and if the user's IP corresonds to the IP in the session.
    */
    public function validSessionExists() 
    {
      session_start();

      $sessionUserActive = isset($_SESSION['username']);
      $currentIP = $_SERVER['REMOTE_ADDR'];

      if ($currentIP == $_SESSION['ip'] && $sessionUserActive) {
        return true;
      }
      else
      {
        return false;
      }
    }
    
    /**
    * @return void
    * @desc Verify if login form fields were filled out correctly
    */
    public function formHasValidCharacters($username, $password) 
    {
      // check form values for strange characters and length (3-12 characters).
      // if both values have values at this point, then basic requirements met
      if ( (empty($username) == false) && (empty($password) == false) )
      {
        $this->username = $username;
        $this->password = $password;
        return true;
      }
      else
      {
        return false;
      }
    }

    /**
    * @return bool true if no duplicate in database
    * @desc Verify if username already in MySQL database.
    */
    public function duplicateUsernameCheck() 
    {
      $CI =& get_instance();
      $CI->db->where('username', $this->username);
      $CI->db->where('password', $this->password);
      $query = $CI->db->get('users');

      $userData = $query->result();

      if(count($userData) > 0) {
        return false;
      } else {
        $this->username = $userData->username;
        $this->password = $userData->password;
        return true;
      }
    }

    /**
    * @return bool true if user credentials found in database
    * @desc Verify if user credentials found in database
    */
    public function validUserCheck()
    {
      $CI =& get_instance();
      $CI->db->where('username', $this->username);
      $CI->db->where('password', $this->password);
      $query = $CI->db->get('users');

      $userData = $query->row();


      if(count($userData) > 0) {
        $this->accesslevel = $userData->accesslevel;
        return true;
      } else {
        return false;
      }
    }

    /**
    * @return void
    * @param string $page
    * @desc Redirect the browser to the value in $page.
    */
    public function redirect($page) 
    {
        header("Location: ".$page);
        exit();
    }

    /**
    * @return void
    * @desc Write username and other data into the session.
    */
    public function writeSession() 
    {
        $_SESSION['accesslevel'] = $this->accesslevel;
        $_SESSION['username'] = $this->username;
        $_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];

        if ($this->accesslevel == 'member'){
          $_SESSION['basepage'] = base_url() . "index.php?/Members";
        } else if ($this->accesslevel == 'editor'){
          $_SESSION['basepage'] = base_url() . "index.php?/Editors";
        } else if ($this->accesslevel == 'admin'){
          $_SESSION['basepage'] = base_url() . "index.php?/Admin";
        } else {
          $_SESSION['basepage'] = base_url() . "index.php?/Home";
        }
    }
}