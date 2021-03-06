/**
 * Created wangyanqi
 * Date 2018/1/21
 * GitHub w874981121 ——小小疯
 */
'use strict';
export default {
  install(Vue, options){
    //cookie 方法
    Vue.prototype.cookieFn = {
      //读取cookie
      get(name){
        var arr,
          reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return unescape(arr[ 2 ]);
        }
        else {
          return null;
        }
      },
      //添加cookie
      set(name, value){
        var Days = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      },
      //删除cookie
      delete(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        console.log(this)
        var cval = this.get(name);
        if (cval != null)
          document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
      }
    };
    Vue.prototype.$api = "http://114.113.21.32:8080";
    Vue.prototype.$urlapi = "http://114.113.21.32:8080";  //http://114.113.21.32:8080
    Vue.prototype.$Trim = function(str){
      return str.replace(/\s+/g,"")
    };
    Vue.prototype.$timeonversionC = function(t){
      this.zeroillF = function(z){
        return z < 10 ? "0" + z : z;
      };
      let dates = new Date(t),
        y = dates.getFullYear(),
        m = dates.getMonth(),
        d = dates.getDate(),
        h = dates.getHours(),
        M = dates.getMinutes(),
        s = dates.getSeconds(),
        time = y + "-" + this.zeroillF(m + 1) + "-" + this.zeroillF(d) + " " + this.zeroillF(h) + ":" + this.zeroillF(M) + ":" + this.zeroillF(s)
      return time
    }
  }
}
