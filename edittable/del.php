<?php
header("Content-Type:text/html;charset=utf-8");
$teacherDB=new mysqli("localhost","root","zhangkaiqi","project");
$teacherDB->set_charset("utf-8");
$id=$_GET['id'];
$sql="delete from teacher where id=".$id;
$teacherDB->query($sql);
if ($teacherDB->affected_rows>0){
    echo "<script>location.href='delDock.php'</script>";
}
?>