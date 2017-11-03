/**
 * Created by Liu on 2017/11/1.
 */
mui(".mui-scroll-wrapper").scroll({
    indicators:false
});

//思路：
//1  输入关键字 点击按钮 跳转到搜索列表页
//2需要把关键字保存到web缓存中
//·要求：最多存10条
//·如果超过10条 需要删除搜索最早的那条记录
// ·如果发现搜索记录是重复，需要把该条搜索记录放到最上面。
//. 点击清空按钮吗，需要把搜索记录对应的缓存清除。
//. 点击删除的时候，需要删除单条记录
//. 点击单条记录，可以直接跳转到对应的搜索详情页。


localStorage.setItem("lt_search_history",'["艾迪","得到","阿德萨德"]');

function getHistory() {
    var search_history = localStorage.getItem("lt_search_history") || "[]";
    var arr = JSON.parse(search_history);
    return arr;
}

function render() {
    var arr = getHistory();
    //模版第二个参数：必须是对象，因为在模版中是直接通过对象的属性来获取。
    $(".lt_history").html(template("tpl", {arr: arr}));
}

render();



//清空功能
$(".lt_history").on("click",".icon_empty",function () {
    localStorage.removeItem("lt_search_history");
    render();
});

//逐条删除
$(".lt_history").on("click",".fa-close",function () {
    var btnArray=["是","否"];
    mui.confirm("你确定要删除这条记录吗","警告",btnArray,function (data) {
        // console.log(data);
        if (data.index==0){
            var arr=getHistory();
            var index =$(this).data("index");
            arr.splice(index,1);
            localStorage.setItem("lt_search_history",JSON.stringify(arr));
            render();
            mui.toast("操作成功");
        }else {
            mui.toast("操作取消");
        }
    });
});

//添加功能
//1. 注册点击事件
//2. 获取文本框中的value值，判断如果没有输入关键字，给用户一个提示
//3. 需要把这个value值存储到缓存中
//4. 页面需要跳转到搜索详情页-  把关键字带过去

//添加功能
$(".search_btn").on("click", function () {
    var key = $(".search_text").val().trim();
    if (key === "") {
        mui.alert("亲，你想买啥", "温馨提示");
        return;
    }
    var arr = getHistory();
    var index = arr.indexOf(key);
    if (index > -1) {
        arr.splice(index, 1);
    }
    if (arr.length >= 10) {
        arr.pop();
    }
    arr.unshift(key);


    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    // render();
    location.href = "searchList.html?key="+key;
});