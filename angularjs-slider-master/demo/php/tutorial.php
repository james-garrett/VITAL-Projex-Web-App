<?

// At this point in the code, we want to show all of the comments
// submitted by users for this particular page. As the comments
// are stored in the database, we will begin by connecting to
// the database
 
// Below we are setting up our connection to the server. Because
// the database lives on the same physical server as our php code,
// we are connecting to "localhost". inmoti6_myuser and mypassword
// are the username and password we setup for our database when
// using the "MySQL Database Wizard" within cPanel

$con = mysql_connect("localhost","inmoti6_myuser","mypassword");
 
// The statement above has just tried to connect to the database.
// If the connection failed for any reason (such as wrong username
// and or password, we will print the error below and stop execution
// of the rest of this php script

if (!$con)
{
  die('Could not connect: ' . mysql_error());
}
 
// We now need to select the particular database that we are working with
// In this example, we setup (using the MySQL Database Wizard in cPanel) a
// database named inmoti6_mysite

mysql_select_db("inmoti6_mysite", $con);

// We now need to setup our SQL query to grab all comments from this page.
// The example SQL query we copied from phpMyAdmin is:
// SELECT * FROM `comments` WHERE `articleid` =1 LIMIT 0 , 30
// If we run this query, it will ALWAYS grab only the comments from our
// article with an id of 1. We therefore need to update the SQL query
// so that on article 2 is searches for the "2", on page is searches for
// "3", and so on.
// If you notice in the URL, the id of the article is set after id=
// For example, in the following URL:
// http://phpandmysql.inmotiontesting.com/page2.php?id=2
// ... the article id is 2. We can grab and store this number in a variable
// by using the following code:

$article_id = $_GET['id'];

// We also want to add a bit of security here. We assume that the $article_id
// is a number, but if someone changes the URL, as in this manner:
// http://phpandmysql.inmotiontesting.com/page2.php?id=malicious_code_goes_here
// ... then they will have the potential to run any code they want in your
// database. The following code will check to ensure that $article_id is a number.
// If it is not a number (IE someone is trying to hack your website), it will tell
// the script to stop executing the page

if( ! is_numeric($article_id) )
  die('invalid article id');

// Now that we have our article id, we need to update our SQL query. This
// is what it looks like after we update the article number and assign the
// query to a variable named $query

$query = "SELECT * FROM `comments` WHERE `articleid` =$article_id LIMIT 0 , 30";

// Now that we have our Query, we will run the query against the database
// and actually grab all of our comments

$comments = mysql_query($query);

// Before we start writing all of the comments to the screen, let's first
// print a message to the screen telling our users we're going to start
// printing comments to the page.

echo "<h1>User Comments</h1>";

// We are now ready to print our comments! Below we will loop through our
// comments and print them one by one.

// The while statement will begin the "looping"

/*NOTE that in PHP 7.0, the mysql_fetch_array has been removed -it was previously deprecated 
in earlier versions of PHP.  You find the cod documentation here:  
http://php.net/manual/en/function.mysql-fetch-array.php */

while($row = mysql_fetch_array($comments, MYSQL_ASSOC))
{

  // As we loop through each comment, the specific comment we're working
  // with right now is stored in the $row variable.

  // for example, to print the commenter's name, we would use:
  // $row['name']
  
  // if we want to print the user's comment, we would use:
  // $row['comment']
  
  // As this is a beginner tutorial, to make our code easier to read
  // we will take the values above (from our array) and put them into
  // individual variables

  $name = $row['name'];
  $email = $row['email'];
  $website = $row['website'];
  $comment = $row['comment'];
  $timestamp = $row['timestamp'];
  
  // Be sure to take security precautions! Even though we asked the user
  // for their "name", they could have typed anything. A hacker could have
  // entered the following (or some variation) as their name:
  //
  // <script type="text/javascript">window.location = "http://SomeBadWebsite.com";</script>
  //
  // If instead of printing their name, "John Smith", we would be printing
  // javascript code that redirects users to a malicious website! To prevent
  // this from happening, we can use the htmlspecialchars function to convert
  // special characters to their HTML entities. In the above example, it would
  // instead print:
  //
  // <script type="text/javascript">window.location = "http://SomeBadWebsite.com";</script>
  //
  // This certainly would look strange on the page, but it would not be harmful
  // to visitors

  $name = htmlspecialchars($row['name'],ENT_QUOTES);
  $email = htmlspecialchars($row['email'],ENT_QUOTES);
  $website = htmlspecialchars($row['website'],ENT_QUOTES);
  $comment = htmlspecialchars($row['comment'],ENT_QUOTES);
  
  // We will now print the comment to the screen
  
  echo "  <div style='margin:30px 0px;'>
      Name: $name<br />
      Email: $email<br />
      Website: $website<br />
      Comment: $comment<br />
      Timestamp: $timestamp
    </div>
  ";
}

// At this point, we've added the user's comment to the database, and we can
// now close our connection to the database:
mysql_close($con);

?>