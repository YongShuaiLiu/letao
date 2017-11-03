/**
 * Created by Liu on 2017/11/3.
 */
// var tools={
//     getParamObj:function () {
//         var obj={};
//         var search=location.search;
//         //去除字符串第一个
//         search=search.split(1);
//         //去除掉字符串中的& 切割
//         var arr = search.split("&");
//         //遍历这个arr
//         for (var i=0; i<arr.length;i++){
//             // arr[i]字符串切割=
//             var key=arr[i].split("=")[0];
//             //    转码
//             var value=decodeURI(arr[i].split("=")[1]);
//
//             obj[key]=value;
//         }
//         return obj;
//
//     },
//     getParam:function (key) {
//         return this.getParamObj()[key];
//     }
// }

//tools中放了常用的一些方法
var tools = {
    //获取地址栏中所有的参数
    getParamObj: function () {
        var obj = {};
        var search = location.search;
        search = search.slice(1);
        var arr = search.split("&");
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split("=")[0];
            var value = decodeURI(arr[i].split("=")[1]);
            obj[key] = value;
        }
        //this指向的是谁：  4种调用模式
        return obj;
    },
    getParam:function (key) {
        return this.getParamObj()[key];
    }
}
