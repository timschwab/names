<?php
  // params - server name, username, password, database name
  $link = mysqli_connect("shareddb1c.hosting.stackcp.net", "wordsdb-3230fce7", "wspisfun2017", "wordsdb-3230fce7");

  if(mysqli_connect_error() != ""){
    die("Failed to connect to database.");
  }

  $query = "SELECT * FROM terminals";
  $data = array();
  if($result = mysqli_query($link, $query)){
    while($row = mysqli_fetch_array($result)){
      $type = $row[0];
      $word = $row[1];
      if(!array_key_exists($type, $data)){
        $data[$type] = array();
      }
      $data[$type][] = $word;
    }
  }  
  echo json_encode($data);
?>