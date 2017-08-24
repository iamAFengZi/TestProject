/**
 * Created by Bear_Yiii on 2017-08-24.
 */
define(["jquery","template","tools"],function ($, template, tools) {
  
  $(function () {
    //获取地址栏参数
    var cg_id = tools.getParam("cg_id");
    console.log(cg_id);
    
    //当地址栏参数cg_id存在时为分类编辑功能,否则是分类添加功能
    if(cg_id){
      //发送ajax请求获取需要编辑的分类信息,并渲染
      $.ajax({
        type:"get",
        url:"/api/category/edit",
        data:{
          cg_id :cg_id
        },
        success:function (info) {
          console.log(info);
          if(info.code == 200){
            var data = info.result;
            data.cg_title = "修改分类";
            data.btn_name = "修 改";
            var html = template("category_add_tpl", data);
            $(".body").html(html);
            $("#cg_pid").val(info.result.cg_pid);
          }
        }
      })
    }else{
      //发送ajax请求,返回顶级分类数据,渲染select框
      $.ajax({
        type:"get",
        url:"/api/category/top",
        success:function (info) {
          console.log(info);
          if(info.code ==200){
            var data = {};
            data.top = info.result;
            data.cg_title = "新增分类";
            data.btn_name = "保 存";
            var html = template("category_add_tpl", data);
            $(".body").html(html);
          }
        }
      });
    }
    
    //点击修改或者保存功能
    $(".body").on("click", "#btn_category_add", function () {
      var url = "";
      if(cg_id){
        url = "/api/category/modify";
      }else {
        url = "/api/category/add"
      }
      $.ajax({
        type:"post",
        url:url,
        data:$("form").serialize(),
        success:function (info) {
          console.log(info);
          if(info.code==200){
            location.href = "/category/list";
          }
        }
      });
      
    });
  });
});