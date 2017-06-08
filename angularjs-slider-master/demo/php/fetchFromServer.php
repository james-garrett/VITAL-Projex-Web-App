<?php
$mysqlserver="localhost";
$mysqlusername="test";
$mysqlpassword="test";
$link=mysql_connect("localhost", "root", "MyNewPass") or die ("Error connecting to mysql server: ".mysql_error());
echo "Hi ", $link;
$dbname= 'vital_database';
mysql_select_db($dbname, $link) or die ("Error selecting specified database on mysql server: ".mysql_error());

// $query="SELECT * FROM questiondata";
$query="SELECT Question_Data FROM questiondata8";
$result=mysql_query($query) or die ("Query to get data from firsttable failed: ".mysql_error());

echo "<p>$result</p>";
$to_encode = array();
$numrows=mysql_num_rows($result);
// echo "<p>The number of CDs in your database is: $numrows</p>";
error_reporting(E_ALL ^ E_DEPRECATED);

// while ($row=mysql_fetch_array($result)) {
    
    // echo "<pre>";                
    // print_r($row);
    // echo "</pre>";
// }         

while ($row = mysql_fetch_array($result)) {
    $to_encode[] = $row;
    // $json=$row[Question_Data];
    // echo($row);
    // echo "$json";                
}        
echo json_encode($to_encode);

mysql_close($link);

?>