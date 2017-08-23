/**
 * Created by Bear_Yiii on 2017-08-23.
 */
define(["jquery", "template","tools","ckeditor","jquery_cookie","jquery_region", "uploadify"], function ($, template, tools, CKEDITOR) {
  
  $(function () {
    //设置渲染功能
    $.ajax({
      type:"get",
      url:"/api/teacher/profile",
      success:function (info) {
        // console.log(info);
        var html = template("settings_tpl", info.result);
        $(".settings").html(html);
        
        //日期控件
        tools.setDate("#tc_birthday");
        tools.setDate("#tc_join_date");
        
        //头像上传与更新功能
        $("#upfile").uploadify({
          height: 120,
          swf: '/public/assets/uploadify/uploadify.swf',
          uploader: '/api/uploader/avatar',
          width: 120,
          fileTypeExts: "*.jpg; *.png; *.gif",
          fileObjName:"tc_avatar",
          buttonText:"",
          onUploadSuccess:function (file, data, response) {
            data = JSON.parse(data);
            //当前上传图片显示
            var path = data.result.path;
            $(".preview img").attr("src", path);
      
            //更新侧边栏头像
            $(".aside img").attr("src", path);
      
            //更新cookie
            var userInfo = JSON.parse($.cookie("userInfo"));
            //更新的图片地址
            userInfo.tc_avatar = path;
            //cookie中只能保存字符串
            userInfo = JSON.stringify(userInfo);
            //保存cookie
            $.cookie("userInfo", userInfo, {path: "/", expires: 1});
          }
        });
        
        //三级联动省/市/区
        $("#settings_region").region({
          url:"/public/assets/jquery-region/region.json"
        });
        
        //文本域控件.富文本编辑器
        CKEDITOR.replace("tc_introduce",{
          toolbarGroups : [
          { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
          { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            '/',
          { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
          { name: 'styles' },
          { name: 'colors' },
        ]
        });
      }
    });
    
    //保存功能
    $(".settings").on("click",".btn_save",function () {
      console.log($("form").serialize());
  
      //将富文本编辑器内容同步到textarea中,返回给后台
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
      console.log($("form").serialize());
      $.ajax({
        type:"post",
        url:"/api/teacher/modify",
        data:$("form").serialize(),
        success:function (info) {
          if(info.code == 200){
            console.log(info);
            // location.href = "/";
          }
        }
      });
    });
  });
  
 
});