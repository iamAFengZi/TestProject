/**
 * Created by Bear_Yiii on 2017-08-24.
 */
define(["jquery","template"],function ($, template) {
  $(function () {
    //实现渲染分类列表功能
    $.ajax({
      type:"get",
      url:"/api/category",
      success:function (info) {
        var html = template("category_list_tpl", info);
        $("#category_list").html(html);
      }
    });
      
  });
});