"use strict";angular.module("app",["ui.router","ngCookies","chart.js","ngAnimate"]),angular.module("app").config(["ChartJsProvider",function(e){e.setOptions({colors:["#803690","#00ADF9","#DCDCDC","#46BFBD","#FDB45C","#949FB1","#4D5360"]})}]),angular.module("app").value("dict",{pageAnimate:{status:"next"},index:{city:"",cityId:"",weather:"",cont:""},ip:"",list:""}),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("main",{url:"/main",templateUrl:"pages/main/main.html",controller:"mainCtrl"}).state("forecast",{url:"/forecast",templateUrl:"pages/forecast/forecast.html",controller:"forecastCtrl"}).state("detail",{url:"/detail",templateUrl:"pages/detail/detail.html",controller:"detailCtrl"}).state("index",{url:"/detail/index?:id",templateUrl:"pages/Index/index.html",controller:"indexCtrl"}),t.otherwise("main")}]),angular.module("app").service("cache",["$cookies",function(e){this.put=function(t,a){e.put(t,a)},this.get=function(t){return e.get(t)},this.remove=function(t){return e.remove(t)}}]),angular.module("app").service("dataTools",function(){this.splitDate=function(e,t,a){var n=e.split("-"),s=t.split(a),r=n.length;if(1==r)switch(n){case"yy":return s[0];case"dd":return s[2];case"mm":return s[1]}else if(2==r)switch(e){case"mm-dd":return s.splice(1).join("-");case"dd-mm":return s.reverse().splice(1).join("-")}},this.reformatData=function(e){var t=[],a=0;if(e.suggestion&&(e.suggestion.comf.id="comf",e.suggestion.comf.name="体感温度",e.suggestion.comf.img="image/icon/tmp.png",t.push(e.suggestion.comf),e.suggestion.cw.id="cw",e.suggestion.cw.name="洗车指数",e.suggestion.cw.img="image/icon/car.png",t.push(e.suggestion.cw),e.suggestion.drsg.id="drsg",e.suggestion.drsg.name="穿衣指数",e.suggestion.drsg.img="image/icon/cloth.png",t.push(e.suggestion.drsg),e.suggestion.flu.id="flu",e.suggestion.flu.name="感冒指数",e.suggestion.flu.img="image/icon/flur.png",t.push(e.suggestion.flu),e.suggestion.sport.id="sport",e.suggestion.sport.name="运动指数",e.suggestion.sport.img="image/icon/sport.png",t.push(e.suggestion.sport),e.suggestion.trav.id="trav",e.suggestion.trav.name="旅游指数",e.suggestion.trav.img="image/icon/tra.png",t.push(e.suggestion.trav),e.suggestion.uv.id="uv",e.suggestion.uv.name="紫外线指数",e.suggestion.uv.img="image/icon/spf.png",t.push(e.suggestion.uv),a=3-t.length%3))for(var n=0;n<a;n++)t.push("");return e},this.canUpdate=function(e,t){if(e){if(t){var a=new Date;return console.log(t,a),t=t.split(" "),a.getFullYear()-t[0]?(console.log("更新时间大于一年"),!0):a.getMonth()-t[1]?(console.log("更新时间大于一个月"),!0):a.getDay()-t[2]?(console.log("更新时间大于一天"),!0):a.getHours()-t[3]?(console.log("更新时间大于一小时"),!0):a.getMinutes()-t[4]>5?(console.log("更新时间大于五分钟"),!0):(console.log("有时间有数据，小于五分钟"),!1)}return console.log("没有记录更新时间"),!0}return console.log("没有天气数据"),!0},this.codeToClass=function(e){switch(e){case"100":return"sunny";case"101":return"cloudy";case"102":return"few-clouds";case"103":return"partly-cloudy";case"104":return"overcast";case"200":return"windy";case"201":return"calm";case"202":return"light-breeze";case"203":return"moderate";case"204":return"fresh-breeze";case"205":return"strong-breeze";case"206":return"high-wind";case"207":return"gale";case"208":return"strong-gale";case"209":return"storm";case"210":return"violent-storm";case"211":return"hurricane";case"212":return"tornado";case"213":return"tropical-storm";case"300":return"shower-rain";case"301":return"hshower-rain";case"302":return"thunder-shower";case"303":return"heavy-thunderstorm";case"304":return"hail";case"305":return"light-rain";case"306":return"moderate-rain";case"307":return"heavy-rain";case"308":return"extreme-rain";case"309":return"drizzle-rain";case"310":return"storm";case"311":return"heavy-storm";case"312":return"severe-storm";case"313":return"freezing-storm";case"400":return"light-snow";case"401":return"moderate-snow";case"402":return"heavy-snow";case"403":return"snowstorm";case"404":return"sleet";case"405":return"rain-and-snow";case"406":return"shower-snow";case"407":return"snow-flurry";case"500":return"light-snow";case"501":return"moderate-snow";case"502":return"mist";case"503":return"foggy";case"504":return"haze";case"505":return"sand";case"506":return"dust";case"507":return"duststorm";case"508":return"sandstorm";case"900":return"hot";case"901":return"cold";case"999":return"unknown";case"undefine":return"unknown";case"":return"unknown";default:return"rainy"}}}),angular.module("app").service("getData",["$q","$http",function(e,t){this.getLocation=function(){t.get("http://ip-api.com/json").then(function(e){return e.data.query})},this.getWeather=function(e){t.get("https://free-api.heweather.com/v5/weather?city="+e+"&key=2c111e7218dd4ed8a79564a3c4f58144").then(function(e){return e.data})},this.prom=function(){function a(){var a=e.defer();return t.get("http://ip-api.com/json").then(function(e){a.resolve(e),n=resp.data.query}).catch(function(e){a.reject(e)}),a.promise}var n,s=this.getWeather;a().then(function(){s(n)})}}]),angular.module("app").controller("cityCtrl",["$http","$scope",function(e,t){}]),angular.module("app").directive("appCity",[function(){return{restrict:"A",replace:!0,templateUrl:"pages/city/city.html",scope:{city:"=",visible:"=",hotList:"=",chooseCity:"=",searchInfo:"="}}}]),angular.module("app").controller("detailCtrl",["dataTools","dict","$q","cache","$scope","$http","$state",function(e,t,a,n,s,r,o){function i(){var e=a.defer();return r.get("http://ip-api.com/json").then(function(t){p=t.data.query,e.resolve(t)}).catch(function(t){e.reject(t)}),e.promise}function c(e){r.get("https://free-api.heweather.com/v5/weather?city="+e+"&key=2c111e7218dd4ed8a79564a3c4f58144").then(function(t){u(t.data.HeWeather5[0],e)})}function u(a,r){var o="";s.list=e.reformatData(a),s.ip=r,d=new Date,s.weatherClass=e.codeToClass(a.now.cond.code),o=d.getFullYear()+" "+d.getMonth()+" "+d.getDay()+" "+d.getHours()+" "+d.getMinutes(),n.put("update",o),s.list.hourly_forecast=l(s.list.hourly_forecast);for(var i=0,c=s.list.daily_forecast.length;i<c;i++)s.list.hourly_forecast[i].className=e.codeToClass(s.list.hourly_forecast[i].cond.code),s.list.hourly_forecast[i].date_s=s.list.hourly_forecast[i].date.split(" ")[1];console.log(s.list.hourly_forecast),t.list=s.list}function l(e){var t=3-e.length;if(t>-1)for(var a={cond:{code:"999",txt:"未知"},date:"0 -",hum:"NA",pop:"NA",pres:"NA",tmp:"NA",wind:{deg:"NA",dir:"NA",sc:"NA",spd:"NA"}},n=0;n<t;n++)e.push(a);return e.splice(0,3)}var p=t.ip,d=n.get("update");s.anInfo={pageAn:t.pageAnimate.status},s.pageAn=function(e){e?t.pageAnimate.status="pre":t.pageAnimate.status="next"},e.canUpdate(t.list,d)?p?c(p):i().then(function(){c(p)}):u(t.list,p),s.goBack=function(){window.history.back()},s.getName=function(e){e&&(t.cont=e,t.weather={text:s.list.now.cond.txt,tmp:s.list.daily_forecast[0].tmp.max+"~"+s.list.daily_forecast[0].tmp.min+"℃",wind:s.list.now.wind},t.city=s.list.basic.city,t.cityId=s.list.basic.id,o.go("index",{id:e.id}))}}]),angular.module("app").controller("forecastCtrl",["dataTools","dict","$q","cache","$http","$scope",function(e,t,a,n,s,r){function o(){var e=a.defer();return s.get("http://ip-api.com/json").then(function(t){c=t.data.query,e.resolve(t)}).catch(function(t){e.reject(t)}),e.promise}function i(t){s.get("https://free-api.heweather.com/v5/weather?city="+t+"&key=2c111e7218dd4ed8a79564a3c4f58144").then(function(t){r.list=t.data.HeWeather5[0].daily_forecast,r.bgClass=e.codeToClass(t.data.HeWeather5[0].now.cond.code),"sunny"===r.bgClass||"few-clouds"===r.bgClass?r.bgClass="sunny":r.bgClass="shower-rain";for(var a=0,n=r.list.length;a<n;a++)r.list[a].className=e.codeToClass(r.list[a].cond.code_d),r.list[a].date_s=e.splitDate("mm-dd",r.list[a].date,"-","/")})}var c=t.ip;r.bgClass="",c?i(c):o().then(function(){i(c)})}]),angular.module("app").controller("indexCtrl",["dict","$state","$scope",function(e,t,a){a.info={cont:e.cont,city:e.city,cityId:e.cityId,weather:e.weather},a.pageAn=function(t){t?e.pageAnimate.status="pre":e.pageAnimate.status="next"},a.anInfo={pageAn:e.pageAnimate.status}}]),angular.module("app").controller("canvasCtrl",["$scope",function(e){}]),angular.module("app").controller("mainCtrl",["getData","dataTools","dict","cache","$scope","$q","$state","$http",function(e,t,a,n,s,r,o,i){function c(){var e=r.defer();return i.get("http://ip-api.com/json").then(function(t){p=t.data.query,e.resolve(t)}).catch(function(t){s.location.name="定位失败，请手动定位",e.reject(t)}),e.promise}function u(e){var r={date:[],tmp:{series:["最高温","最低温"],hTmp:[],lTmp:[]},wind:[]},o=new Date;s.list=e,a.list=s.list,s.location.name=s.list.basic.city,s.location.id=s.list.basic.id,s.update="更新于"+s.list.basic.update.loc.split(" ")[1],s.forecast=s.list.daily_forecast,s.bgClass=t.codeToClass(s.list.now.cond.code),o=o.getFullYear()+" "+o.getMonth()+" "+o.getDay()+" "+o.getHours()+" "+o.getMinutes(),n.put("update",o);for(var i=0,c=s.forecast.length;i<c;i++)s.list.daily_forecast[i].className=t.codeToClass(s.list.daily_forecast[i].cond.code_d),s.forecast[i].date_s=t.splitDate("mm-dd",s.forecast[i].date,"-","/");"sunny"===s.bgClass||"few-clouds"===s.bgClass?s.bgClass="sunny":s.bgClass="shower-rain";for(var u=s.list.daily_forecast,c=s.list.daily_forecast.length,p=[],i=0;i<c;i++)r.date.push(t.splitDate("mm-dd",u[i].date,"-")),r.tmp.hTmp.push(u[i].tmp.max),r.tmp.lTmp.push(u[i].tmp.min),r.wind.push(u[i].wind.sc);p=[r.tmp.hTmp,r.tmp.lTmp],l(r.date,r.tmp.series,p)}function l(e,t,a){s.labels=e,s.series=t,s.data=a,s.datasetOverride=[{yAxisID:"y-axis-1"},{yAxisID:"y-axis-2"}],s.options={scales:{yAxes:[{id:"y-axis-1",type:"linear",display:!0,position:"left"},{id:"y-axis-2",type:"linear",display:!0,position:"right"}]}}}s.visible=!1,s.chooseCity=!1,s.bgClass="sunny",a.pageAnimate.status="next",e.prom(),s.searchInfo={status:!1,word:"",search:function(e){function t(e,t){var a=[];return angular.forEach(e,function(e){var n=!0;e.cityEn==t||e.cityZh==t?(n=!0,a.push(e)):n=!1}),a}e&&(s.searchInfo.status=!0,i.get("data/city.json?city="+e).then(function(a){s.searchInfo.result=t(a.data,e)}))},result:[]},s.getHotCity=function(){i.get("data/hotCity.json").then(function(e){s.hotList=e.data})},s.location={name:"定位中",id:""};var p=a.ip;t.canUpdate(a.list,n.get("update"))?p?s.getWeatherInfo(p):c().then(function(){s.getWeatherInfo(p)}):(s.list=a.list,u(s.list)),s.getWeatherInfo=function(e){i.get("https://free-api.heweather.com/v5/weather?city="+e+"&key=2c111e7218dd4ed8a79564a3c4f58144").then(function(t){a.ip=e,u(t.data.HeWeather5[0])})}}]),angular.module("app").directive("appForecastList",[function(){return{restrict:"A",replace:!0,templateUrl:"pages/common/forecastList/forecastList.html",scope:{data:"=",weatherBg:"=",weatherIcon:"=",pageAn:"="}}}]),angular.module("app").directive("appHead",[function(){return{restrict:"A",replace:!0,templateUrl:"pages/common/head/head.html",scope:{city:"=",visible:"=",chooseCity:"=",scroll:"&"},link:function(e){var t=0,a=document.body;e.scrolling=function(n){document.onmousewheel=function(n){n.wheelDelta<0?a.scrollTop<51?t+=.1:t=1:a.scrollTop<51&&a.scrollTop>0?t-=.1:0==a.scrollTop&&(t=0),e.st={background:"rgba(255, 255, 255,"+t+")"},e.$apply()};var s;a.addEventListener("touchstart",function(e){s=e.touches[0].screenY}),a.addEventListener("touchmove",function(a){var n=a.touches[0],r=n.screenY;t<=1&&t>=0?r-s>0?t-=.1:t+=.1:t>1?t=1:t<0&&(t=0),e.st={background:"rgba(255, 255, 255,"+t+")"},e.$apply()},!1),a.addEventListener("touchend",function(t){a.scrollTop||(e.st={background:"rgba(255, 255, 255, 0)"},e.$apply())},!1)}()}}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"pages/common/headBar/headBar.html",scope:{text:"@",pageAn:"=",anInfo:"="},link:function(e){e.goBack=function(){window.history.back()}}}}]),angular.module("app").directive("appOverView",[function(){return{restrict:"A",replace:!0,templateUrl:"pages/overview/overview.html",scope:{list:"="}}}]);