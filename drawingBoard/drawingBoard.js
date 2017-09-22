/*功能：
属性：
    线宽，端点，颜色，边数，角度，尺寸，宽，高，历史纪录
    方法：
    直线，虚线，铅笔，多边形，圆，矩形，多角形，橡皮，裁剪，文字，新建，保存。*/
class DrawingBoard {
    constructor(canvas, mask) {
        //        this.canvas = canvas;
        this.mask = mask;
        this.drawObj = canvas.getContext('2d'); //注意区分绘图环境和canvas元素的不同
        this.ow = canvas.width;
        this.oh = canvas.height;
        this.boardWidth = canvas.width; //画布宽
        this.boardHeight = canvas.height; //画布高
        this.previousImageData = new Array(); //存储画布数据
        this.previousImageDataLength = 0; //画布历史数据长度
        this.selectTemp; //存储当次选择的图像数据
        this.figureStyle = 'stroke'; //控制填充还是轮廓
        this.strokeStyle = null; //轮廓颜色
        this.fillStyle = null; //填充颜色
        this.lineWidth;
        this.polygonNumber = 5; //默认多边行条数为5
        this.hornsFiguresNumber = 5; //默认多角形数为5
        this.radius; //定义半径
        this.temp = null; //裁切
    }
    initStyle(flag, color) { //初始化样式
        flag = false == undefined ? undefined : flag;
        if (flag == false) {
            this.strokeStyle = color;
        } else if (flag == true) {
            this.fillStyle = color;
        }
    }
    drawLine(flag) {
        flag = flag == undefined ? false : flag;
        let currentObj = this;
        this.initStyle();
        this.mask.onmousedown = function (event) {
            let startX = event.offsetX;
            let startY = event.offsetY;
            currentObj.mask.onmousemove = function (event) {
                let endX = event.offsetX;
                let endY = event.offsetY;
                currentObj.drawObj.clearRect(0, 0, currentObj.boardWidth, currentObj.boardHeight);
                if (currentObj.previousImageDataLength) {
                    currentObj.drawObj.putImageData(currentObj.previousImageData[currentObj.previousImageDataLength - 1], 0, 0); //保存上一步的画图。
                }
                if (flag == true) {
                    currentObj.drawObj.setLineDash([5, 15]);
                    currentObj.drawObj.lineDashOffset = 0;
                }
                currentObj.drawObj.beginPath();
                if (currentObj.drawObj.strokeStyle) {
                    currentObj.drawObj.strokeStyle = currentObj.strokeStyle;
                }
                currentObj.drawObj.moveTo(startX, startY);

                currentObj.drawObj.lineTo(endX, endY);
                currentObj.drawObj.closePath();
                currentObj.drawObj[currentObj.figureStyle](); //使用构造器属性，填充还是轮廓
                currentObj.drawObj.setLineDash([0, 0]); //由于每次重新开始绘画时所留虚线属性还在，会影响下一次的绘制，所以需要将其置为0.
            }
            currentObj.mask.onmouseup = function () {
                //当已存数据时清空，存储本次绘图数据
                //                currentObj.previousImageData = null;//每次单个保存历史纪录，长度为1
                currentObj.previousImageDataLength = currentObj.previousImageData.push(currentObj.drawObj.getImageData(0, 0, currentObj.boardWidth, currentObj.boardHeight));
                currentObj.mask.onmousemove = null;
            }
        }
    }
    drawPencil() {
        let currentObj = this;
        this.mask.onmousedown = function (event) {
            let startX = event.offsetX;
            let startY = event.offsetY;
            currentObj.drawObj.beginPath();
            currentObj.drawObj.moveTo(startX, startY);
            currentObj.mask.onmousemove = function (event) {
                let endX = event.offsetX;
                let endY = event.offsetY;
                currentObj.drawObj.lineTo(endX, endY);
                currentObj.drawObj.stroke();
            }
            currentObj.mask.onmouseup = function () {
                currentObj.mask.onmousemove = null;
            }
        }
    }
    /*drawEraser(eraser) { //橡皮擦
        let currentObj = this;
        let eraserWidth = getComputedStyle(eraser, null).width;
        let eraserHeight = getComputedStyle(eraser, null).height;

        function eraserEnter(event) {
            eraser.style.display = 'block';
            event.preventDefault(); //阻止浏览器的默认行为
            let topApart;
            let leftApart;
            let clearTop;
            let clearLeft;
            document.body.onmousemove = function (event) {
                topApart = event.clientY;
                leftApart = event.clientX;
                eraser.style.top = `${topApart - parseInt(eraserHeight) / 2}px`; //由于top是相对于body定位，所以不需要减去外面盒子宽高，并且由于鼠标位置与元素左上角重合，所以需要减去元素一半宽高。
                eraser.style.left = `${leftApart - parseInt(eraserWidth) / 2}px`;
                //鼠标按下事件
                function eraserDown() {
                    clearTop = topApart - 100;
                    clearLeft = leftApart - 100;
                    let clearRangleX = parseInt(eraserWidth);
                    let clearRangleY = parseInt(eraserHeight);
                    console.log(clearLeft)
                    currentObj.drawObj.fillRect(clearLeft, clearTop, clearRangleX, clearRangleY);
                    //                    currentObj.drawObj.clearRect(clearLeft, clearTop, clearRangleX, clearRangleY);
                }
                eraser.addEventListener('mousedown', eraserDown); //由于鼠标在eraser上，所以应给eraser添加事件
            }
        }
        this.mask.addEventListener('mouseenter', eraserEnter);
    }*/
    //橡皮擦
    drawEraser(eraser) {
        let that = this;
        this.mask.onmousedown = function (e) {
            e.preventDefault();
            that.mask.onmousemove = function (e) {
                e.preventDefault();
                eraser.style.display = 'block';
                let cx = e.offsetX,
                    cy = e.offsetY;
                let w = eraser.offsetWidth,
                    h = eraser.offsetHeight;
                let lefts = cx - w / 2,
                    tops = cy - h / 2;
                if (lefts < 0) {
                    lefts = 0;
                }
                if (lefts > that.boardWidth - w) {
                    lefts = that.boardWidth - w;
                }
                if (tops < 0) {
                    tops = 0;
                }
                if (tops > that.boardHeight - h) {
                    tops = that.boardHeight - h;
                }
                eraser.style.left = lefts + 'px';
                eraser.style.top = tops + 'px';
                that.drawObj.clearRect(lefts, tops, w, h);
            }
            that.mask.onmouseup = function () {
                eraser.style.display = 'none';

                let datas = that.drawObj.getImageData(0, 0, that.boardWidth, that.boardHeight);
                that.previousImageData.push(datas);
                that.mask.onmousemove = null;
            }
        }
    }

