/**
 * Created by Bear_Yiii on 2017-08-20.
 */
require.config({
  baseUrl : "/public/",
  paths : {
    jquery:"assets/jquery/jquery",
    jquery_form:"assets/jquery-form/jquery.form",
    jquery_cookie:"assets/jquery-cookie/jquery.cookie",
    template:"assets/artTemplate/template-web",
    bootstrap:"assets/bootstrap/js/bootstrap",
    tools:"js/common/tools",
    datepicker:"assets/bootstrap-datepicker/js/bootstrap-datepicker",
    datepicker_cn:"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
    nprogress:"assets/nprogress/nprogress",
    uploadify:"assets/uploadify/jquery.uploadify"
  },
  
  shim : {
    bootstrap : {
      deps : ["jquery"]
    },
    datepicker_cn:{
      deps : ["jquery" , "datepicker"]
    },
    uploadify: {
      deps : ["jquery"]
    }
  }
})