<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ValidateSession
{
    public function __construct() {
        $this->load->library('authenticate');

        $this->ACL = array(
            "user" => array("", "home", "leaderboard", "login", "logout", "register", "access"),
            "member" => array("", "home", "collection", "leaderboard", "login", "register", "logout", "access", "profile"),
            "admin" => array("", "home", "collection", "leaderboard", "login", "register", "logout", "access", "profile", "admin"),
        );
    }

    /**
    allow access to session library
     * @param $property
     * @return mixed
     */
    public function __get($property) {
        if (!property_exists(get_instance(), $property)) {
            show_error('property: <strong>' .$property . '</strong> not exist.');
        }
        return get_instance()->$property;
    }

    /**
     * validates if user role is allowed to access current page through an access control list
     */
    public function validate()
    {
        $page = strtolower($this->uri->segment(1, ""));
        $role = $this->authenticate->getAccessLevel();
        $validated = FALSE;

        for ($i = 0; $i < count($this->ACL[$role]); $i++) {
            if ($this->ACL[$role][$i] == $page) {
                $validated = TRUE;
            }
        }

        if (!$validated) {
            return redirect ('/login');
        }
    }
}