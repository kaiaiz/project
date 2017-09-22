<?php
header("Content-Type:text/html;charset=utf-8");
$name=$_GET["name"];
$age=$_GET["age"];
$sex=$_GET["sex"];
$course=$_GET['course'];
$teacherDb=new mysqli("localhost","root","zhangkaiqi","project");
$teacherDb->set_charset("utf8");
//$sql = "select * from teacher";
$sql="insert into teacher(name,age,sex,course) values('{$name}','{$age}','{$sex}','{$course}')";//要求传入的age必须是number类型，否则会导致插入失败，时间换取的教训！！！
echo $sql;
$teacherDb->query($sql);
//var_dump($result);
$result=$teacherDb->affected_rows;
echo $result;
if ($teacherDb->affected_rows>0){
    echo '34';
    echo "<script>alert('add success');location.href='addPage.html'</script>";
}
?>
<!--重要的事情说三遍！！！必须要有文件转入，不然没有数据传入，不能单独调试，否则只会报错。-->
