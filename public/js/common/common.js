/**
 * Created by Bear_Yiii on 2017-08-20.
 */
define(["jquery", "template", "jquery_cookie"],function ($, template) {
  //侧边栏页面功能
  $(function () {
    //除了登录页面,其他页面都需要的功能
    if(location.pathname != "/login"){
      //判断用户是否登录,判断cookie中有没有PHPSESSID值
      if($.cookie("PHPSESSID")){
        //通过cookie渲染侧边栏的头像和用户昵称
        var userInfo = JSON.parse($.cookie("userInfo"));
        $(".aside img").attr("src", userInfo.tc_avatar);
        $(".aside h4").text(userInfo.tc_name);
      }else{
        location.href = "/login";
      }
    }
  
    //侧边栏高亮（当前页面）
    //获取到地址栏中pathname，跟a标签的href属性对比，如果相同，就让这个a高亮，排他
    var pathNamr = location.pathname;
    var $links = $(".navs a")
    $links.each(function () {
      //$(this)优化性能
      var $that = $(this);
      
      //排他点亮自己
      $that.removeClass("active");
      if($that.attr("href") == pathNamr){
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