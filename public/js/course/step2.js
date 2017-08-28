/**
 * Created by Bear_Yiii on 2017-08-26.
 */
define(["jquery","template","tools","uploadify","bootstrap","my_Jcrop"],function ($, template,tools) {
 
  $(function () {
    var cs_id = tools.getParam("cs_id");
    var x, y, w, h; //定义裁切图片的坐标和宽高变量
    // console.log(cs_id);
    
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
              
              //上传头像成功后,开启裁剪功能
              $("#btn_jcrop").removeAttr("disabled");
            }
          });
        }
      }
    });
    
    //裁切图片功能
    $(".body").on("click", "#btn_jcrop" ,function () {
      //裁切图片并预览功能
      if($("#btn_jcrop").text() == "裁切图片"){
        $("#btn_jcrop").text("保存图片");
        $('.preview img').Jcrop({
          setSelect: [0, 0, 10000, 10000],
          aspectRatio: 2,   //宽高比
          boxWidth: 400
        }, function () {
          this.initComponent('Thumbnailer', {width: 240, height: 120, parent: ".thumb"});
          //一进来，先获取到裁剪框的值，初始化x,y,w,h
          var init = this.getSelection();
          x = init.x;
          y = init.y;
          w = init.w;
          h = init.h;
  
          $('.preview').on("cropmove", function (a, b, c) {
            x = parseInt(c.x);
            y = parseInt(c.y);
            w = parseInt(c.w);
            h = parseInt(c.h);
          });
          
        });
      }else{
        //裁切完毕将图片进行保存
        //发送ajax请求，裁切图片
        $.ajax({
          type:"post",
          url:"/api/course/update/picture",
          data:{
            cs_id:cs_id,
            x:x,
            y:y,
            w:w,
            h:h
          },
          success:function (info) {
            console.log(info);
            if(info.code == 200){
              //跳转到下一步页面
              location.href = "/course/step3?cs_id="+cs_id;
            }
          }
        });
      }
    
    });
  });
});