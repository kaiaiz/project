function handle() {
    /*属性：有哪些字符，个数，速度，积分，关卡，生命值
    方法：消除字符，
    产生字符:个数，哪些
    扣分，下一关，
    重新开始:和下一关类似，阈值不变，confirm
    下一关：清除计时器，清空所有属性和元素，增大阈值。
    */
    class Game {
        constructor(length, speed) {
            this.length = length;
            this.charactor = new String(''); //本类中此次存储的字符
            this.speed = speed;
            this.scoreMax = 5;
            this.interval; //获取定时器句柄
            this.lifeValueMax = 5;
            this.random = new Array();
            this.charArry;
        }
        start() {
            let score = document.querySelector('p.score');
            let lifeValue = document.querySelector('p.life-value');
            lifeValue.innerText = this.lifeValueMax;
            this.initCharactor(this.length);
            this.initBox();
            //        console.dir(this.charactor) 测试输出是否对象
            this.move();
            //            this.judgeElement();
            this.judgeKey();
        }
        initCharactor(arrayLength) {
            this.charArray = new Array(['Q', 'img/A_Z/Q.png'], ['W', 'img/A_Z/W.png'], ['E', 'img/A_Z/E.png'], ['R', 'img/A_Z/R.png'], ['T', 'img/A_Z/T.png'], ['Y', 'img/A_Z/Y.png'], ['U', 'img/A_Z/U.png'], ['I', 'img/A_Z/I.png'], ['O', 'img/A_Z/O.png'], ['P', 'img/A_Z/P.png'], ['A', 'img/A_Z/A.png'], ['S', 'img/A_Z/S.png'], ['D', 'img/A_Z/D.png'], ['F', 'img/A_Z/F.png'], ['G', 'img/A_Z/G.png'], ['H', 'img/A_Z/H.png'], ['J', 'img/A_Z/J.png'], ['K', 'img/A_Z/K.png'], ['L', 'img/A_Z/L.png'], ['Z', 'img/A_Z/Z.png'], ['X', 'img/A_Z/X.png'], ['C', 'img/A_Z/C.png'], ['V', 'img/A_Z/V.png'], ['B', 'img/A_Z/B.png'], ['N', 'img/A_Z/N.png'], ['M', 'img/A_Z/M.png']); //由于可能用到foEach（），所以使用数组存储
            let currentObj = this;

            function clearCharRepeat(string) {
                return Array.prototype.some.call(currentObj.charactor,
                    (currentValue, index, arr) => {
                        return string == currentValue;
                    }
                );
            }

            function clearBoxRepeat(string) {
                let box = document.querySelectorAll('div.box');
                return Array.prototype.some.call(currentObj.charactor,
                    (currentValue, index, arr) => {
                        return string == currentValue.innerText;
                    }
                );
            }

            function randomChar() {
                let randomNumber;
                for (let i = 0; i < arrayLength; i++) {
                    do {
                        randomNumber = Math.floor(parseInt(Math.random() * 26)); //获取26个字母的随机数
                    } while (clearCharRepeat(currentObj.charArray[randomNumber][0].toString) && clearBoxReapeat(charArray[randomNumber][0].toString))
                    currentObj.random[currentObj.random.length] = randomNumber;
                    currentObj.charactor = currentObj.charactor.concat(currentObj.charArray[randomNumber][0].toString()); //由于js字符串初始化后固定不可变，所以数组长度始终为0.
                    //注意：String的concat（）返回值为String类型，如果当前数组中的元素是对象引用，则在返回的连接后的新字符串数组中仍然是以对象引用的形式存在，并不会创建一个等同的对象。简而言之，如果当前数组中的元素是对象，新数组中的元素还是这个对象，它们指向同一个对象。
                }
            } //由于普通函数的this由调用时决定，而默认调用对象又是window，所以需要更改函数内的引用对象。
            randomChar();
            currentObj.charactor = new String(currentObj.charactor); //将字符串内容重新赋予chararctor属性
        }
        initBox() {
            let currentObj = this;

            function judgeLeft(leftPosition) {
                let box = document.querySelectorAll('div.box');
                return Array.prototype.some.call(box,
                    (currentValue, index, arr) => {
                        let leftBox = getComputedStyle(currentValue, null).left;
                        return (leftBox + 50 > leftPosition) && (leftPosition + 50 > leftBox)
                    }
                );
                a
            }
            Array.prototype.forEach.call(this.charactor,
                (value, index, array) => {
                    let box = document.createElement('div');
                    let topPosition = parseInt(Math.floor(Math.random() * 200));
                    let leftPosition;
                    do {
                        leftPosition = parseInt(Math.floor(Math.random() * (window.innerWidth - 200) + 100));
                    } while (judgeLeft(leftPosition))
                    box.style.backgroundImage = `url(${currentObj.charArray[currentObj.random[index]][1]})`;
                    box.classList.add('box');
                    box.innerText = value;
                    box.style.top = `${topPosition}px`; //使初始高度随机
                    box.style.left = `${leftPosition}px`; //注意style属性加‘px’,左边距随机
                    document.body.appendChild(box); //若body为null,则在body标签前或在body标签中就加载了或写的js代码，此时还没有body元素
                }
            );
        }
        move() {
            let currentObj = this;
            this.interval = setInterval(() => { //使box落下
                let box = document.querySelectorAll('div.box');
                //                let indexBox = -1; //用于存储当前即将消失的字符。
                currentObj.judgeElement();
                Array.prototype.forEach.call(box,
                    (value, index, array) => {
                        let timeout = Math.random() * 0; //为每个box都设置延时，以拉大间距。
                        setTimeout(() => {
                            value.style.top = parseInt(getComputedStyle(value).top) + currentObj.speed + 'px';
                            if (parseInt(value.style.top) >= window.innerHeight && value != null) {
                                document.body.removeChild(value);
                                value = null; //清除内存
                                currentObj.judgeGameOver(); //判断生命值
                            }
                        }, `${timeout}`);
                    }
                );
            }, 400);
        }
        judgeElement(indexBox) {
            let boxNumber = document.body.childElementCount - 1; //由于多加了一个记分牌div，所以需要减去一
            if (boxNumber < this.length) {
                this.charactor = new String();
                this.random = new Array();
                //                Array.prototype.splice.call(this.charactor,index,1);
                this.initCharactor(this.length - boxNumber);
                this.initBox();
            }
        }
        judgeKey() {
            let currentObj = this;

            function clearUp(event) {
                let box = document.querySelectorAll('div.box');
                let key = String.fromCharCode(event.keyCode.toString()); //String.fromCharCode是静态方法，不能作为已创建的 String 对象的方法来使用。因此它的语法应该是 String.fromCharCode()，而不是 myStringObject.fromCharCode()。
                //                console.log(key); //键盘码不区分大小写，a打出的都是65
                Array.prototype.forEach.call(box,
                    (value, index, array) => {
                        if (value.innerText == key) {
                            document.body.removeChild(value);
                            currentObj.judgeScore();
                        }
                    }
                );
            }
            document.addEventListener('keyup', clearUp)
        }
        judgeScore() {
            let score = document.querySelector('p.score');
            score.innerText = parseInt(score.innerText) + 1;
            if (parseInt(score.innerText) == this.scoreMax) {
                this.pass();
            }
        }
        judgeGameOver() {
            let lifeValue = document.querySelector('p.life-value');
            lifeValue.innerText = parseInt(lifeValue.innerText) - 1;
            console.log(lifeValue.innerText)
            if (parseInt(lifeValue.innerText) == 0) {
                console.log(lifeValue.innerText)
                clearInterval(this.interval);
                alert('Game Over');
                this.judgeContinue(); //当积分为0时才判断，不可放在if外。
            }
        }
        judgeContinue() {
            let cons = confirm("Are you sure restart?");
            if (cons == true) {
                clearInterval(this.interval);
                let game = new Game(5, 10);
                game.start();
            } else {
                alert('end');
                return;
            }
        }
        pass() {
            clearInterval(this.interval);
            alert("next game");
            let game = new Game(10, 20);
            game.start();
        }
    }
    let game = new Game(5, 10);
    let startBtn = document.querySelector('div.start');
    startBtn.onclick = function () {
        game.start();
    }
}
window.addEventListener('load', handle);
