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
        body{
            display: flex;
            justify-content: center;;
            align-items: center;;
        }
        a,span{
            color: darkred;
            text-decoration: none;
            font-size:18px;
        }
    </style>
    <script>
        window.addEventListener("DOMContentLoaded",
        function () {
            let spanNode=document.querySelector("span");
            let time=5;
            setInterval(
                function () {
                    time--;
                    if (time<0){
                        <?php
                        echo "location.href='index.php'";
                        ?>
                    }
                    spanNode.innerHTML=time;
                },1000
            );
        }
        );
    </script>
</head>
<body>
<div class="message">
    <p class="top">提示信息</p>
    <p class="bottom">
        <span>5</span>秒后返回主界面，若不能自动跳转，则点击<a href="index.php">这里</a>
    </p>
</div>
</body>
</html>
