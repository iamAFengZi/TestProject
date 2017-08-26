/**
 * Created by Bear_Yiii on 2017-08-25.
 */
define(["jquery","template"],function ($, template) {
  $(function () {
    //发送ajax请求数据渲染课程列表
    $.ajax({
      type:"get",
      url:"/api/course",
      success: function (info) {
        var html = template("course_list_tpl", info);
        $(".courses").html(html);
      }
    });
  });
})