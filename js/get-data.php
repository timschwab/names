<?php
  // params - server name, username, password, database name
  $link = mysqli_connect("shareddb1c.hosting.stackcp.net", "wordsdb-3230fce7", "wspisfun2017", "wordsdb-3230fce7");

  if(mysqli_connect_error() != ""){
    die("Failed to connect to database.");
  }

  // query strings
  $queries = array(
    "nouns" => "SELECT * FROM nouns",
    "names" =>  "SELECT * FROM names",
    "adjs" => "SELECT * FROM adjectives");

  // data arrays - indexes in $queries must be indexes in $data!
  $data = array(
    "nouns" => array(),
    "names" => array(),
    "adjs" => array());

  foreach($queries as $key => $query){
      $index = 0;
      if($result = mysqli_query($link, $query)){
        while($row = mysqli_fetch_array($result)){
          $data[$key][$index] = $row[0];
          $index++;
        }
      } 
  }
  
  echo json_encode($data);
?>