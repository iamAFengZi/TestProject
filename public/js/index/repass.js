/**
 * Created by Bear_Yiii on 2017-08-24.
 */
define(["jquery","template"],function ($, template) {
  $(function () {
    
    //判断新密码与确认密码是否相同
    var tc_pass = $("#tc_pass").val();
    var tc_new_pass = $("#tc_new_pass").val();
    var tc_re_pass = $("#tc_re_pass").val();
    //判断原密码与信密码是否一致
    $("#tc_new_pass").on("change", function () {
      tc_pass = $("#tc_pass").val();
      tc_new_pass = $("#tc_new_pass").val();
      if(tc_pass == tc_new_pass){
        alert("请不要输入重复的密码");
        return false;
      }
    });
  
    //判断新密码与确认密码是否一致
    $("#tc_re_pass").on("change", function () {
      tc_re_pass = $("#tc_re_pass").val();
      tc_new_pass = $("#tc_new_pass").val();
      if(tc_re_pass != tc_new_pass){
        alert("确认密码与新密码不一致");
        return false;
      }
    });
    
    $("#btn_modify_pass").click(function () {
      if(!tc_pass || !tc_new_pass || !tc_re_pass){
        alert("不能为空");
        return false;
      }
      console.log($("form").serialize());
      $.ajax({
        type:"post",
        url:"/api/teacher/repass",
        data:$("form").serialize(),
        success:function (info) {
          console.log(info);
          alert("3秒后即将跳转到登录页面");
          setTimeout(function () {
            $(".logout").trigger("click");
          },3000);
          
        }
      });
      return false;
    });
    

  });
});