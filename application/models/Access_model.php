<?php
class Access_model extends CI_Model {
    private int $usernameMinLength;
    private int $usernameMaxLength;
    private int $passwordMinLength;
    private int $passwordMaxLength;
    private array $error;

    public function __construct(){
        $this->usernameMinLength = 1;
        $this->usernameMaxLength = 15;
        $this->passwordMinLength = 5;
        $this->passwordMaxLength= 30;

        //if error null, no errors
        $this->error = [
            'errorMessage' => "",
        ];

        //load database
        $this->load->database();
    }

    public function verifyUser($username, $password, $passwordHash){
        //check filter sanitized username/password
        if($username === false){
            $this->error['errorMessage'] = 'Username not accepted (are you using special characters?)';
            return false;
        }
        else if($password === false){
            $this->error['errorMessage'] = 'Password not accepted (are you using special characters?)';
            return false;
        }

        //check if username/password are valid format
        if (strlen($username) < $this->usernameMinLength){
            $this->error['errorMessage'] = 'Username is too short (>' . $this->usernameMinLength . ' characters)';
            return false;

        } else if (strlen($username > $this->usernameMaxLength)){
            $this->error['errorMessage'] = 'Username is too long (>' . $this->usernameMaxLength . ' characters)';
            return false;
        }

        if (strlen($password) < $this->passwordMinLength){
            $this->error['errorMessage'] = 'Password is too short (>' . $this->passwordMinLength . ' characters)';
            return false;

        } else if (strlen($password > $this->passwordMaxLength)){
            $this->error['errorMessage'] = 'Password is too long (>' . $this->passwordMaxLength . ' characters)';
            return false;
        }

        //ensure username is unique
        if (! $this->checkUniqueUser($username)){
            $this->error['errorMessage'] = 'Username is not unique';
            return false;
        }

        //ensure password hash matches database
        if (! $this->verifyPassword($passwordHash)){
            $this->error['errorMessage'] = 'password is too long (>' . $this->passwordMaxLength . ' characters)';
            return false;
        }

        return true;
    }

    public function checkUniqueUser($username){
        try{
            $this->db->where('username', $username);
            $query = $this->db->get('users');

            if (count($query->result()) <= 0) return false;
        } catch(PDOException $e){
            $this->error['errorMessage'] = 'Username is not unique! ' . $e->errorInfo;
        }

        return true;
    }

    public function verifyPassword($passwordHash){
        try{
            $this->db->where('password_hash', $passwordHash);
            $query = $this->db->get('users');

            if (count($query->result()) <= 0) return false;
        } catch(PDOException $e){
            $this->error['errorMessage'] = 'Username is not unique! ' . $e->errorInfo;
        }

        return true;
    }

    public function getUsers(){
        try{
            $query = $this->db->get('users');
            return $query->result_array();

        } catch(PDOException $e){
            $this->error['errorMessage'] = 'Could not connect to database!' . $e->errorInfo;
        }

    }

    public function insertUser($username, $passwordHash){
        try {
            $data = array(
                'username' => $username,
                'password_hash' => $passwordHash
            );

            $this->db->insert('users', $data);

        } catch(PDOException $e){
            $this->error['errorMessage'] = 'Issue with connecting to database! ' . $e->errorInfo;
        }
    }

    public function login($username, $password){
        //sanitize form data
        $username = filter_var($username, FILTER_SANITIZE_STRING);
        $password = filter_var($password, FILTER_SANITIZE_STRING);
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        //if verified, start new session
        if ($this->verifyUser($username, $password, $passwordHash)){
            $sessionData = array(
                'username' => $username,
                'logged_in' => TRUE,
            );

            $this->session->set_userdata($sessionData);

            redirect('/home', 'refresh');
        } else {

        }
    }

    public function register($username, $password){
        //sanitize form data
        $username = filter_var($username, FILTER_SANITIZE_STRING);
        $password = filter_var($password, FILTER_SANITIZE_STRING);
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        if ($this->verifyUser($username, $password, $passwordHash)){
            insertUser($username, $passwordHash);
        }

        //redirect to homepage
        redirect('/home', 'refresh');
    }

    public function logout(){
        session_destroy();
        unset($_SESSION['username']);
        redirect('/home', 'refresh');
    }
}
?>
