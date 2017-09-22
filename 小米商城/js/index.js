window.onload = function () {
    //搜索框开始,获得焦点
    let inputSearch = document.querySelector('input');
    let inputButton = document.querySelector('input.search');
    let navMask = document.querySelector('ul.nav-mask');
    let text1 = document.querySelector('a.keyword1');
    let text2 = document.querySelector('a.keyword2');
    inputSearch.onfocus = function () {
        inputSearch.style.border = '1px solid #ff6700';
        navMask.style.display = 'block';
        text1.style.display = 'none';
        text2.style.display = 'none';
        inputButton.style.borderTop = '1px solid #ff6700';
        inputButton.style.borderRight = '1px solid #ff6700';
        inputButton.style.borderBottom = '1px solid #ff6700';
    }
    inputSearch.onblur = function () {
        inputSearch.style.border = '1px solid #e0e0e0';
        navMask.style.display = 'none';
        text1.style.display = 'block';
        text2.style.display = 'block';
        inputButton.style.borderTop = '1px solid #e0e0e0';
        inputButton.style.borderRight = '1px solid e0e0e0'
        inputButton.style.borderBottom = '1px solid #e0e0e0'
    }
    //搜索框结束

    //侧导航开始
    let nav = document.querySelectorAll('li.nav_aside');
    let children = document.querySelectorAll('div.children');
    for (let i = 0; i < nav.length; i++) {
        nav[i].onmouseenter = function () {
            children[i].style.display = 'block';
        }
        nav[i].onmouseleave = function () {
            children[i].style.display = 'none';
        }
    }

    //banner轮播图开始
    let banner = document.querySelector('a.images');
    let img = document.querySelectorAll('img.ban');
    //自动轮播
    /*var num=0;
  function inter(){
     num++;
    if(num==img.length){
      num=0;
    }
    for(let i=0;i<img.length;i++){
      img[i].classList.add('none');
      img[i].classList.remove('block');
    }
      img[num].classList.remove('none');
      img[num].classList.add('block');
  }
  let interval=setInterval(inter,3000);
  banner.onmouseleave=function(){
    // interval=setInterval(inter,3000);
    // alert(1);
  }
  banner.onmouseenter=function(){
    clearInterval(interval);
  }
 banner.onmouseenter=function(){
      img[num].classList.remove('none');
      img[num].classList.add('block');
    }
    banner.onmouseleave=function(){
      img.classList.remove('block');
      img[num].classList.add('none');
    }*/
    //自动轮播结束
    //无缝轮播开始
    let lastDiv = document.querySelector('div.last-div');
    let button = lastDiv.getElementsByTagName('a'); //轮播按钮
    let index = 0;
    let next = index + 1;
    let content = banner.offsetWidth;

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
                button[i].classList.remove('btn-color');
            }
            button[index].classList.add('btn-color'); //注意滑动完成后再添加样式，因为初始有样式，滑动完后才是要添加样式的页面
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
                button[i].classList.remove('btn-color');
            }
            button[index].classList.add('btn-color');
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
    //无缝轮播结束
    //banner轮播图结束

    //按钮轮播开始
    /*for(let i=0;i<button.length;i++){
      button[i].onclick=function(){
        for(let i=0;i<img.length;i++){
          img[i].classList.add('none');
          img[i].classList.remove('block');
          button[i].style.backgroundColor='rgba(0,0,0,0.4)';
        }
        img[i].classList.remove('none');
        img[i].classList.add('block');
        this.style.backgroundColor="#7c7c81";
      }
    }*/
    //无缝轮播开始
    for (let i = 0; i < button.length; i++) {
        button[i].onclick = function () {
            if (i == index) {
                return; //当要点击的按钮和index相同时不执行
            }
            next = i;
            button[index].classList.remove('btn-color');
            button[next].classList.add('btn-color');
            img[next].style.left = `${content}px`; //使当前位置为index（即值为全局index），要跳转的位置为next(值为i)
            animate(img[index], {
                left: -content
            });
            animate(img[next], {
                left: 0
            }); //加入动画效果
            index = next;
        }
    }
    //无缝轮播结束
    //按钮轮播结束

    //左右按钮轮播开始
    let previousArrow = document.querySelector('a.previous-arrow');
    let nextArrow = document.querySelector('a.next-arrow');
    /*nextArrow.onclick=function(){
    inter();
  }
  num=img.length-1;
  previousArrow.onclick=function(){
    previous();
  }
function previous(){
    num--;
    if(num==0){
      num=img.length-1;
    }
    for(let i=img.length-1;i>=0;i--){
      img[i].classList.add('none');
      img[i].classList.remove('block');
    }
      img[num].classList.remove('none');
      img[num].classList.add('block');
}*/
    //无缝轮播开始
    let flag = true;
    nextArrow.onclick = function () {
        if (!flag) {
            return;
        }
        if (next == img.length) {
            next = 0;
        }
        flag = false;
        following();
        // return false;//若切换过快，则函数执行到if而不执行之后操作，产生不停刷新的情况
    }
    previousArrow.onclick = function () {
        if (!flag) {
            return;
        }
        flag = false;
        previous();
    }

    function previous() {
        next = index - 1; //使用全局的index
        if (next == -1) {
            next = img.length - 1;
        }
        img[next].style.left = `-${content}px`;
        animate(img[index], {
            left: content
        });
        animate(img[next], {
                left: 0
            },
            function () {
                flag = true;
            }
        );
        index = next;
    }

    function following() {
        next = index + 1; //使用全局的index
        if (next == img.length) {
            next = 0;
        }
        img[next].style.left = `${content}px`;
        animate(img[index], {
            left: -content
        });
        animate(img[next], {
                left: 0
            },
            function () {
                flag = true;
            }
        );
        index = next;
    }
    //无缝轮播结束

    //左右轮播结束
    //屏蔽a标签的默认行为(跳转)：1.href="#".2.在a标签中加入javascript:void(0);3.或在事件函数中返回false

    //小米明星单品开始
    let starProduct = document.querySelector('section.star main.content div.bottom_box');
    let ulProduct = document.querySelector('section.star main.content div.bottom_box ul');
    let liProduct = document.querySelector('section.star main.content div.bottom_box ul li');
    let preBtn = document.querySelector('section.star main.content div.top_box div.btn > a:first-child');
    let nextBtn = document.querySelector('section.star main.content div.top_box div.btn > a:last-child');
    let liWidth = parseInt(getComputedStyle(liProduct).width);
    let liMagin = parseInt(getComputedStyle(liProduct, null).marginRight);
    let liCount = ulProduct.childElementCount;
    let liNumber = 5;
    let scrollScreenNumber = liCount / liNumber; //有几个需要轮转的屏
    let scrollNumber = 0; //设置滚动信号量
    let scrollWidth = liWidth * liNumber + liMagin * (liNumber - 1);

    function controldBtn() {
        nextBtn.onclick = function () {
            scrollNumber++;
            if (scrollNumber == scrollScreenNumber) {
                this.classList.add('control-disabled')
                return;
            }
            starProduct.style.marginLeft = `${-scrollWidth*scrollNumber}px`;
            if (scrollNumber == scrollScreenNumber - 1) {
                this.classList.add('control-disabled')
                preBtn.classList.remove('control-disabled');
            }
        }
        preBtn.onclick = function () {
            scrollNumber--;
            if (scrollNumber < 0) {
                return;
            }
            starProduct.style.marginLeft = `${scrollWidth*scrollNumber}px`;
            if (scrollNumber == 0) {
                this.classList.add('control-disabled');
                nextBtn.classList.remove('control-disabled')
            }
        }
    }
    controldBtn();
    let indexStar = 0;
    let nextStar = 1;

    function starAuto() {
        if (nextStar == scrollScreenNumber) {
            nextStar = indexStar - 1;
        }
        if (nextStar < 0) {
            nextStar = indexStar + 1;
        }
        if (nextStar > indexStar) {
            starProduct.style.marginLeft = `${-scrollWidth*nextStar}px`;
            indexStar = nextStar;
            nextStar = indexStar + 1;
        }
        if (nextStar < indexStar) {
            starProduct.style.marginLeft = `${scrollWidth*nextStar}px`;
            indexStar = nextStar;
            nextStar = indexStar - 1;
        }
    }
    let intervalStar = setInterval(
        starAuto, 3000
    );
    starProduct.onmouseleave = function () {
        interval = setInterval(starAuto, 3000);
    }
    starProduct.onmouseenter = function () {
        clearInterval(interval);
    }
    // 获得每一屏的宽度，设置控制信号，当点击后将a类名加入control-disabled
    /*获取子元素个数
    获取每一个li的宽度，使用getComputedStyle获得右边距
    计算一屏的宽度
    添加事件，设置访问信号量，
    if(num==3){
      return;
    }
    num++ (num=1,2,3,4)
    box.style.transform='translateX(num*1240px)';*/
    //小米明星单品结束

    //内容开始
    let bookList = document.querySelectorAll('section.con main.content div.bottom-box div > ul');
    let previewBook = document.querySelectorAll('div.preview-book');
    let nextBook = document.querySelectorAll('div.next-book');
    let i = 0;
    for (let j = 0; j < 4; j++) {
        previewBook[j].onclick = function () {
            if (i == 0) {
                return;
            }
            i--;
            bookList[j].style.marginLeft = `${-296*i}px`
        }
    }
    for (let j = 0; j < 4; j++) {
        nextBook[j].onclick = function () {
            if (i == 2) {
                return;
            }
            i++;
            bookList[j].style.marginLeft = `${-296*i}px`
        }
    }
    //内容结束
}
