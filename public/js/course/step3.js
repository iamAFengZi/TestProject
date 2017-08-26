/**
 * Created by Bear_Yiii on 2017-08-26.
 */
define(["jquery","template","tools","bootstrap","jquery_form"],function ($, template, tools) {
  $(function () {
    var cs_id = tools.getParam("cs_id");
    console.log(cs_id);
    
    //发送ajax请求获取课时数据
    $.ajax({
      type:"get",
      url:"/api/course/lesson",
      data:{
        cs_id:cs_id
      },
      success:function (info) {
        console.log(info);
        if(info.code==200){
          var html = template("course_step3_tpl",info.result);
          $(".body").html(html);
        }
      }
    });
    
    //给编辑按钮注册委托事件
    $(".body").on("click", ".btn_modify", function () {
      var ct_id = $(this).parent().data("id");
      
      //判断ct_id是否存在,存在时为编辑,否则为添加
        //发送ajax请求获取修改课时的信息
      $.ajax({
        type:"get",
        url:"/api/course/chapter/edit",
        data:{
          ct_id:ct_id
        },
        success:function (info) {
          console.log(info);
          var data = info.result;
          data.title = "修改课时";
          data.btnText = "修 改";
          data.type ="edit";
          var html = template("course_add_tpl", data);
          $("#lesson").html(html);
  
          $("#lesson").modal("show");
        }
        });
    });
    
    //给添加课时注册委托事件
    $(".body").on("click", ".btn_add", function () {
      var html = template("course_add_tpl", {
        title : "添加课时",
        btnText : "保 存",
        type : "edit",
      });
      $("#lesson").html(html);
  
      $("#lesson").modal("show");
    });
    // $("#lesson").on("click","#btn_course", function () {
    //   alert("haha");
    //   console.log($("form").serialize());
    //   //关于免费课时单选框不被选中时,无法获得value值,只能通过ajaxSubmit传参数给后台
    //   $("form").ajaxSubmit({
    //     type:""
    //   });
    // });
    
  });
});