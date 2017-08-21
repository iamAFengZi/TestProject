/**
 * Created by Bear_Yiii on 2017-08-20.
 */
//按照AMD标准进行模块化
define(["jquery", "jquery_form", "jquery_cookie"], function ($) {
  
  $(function () {
    //借助表单form的submit事件
    $("form").submit(function () {
      //jquery_form插件里面的关于表单的ajax请求.
      $(this).ajaxSubmit({
        type : "post",
        url : "/api/login",
        success : function(info) {
          console.log(info);
          if(info.code == 200){
            //将返回的result保存到cookie中
            //cookie只能保存字符串,一旦要保存对象数据,需要先用JSON.stringify()转成json字符串
            var userInfo = JSON.stringify(info.result);
            $.cookie("userInfo", userInfo, {path:"/", expires:1});
            
            //跳转到首页
            location.href = "/";
          }
        }
      });
      //阻止跳转
      return false;
    });
  });
});