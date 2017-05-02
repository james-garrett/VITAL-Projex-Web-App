<?php

/* Servers configuration */
//Put this file in wamp64\apps\phpmyadmin.4.6.4 
$i = 0;

$cfg['blowfish_secret'] = 'h]C+{nqW$omNoTIkCwC$%z-LTcy%p6_j$|$Wv[mwngi~|e'; //What you want

/* Server: localhost [1] */
// $i++;
// $cfg['Servers'][$i]['verbose'] = 'Local Databases';
// $cfg['Servers'][$i]['host'] = '127.0.0.1';
// $cfg['Servers'][$i]['extension'] = 'mysqli';
// $cfg['Servers'][$i]['auth_type'] = 'cookie';
// $cfg['Servers'][$i]['user'] = '';
// $cfg['Servers'][$i]['password'] = '';

// https://www.devside.net/wamp-server/accessing-mysql-or-phpmyadmin-from-outside
// http://stackoverflow.com/questions/6367330/how-to-access-phpmyadmin-remotely
// External Ip for Firestation 101-> 149.135.15.51

/*Remote User*/
$i++;
$cfg['Servers'][$i]['host'] = '127.0.0.1'; 
// $cfg['Servers'][$i]['host'] = '192.168.128.78'; 
// $cfg['Servers'][$i]['host'] = '149.135.15.51'; 

$cfg['Servers'][$i]['user'] = 'hostingAccount';   
$cfg['Servers'][$i]['password'] = 'password';  
$cfg['Servers'][$i]['auth_type'] = 'config';       

/*Local Login*/
$i++;
// $cfg['Servers'][$i]['host'] = '127.0.0.1'; 
// // $cfg['Servers'][$i]['host'] = '149.135.15.51'; 
// $cfg['Servers'][$i]['user'] = 'admin';   
// $cfg['Servers'][$i]['password'] = 'tsult1';  
// $cfg['Servers'][$i]['auth_type'] = 'config';       

// Hidden databases in PhpMyAdmin left panel
//$cfg['Servers'][$i]['hide_db'] = '(information_schema|mysql|performance_schema|sys)';

// Allow connection without password
$cfg['Servers'][$i]['AllowNoPassword'] = true;

// Suppress Warning about pmadb tables
$cfg['PmaNoRelation_DisableWarning'] = true;

// To have PRIMARY & INDEX in table structure export
//$cfg['Export']['sql_drop_table'] = true;
//$cfg['Export']['sql_if_not_exists'] = true;

$cfg['MySQLManualBase'] = 'http://dev.mysql.com/doc/refman/5.7/en/';
/* End of servers configuration */

?>