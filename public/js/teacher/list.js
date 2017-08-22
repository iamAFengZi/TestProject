/**
 * Created by Bear_Yiii on 2017-08-22.
 */
define(["jquery", "template", "bootstrap"],function ($, template) {
  
  $(function () {
    //渲染讲师列表
    $.get("/api/teacher",function (info) {
      if(info.code == 200){
        var html = template("teacher_list_tpl", info);
        $("#teacher_list").html(html);
      }
    });
    
    //查看讲师信息功能
    //点击查看按键,因为讲师列表信息是动态生成,所以事件要注册委托事件
    $("#teacher_list").on("click", ".btn_view", function () {
      //获取页面自定义属性id,通过id去后台获取讲师信息
      var tc_id = $(this).parent().data("id");
      
      $.ajax({
        type:"get",
        url:"/api/teacher/view",
        data:{
          tc_id : tc_id
        },
        success : function (info) {
          if(info.code == 200){
            //渲染模态框数据,并显示模态框
            var html = template("teacher_info_tpl", info.result);
            $("#teacherModal").html(html).modal("show");
          }
        }
      });
    });
      
    //启动与注销功能
    //点击启动/注销按键后根据后台返回的tc_status值渲染页面
    $("#teacher_list").on("click", ".btn_handle", function () {
      //获取自定义属性
      var tc_id = $(this).parent().data("id");
      var tc_status = $(this).parent().data("status");
      var $that = $(this);
      
      $.ajax({
        type:"post",
        url:"/api/teacher/handle",
        data:{
          tc_id : tc_id,
          tc_status :tc_status
        },
        success : function (info) {
          if(info.code == 200){
            if(info.result.tc_status == 0){
              $that.text("注 销");
              $that.removeClass("btn-success");
              $that.addClass("btn-warning");
            }else{
              $that.text ("启 用");
              $that.removeClass("btn-warning");
              $that.addClass("btn-success");
            }
            //更新父标签的自定义属性status的值
            $that.parent().data("status", info.result.tc_status);
          }
        }
      });
    });
  });
});