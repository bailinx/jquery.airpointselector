$(function(){

	$("#tt").airPointselector({data:[{airpoint:"Beijing(PEK),北京"},{airpoint:"ChengDu(CTU),成都"},{airpoint:"ChongQing(CKG),重庆"},{airpoint:"Fuzhou(FOC),福州"},{airpoint:"Guilin(KWL),桂林"}],
        callback:function(data){
            //alert(data.result);
            //这里可以获取到数据，然后调用ajax方法，初始化到达地
            if(data.airpoint.indexOf("PEK")>-1) {
                $("#ff").airPointselector({width:"300px",data:[{airpoint:"Hanoi(HAN),河内"},
                                    {airpoint:"HongKong(HKG),香港"},
                                    {airpoint:"Taipei(TPE),台北"},
                                    {airpoint:"Shanghai(SHA/PVG),上海"}]});
            }
            if(data.airpoint.indexOf("CTU")>-1) {
                $("#ff").airPointselector({width:"300px",data:[{airpoint:"Harbin(HRB),哈尔滨"},
                                    {airpoint:"NanJing(NKG),南京"},
                                    {airpoint:"Nanning(NNG),南宁"},
                                    {airpoint:"Beijing(PEK),北京"}]});
            }
            if(data.airpoint.indexOf("CKG")>-1) {
                $("#ff").airPointselector({width:"300px",data:[{airpoint:"NanJing(NKG),南京"},
                                    {airpoint:"Harbin(HRB),哈尔滨"},
                                    {airpoint:"Guiyang(KWE),贵阳"},
                                    {airpoint:"ChengDu(CTU),成都"}]});
            }

        }
    });
    //$("#qq").airPointselector({data:[{airpoint:"book",result:"booooook"},//拿到 result 里的数据可继续处理
    //                                {airpoint:"blue",result:"bluuuuue"},
    //                                {airpoint:"fool"},
    //                               {airpoint:"bus",result:[1,2,3]}],
    //                     callback:function(data){
    //                        alert(data.result);
    //                      }});

    //var url_ = "../selector/ajax.php";
    //$("#nn").airPointselector({url:url_});

})
