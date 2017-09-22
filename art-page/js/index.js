//option start
$(
    function () {
        //        option start
        let $optionBox = $('section.option ul:last'); //若不等待DOM加载完毕，获取的总是document。
        let optionBoxWidth = $('section.option div.article').width();
        let optionLength = $optionBox.find('li').length;
        let optionIndex = 0;
        let optionNext = 1;

        function starAuto() {
            if (optionNext == optionLength) {
                optionNext = optionIndex - 1;
            }
            if (optionNext < 0) {
                optionNext = optionIndex + 1;
            }
            if (optionNext > optionIndex) {
                $optionBox.animate({'marginLeft':`${-optionBoxWidth*optionNext}px`},3000);
                optionIndex = optionNext;
                optionNext = optionIndex + 1;
            }
            if (optionNext < optionIndex) {
                $optionBox.css({'marginLeft':`${optionBoxWidth*optionNext}px`},3000);
                optionIndex = optionNext;
                optionNext = optionIndex - 1;
            }
        }
        let interval= setInterval(
            starAuto, 3000
        );
        $optionBox.onmouseleave = function () {
            interval = setInterval(starAuto, 3000);
        }
        $optionBox.onmouseenter = function () {
            clearInterval(interval);
        }
        //        option end
    }
);
//option end
