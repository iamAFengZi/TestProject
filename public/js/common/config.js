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
    bootstrap:"assets/bootstrap/js/bootstrap"
  },
  shim : {
    bootstrap : {
      deps : ["jquery"]
    }
  }
})