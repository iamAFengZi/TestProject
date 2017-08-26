/**
 * Created by Bear_Yiii on 2017-08-25.
 */
define(["jquery"],function ($) {
  $(function () {
    
    //添加课程功能
    $(".btn_create").click(function () {
      $.ajax({
        type:"post",
        url:"/api/course/create",
        data:$("form").serialize(),
        success:function (info) {
          location.href = "/course/step1?cs_id=" + info.result.cs_id;
        }
      });
    });
  });
});