export default {
  install(app) {
    const welcomeMsg = {
      welcome() {
        alert("Welcome to Joe's Board");
      },
    };
    const boardSpec = {
      msg: 'Vue3를 사용하여 개발한 게시판 입니다.',
    };
    app.config.globalProperties.$welcomeMsg = welcomeMsg;
    app.provide('boardSpec', boardSpec);
  },
};
