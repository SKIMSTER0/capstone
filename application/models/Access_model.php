<?php

/**
 * controls database logic for access controller
 */
class Access_model extends CI_Model {
    public function __construct(){
        $this->load->database();
    }

    /**
     * Checks whether username is unique for registration purpose
     * @param string $username username to match
     * @return bool True if unique, False if not unique
     */
    public function checkUniqueUsername(string $username){
        try{
            $this->db->where('username', $username);
            $query = $this->db->get('users');

            return (count($query->result()) <= 0);
        } catch(PDOException $e){
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * Checks whether password given by login matches one in database
     * @param string $username user name logging in
     * @param string $password password given
     * @return bool True if matches, False if not matching
     */
    public function verifyPassword(string $username, string $password){
        try{
            $this->db->select('password_hash')->where('username', $username);
            $query = $this->db->get('users');

            $passwordHash = $query->result()[0]->password_hash;

            return (password_verify($password, $passwordHash));
        } catch(PDOException $e){
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * retrieve all user data
     * @return array all data from users table
     */
    public function getUsers(){
        try{
            $query = $this->db->get('users');
            return $query->result_array();
        } catch(PDOException $e){
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * retrieve user data for specified user
     * @param string $username
     * @return array all data from users table for a single user
     */
    public function getUser(string $username){
        try{
            $query = $this->db->get_where('users', array('username' => $username));
            return $query->result();
        } catch(PDOException $e){
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * insert user into user table per successful registration
     * @param array $userData user data such as username, password and access role
     */
    public function insertUser(array $userData){
        try {
            $this->db->insert('users', $userData);
        } catch(PDOException $e){
            log_message('error', $e->errorInfo);
        }
    }

    /**
     * logs out of current session
     */
    public function logout(){
        session_destroy();
        unset($_SESSION['username']);
        redirect('/home', 'refresh');
    }
}
?>
