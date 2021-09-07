<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function assetsPath()
{
    $CI =& get_instance();

    //return asset url autoloaded in custom config file
    return base_url() . $CI->config->item('assetsPath');
}
function jsPath()
{
    $CI =& get_instance();

    //return asset url autoloaded in custom config file
    return base_url() . $CI->config->item('jsPath');
}
