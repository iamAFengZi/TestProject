/**
 * Created by Bear_Yiii on 2017-08-23.
 */
define(["jquery", "template", "uploadify"], function ($, template) {
  $(function () {
    alert("呵呵");
    console.log($("#upfile"));
    $("#upfile").uploadify({
      height: 120,
      swf: '/public/assets/uploadify/uploadify.swf',
      uploader: '/api/uploader/avatar',
      width: 120,
      fileObjName:"tc_avatar",
      // buttonText:"",
      onUploadSuccess:function (file, data, response) {
        data = JSON.parse(data);
        //设置图片
        $(".preview img").attr("src", data.result.path);
      }
    });
  });
})