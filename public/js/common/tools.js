/**
 * Created by Bear_Yiii on 2017-08-22.
 */
define(["jquery","datepicker", "datepicker_cn"],function ($) {
  
  //获取地址栏的参数集,并返回一个对象
  function getParamObj() {
    //去除地址栏参数字符串首个?字符
    var pathStr = location.search.slice(1);
    var paramArr = pathStr.split("&");
    var paramObj = {};
    for(var i = 0; i < paramArr.length; i++) {
      var key = paramArr[i].split("=")[0];
      var value = paramArr[i].split("=")[1];
      paramObj[key] = value;
    }
    //保存到对象中,返回
    return paramObj;
  }
  //或者地址栏参数key对应的value值
  function getParam(key) {
    return getParamObj()[key];
  }
  
  //bootstrap-datepicker日期控件设置
  function setDate(ele) {
    //不行：这个时候页面还能东西
    $(ele).datepicker({
      format: 'yyyy-mm-dd',//日期的格式
      //startDate: '-10d',  //可以选择的开始时间
      endDate:"+0d",        //选择的结束时间
      autoclose:true,      //选完日期自动关闭
      language:"zh-CN",     //选择语言，注意需要额外引入一个语言包
      todayBtn:"linked",    //可选择今天日期
      todayHighlight:true   //今日日期高亮
    });
  }
  
  
  //工具类:作为返回值
  var tools = {
    getParamObj : getParamObj,
    getParam : getParam,
    setDate : setDate
  };
  return tools;
});