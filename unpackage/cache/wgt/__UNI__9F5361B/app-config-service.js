
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","background":"#efeff4","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"uni-app","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"emosphere","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.96","entryPagePath":"pages/enter/enter","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/enter/enter","meta":{"isQuit":true,"isEntry":true,"navigationBar":{"titleText":"EmoSphere","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/login/login","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/calendar/calendar","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/main/main","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/EmoRecord/EmoRecord","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/about/about","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/aboutme/aboutme","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/myScreen/myScreen","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/relax/relax","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/share/share","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/record/record","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/music/music","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/result/result","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/home/home","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/chat/chat","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/set/set","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/space/space","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/user/me","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/history/history","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/questions/modal","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/questions/answer","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/report/report","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  