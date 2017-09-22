(function(window){var svgSprite='<svg><symbol id="icon-shuye" viewBox="0 0 1024 1024"><path d="M812.55424 221.969441c-4.474918 20.723997-10.165524 42.799782-17.400299 65.825195-23.004947 73.207325-56.922431 140.895961-100.81101 201.185069-54.848189 75.346035-125.410268 139.163503-209.726605 189.682084-4.117784 2.467191-8.650007 3.641947-13.124925 3.641947-8.696056 0-17.174148-4.436032-21.969361-12.438287-7.261381-12.120039-3.323699-27.830859 8.79634-35.093263C600.695065 549.46631 697.600115 427.565982 746.342236 272.456299c9.452279-30.079062 16.060791-58.44818 20.672832-83.986833-6.368034-3.65218-12.31242-6.538927-17.699104-8.592702C410.899394 50.809199 235.130182 318.015937 230.525304 519.085372c-4.604878 201.069435-166.506245 265.534656-166.506245 265.534656s102.041024 173.442214 399.807778 173.442214c349.953324-19.953448 481.95266-260.929778 494.275313-429.347558C967.323163 402.702712 883.513362 284.333814 812.55424 221.969441z"  ></path><path d="M828.062446 62.079894c-0.951675-14.097066-13.153578-24.750707-27.246551-23.803125-14.097066 0.950651-24.753777 13.149485-23.803125 27.246551 0.045025 0.666172 3.111874 50.342572-9.998725 122.946147 13.650905 7.828292 29.256324 19.189038 45.540196 33.500998C832.308143 130.475634 828.28655 65.395406 828.062446 62.079894z"  ></path></symbol><symbol id="icon-zuoyoujiantou-" viewBox="0 0 1024 1024"><path d="M952.4 495.2l-297-297c-10.1-10.1-26.5-10.1-36.6 0-10.1 10.1-10.1 26.5 0 36.6l249.4 249.4H89.9c-14.3 0-25.9 11.6-25.9 25.9 0 14.3 11.6 25.9 25.9 25.9H875L621.8 789.2c-10.1 10.1-10.1 26.5 0 36.6 5.1 5.1 11.7 7.6 18.3 7.6 6.6 0 13.3-2.5 18.3-7.6l294-294c10.1-10.1 10.1-26.5 0-36.6z"  ></path></symbol><symbol id="icon-zuoyoujiantou-1" viewBox="0 0 1024 1024"><path d="M71.60000000000002 528.8000000000002l297.00000000000006 296.9999999999999c10.100000000000003 10.099999999999998 26.5 10.099999999999989 36.599999999999994-1.0658141036401503e-14 10.099999999999998-10.100000000000003 10.099999999999989-26.5-1.0658141036401503e-14-36.599999999999994l-249.4000000000001-249.39999999999995L934.1 539.8c14.3-5.329070518200751e-15 25.899999999999995-11.600000000000012 25.899999999999984-25.900000000000002-5.329070518200751e-15-14.3-11.600000000000012-25.899999999999995-25.900000000000002-25.899999999999984L149 488 402.19999999999993 234.79999999999995c10.099999999999998-10.100000000000003 10.099999999999989-26.5-1.0658141036401503e-14-36.599999999999994-5.100000000000001-5.099999999999999-11.7-7.599999999999998-18.300000000000004-7.599999999999997-6.6 4.440892098500626e-16-13.3 2.5000000000000044-18.299999999999997 7.600000000000005l-293.9999999999999 294.00000000000006c-10.099999999999998 10.100000000000003-10.099999999999989 26.5 1.0658141036401503e-14 36.599999999999994z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)