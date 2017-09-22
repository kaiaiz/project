<?php
/*header("Content-Type:text/html;charset=utf-8");
$id=$_GET['id'];
$name=$_GET['name'];
$sex=$_GET['sex'];
$course=$_GET['course'];
$teacherDB=new mysqli("localhost","root","zhangkaiqi","project");
$teacherDB->set_charset("utf-8");
$sql="update teacher set name".$name.'sex='.$sex.',age='.$age.'course='.$course.'where id='.$id;
$teacherDB->query($sql);
if ($teacherDB->affected_rows>0){
    echo '<script>location.href="index.php"</script>';
}
*/ ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        html,body{
            width: 100%;
            height: 100%;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
<!--混排方式：html页面与php结合，容易理解,但结构过于混乱.
基于b/s架构的特征
1.由于页面需要跳转，而导致延迟等待的情况。
2.由于需要服务器返回数据，造成了网络延迟。
3.c/s架构不能即时共享信息。
防止页面的反复跳转而是用ajax来快速局部更新数据。不让用户等待-->
<div class="message">
    <?php
    header("Content-Type:text/html;charset:utf8");
    $id=$_GET['id'];
    $teacherDB = new mysqli("localhost", "root", "zhangkaiqi", "project");
    $teacherDB->set_charset("utf8");
    $sql = "select * FROM teacher";
    $result = $teacherDB->query($sql);
    //    echo var_dump($result)
    //    echo $teacherDB->affected_rows;
    if ($teacherDB->affected_rows > 0){
    $row = $result->fetch_assoc();
//    var_dump($row['age']);
    $name=$row['name'];
    $age=$row['age'];
    $sex=$row['sex'];
    echo $sex;
    $course=$row["course"];
    ?>
    <form action="editDB.php" method="get">
        <?php
        echo "请输入姓名：<input type='text' name='name' value=$name><br/>";
        echo "请输入年龄：<input type='text' name='age' value=$age><br/>";
        if($sex=='男'){
            echo "性别:<input type='radio' name=sex' value='男' checked>男<input type='radio' name='sex' value='女'>女<br/>";
        }else{
            echo "性别:<input type='radio' name='sex' value='男'>男<input type='radio' name='sex' value='女' checked>女<br/>";
        }
        echo "课程:<input type='text' name='course' value=$course><br/>";
        echo "<input type='hidden' hidden name='id' value=''>";//传递id，不需要显示在客户端
        ?>
        <?php
        }
        ?>
        <input type="submit" value="submit">
    </form>
<!--    注意：需要每个变量都传入正确的数据，否则会导致变量为null或数据不正确导致页面错误。-->
</div>
</body>
</html>
