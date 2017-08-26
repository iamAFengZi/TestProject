/**
 * Created by Bear_Yiii on 2017-08-26.
 */
define(["jquery","template","tools","uploadify","bootstrap"],function ($, template,tools) {
 
  $(function () {
    var cs_id = tools.getParam("cs_id");
    console.log(cs_id);
    //获取课程图片并渲染
    $.ajax({
      type:"get",
      url:"/api/course/picture",
      data:{
        cs_id:cs_id
      },
      success:function (info) {
        console.log(info);
        if(info.code ==200){
          var html = template("course_step2_tpl", info.result);
          $(".body").html(html);
          
          //头像上传功能
          $("#upfile").uploadify({
            swf:"/public/assets/uploadify/uploadify.swf",
            buttonText:"上传图片",
            width:70,
            height:30,
            buttonClass:"btn btn-success btn-sm btn_style",
            fileObjName:"cs_cover_original",
            formData:{
              cs_id:cs_id
            },
            itemTemplate:"<span></span>",
            uploader:"/api/uploader/cover",
            fileSizeLimit: "2MB",
            fileTypeExts: '*.gif; *.jpg; *.png',
            onUploadSuccess:function (file, data) {
              data = JSON.parse(data);
              //渲染大图
              var path = data.result.path;
              $(".preview img").attr("src", path);
              $(".brief img").attr("src", path);
              
            }
          });
        }
      }
    });
  });
});