<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Collection extends CI_Controller {

    var $TPL;

    public function __construct()
    {
        parent::__construct();
        $this->TPL['title'] = 'PCO Collection';
        $this->TPL['jsToLoad'] = array();
    }

	public function index()
	{
        $this->template->show('collection', $this->TPL);
	}

}
