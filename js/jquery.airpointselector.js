/*!
 * jQuery AirpointSelector
 *
 * Parameters :
 *
 *   width        : 0,
 *   url          : null,
 *   data         : null,
 *   callback     : null
 *
 * Example:
 *  $(".airponits").airPointselector({data:[{airpoint:"Beijing(PEK),北京"}]});
 *  $(".airponits").airPointselector({data:[{airpoint:"Beijing(PEK),北京",callback : function(data){} }]});
 *
 * Version        : V1.01
 * Maintained by  : radishj<423261989@qq.com>
 * Create Date    : 2015-08-10
 * Last Fix Date  : 2015-11-25
 */

;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    var airPointselector = new function() {
        currentInputText = null;
        this.functionalKeyArray = [9, 20, 13, 16, 17, 18, 91, 92, 93, 45, 36, 33, 34, 35, 37, 39, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 19, 145, 40, 38, 27]; //键盘上功能键键值数组
        this.holdText = null;

        this.init = function() {
            $("body").append("<div id='airPointselector' class='airpointselector-layout'></div>");
            $(document).bind('mousedown', function(event) {
                var $target = $(event.target);
                if ((!($target.parents().andSelf().is('#airPointselector'))) && (!$target.is($(currentInputText)))) {
                    airPointselector.hideSelector();
                }
            })

            $("#airPointselector").delegate("tr", "mouseover", function() {
                $("#airPointselector tr").removeClass("ct");
                $(this).addClass("ct");
            }).delegate("tr", "mouseout", function() {
                $("#airPointselector tr").removeClass("ct");
            });

            $("#airPointselector").delegate("tr", "click", function() {
                $(currentInputText).val($(this).find("div:last").html());
                var _callback = $(currentInputText).data("config").callback;
                if ($("#airPointselector").css("display") != "none" && _callback && $.isFunction(_callback)) {
                    _callback($(this).data("jsonData"));

                }
                airPointselector.hideSelector();
            });
        }

        this.selector = function(param) {

                if ($("body").length > 0 && $("#airPointselector").length <= 0) {
                    airPointselector.init();
                }
                var $this = this;
                var $airPointselector = $("#airPointselector");

                this.config = {
                    //width:下拉框的宽度，默认使用输入框宽度
                    width: 0,
                    //url：格式url:""用来ajax后台获取数据，返回的数据格式为data参数一样
                    url: null,
                    /*data：格式{data:[{airpoint:null,result:{}},{airpoint:null,result:{}}]}
                           url和data参数只有一个生效，data优先*/
                    data: null,
                    //callback：选中行后按回车或单击时回调的函数
                    callback: null
                };
                $.extend(this.config, param);
                $this.data("config", this.config);
                $this.unbind('keydown').keydown(function(event) {
                    var node = event.currentTarget;
                    switch (event.keyCode) {
                        case 40: //向下键

                            if ($airPointselector.css("display") == "none") return;

                            var $nextSiblingTr = $airPointselector.find(".ct");
                            if ($nextSiblingTr.length <= 0) { //没有选中行时，选中第一行
                                $nextSiblingTr = $airPointselector.find("tr:first");
                            } else {
                                $nextSiblingTr = $nextSiblingTr.next();
                            }
                            $airPointselector.find("tr").removeClass("ct");

                            if ($nextSiblingTr.length > 0) {
                                $nextSiblingTr.addClass("ct");
                                $(node).val($nextSiblingTr.find("div:last").html());
                                $airPointselector.scrollTop($nextSiblingTr[0].offsetTop - $airPointselector.height() + $nextSiblingTr.height());

                            } else {
                                $(node).val(airPointselector.holdText);
                            }

                            break;
                        case 38: //向上键
                            if ($airPointselector.css("display") == "none") return;

                            var $previousSiblingTr = $airPointselector.find(".ct");
                            if ($previousSiblingTr.length <= 0) {
                                $previousSiblingTr = $airPointselector.find("tr:last");
                            } else {
                                $previousSiblingTr = $previousSiblingTr.prev();
                            }
                            $airPointselector.find("tr").removeClass("ct");

                            if ($previousSiblingTr.length > 0) {
                                $previousSiblingTr.addClass("ct");
                                $(node).val($previousSiblingTr.find("div:last").html());
                                $airPointselector.scrollTop($previousSiblingTr[0].offsetTop - $airPointselector.height() + $previousSiblingTr.height());
                            } else {
                                $(node).val(airPointselector.holdText); //输入框显示用户原始输入的值
                            }

                            break;
                        case 27: //ESC键隐藏下拉框
                            airPointselector.hideSelector();
                            break;
                        case 9: //TAB键触发Enter键功能
                            if ($airPointselector.css("display") == "none") return;
                            var $selectTr = $airPointselector.find(".ct");
                            if ($selectTr.length > 0) { //没有选中行时，选中第一行
                                $(currentInputText).val($selectTr.text());
                            }
                            //回调函数
                            var _callback = $(node).data("config").callback;
                            if ($airPointselector.css("display") != "none") {
                                if (_callback && $.isFunction(_callback)) {
                                    _callback($airPointselector.find(".ct").data("jsonData"));
                                }
                                airPointselector.hideSelector();
                            }
                            break;
                    }
                });

                //输入框keyup事件
                $this.unbind('keyup').keyup(function(event) {
                    var k = event.keyCode;
                    var node = event.currentTarget;
                    var ctrl = event.ctrlKey;
                    var isFunctionalKey = false; //按下的键是否是功能键
                    for (var i = 0; i < airPointselector.functionalKeyArray.length; i++) {
                        if (k == airPointselector.functionalKeyArray[i]) {
                            isFunctionalKey = true;
                            break;
                        }
                    }
                    //k键值不是功能键或是ctrl+c、ctrl+x时才触发自动补全功能
                    if (!isFunctionalKey && (!ctrl || (ctrl && k == 67) || (ctrl && k == 88))) {
                        var config = $(node).data("config");

                        var offset = $(node).offset();
                        if (config.width <= 0) {
                            config.width = $(node).outerWidth() - 2
                        }
                        $airPointselector.width(config.width);
                        var h = $(node).outerHeight() - 1;
                        $airPointselector.css({
                            "top": offset.top + h,
                            "left": offset.left
                        });

                        var data = config.data;
                        var url = config.url;
                        var _keyword = $.trim($(node).val());
                        if (_keyword == null || _keyword == "") {
                            dispalyAllData(event);
                            return;
                        }
                        if (url != null && url != "") { //ajax请求数据
                            $.post(url, {
                                keyword: _keyword
                            }, function(result) {
                                makeContAndShow(result.data)
                            }, "json");
                        } else {
                            makeContAndShow(dataFilter(data, _keyword));
                        }

                        airPointselector.holdText = $(node).val();
                    }
                    //回车键
                    if (k == 13) {
                        if ($airPointselector.css("display") == "none") return;

                        var $selectTr = $airPointselector.find(".ct");
                        if ($selectTr.length > 0) { //没有选中行时，选中第一行
                            $(currentInputText).val($selectTr.text());
                        }
                        //回调函数
                        var _callback = $(node).data("config").callback;
                        if ($airPointselector.css("display") != "none") {
                            if (_callback && $.isFunction(_callback)) {
                                _callback($airPointselector.find(".ct").data("jsonData"));
                            }
                            airPointselector.hideSelector();
                        }
                    }

                });
                //组装下拉框html内容并显示
                function makeContAndShow(_data) {
                    if (_data == null || _data.length <= 0) {
                        airPointselector.hideSelector();
                        return;
                    }

                    var cont = "<table><tbody>";
                    for (var i = 0; i < _data.length; i++) {
                        cont += "<tr><td><div>" + _data[i].airpoint + "</div></td></tr>";
                    }
                    cont += "</tbody></table>";
                    $airPointselector.html(cont);
                    $airPointselector.find("tr:first").addClass("ct");
                    $airPointselector.find("tr:odd").addClass("odd");
                    $airPointselector.show();
                    //每行tr绑定数据，返回给回调函数
                    $airPointselector.find("tr").each(function(index) {
                        $(this).data("jsonData", _data[index]);
                    })
                }

                function dataFilter(data, keyword) {
                    var _data = new Array();
                    for (var i = 0; i < data.length; i++) {
                        if (matchingRule(data[i].airpoint, keyword)) {
                            _data.push(data[i]);
                        }
                    }
                    return _data;
                }

                function matchingRule(cityValue, inputValue) {
                    inputValue = inputValue.replace(/\\/g, '\\\\').replace("(", "\\(").replace(")", "\\)")
                        .replace("*", "\\*").replace(".", "\\.").replace("?", "\\?").replace("+", "\\+")
                        .replace("$", "\\$").replace("^", "\\^").replace("[", "\\[").replace("]", "\\]")
                        .replace("{", "\\{").replace("}", "\\}").replace("|", "\\|").replace("/", "\\/");
                    if (cityValue.toUpperCase().indexOf(inputValue.toUpperCase()) == 0 || cityValue.toUpperCase().match(inputValue.toUpperCase())) {
                        return true;
                    } else {
                        return false;
                    }
                };

                function dispalyAllData(event) {
                        //获取数据，并展示
                        var node = event.currentTarget;
                        var config = $(node).data("config");
                        var offset = $(node).offset();
                        if (config.width <= 0) {
                            config.width = $(node).outerWidth() - 2
                        }
                        $airPointselector.width(config.width);
                        var h = $(node).outerHeight();
                        $airPointselector.css({
                            "top": offset.top + h,
                            "left": offset.left
                        });
                        var data = config.data;
                        var url = config.url;

                        if (data != null && $.isArray(data)) {
                            var _keyword = $.trim($(node).val());
                            if ("" != _keyword) {
                                makeContAndShow(dataFilter(data, _keyword));
                            } else {
                                var _data = new Array();
                                for (var i = 0; i < data.length; i++) {
                                    _data.push(data[i]);
                                }
                                makeContAndShow(_data);
                            }
                        } else if (url != null && url != "") { //ajax请求数据
                            $.post(url, {}, function(result) {
                                makeContAndShow(result.data);
                            }, "json")
                        }

                        //滚动到顶部
                        $airPointselector.scrollTop(0);
                    }
                    //输入框focus事件
                $this.focus(function(event) {
                    currentInputText = event.currentTarget;
                    dispalyAllData(event);
                });

            }
            //隐藏下拉框
        this.hideSelector = function() {
            var $airPointselector = $("#airPointselector");
            if ($airPointselector.css("display") != "none") {
                $airPointselector.find("tr").removeClass("ct");
                $airPointselector.hide();
            }
        }

    };

    $.fn.airPointselector = airPointselector.selector;
}));