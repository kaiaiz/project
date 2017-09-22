//轮播开始
window.onload = function () {
    let banner=document.querySelector('section.image>a');
    let img = document.querySelectorAll('section.image>a>img');
    let button=document.querySelectorAll('section.image>ul>li>a');
let content = banner.offsetWidth;
let index = 0;
let next = index + 1;

function move() {
    if (index == img.length - 1) {
        next = index - 1;
    } else if (index == 0) {
        next = index + 1;
    }
    if (index < next) {
        img[next].style.left = `${content}px`; //使下一个处于当前之右。
        animate(img[index], {
            left: -content
        });
        animate(img[next], {
            left: 0
        });
        index = next;
        for (let i = 0; i < button.length; i++) {
            button[i].classList.remove('opacity');
        }
        button[index].classList.add('opacity'); //注意滑动完成后再添加样式，因为初始有样式，滑动完后才是要添加样式的页面
        next = index + 1;
    } else if (index > next) {
        img[next].style.left = `${-content}`;
        animate(img[index], {
            left: content
        });
        animate(img[next], {
            left: 0
        });
        index = next;
        for (let i = 0; i < button.length; i++) {
            button[i].classList.remove('opacity');
        }
        button[index].classList.add('opacity');
        next = index - 1;
    }
}
let interval = setInterval(move, 3000);
banner.onmouseenter = function () {
    clearInterval(interval);
}
banner.onmouseleave = function () {
    interval = setInterval(move, 3000);
}
//轮播结束
//无缝轮播开始
  for(let i=0;i<button.length;i++){
    button[i].onclick=function(){
      if(i==index){
        return;//当要点击的按钮和index相同时不执行
      }
        next=i;
        button[index].classList.remove('opacity');
        button[next].classList.add('opacity');
        img[next].style.left=`${content}px`;//使当前位置为index（即值为全局index），要跳转的位置为next(值为i)
        animate(img[index],
          {left:-content}
        );
        animate(img[next],
          {left:0}
        );//加入动画效果
        index=next;
    }
  }
  //无缝轮播结束
}
