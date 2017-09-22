class music {
    constructor(musicObj, audio) {
        this.musicObj = musicObj;
        this.musicNumber = 0; //初始歌单值为0
        this.audio = audio;
        this.currentDate = 0;
        this.totalDate = 0; //由于总时长需要在引入src属性后才能加载，所以放置属性部分。
    }
    initSong(initNumber) {
        this.audio.src = this.musicObj[this.musicNumber].src; //指定音乐路径,不能放在paly函数中，否则paused属性会重置，且不能放在构造器属性中，因为属性值不会每次自动重新计算值.如果将其放于初始化的方法中，会导致播放方法的中断。
    }
    initList(initNumber) {
        let main = $('section.music> main.content');
        let musicBox = $('div.musicBox');
        let musicDiv = $(musicBox.get(0).cloneNode(true));
        //        music list fetch start
        let songName = musicDiv.find('div.musicLrc>p#lrcName'); //歌名
        let singerName = musicDiv.find('div.musicLrc>div.info>p.vocalist>span'); //获取歌手名
        let lrcList = musicDiv.find('div.musicLrc>div.lrcContent');
        let lrcItem = lrcList.find('p.lrcItem'); //获取歌词内容
        songName.innerText = this.musicObj[this.musicNumber].songs; //传入歌名
        singerName.innerText = this.musicObj[this.musicNumber].name; //传入歌手名
        for (let i = initNumber; i < this.musicObj[this.musicNumber].lyrics.length; i++) {
            let lrcItemCopy = lrcItem.get(0).cloneNode(true);
            lrcItemCopy.innerText = this.musicObj[this.musicNumber].lyrics[i].lyric;
            lrcList.get(0).appendChild(lrcItemCopy); //拷贝并复制歌词
        }
        lrcList.get(0).removeChild(lrcItem.get(0));
        //        //        music list fetch end
        main.get(0).appendChild(musicDiv.get(0));
        main.get(0).removeChild(musicBox.get(0)); //移除原有的盒子
        musicBox = null; //清除内存
    }
    play(playBtn) {
        if (this.audio.paused) {
            this.audio.play();
            playBtn.removeClass('icon-kaishi');
            playBtn.addClass('icon-zanting');
            this.totalDate = this.audio.duration;
        } else {
            this.audio.pause();
            playBtn.removeClass('icon-zanting');
            playBtn.addClass('icon-kaishi');
        }
    }
    setProgress(progressBar, schedulBtn, progressCircle) {
        let totalLength = parseInt(progressBar.width());
        let percentage = (this.audio.currentTime / this.audio.duration);
        schedulBtn.css('width',`${totalLength*percentage}px`);
        progressCircle.css('left',`${totalLength*percentage-5}px`);
    }
    setTime(progressTime) {
        let currentDateMinute = Math.floor(this.audio.currentTime / 60) >= 10 ? Math.floor(this.audio.currentTime / 60) : `0${Math.floor(this.audio.currentTime/60)}`;
        let currentDateSecond = Math.floor(this.audio.currentTime % 60) >= 10 ? Math.floor(this.audio.currentTime % 60) : `0${Math.floor(this.audio.currentTime%60)}`;
        this.currentDate = `${currentDateMinute}:${currentDateSecond}`; //正在进行的时间
        let totalDateMinute = Math.floor(this.totalDate / 60) >= 10 ? Math.floor(this.totalDate / 60) : `0${Math.floor(this.totalDate/60)}`;
        let totalDateSecond = Math.floor(this.totalDate % 60) >= 10 ? Math.floor(this.totalDate % 60) : `0${Math.floor(this.totalDate%60)}`; //总时长
        progressTime.text(`${currentDateMinute}:${currentDateSecond}:${totalDateMinute}:${totalDateSecond}`);
    }
    updateLyrics() { //更新歌词
        let currentObj = this;
        database[this.musicNumber].lyrics.forEach(
            (value, index, arr) => {
                //            console.log(value.time=='00:02')可以直接判断,转化为数字只能截取第一个无效字符之前的
                //                console.log(value.time)
                if (value.time == currentObj.currentDate) {
                    currentObj.initList(index);
                }
            }
        ); //遍历每个歌词的每一句时间
    }
}

function handle() {
    let myAudio = document.querySelector('audio');
    let kuW = new music(database, myAudio);
    kuW.initSong(0);
    kuW.initList(0); //传入初始数值0
    //播放操作
    let playBtn = $('span.play');
    playBtn.click(function () { //传入的参数只能是事件对象
        kuW.play(playBtn);
    });
    //进度条操作
    let progressBar = $('div.progressBar');
    let schedulBtn = $('div.schedulBtn');
    let progressCirecle = $('a.progressBtn');
    let progressTime = $('p.playTime');
    /*myAudio.addEventListener('timeupdate', function () {
//        kuW.setProgress(progressBar, schedulBtn, progressCirecle);
        kuW.setTime(progressTime); //    时间显示操作
        console.log(kuW.currentDate)
        kuW.updateLyrics(); //歌词轮转
    })*/
    myAudio.ontimeupdate = function () {
        kuW.setProgress(progressBar, schedulBtn, progressCirecle);
        kuW.setTime(progressTime); //    时间显示操作
        kuW.updateLyrics(); //歌词轮转
    }
}
window.addEventListener('load', handle);