    drawCricle(flag) {
        flag = flag == undefined ? false : flag;
        let currentObj = this;
        this.initStyle();
        this.mask.onmousedown = function (event) {
            let circleCenterX = event.offsetX;
            let circleCenterY = event.offsetY;
            currentObj.mask.onmousemove = function (event) {
                let endX = event.offsetX;
                let endY = event.offsetY;
                let centerDifferX = Math.abs(endX - circleCenterX);
                let centerDifferY = Math.abs(endY - circleCenterY);
                let radius = Math.sqrt(Math.pow(centerDifferX, 2) + Math.pow(centerDifferY, 2));
                currentObj.drawObj.clearRect(0, 0, currentObj.boardWidth, currentObj.boardHeight);
                if (currentObj.previousImageDataLength) {
                    currentObj.drawObj.putImageData(currentObj.previousImageData[currentObj.previousImageDataLength - 1], 0, 0); //保存上一步的画图。
                }
                currentObj.drawObj.beginPath();
                currentObj.drawObj.arc(circleCenterX, circleCenterY, radius, 0, 2 * Math.PI);
                if (flag == false) {
                    currentObj.drawObj[currentObj.figureStyle]();
                } else if (flag == true) {
                    if (currentObj.figureStyle) {
                        currentObj.drawObj.fillStyle = currentObj.fillStyle;
                    }
                    currentObj.drawObj.fill();
                }
            }
            currentObj.mask.onmouseup = function () {
                currentObj.previousImageDataLength = currentObj.previousImageData.push(currentObj.drawObj.getImageData(0, 0, currentObj.boardWidth, currentObj.boardHeight));
                currentObj.mask.onmousemove = null;
            }
        }
    }
    drawRect(flag) {
        flag = flag == undefined ? false : flag;
        let currentObj = this;
        this.initStyle();
        this.mask.onmousedown = function (event) {
            let rectangleCenterX = event.offsetX;
            let rectangleCenterY = event.offsetY;
            currentObj.mask.onmousemove = function (event) {
                let endX = event.offsetX;
                let endY = event.offsetY;
                let differX = Math.abs(endX - rectangleCenterX);
                let differY = Math.abs(endY - rectangleCenterY); //离中心点的差
                let startX = rectangleCenterX - differX;
                let startY = rectangleCenterY - differY;
                let rectangleWidth = rectangleCenterX + differX;
                let rectangleHeight = rectangleCenterY + differY;
                currentObj.drawObj.clearRect(0, 0, currentObj.boardWidth, currentObj.boardHeight);
                if (currentObj.previousImageDataLength) {
                    currentObj.drawObj.putImageData(currentObj.previousImageData[currentObj.previousImageDataLength - 1], 0, 0); //保存上一步的画图。
                }
                if (flag == false) {
                    currentObj.drawObj.strokeRect(startX, startY, rectangleWidth, rectangleHeight);
                } else if (flag == true) {
                    if (currentObj.figureStyle) {
                        currentObj.drawObj.fillStyle = currentObj.fillStyle;
                    }
                    currentObj.drawObj.fillRect(startX, startY, rectangleWidth, rectangleHeight);
                }
            }
            currentObj.mask.onmouseup = function () {
                currentObj.mask.onmousemove = null;
                currentObj.previousImageDataLength = currentObj.previousImageData.push(currentObj.drawObj.getImageData(0, 0, currentObj.boardWidth, currentObj.boardHeight));
            }
        }
    }
    drawPolygon(flag) {
        flag = flag == undefined ? false : flag;
        let currentObj = this;
        this.initStyle();

        function polygon(circleCenterX, circleCenterY, radius, number) {
            currentObj.drawObj.clearRect(0, 0, currentObj.boardWidth, currentObj.boardHeight);
            //由mask调用函数所以不能使用this
            //            currentObj.drawObj.arc(circleCenterX, circleCenterY, radius, 0, 2 * Math.PI);
            //            currentObj.drawObj.stroke();
            if (currentObj.previousImageDataLength) {
                currentObj.drawObj.putImageData(currentObj.previousImageData[currentObj.previousImageDataLength - 1], 0, 0); //保存上一步的画图。
            }
            currentObj.drawObj.beginPath();
            currentObj.drawObj.moveTo(circleCenterX + radius, circleCenterY);
            for (let i = 0; i < number + 1; i++) {
                let moveX = circleCenterX + radius * Math.cos(360 / number * (Math.PI / 180) * i);
                let moveY = circleCenterY + radius * Math.sin(360 / number * (Math.PI / 180) * i);
                currentObj.drawObj.lineTo(moveX, moveY);
                if (flag == false) {
                    currentObj.drawObj[currentObj.figureStyle]();
                } else if (flag == true) {
                    if (currentObj.figureStyle) {
                        currentObj.drawObj.fillStyle = currentObj.fillStyle;
                    }
                    currentObj.drawObj.fill();
                }
            }
        }
        currentObj.mask.onmousedown = function (event) {
            let circleCenterX = event.offsetX;
            let circleCenterY = event.offsetY;
            currentObj.mask.onmousemove = function (event) {
                let endX = event.offsetX;
                let endY = event.offsetY;
                let differWidth = Math.abs(endX - circleCenterX);
                let differHeight = Math.abs(endY - circleCenterY);
                let radius = Math.sqrt(Math.pow(differWidth, 2) + Math.pow(differHeight, 2));
                polygon(circleCenterX, circleCenterY, radius, currentObj.polygonNumber);
            }
            currentObj.mask.onmouseup = function () {
                this.onmousemove = null;
                currentObj.previousImageDataLength = currentObj.previousImageData.push(currentObj.drawObj.getImageData(0, 0, currentObj.boardWidth, currentObj.boardHeight));
            }
        }
    }
    drawHornsFigures(flag) { //多边形
        flag = flag == undefined ? false : flag;
        let currentObj = this;
        this.initStyle();

        function hornsFigures(circleCenterX, circleCenterY) {
            let radius = currentObj.radius;
            let insideRadius = radius / 3;
            //            currentObj.drawObj.arc(circleCenterX, circleCenterY, radius, 0, Math.PI * 2);
            //            currentObj.drawObj.stroke();
            let moveX;
            let moveY;
            currentObj.drawObj.clearRect(0, 0, currentObj.boardWidth, currentObj.boardHeight);
            if (currentObj.previousImageDataLength) {
                currentObj.drawObj.putImageData(currentObj.previousImageData[currentObj.previousImageDataLength - 1], 0, 0); //保存上一步的画图。
            }
            currentObj.drawObj.beginPath();
            currentObj.drawObj.moveTo(circleCenterX + radius, circleCenterY);
            for (let i = 0; i < currentObj.hornsFiguresNumber * 2; i++) {
                if (i % 2 == 0) {
                    moveX = circleCenterX + radius * Math.cos(360 / (currentObj.hornsFiguresNumber * 2) * (Math.PI / 180) * i);
                    moveY = circleCenterY + radius * Math.sin(360 / (currentObj.hornsFiguresNumber * 2) * (Math.PI / 180) * i);
                } else if (i % 2 == 1) {
                    moveX = circleCenterX + insideRadius * Math.cos(360 / (currentObj.hornsFiguresNumber * 2) * (Math.PI / 180) * i);
                    moveY = circleCenterY + insideRadius * Math.sin(360 / (currentObj.hornsFiguresNumber * 2) * (Math.PI / 180) * i);
                }
                currentObj.drawObj.lineTo(moveX, moveY);
            }
            currentObj.drawObj.closePath();
            if (flag == false) {
                currentObj.drawObj[currentObj.figureStyle]();
            } else if (flag == true) {
                if (currentObj.figureStyle) {
                    currentObj.drawObj.fillStyle = currentObj.fillStyle;
                }
                currentObj.drawObj.fill();
            }
            //            currentObj.drawObj.stroke();
        }
        this.mask.onmousedown = function (event) {
            let circleCenterX = event.offsetX;
            let circleCenterY = event.offsetY;
            //            currentObj.drawObj.moveTo(circleCenterX + currentObj.radius, circleCenterY);
            currentObj.mask.onmousemove = function (event) {
                let endX = event.offsetX;
                let endY = event.offsetY;
                let differX = Math.abs(endX - circleCenterX);
                let differY = Math.abs(endY - circleCenterY);
                currentObj.radius = Math.sqrt(Math.pow(differX, 2) + Math.pow(differY, 2));
                hornsFigures(circleCenterX, circleCenterY);
            }
            currentObj.mask.onmouseup = function () {
                this.onmousemove = null;
                currentObj.previousImageDataLength = currentObj.previousImageData.push(currentObj.drawObj.getImageData(0, 0, currentObj.boardWidth, currentObj.boardHeight));
            }
        }
    }
    //文字
    /*drawFont() {
        let fontBox = document.createElement('div');
        this.mask.onmouseenter = function () {
            document.body.onmousedown= function (event) {
                let boxX = event.clientX;
                let boxY = event.clientY;
                fontBox.style.cssText = `width:100px;height:30px;border:1px dashed #000;position:absolute;top:${boxY}px;left:${boxX}px;`;
                document.body.appendChild(fontBox);
                document.body.onmousemove=function(event){
                    let moveX=event.clientX;
                    let moveY=event.clientY;
                    fontBox.style.left=`${moveX}`;
                    fontBox.style.top=`${moveY}`;
                }
                document.body.onmouseup=function(){
                    document.body.onmousedown=null;
                }
                fontBox.ondblclick = function () {
                    fontBox.contentEditable = 'true'; //可编辑属性，不是css样式
                    fontBox.onmousedown = function () {}
                    fontBox.onkeyup = function () {
                        let text = fontBox.innerText;
                        let inputText = document.createElement('input');
                        inputText.style.cssText = 'position:absolute;top:100px;left:100px;';
                        document.body.insertBefore(inputText, fontBox)
                        document.body.removeChild(fontBox);
                    }
                }
            }
        }
    }*/
    drawFont() {
        let that = this;
        this.mask.ondblclick = function (e) {
            let ow = e.offsetX,
                oh = e.offsetY;
            let div = document.createElement('div');
            div.classList.add('fonts');
            div.contentEditable = true;
            div.style.left = ow + 'px';
            div.style.top = oh + 'px';
            that.mask.appendChild(div);
            that.mask.onmousedown = null;

            let pL = ow,
                pT = oh;
            div.onmousedown = function (e) {
                let ox = e.clientX,
                    oy = e.clientY;
                that.mask.onmousedown = null;
                let ol = this.offsetLeft;
                let ot = this.offsetTop;
                that.mask.onmousemove = function (e) {
                    let cx = e.clientX,
                        cy = e.clientY;
                    pL = cx - ox + ol;
                    pT = cy - oy + ot;
                    div.style.left = pL + 'px';
                    div.style.top = pT + 'px';
                }
                div.onmouseup = function () {
                    that.mask.onmousemove = null;
                    div.onmouseup = null;
                }
            }
            div.onblur = function () {
                let value = div.innerText;
                that.drawObj.font = '30px sans-serif';
                that.drawObj.fillText(value, pL, pT);
                that.mask.removeChild(div);
            }
        }
    }
    //文件操作
    //    回退
    filePrevious() {
        this.drawObj.clearRect(0, 0, this.boardWidth, this.boardHeight);
        this.drawObj.putImageData(this.previousImageData[this.previousImageDataLength - 2], 0, 0);
    }
    //选择
    /*fileSelect() {
        this.mask.onmouseenter = function (event) {
            this.onmousedown = function (event) {
                let startX = event.clientX;
                let startY = event.clientY;
                let selectBox = document.createElement('div');
                document.body.onmousemove = function (event) {
                    let endX = event.clientX;
                    let endY = event.clientY;
                    let differX = Math.abs(endX - startX);
                    let differY = Math.abs(endY - startY);
                    let minX=startX<endX?startX:endX;
                    let minY=startY<endY?startY:endY;
                    selectBox.style.cssText = `width:${differX}px;height:${differY}px;border:1px dashed #000;position:absolute;left:${minX}px;top:${minY}px;`;
                    document.body.appendChild(selectBox);
                    function grub(){
                        this.onmousemove=function(){}
                    }
                    grab();
                }
                document.body.onmouseup = function () {
                    this.onmousemove = null;
                }
            }
        }
    }*/
    //拖拽
    drag(minX, minY, w, h, obj) {
        let that = this;
        this.mask.onmousemove = function (e) {
            let ox = e.offsetX,
                oy = e.offsetY;
            if (ox > minX && ox < minX + w && oy > minY && oy < minY + h) {
                that.mask.style.cursor = 'move';
            } else {
                that.mask.style.cursor = 'default';
            }
        }
        this.mask.onmousedown = function (e) {
            let ox = e.offsetX,
                oy = e.offsetY;
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,
                    cy = e.offsetY;
                let lefts = cx - ox + minX;
                let tops = cy - oy + minY;
                if (lefts < 0) {
                    lefts = 0;
                }
                if (lefts > that.ow - w) {
                    lefts = that.ow - w;
                }
                if (tops < 0) {
                    tops = 0;
                }
                if (tops > that.oh - h) {
                    tops = that.oh - h;
                }
                obj.style.left = `${lefts}px`;
                obj.style.top = `${tops}px`;
                that.drawObj.clearRect(0, 0, that.ow, that.oh);
                if (that.previousImageData.length > 0) {
                    that.drawObj.putImageData(that.previousImageData[that.previousImageData.length - 1], 0, 0)
                }
                if (that.temp) {
                    that.drawObj.putImageData(that.temp, lefts, tops);
                }
            }
            that.mask.onmouseup = function () {
                that.temp = null;
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                obj.style.display = 'none';
                let datas = that.drawObj.getImageData(0, 0, that.ow, that.oh);
                that.previousImageData.push(datas);

                that.mask.style.cursor = 'default';
            }
        }
    }
    //裁剪
    fileSelect(clipObj) {
        let that = this;
        this.mask.onmousedown = function (e) {
            let ox = e.offsetX,
                oy = e.offsetY;
            let w, h, minX, minY;
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,
                    cy = e.offsetY;
                w = Math.abs(ox - cx);
                h = Math.abs(oy - cy);
                minX = ox > cx ? cx : ox;
                minY = oy > cy ? cy : oy;
                clipObj.style.cssText = `
					display:block;	width:${w}px;	height:${h}px; left:${minX}px; top:${minY}px;
				`;
            };
            that.mask.onmouseup = function () {
                that.temp = that.drawObj.getImageData(minX, minY, w, h);
                that.drawObj.clearRect(minX, minY, w, h);
                let datas = that.drawObj.getImageData(0, 0, that.boardWidth, that.boardHeight);
                that.previousImageData.push(datas);
                that.drawObj.putImageData(that.temp, minX, minY);
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.drag(minX, minY, w, h, clipObj);
            }
        }
    }
    //    反向
    fileReverse() {
        let currentImage = this.previousImageData[this.previousImageDataLength - 1];
        if (currentImage) {
            for (let i = 0; i < currentImage.data.length; i += 4) {
                currentImage.data[i] = 255 - currentImage.data[i];
                currentImage.data[i + 1] = 255 - currentImage.data[i + 1];
                currentImage.data[i + 1] = 255 - currentImage.data[i + 1]; //将rgb颜色取反，由于透明度不算在内，所以需要以一个像素为单位递增.
            }
            this.drawObj.putImageData(currentImage, 0, 0);
            console.log(currentImage.data)
        }
    }
    //清空
    empty() {
        this.drawObj.clearRect(0, 0, this.boardWidth, this.boardHeight);
    }
    //保存
    fileSave(link) {
        let image = this.canvas.toDataURL('image/png');
        link.href = image; //用a标签的download属性保存数据将数据传给另一个标签
        link.download = 'download.png'; //文件名
    }
}
