<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        th, td {
            width: 150px;
            height: 50px;
            text-align: center;
        }

        a.btn{
            width: 40px;
            height: 30px;
            line-height: 30px;
            text-decoration: none;
            background: orangered;
            cursor: pointer;
            color: aliceblue;
            font-size: 16px;
            display: block;
            float: left;
            margin-left: 20px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
        }

        a.add {
            display: block;
            text-decoration: none;
            font-size: 38px;
            font-weight: 700;
        }
    </style>
    <!--<script>
        window.addEventListener("DOMContentLoaded",
            function () {
                let tbNode= document.querySelector('tbody');
                tbNode.onclick=function (event) {
                    if (event.target.nodeName.toLowerCase()='a'&&event.target.className=='del')
                    console.log(event.target.parentNode)
                }
            }
        );
    </script>-->
<!--    http协议规范：apache，: 端口，? 查询字符串，http 协议类型，baidu.com 主机地址。-->
</head>
<body>
<table border="1px solid red" cellspacing="0" align="center">
    <thead>
    <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
        <th>课程</th>
        <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <?php
    header("Contentp-Type:text/html;charset=utf-8");
    $teacherDB = new mysqli("localhost", "root", "zhangkaiqi", "project");
    $teacherDB->set_charset("utf8");
    $sql = "select * from teacher";
    $result = $teacherDB->query($sql);
//            var_dump($result);
    while ($row = $result->fetch_assoc()) {
        ?>
        <tr>
            <td>
                <?php
                echo $row['name'];
                ?>
            </td>
            <td>
                <?php
                echo $row['age'];
                ?>
            </td>
            <td>
                <?php
                echo $row['sex'];
                ?>
            </td>
            <td>
                <?php
                echo $row['course'];
                ?>
            </td>
            <td>
<!--                <button class="del">删除</button>-->
<!--                <button class="edit">编辑</button>-->
                <?php
                $id = $row['id'];
                echo "<a class='btn' href='del.php?id=$id'>删除</a>";
                echo "<a class='btn' href='edit.php?id=$id'>编辑</a>";
                ?>
            </td>
        </tr>
        <?php
    }
    ?>
    <tr>
        <td colspan="5"><a href="addPage.html" class="add">+</a></td>
    </tr>
    </tbody>
</table>
</body>
</html>