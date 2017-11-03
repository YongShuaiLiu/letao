


$(function () {
    mui(".mui-scroll-wrapper").scroll({
        indicators: false
    });
});
//思路：
//1. 获取地址栏的参数，设置到文本框中.
//2. 通过地址栏的参数，去查询商品，把商品渲染到页面中。
//3. 点击搜索按钮，获取搜索框中的value值，查询商品，渲染到页面.
//4. 点击排序，需要对商品进行排序。
//5. 添加一个遮罩效果
var data={
    proName:'',
    brandId:'',
    price:'',
    num:'',
    page:1,
    pageSize:10
}
function render(data) {
    $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:data,
        success:function (data) {
            setTimeout(function () {
                $('.lt_product').html(template("tpl",data)  );
                // console.log(data);

            },1000);

        }
    });
}
var key=tools.getParamObj("key");
$("search_text").val(key);
data.proName=key;
render(data);

$(".search_btn").on("click",function () {
    $(".lt_sort a").removeClass("now");
    $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    data.price="";
    data.num="";
    var key=$(".search_text").val().trim();
    if(key===""){
        mui.toast("请输入搜索的内容");
    }

    $(".lt_product").html("<div class='loading'></div>");
    data.proName=key;
    render(data);
})











$(".lt_sort>a[data-type]").on("click",function () {

    var $this=$(this);
    var $span=$(this).find("span");
    if($this.hasClass("now")){
        $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else {
        $(this).addClass("now").siblings().removeClass("now");
        $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    var type =$this.data('type');
    var value=$span.hasClass("fa0angle-down")? 2 : 1;
    data[type]=value;
    render(data);
});