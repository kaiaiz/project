//轮播开始
window.onload = function () {
    let banner = $('section.image>a');
    let img = $('section.image>a>img');
    let button = $('section.image>ul>li>a');
    let content = banner.get(0).offsetWidth;
    let index = 0;
    let next = index + 1;

    function move() {
        if (index == img.length - 1) {
            next = index - 1;
        } else if (index == 0) {
            next = index + 1;
        }
        if (index < next) {
            img.get(next).style.left = `${content}px`; //使下一个处于当前之右。
            animate(img.get(index), {
                left: -content
            });
            animate(img.get(next), {
                left: 0
            });
            index = next;
            button.removeClass('opacity');
            button.get(index).classList.add('opacity'); //注意滑动完成后再添加样式，因为初始有样式，滑动完后才是要添加样式的页面
            next = index + 1;
        } else if (index > next) {
            img.get(next).style.left = `${-content}`;
            animate(img.get(index), {
                left: content
            });
            animate(img.get(next), {
                left: 0
            });
            index = next;
            button.removeClass('opacity');
            button.get(index).classList.add('opacity');
            next = index - 1;
        }
    }
    let interval = setInterval(move, 3000);
    banner.mouseenter( function () {
        clearInterval(interval);
    })
    banner.mouseleave( function () {
        interval = setInterval(move, 3000);
    })
    //轮播结束
    //无缝轮播开始
    for (let i = 0; i < button.length; i++) {
        button.eq(i).click( function () {
            if (i == index) {
                return; //当要点击的按钮和index相同时不执行
            }
            next = i;
            button.get(index).classList.remove('opacity');
            button.get(next).classList.add('opacity');
            img.get(next).style.left = `${content}px`; //使当前位置为index（即值为全局index），要跳转的位置为next(值为i)
            animate(img.get(index), {
                left: -content
            });
            animate(img.get(next), {
                left: 0
            }); //加入动画效果
            index = next;
        });
    }
    //无缝轮播结束
}
