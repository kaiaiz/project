//jQuery只是对js操作进行了抽象和封装，但编程方法没有改变。
//1.获取元素
//2.操作元素（内容，样式，属性）
$(
    function () {
        //    侧导航开始
        $('li.nav_aside').mouseenter( //使用onmouseout会触发父元素的事件（子元素的事件会传递到父元素）
            function () {
                let son = $(this).children('div.children');
                $(son).css('display', 'block');
            }
        ).mouseleave(
            function () {
                let son = $(this).children('div.children');
                $(son).css('display', 'none');
            }
        );
        //    侧导航结束
        //        左右轮播按钮开始,可以使用取余的方式制作
        let image = $('section.banner a.images');
        let imageSon = image.children(); //获取所有的图片集合
        let preBtn = $('section.banner a.previous-arrow');
        let nextBtn = $('section.banner a.next-arrow'); //获取左右按钮
        let imageWidth = parseInt(getComputedStyle(image[0], null).width);
        let crossBtn = $('section.banner div.last-div').children(); //获取轮播点
        let index = 0;
        let next;

        function move() {
            next = index + 1;
            if (index == imageSon.length - 1) {
                next = 0;
            }
            $(imageSon[index]).animate({
                left: `${-imageWidth}px`
            }, 1000);
            $(imageSon[next]).css({
                left: `${imageWidth}px`
            });
            $(imageSon[next]).animate({
                left: 0
            }, 1000);
            index = next;
            Array.prototype.forEach.call(
                crossBtn,
                (value, valueIndex) => {
                    $(value).removeClass('btn-color');
                    if (valueIndex == index) {
                        $(value).addClass('btn-color');
                    }
                }
            );
        }
        preBtn.click(
            function () {
                next = index - 1;
                if (index == 0) {
                    next = imageSon.length - 1;
                }
                $(imageSon[index]).animate({
                    left: `${imageWidth}px`
                }, 1000);
                $(imageSon[next]).css({
                    left: `${-imageWidth}px`
                });
                $(imageSon[next]).animate({
                    left: `${0}`
                }, 1000);
                index = next;
                Array.prototype.forEach.call(
                    crossBtn,
                    (value, valueIndex) => {
                        $(value).removeClass('btn-color');
                        if (valueIndex == index) {
                            $(value).addClass('btn-color');
                        }
                    }
                );
            }
        ).mouseenter(
            function () {
                clearInterval(interval);
            }
        );
        nextBtn.click(
            function () {
                move();
            }
        ).mouseenter(
            function () {
                clearInterval(interval);
            }
        );
        //        左右轮播按钮结束
        //自动轮播开始
        let interval;
        image.mouseleave(
            function () {
                interval = setInterval(
                    move, 2000
                );
            }
        );
        image.mouseenter(
            function () {
                clearInterval(interval);
            }
        );
        $(window).blur(
            function () {
                clearInterval(interval);
            }
        ).focus(
            function () {
                interval = setInterval(
                    move(), 3000
                );
            }
        );
        //自动轮播结束
        //轮播按钮开始
        Array.prototype.forEach.call(
            crossBtn,
            (value, arrIndex) => {
                $(value).click(
                    function () {
                        if (arrIndex == index) {
                            return;
                        }
                        if (arrIndex > index) {
                            $(imageSon[index]).animate({
                                left: `${-imageWidth}px`
                            }, 1000);
                            $(imageSon[arrIndex]).css({
                                left: `${imageWidth}px`
                            });
                            $(imageSon[arrIndex]).animate({
                                left: 0
                            }, 1000);
                            index = arrIndex;
                            $(crossBtn).removeClass('btn-color');
                            $(crossBtn).eq(arrIndex).addClass('btn-color');
                        } else if (arrIndex < index) {
                            $(imageSon[index]).animate({
                                left: `${imageWidth}px`
                            }, 1000);
                            $(imageSon[arrIndex]).css({
                                left: `${-imageWidth}px`
                            });
                            $(imageSon[arrIndex]).animate({
                                left: 0
                            }, 1000);
                            index = arrIndex;
                            $(crossBtn).remove('btn-color');
                            $(crossBtn).eq(arrIndex).add('btn-color');
                        }
                    }
                ).mouseenter(
                    function () {
                        clearInterval(interval);
                    }
                );
            }
        );
        //轮播按钮结束
        //        小米明星单品开始
        let $controlPrev = $('section.star a.control-prev');
        let $controlNext = $('section.star a.control-next'); //获取左右控制按钮
        let coverBox = $('section.star ul'); //获取大盒子
        let boxWidth = parseInt(getComputedStyle($('section.star div.top_box').get(0), null).width);
        let boxLength = $('section.star li').length / 5;
        let starIndex = 0;
        $controlPrev.click(
            function () {
                if (starIndex <= 0) {
                    return;
                }
                starIndex--;
                coverBox.animate({
                    marginLeft: `${-boxWidth*starIndex}px`
                }, 1000);
                if (starIndex <= 0) {
                    $(this).addClass('control-disabled');
                    $controlNext.removeClass('control-disabled');
                    return;
                }
            }
        );
        $controlNext.click(
            function () {

                starIndex++;
                coverBox.animate({
                    marginLeft: `${-boxWidth*starIndex}px`
                }, 1000);
                if (starIndex >= (boxLength - 1)) {
                    $(this).addClass('control-disabled');
                    $controlPrev.removeClass('control-disabled');
                    return;
                }
            }
        );
        let indexStar = 0;
        let nextStar = 1;

        function starAuto() {
            console.log(1)
            if (nextStar == boxLength) {
                nextStar = indexStar - 1;
            }
            if (nextStar < 0) {
                nextStar = indexStar + 1;
            }
            if (nextStar > indexStar) {
                coverBox.animate(
                {'marginLeft':`${-boxWidth*nextStar}px`},1000
                );
                indexStar = nextStar;
                nextStar = indexStar + 1;
            }
            if (nextStar < indexStar) {
                coverBox.animate(
                {'marginLeft':`${boxWidth*nextStar}px`},1000
                );
                indexStar = nextStar;
                nextStar = indexStar - 1;
            }
        }
        let intervalStar = setInterval(
            starAuto, 3000
        );
        coverBox.onmouseleave = function () {
            interval = setInterval(starAuto, 1000);
        }
        coverBox.onmouseenter = function () {
            clearInterval(interval);
        }
        //        小米明星单品结束
        //        家电开始
        let $familySelect = $('section.family div.top_box > div.right_box ul li a');
        let $familyWidth = parseInt(getComputedStyle($('section.family div.bottom_box div.right_image').get(0), null).width);
        let $familyBox = $('section.family div.bottom_box ul'); //获取大盒子
        let familyIndex = 0;
        $familySelect.hover(
            function () {
                let selectIndex = $familySelect.index($(this));
                $familyBox.animate({
                    marginLeft: `${-selectIndex*$familyWidth}px`
                }, 100);
                $familySelect.removeClass('family-hover');
                $(this).addClass('family-hover');
            }
        );
        //        家电结束
        //        为你推荐开始
        let $recommendPrev = $('section.recommend a.control-prev');
        let $recommendNext = $('section.recommend a.control-next'); //获取左右控制按钮
        let commendBox = $('section.recommend ul'); //获取大盒子
        let commendWidth = parseInt(getComputedStyle($('section.recommend div.top_box').get(0), null).width);
        let commendLength = $('section.recommend li').length / 5;
        let recommendIndex = 0;
        $recommendPrev.click(
            function () {
                if (recommendIndex <= 0) {
                    return;
                }
                recommendIndex--;
                commendBox.animate({
                    marginLeft: `${-boxWidth*recommendIndex}px`
                }, 1000);
                if (recommendIndex <= 0) {
                    $(this).addClass('control-disabled');
                    $recommendNext.removeClass('control-disabled');
                }
            }
        );
        $recommendNext.click(
            function () {
                if (recommendIndex >= (commendLength - 1)) {
                    return;
                }
                recommendIndex++;
                commendBox.animate({
                    marginLeft: `${-boxWidth*recommendIndex}px`
                }, 1000);
                if (recommendIndex >= (commendLength - 1)) {
                    $(this).addClass('control-disabled');
                    $recommendPrev.removeClass('control-disabled');
                }
            }
        );
        //        为你推荐结束
        //        内容开始
        let conPrev = $('section.con div.preview-book');
        let conNext = $('section.con div.next-book');
        let conWidth = $('section.con div.bottom-box div:first').width();
        let conBox = $('section.con ul');
        let conLength = $('section.con  ul:first >li').length;
        let conIndex = 0;
        conNext.click(
            function () {
                let num = conNext.index($(this));
                if (conIndex >= conLength - 1) {
                    return;
                }
                conIndex++;
                $(conBox.get(num)).animate({
                    marginLeft: `${-conWidth*conIndex}px`
                }, 1000);
            }
        );
        conPrev.click(
            function () {
                let num = conPrev.index($(this));
                if (conIndex <= 0) {
                    return;
                }
                conIndex--;
                $(conBox.get(num)).animate({
                    marginLeft: `${-conWidth*conIndex}px`
                }, 1000);
            }
        );
        //        内容结束
    }
)
