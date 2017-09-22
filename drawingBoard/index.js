function handle() {
    let canvas = document.querySelector('canvas.draw');
    let mask=document.querySelector('div.mask');
    let drawingBoard = new DrawingBoard(canvas,mask);

    //为按钮添加效果
    let leftPanel = document.querySelector('body');
    let btn = document.querySelectorAll('button');
    document.body.onmouseover = function (event) {
        btn.forEach(
            (value, index, arrObj) => {
                value.style.fontSize = '16px';
            }
        );
        if (event.target.tagName.toLocaleLowerCase() == 'button') {
            event.target.style.fontSize = '22px';
        }
    }
    document.body.onclick = function (event) {
        btn.forEach(
            (value, index, arrObj) => {
                value.classList.remove('active');
            }
        );
        if (event.target.tagName.toLowerCase() == 'button') {
            //            event.target.style.backgroundColor = '#F0C676';
            event.target.classList.add('active');
        }
    }

    //直线
    let lineBtn = document.querySelector('button.line');
    lineBtn.onclick = function () {
        drawingBoard.drawLine();
    }
    //虚线
    let dashedLineBtn = document.querySelector('button.dashed-line');
    dashedLineBtn.onclick = function () {
        drawingBoard.drawLine(true);
    }
    //铅笔
    let pencilBtn = document.querySelector('button.pencil');
    pencilBtn.onclick = function () {
        drawingBoard.drawPencil();
    }
    //橡皮擦
    let eraserBtn = document.querySelector('button.eraser')
    let eraser = document.querySelector('i.eraser');
    eraserBtn.onclick = function () {
        drawingBoard.drawEraser(eraser);
    }
    //圆
    let hollowCircleBtn = document.querySelector('button.hollow-circle');
    hollowCircleBtn.onclick = function () {
        drawingBoard.drawCricle(false); //空心圆
    }
    let solidCircleBtn = document.querySelector('button.solid-circle');
    solidCircleBtn.onclick = function () {
        drawingBoard.drawCricle(true); //空心圆
    }
    //矩形
    let hollowRectangleBtn = document.querySelector('button.hollow-rectangle')
    hollowRectangleBtn.onclick = function () {
        drawingBoard.drawRect(false);
    }
    let solidRectangleBtn = document.querySelector('button.solid-rectangle')
    solidRectangleBtn.onclick = function () {
        drawingBoard.drawRect(true);
    }
    //多边形
    let hollowPolygonBtn = document.querySelector('button.hollow-polygon');
    hollowPolygonBtn.onclick = function () {
        drawingBoard.drawPolygon();
    }
    let solidPolygonBtn = document.querySelector('button.solid-polygon');
    solidPolygonBtn.onclick = function () {
        drawingBoard.drawPolygon(true);
    }
    //多角形
    let holloeHornsFigures = document.querySelector('button.hollow-horns');
    holloeHornsFigures.onclick = function () {
        drawingBoard.drawHornsFigures();
    }
    let solidHornsFigures = document.querySelector('button.solid-horns');
    solidHornsFigures.onclick = function () {
        drawingBoard.drawHornsFigures(true);
    }
//    文字操作
    let font=document.querySelector('button.font');
    font.onclick=function(){
        drawingBoard.drawFont();
    }
    //样式操作
    let lineColor = document.querySelector('input.stroke'); //线条颜色
    lineColor.onchange = function () {
        let color = lineColor.value;
        drawingBoard.initStyle(false, color);
    }
    let fillColor = document.querySelector('input.fill');
    fillColor.onchange = function () {
        let color = fillColor.value;
        drawingBoard.initStyle(true, color);
    }

    //文件操作
    //回退
    let previousBtn=document.querySelector('button.previous');
    previousBtn.onclick=function(){
        drawingBoard.filePrevious();
    }
//    前进
    //选择
    let selectBtn=document.querySelector('button.select');
    let clip=document.querySelector('.clip');
    selectBtn.onclick=function(){
        drawingBoard.fileSelect(clip);
    }
    //反向
    let reverseBtn=document.querySelector('button.reverse');
    reverseBtn.onclick=function(){
        drawingBoard.fileReverse();
    }
    //清空
    let empty = document.querySelector('button.empty');
    empty.onclick = function () {
        drawingBoard.empty();
    }
    //保存
    let saveBtn=document.querySelector('button.save');
    let link=document.querySelector('a');
    saveBtn.onclick=function(){
        drawingBoard.fileSave(link);
    }
}
window.addEventListener('load', handle);
