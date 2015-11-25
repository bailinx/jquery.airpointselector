# jquery.airpointselector
* 一款基于jquery的航空公司下拉选择插件
* 实现城市机场下拉选择(支持中文、二字码、拼音匹配)
* 实现数据源自定义(支持json及ajax方式)
* 支持AMD规范及常用jquery版本

## 使用
引用airpointselector及jquery到你的项目
```javascript
<link href="css/jquery.airpointselector.css" rel="stylesheet" type="text/css" />

<script src="http://libs.baidu.com/jquery/1.7.0/jquery.js"></script>
<script src="js/jquery.airpointselector.min.js"></script>
```
在网页中新增input
```html
出发城市:<input type="text" id="org">
到达城市:<input type="text" id="org">
```
再初始化
```javascript
$("#org").airPointselector({
    data: [{
        airpoint: "Beijing(PEK),北京"
    }, {
        airpoint: "ChengDu(CTU),成都"
    }, {
        airpoint: "ChongQing(CKG),重庆"
    }],
    callback: function(data) {
        // 通常回调方法中初始化到达城市
        var url_ = "../ajax.php";
        $("#dst").airPointselector({url:url_});
    }
});
```

## 日志
jquery.airpointselector V1.01
* 调整目录结构，支持grunt、bower

----

jquery.airpointselector V1.00
* 参考[jquery.autocomplete](https://github.com/RadishJ/jquery.autocomplete),用法类似
* 增加正则匹配
* 增加机场匹配相关逻辑