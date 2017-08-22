/**
 * Created by Bear_Yiii on 2017-08-22.
 */
define(["jquery", "template","tools"], function ($, template, tools) {
  $(function () {
    
    var $teacher = $(".teacher");
      
    var tc_id = tools.getParam("tc_id");
    console.log(tc_id);
    //判断tc_id值存在时对应讲师修改,否则是讲师添加
    var data = {};
    
    if(tc_id){
      //如果是讲师修改,需要先根据tc_id获取后台数据并渲染到页面
      $.ajax({
        type:"get",
        url:"/api/teacher/edit",
        data:{
          tc_id:tc_id
        },
        success:function (info) {
          if(info.code == 200){
            info.result.teach_title = "讲师编辑";
            info.result.button_name = "修 改";
            console.log(info);
            $teacher.html(template("teacher_add_tpl", info.result));
            //调用日期控件
            tools.setDate("#tc_join_date");
          }
        }
      });
    }else{
      data = {
        teach_title : "讲师新增",
        button_name : "添 加",
        tc_id : tc_id
      }
      $teacher.html(template("teacher_add_tpl", data));
      //调用日期控件
      tools.setDate("#tc_join_date");
      
    }
    //点击修改或者添加按钮,注册委托事件
    $teacher.on("click",".btn_add",function () {
      var url = "";
      //设置ajax地址
      if(tc_id){
        url = "/api/teacher/update"
      }else{
        url = "/api/teacher/add"
      }
      $.ajax({
        type:"post",
        url:url,
        data:$("form").serialize(),
        success:function (info) {
          if(info.code ==200){
            location.href = "/teacher/list";
          }
        }
      });
    });
    
    //调用时间控件
   
  
  
  });
});