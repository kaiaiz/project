window.onload = function () {
    //侧导航开始
    let nav = document.querySelectorAll('section.banner main.content aside > ul > li');
    let children = document.querySelectorAll('section.banner main.content aside > ul > li div.children');
    for (let i = 0; i < nav.length; i++) {
        nav[i].onmouseenter = function () {
            children[i].style.display = 'block';
        }
        nav[i].onmouseleave = function () {
            children[i].style.display = 'none';
        }
    }
    //侧导航结束
    //banner轮播图开始
    let banner = document.querySelector('a.images');
    let img = document.querySelectorAll('img.ban');
    let lastDiv = document.querySelector('div.last-div');
    let button = lastDiv.getElementsByTagName('a');

    //自动轮播
    var num = 0;

    function inter() {
        num++;
        if (num == img.length) {
            num = 0;
        }
        for (let i = 0; i < img.length; i++) {
            img[i].classList.add('none');
            img[i].classList.remove('block');
            button[i].classList.remove('select');
        }
        img[num].classList.remove('none');
        img[num].classList.add('block');
        button[num].classList.add('select');
    }
    let interval = setInterval(inter, 2000);
    banner.onmouseleave = function () {
        interval = setInterval(inter, 2000);
        // alert(1);
    }
    banner.onmouseenter = function () {
        clearInterval(interval);
    }
    /*banner.onmouseenter=function(){
         img[num].classList.remove('none');
         img[num].classList.add('block');
       }
       banner.onmouseleave=function(){
         img.classList.remove('block');
         img[num].classList.add('none');
       }*/
    //banner轮播图结束
    //按钮轮播开始
    for (let i = 0; i < button.length; i++) {
        button[i].onclick = function () {
            for (let i = 0; i < img.length; i++) {
                img[i].classList.add('none');
                img[i].classList.remove('block');
                button[i].classList.remove('select');
            }
            img[i].classList.remove('none');
            img[i].classList.add('block');
            this.classList.add('select');
        }
    }
    //按钮轮播结束


    //屏蔽a标签的默认行为(跳转)：在a标签中加入javascript:void(0);或在事件函数中返回false

    //停靠栏开始
    let dockList = document.querySelector('div.dock-list');
    console.log(dockList)
    let floor = document.querySelectorAll('section.floor');
    let contentHeight = innerHeight;
    let asideBox = document.querySelectorAll('div.dock-list div.dock-m');
    let srcPath;
    let btnNumber = 0; //指定侧边按钮信号量
    let floorArry = new Array();
    floor.forEach(
        function (value, index, arr) {
            floorArry.push(value.offsetTop);
        }
    );
    asideBox[btnNumber].classList.add('docked');

    function select(value, index) {
        value = undefined ? undefined : value;
        index = undefined ? undefined : index;
        let minSize = parseInt(contentHeight + document.body.scrollTop);
        if (minSize > floorArry[0]) {
            dockList.style.display = 'block';
        }
        if (minSize > value) { //解决兼容问题（火狐，其他浏览器属性为0）：document.documentElement.scrollTop
            asideBox[btnNumber].classList.remove('docked');
            btnNumber = index;
            asideBox[btnNumber].classList.add('docked');
        }
    }

    window.onscroll = function () { //滚动事件监听只能有一个
        floorArry.forEach(
            function (value, index, arr) {
                select(value, index);
            }
        );
    } //由于forEach遍历元素和for循环类似，index存储全局变量，所以只会判断最后一个元素
    asideBox.forEach(
        function (value, index, arr) {
            value.onclick = function () {
                if (index == floorArry.length) {
                    document.body.scrollTop = 0;
                    dockList.style.display = 'none';
                }
                let number = floorArry[index];
                // console.log(floorArry[index])
                // document.body.scrollTop=number;
                // console.log(document.body.scrollTop)
                animate(
                    document.body, {
                        scrollTop: `${floorArry[index]}`
                    }
                );
            }
        }
    );
    //停靠栏结束
}
