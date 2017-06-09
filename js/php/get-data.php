<?php
  // params - server name, username, password, database name
  $link = mysqli_connect("shareddb1c.hosting.stackcp.net", "wordsdb-3230fce7", "wspisfun2017", "wordsdb-3230fce7");

  if(mysqli_connect_error() != ""){
    die("Failed to connect to database.");
  }

  // query strings
  $queries = array(
    "<Noun>" => "SELECT * FROM nouns",
    "<Name>" =>  "SELECT * FROM names",
    "<Adjective>" => "SELECT * FROM adjectives");

  // data arrays - indexes in $queries must be indexes in $data!
  $data = array(
    "<Noun>" => array(),
    "<Name>" => array(),
    "<Adjective>" => array());

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