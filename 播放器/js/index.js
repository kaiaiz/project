    function handle() {
        class musicBox {
            constructor(musicObj, audio) {
                this.musicObj = musicObj;
                this.musicNumber = 0; //初始歌单值为0
                this.audio = audio;
                this.currentDate = 0;
                this.totalDate = 0; //由于总时长需要在引入src属性后才能加载，所以放置属性部分。
            }
            initSong(index) {
                this.musicNumber = index;
                this.audio.src = this.musicObj[this.musicNumber].src; //指定音乐路径,不能放在paly函数中，否则paused属性会重置，且不能放在构造器属性中，因为属性值不会每次自动重新计算值.如果将其放于初始化的方法中，会导致播放方法的中断。
            }
            initList(initNumber) {
                let main = document.querySelector('section.music> main.content');
                let musicBox = document.querySelector('div.musicBox');
                let musicDiv = musicBox.cloneNode(true);
                let musicPic = musicDiv.querySelector('div.picture a.musicPic');
                musicPic.style.backgroundImage = `url('${this.musicObj[this.musicNumber]['photo']}')`;
                //        music list fetch start
                let songName = musicDiv.querySelector('div.musicLrc>p#lrcName'); //歌名
                let singerName = musicDiv.querySelector('div.musicLrc>div.info>p.vocalist>span'); //获取歌手名
                let lrcList = musicDiv.querySelector('div.musicLrc>div.lrcContent'); //copy的歌词单
                let lrcItem = musicBox.querySelector('p.lrcItem'); //获取模板歌词内容
                songName.innerText = this.musicObj[this.musicNumber].songs; //传入歌名
                singerName.innerText = this.musicObj[this.musicNumber].name; //传入歌手名
                $(lrcList).empty(); //copy模板前先清空已有的歌词。
                for (let i = initNumber; i < this.musicObj[this.musicNumber].lyrics.length; i++) {
                    let lrcItemCopy = lrcItem.cloneNode(true);
                    //                    let lrcItemCopy=document.createElement('p');
                    lrcItemCopy.setAttribute('id', 'list' + i);
                    //                    $(lrcItemCopy).attr('list','list'+i);
                    lrcItemCopy.innerText = this.musicObj[this.musicNumber].lyrics[i].lyric;
                    lrcList.appendChild(lrcItemCopy); //拷贝并复制歌词
                }
                //        //        music list fetch end
                main.appendChild(musicDiv);
                main.removeChild(musicBox); //移除原有的盒子
                musicBox = null; //清除内存
            }
            nextSong() {
                let main = document.querySelector('section.music> main.content');
                let musicBox = document.querySelector('div.musicBox');
                let musicDiv = musicBox.cloneNode(true);
                let musicPic = musicDiv.querySelector('div.picture a.musicPic');
                musicPic.style.backgroundImage = `url('${this.musicObj[this.musicNumber]['photo']}')`;
                //        music list fetch start
                let songName = musicDiv.querySelector('div.musicLrc>p#lrcName'); //歌名
                let singerName = musicDiv.querySelector('div.musicLrc>div.info>p.vocalist>span'); //获取歌手名
                let lrcList = musicDiv.querySelector('div.musicLrc>div.lrcContent');
                let lrcItem = lrcList.querySelector('p.lrcItem'); //获取歌词内容
                songName.innerText = this.musicObj[this.musicNumber].songs; //传入歌名
                singerName.innerText = this.musicObj[this.musicNumber].name; //传入歌手名
                for (let i = initNumber; i < this.musicObj[this.musicNumber].lyrics.length; i++) {
                    let lrcItemCopy = lrcItem.cloneNode(true);
                    lrcItemCopy.innerText = this.musicObj[this.musicNumber].lyrics[i].lyric;
                    lrcList.appendChild(lrcItemCopy); //拷贝并复制歌词
                }
                lrcList.removeChild(lrcItem);
                console.log(lrcList)
                //        //        music list fetch end
                main.appendChild(musicDiv);
                main.removeChild(musicBox); //移除原有的盒子
                musicBox = null; //清除内存
            }
            play(playBtn) {
                if (this.audio.paused) {
                    this.audio.play();
                    playBtn.classList.remove('icon-kaishi');
                    playBtn.classList.add('icon-zanting');
                    this.totalDate = this.audio.duration;
                } else {
                    this.audio.pause();
                    playBtn.classList.remove('icon-zanting');
                    playBtn.classList.add('icon-kaishi');
                }
            }
            setProgress(progressBar, schedulBtn, progressCircle) {
                let totalLength = parseInt(getComputedStyle(progressBar, null).width);
                let percentage = (this.audio.currentTime / this.audio.duration);
                schedulBtn.style.width = `${totalLength*percentage}px`;
                progressCircle.style.left = `${totalLength*percentage-5}px`;
            }
            setTime(progressTime) {
                let currentDateMinute = Math.floor(this.audio.currentTime / 60) >= 10 ? Math.floor(this.audio.currentTime / 60) : `0${Math.floor(this.audio.currentTime/60)}`;
                let currentDateSecond = Math.floor(this.audio.currentTime % 60) >= 10 ? Math.floor(this.audio.currentTime % 60) : `0${Math.floor(this.audio.currentTime%60)}`;
                this.currentDate = `${currentDateMinute}:${currentDateSecond}`; //正在进行的时间
                let totalDateMinute = Math.floor(this.totalDate / 60) >= 10 ? Math.floor(this.totalDate / 60) : `0${Math.floor(this.totalDate/60)}`;
                let totalDateSecond = Math.floor(this.totalDate % 60) >= 10 ? Math.floor(this.totalDate % 60) : `0${Math.floor(this.totalDate%60)}`; //总时长
                progressTime.innerText = `${currentDateMinute}:${currentDateSecond}:${totalDateMinute}:${totalDateSecond}`;
            }
            updateLyrics() { //更新歌词
                let currentObj = this;
                database[this.musicNumber].lyrics.forEach(
                    (value, index, arr) => {
                        //            console.log(value.time=='00:02')可以直接判断,转化为数字只能截取第一个无效字符之前的
                        if (value.time == currentObj.currentDate) {
                                    $('p').css({
                                        color:'#666',fontSize:'14px'
                                    });
                            setTimeout(
                                function () {
                                    let node = document.getElementById(`list${index}`);
                                    node.style.color = '#d2a648';
                                    node.style.fontSize = "16px";
                                }, 0);
                            if (index <= 5) {
                                index = 0;
                            } else {
                                index -= 5;
                            } //让歌词相隔5句向上轮转。
                            console.log(index)
                            currentObj.initList(index);
                            //                            let attr=`p[list]="list${index}"`;
                            //                            $(`${attr}`).css('color','red');
                        }
                    }
                ); //遍历每个歌词的每一句时间
            }
        }

        let index = 0;
        let myAudio = document.querySelector('audio');
        let prev = document.querySelector('span.prev');
        let next = document.querySelector('span.next');
        let kuW = new musicBox(database, myAudio);
        kuW.initSong(0);
        kuW.initList(0); //传入初始数值0
        //        上一首
        prev.onclick = function () {
            if (index > 0) {
                index--;
                kuW.initSong(index);
                kuW.initList(0); //传入初始数值0
                myAudio.play();
            } else if (index == 0) {
                return;
            }
        }
        //下一首
        next.onclick = function () {
            if (index < database.length - 1) {
                index++;
                kuW.initSong(index);
                kuW.initList(0); //传入初始数值0
                myAudio.play();
            } else if (index == database.lastIndexOf - 1) {
                return;
            }
        }
        //播放操作
        let playBtn = document.querySelector('span.play');
        playBtn.onclick = function () { //传入的参数只能是事件对象
            kuW.play(playBtn);
        }
        //进度条操作
        let progressBar = document.querySelector('div.progressBar');
        let schedulBtn = document.querySelector('div.schedulBtn');
        let progressCirecle = document.querySelector('a.progressBtn');
        let progressTime = document.querySelector('p.playTime');
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
