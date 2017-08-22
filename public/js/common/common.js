/**
 * Created by Bear_Yiii on 2017-08-20.
 */
define(["jquery", "template", "nprogress", "jquery_cookie"],function ($, template, NProgress) {
  //侧边栏页面功能
  $(function () {
    //进度条
    NProgress.start();
    setTimeout(function () {
      NProgress.done();
    },1000);
    
    //遮罩层
    //给全部的ajax请求注册开始事件,让遮罩层显示
    $(document).ajaxStart(function () {
      // console.log("我开始了");
      $(".mask").fadeIn();
    });
    //注册结束事件,让遮罩层隐藏
    $(document).ajaxStop(function () {
      // console.log("我结束了");
      setTimeout(function () {
        $(".mask").fadeOut();
      },500);
      
    });
    
    
    //除了登录页面,其他页面都需要的功能
    if(location.pathname != "/login"){
      //判断用户是否登录,判断cookie中有没有PHPSESSID值
      if($.cookie("PHPSESSID")){
        //通过cookie渲染侧边栏的头像和用户昵称
        var userInfo = JSON.parse($.cookie("userInfo"));
        var html = template("common_cookie_tpl", userInfo);
        $(".aside .profile").html(html);
        // $(".aside img").attr("src", userInfo.tc_avatar);
        // $(".aside h4").text(userInfo.tc_name);
      }else{
        location.href = "/login";
      }
    }
  
    //侧边栏高亮（当前页面）
    //获取到地址栏中pathname，跟a标签的href属性对比，如果相同，就让这个a高亮，排他
    var pathName = location.pathname;
    
    //侧边栏父级菜单高亮设置
    var pathObj = {
      "/teacher/add" : "/teacher/list",
      "settings" : "/"
    }
    //判断是否存在设置,如果不存在设置则点亮自己
    pathName = pathObj[pathName] || pathName;
    
    var $links = $(".navs a")
    $links.each(function () {
      //$(this)优化性能
      var $that = $(this);
      
      //排他点亮自己
      $that.removeClass("active");
      if($that.attr("href") == pathName){
        $that.addClass("active");
      }
    });
    
    var $two_nav = $(".two_nav");
    //二级菜单淡入淡出,显示子菜单内容
    $two_nav.click(function () {
      //当子菜单被点亮是,二级菜单点击不会切换显示
      if($two_nav.find(".active").length == 0){
        $(this).children("ul").slideToggle();
      }
    });
    
    //二级菜单下的子菜单高亮时候,让二级菜单显示
    $two_nav.find(".active").parent().parent().show();
    
  });
  
  //头部栏功能
  $(function () {
    //退出登录功能
    $(".logout").click(function () {
      $.ajax({
        type : "post",
        url : "/api/logout",
        success : function (info) {
          if(info.code == 200){
            $.removeCookie("userInfo", {path:"/"});
            //跳转登录页面
            location.href = "/login";
          }
        }
      });
    });
  });
  
  
});