/**
 * Created by Bear_Yiii on 2017-08-25.
 */
define(["jquery","template","tools","ckeditor"],function ($,template,tools,CKEDITOR) {
  $(function () {
    var cs_id = tools.getParam("cs_id");
    console.log(cs_id);
    
    //渲染基本信息页面
    $.ajax({
      type:"get",
      url:"/api/course/basic",
      data:{
        cs_id:cs_id
      },
      success:function (info) {
        if(info.code == 200){
          var html = template("course_step1_tpl", info.result);
          $(".course-add").html(html);
  
          //富文本编辑器
          CKEDITOR.replace("cs_brief",{
            toolbarGroups : [
              { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
              { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
              '/',
              { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
              { name: 'styles' },
              { name: 'colors' },
            ]
          });
  
          //一级分类发生是更新子级分类内容
          $(".body").on("change","#cs_cg_pid",function () {
            //获取子级分类数据
            $.ajax({
              type:"get",
              url:"/api/category/child",
              data:{
                cg_id:$("#cs_cg_pid").val()
              },
              success:function (info) {
                console.log(info);
                var html = template("category_two_tpl", info);
                $("#cs_cg_id").html(html);
              }
            });
          });
        }
      }
    });
     
    //保存基本信息
    $(".body").on("click",".btn_course_save", function () {
      //富文本编辑器同步数据
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
      $.ajax({
        type:"post",
        url:"/api/course/update/basic",
        data:$("form").serialize(),
        success:function (info) {
          if(info.code == 200){
             // location.href = "/course/step2?cs_id=" + cs_id;
          }
        }
      });
    });
  });
  
});