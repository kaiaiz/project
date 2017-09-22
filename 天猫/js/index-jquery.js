window.onload = function () {
    //侧导航开始
    let nav = $('section.banner main.content aside > ul > li');
    let children = $('div.children');
    nav.mouseenter(function () {
        let num = nav.index($(this));
        children.eq(num).css('display', 'block');
    });
    nav.mouseleave(function () {
        let num = nav.index($(this));
        children.eq(num).css('display', 'none');
    });
    //侧导航结束
    //banner轮播图开始
    let banner = $('a.images');
    let img = $('img.ban');
    let lastDiv = $('div.last-div');
    let button = $('a', lastDiv);

    //自动轮播
    var num = 0;

    function inter() {
        num++;
        if (num == img.length) {
            num = 0;
        }
        img.addClass('none');
        img.removeClass('block');
        button.removeClass('select');

        img.eq(num).removeClass('none');
        img.eq(num).addClass('block');
        button.eq(num).addClass('select');
    }
    let interval = setInterval(inter, 2000);
    banner.mouseleave(function () {
        interval = setInterval(inter, 2000);
    });
    banner.mouseenter(function () {
        clearInterval(interval);
    });
    //banner轮播图结束
    //按钮轮播开始
        button.click(function () {
            let current=button.index($(this));
                img.addClass('none');
                img.removeClass('block');
                button.removeClass('select');
                
            img.eq(current).removeClass('none');
            img.eq(current).addClass('block');
            $(this).addClass('select');
        });
    //按钮轮播结束


    //屏蔽a标签的默认行为(跳转)：在a标签中加入javascript:void(0);或在事件函数中返回false

    //停靠栏开始
    let dockList = $('div.dock-list');
    let floor = $('section.floor');
    let contentHeight = innerHeight;
    let asideBox = $('div.dock-m');
    let srcPath;
    let btnNumber = 0; //指定侧边按钮信号量
    let floorArry = new Array();
    floor.each(
        function () {
            floorArry.push($(this).get(0).offsetTop);

        }
    );
    asideBox.get(btnNumber).classList.add('docked');

    function select(value, index) {
        value = undefined ? undefined : value;
        index = undefined ? undefined : index;
        let minSize = parseInt(contentHeight + document.body.scrollTop);
        if (minSize > floorArry[0]) {
            dockList.css('display', 'block');
        }
        if (minSize > value) { //解决兼容问题（火狐，其他浏览器属性为0）：document.documentElement.scrollTop
            asideBox.get(btnNumber).classList.remove('docked');
            btnNumber = index;
            asideBox.get(btnNumber).classList.add('docked');
        }
    }

    $(window).scroll(function () { //滚动事件监听只能有一个
        floorArry.forEach(
            function (value, index, arr) {
                select(value, index);
            }
        );
    }); //由于forEach遍历元素和for循环类似，index存储全局变量，所以只会判断最后一个元素
    asideBox.each(
        function (index) {
            $(this).click(function () {
                if (index == floorArry.length + 1) {
                    document.body.scrollTop = 0;
                    dockList.css('display', 'none');
                }
                let number = floorArry[index];
                animate(
                    document.body, {
                        scrollTop: `${floorArry[index]}`
                    }
                );
            })
        }
    );
    //停靠栏结束
}
