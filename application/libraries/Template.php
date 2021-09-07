<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 *
 *  This template library can be used to automatically build
 *    views with a header, navigation and footer
 *
 *
 *    Usage: $this->template->show('view', $args);
 *
 */
class Template
{
    function show($view, $args = NULL)
    {
        $CI =& get_instance();

        $CI->load->view('template/header',$args);
        $CI->load->view('template/navigation',$args);
        $CI->load->view($view, $args);
        $CI->load->view('template/footer',$args);
    }
}
