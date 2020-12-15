<?php
header("Content-Type: application/json; charset=UTF-8");
$log="1+2=3\n2*4=8\n";
$data=$_POST['disp'];
echo json_encode($log);
?>