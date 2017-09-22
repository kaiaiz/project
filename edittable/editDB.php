<?php
header("ContentType:text/html;charset:utf8");
$id=$_GET['id'];
$name=$_GET['name'];
$age=$_GET['age'];
$sex=$_GET['sex'];
$course=$_GET['course'];
$teacherDb=new mysqli("localhost","root","zhangkaiqi","project");
$teacherDb->set_charset("utf8");
$sql="update teacher set name='{$name}',age='{$age}',sex='{$sex}',course='${course}'";
$teacherDb->query($sql);
echo $teacherDb->affected_rows;
if($teacherDb->affected_rows>0){
//    include "index.php";
    echo "<script>location.href='index.php';</script>";
}else{
    echo "<script>alert('无修改');location.href='index.php'</script>";
}