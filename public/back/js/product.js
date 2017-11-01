/**
 * Created by HUCC on 2017/10/31.
 */

$(function () {


    //思路：1. 获取商品数据
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        //发送ajax请求
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {

                console.log(data);
                //渲染到页面
                $("tbody").html(template("tpl", data));

                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    size: "small",
                    onPageClicked(a, b, c, page){
                        currentPage = page;
                        render();
                    }
                });
            }

        });
    }

    render();


    //点击事件添加 显示模态框
    $(".btn_add").on("click", function () {
        //让模态框显示
        $("#addModal").modal("show");

        //渲染二级分类列表
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {

                $(".dropdown-menu").html(template("tpl2", data));

            }
        });

    });

    //给dropdown下所有的a 标签注册点击事件
    $(".dropdown-menu").on("click", "a", function () {

        //获取a 标签的文本 设置给dropdown-text
        $(".dropdown-text").text($(this).text());

        //获取到自定义属性data-id。设置给隐藏域
        $("#brandId").val($(this).data("id"));

        //改成通过状态
        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");

    });

//    定义一个变量
var imgArray = [];

    //初始化产品图片上传
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            //上传成功，将突变添加都img-box中
            $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100">');
            //把图片路径传递进去
            imgArray.push(data.result);
        }
    });


    var $form = $("#form");
    $form.bootstrapValidator({

        //默认不校验的配置
        excluded: [],
        //表单验证
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        //必须是0以上的数字
                        regexp: /^[1-9]\d*$/,
                        message: "请输入一个大于0的库存"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺寸"
                    },
                    regexp: {
                        //33-55
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入正确的尺码（30-50）"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的折扣价"
                    }
                }
            },
        }
    });


    $form.on("success.form.bv", function (e) {
        e.preventDefault();
        //定一个变量接收form提交后台数据
        var param = $form.serialize();
        //还需要拼接3张图片的地址
        param += "&picName1="+imgArray[0].picName+"&picAddr1="+imgArray[0].picAddr;
        param += "&picName2="+imgArray[1].picName+"&picAddr2="+imgArray[1].picAddr;
        param += "&picName3="+imgArray[2].picName+"&picAddr3="+imgArray[2].picAddr;

        //发送ajax请求了
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:param,
            success:function (data) {
                if(data.success){
                    //关闭模态框
                    $("#addModal").modal("hide");

                    //渲染第一页
                    currentPage = 1;
                    render();

                    //重置表单与样式
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    $(".dropdown-text").text("请选择二级分类");
                    $(".img_box img").remove();
                    imgArray = [];


                }
            }
        })

    });

});
