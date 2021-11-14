<?php

/**
 * exposes session to ValidateSession hook
 */
class Authenticate{
    protected $CI;

    public function __construct(){
        $this->CI =& get_instance();
    }

    /**
     * @return string access level of user in current session
     */
    public function getAccessLevel(){
        if ($this->CI->session->has_userdata('userId')){
            return $this->CI->session->userdata('accessLevel');
        } else {
            return 'user';
        }
    }
}
