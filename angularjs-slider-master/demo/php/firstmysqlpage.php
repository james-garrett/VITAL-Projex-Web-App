<?php
$mysqlserver="localhost";
$mysqlusername="test";
$mysqlpassword="test";
$link=mysql_connect("localhost", "root", "") or die ("Error connecting to mysql server: ".mysql_error());
echo "Hi ", $link;
$dbname= '_mysite';
mysql_select_db($dbname, $link) or die ("Error selecting specified database on mysql server: ".mysql_error());

$cdquery="SELECT * FROM firsttable";
$cdresult=mysql_query($cdquery) or die ("Query to get data from firsttable failed: ".mysql_error());

echo "<p>$cdresult</p>";

// $cdnumrows=mysql_num_rows($cdresult);
// echo "<p>The number of CDs in your database is: $cdnumrows</p>";
// error_reporting(E_ALL ^ E_DEPRECATED);

// while ($cdrow=mysql_fetch_array($cdresult)) {
//     echo "<pre>";                
//     print_r($cdrow);
//     echo "</pre>";
// }         

while ($cdrow=mysql_fetch_array($cdresult)) {
    $cdTitle=$cdrow[cdTitle];
    $cdArtist=$cdrow[cdArtist];
    $cdPrice=$cdrow[cdPrice];
    echo "<p>The CD is $cdTitle by $cdArtist and sells for £$cdPrice.</p>";                
}        

mysql_close($link);

?>