(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-mianbaoxiedaohangxiaokuai" viewBox="0 0 1024 1024">'+""+'<path d="M102.4 204.8l819.2 0c56 0 102.4-46.4 102.4-102.4C1024 46.4 977.6 0 921.6 0L102.4 0C46.4 0 0 46.4 0 102.4 0 158.4 46.4 204.8 102.4 204.8z"  ></path>'+""+'<path d="M921.6 409.6 102.4 409.6C46.4 409.6 0 456 0 512c0 56 46.4 102.4 102.4 102.4l819.2 0c56 0 102.4-46.4 102.4-102.4C1024 456 977.6 409.6 921.6 409.6z"  ></path>'+""+'<path d="M921.6 819.2 102.4 819.2c-56 0-102.4 46.4-102.4 102.4S46.4 1024 102.4 1024l819.2 0c56 0 102.4-46.4 102.4-102.4S977.6 819.2 921.6 819.2z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-1" viewBox="0 0 1024 1024">'+""+'<path d="M824.107879 263.168772l-10.110265 0 0-18.715247c0-13.153578-9.69378-23.819498-21.655206-23.819498l-28.149107 0c-11.961426 0-21.655206 10.665921-21.655206 23.819498l0 18.715247L269.547551 263.168772l0-18.715247c0-13.153578-9.69378-23.819498-21.655206-23.819498l-28.149107 0c-11.960403 0-21.655206 10.665921-21.655206 23.819498l0 18.759249c-65.897849 0.930185-119.215172 52.513004-119.215172 115.822912l0 444.577425c0 63.888076 54.28844 115.865891 121.017214 115.865891l624.216781 0c66.728774 0 121.016191-51.977815 121.016191-115.865891L945.123047 379.035686C945.12407 315.146587 890.836653 263.168772 824.107879 263.168772zM870.261035 823.61311c0 22.610974-20.703531 41.002856-46.154179 41.002856l-624.216781 0c-25.450648 0-46.155203-18.392906-46.155203-41.002856L153.734872 379.035686c0-22.60995 20.705578-41.004903 46.155203-41.004903l624.216781 0c25.449625 0 46.154179 18.394952 46.154179 41.004903L870.261035 823.61311z"  ></path>'+""+'<path d="M359.226013 230.841505c20.672832 0 37.430494-16.757662 37.430494-37.430494l0-26.880207c0-4.081968 1.765203-6.482645 2.641153-7.14677L624.701317 159.384034c0.874927 0.664126 2.64013 3.065825 2.64013 7.14677l0 23.25975c0 20.672832 16.758686 37.431517 37.430494 37.431517 20.672832 0 37.431517-16.758686 37.431517-37.431517l0-23.25975c0-45.219901-34.55398-82.008782-77.025281-82.008782l-226.355331 0c-42.472324 0-77.026304 36.788881-77.026304 82.008782l0 26.880207C321.795519 214.08282 338.553181 230.841505 359.226013 230.841505z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-pingguo" viewBox="0 0 1228 1024">'+""+'<path d="M982.018 344.79c-45.451-68.175-143.923-109.836-223.459-94.686-37.873 7.574-71.963 22.723-109.836 34.085-22.723 7.574-45.451 7.574-71.963 0-15.15-7.574-34.085-11.362-49.237-18.938-90.898-34.085-170.434-11.362-234.821 53.025-60.599 56.813-83.324 128.773-87.11 212.098-3.788 162.861 56.813 302.996 162.861 424.194 30.299 34.085 68.175 56.813 113.622 45.451 22.723-3.788 45.451-15.15 64.387-22.723 37.873-15.15 75.748-22.723 117.411-11.362 22.723 3.788 41.663 15.15 64.387 22.723 60.599 22.723 109.836 15.15 155.285-34.085 41.663-45.451 75.748-98.474 102.26-155.285 7.574-18.938 18.938-41.663 26.511-60.599-166.646-75.748-178.010-299.209-30.299-393.894zM618.424 238.742c7.574 0 18.938 0 26.511-3.788 68.175-18.938 113.622-64.387 143.923-128.773 11.362-30.299 18.938-60.599 15.15-98.474-53.025 7.574-98.474 26.511-132.561 64.387-41.663 41.663-64.387 90.898-64.387 151.499 0 11.362 3.788 15.15 11.362 15.15z"  ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)