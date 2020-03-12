$(
    function(){
        var user={
            "nick-name":"IT",
            "playlist":"157182977"
        }
        var tracks=[
            {
                "name":"追光者",
                "artistName":[
                    {"name":"刘德华"}
                ],
                "album":{
                            "albumname":"夏至未至 影视原声带",
                            "picUrl":"img/1.jpg"
                        },
                "id":"483671599"
            },{
                "name":"遇到",
                "artistName":[
                    {"name":"方雅贤"}
                ],
                "album":{
                            "albumname":"恶作剧之吻 电视原声带",
                            "picUrl":"img/2.jpg"
                        },
                "id":"4875075"
            },{
                "name":"醉赤壁",
                "artistName":[
                    {"name":"林俊杰"}
                ],
                "album":{
                    "albumname":"jj陆",
                    "picUrl":"img/3.jpg"
                },
                "id":"108478"
            },{
                "name":"小幸运",
                "artistName":[{
                    "name":"江珊/梁译木"}
                ],
                "album":{
                    "albumname":"2017跨界歌王 第三期",
                    "picUrl":"img/4.jpg"
                },
                "id":"33206214"
            },{
                "name":"其实",
                "artistName":[{
                    "name":"薛之谦"}
                ],
                "album":{
                    "albumname":"意外",
                    "picUrl":"img/5.jpg"
                },
                "id":"27955654"
            }
            
        ]
        initPlayList(tracks);
        refeshDOM();
        //发送请求
        // requestAPI({
        //     url:window.requestURL,
        //     data:{
        //         "API_type":"get_playlist_info",
        //         "queryString":{
        //             "id":user.playlist
        //         }
        //     },
        //     callback:function(data){
        //         console.log(data.result.tracks);
        //         //回调函数
        //         initPlayList(data.result.tracks);
        //         refeshDOM();
        //         var songTotals=data.result.tackers;
        //         localStorage.setItem("sontTotals",songTotals);
                
        //     }
        // });
        var songTotals=tracks.length;
        localStorage.setItem("songTotals",songTotals);
        function refeshDOM(){
            var firstTR=$("#infoList_playlist").find("tr").get(0);
            $("#audio").prop("src",firstTR.dataset.mp3url);
            $(firstTR).find("td.index").html('<i class="fa fa-volume-up" aria-hidden="true"></i>').addClass("active");

            //初始化小窗口信息；
            $("#albumPic").prop("src",firstTR.dataset.albumPic);
            $("#musicName").html(firstTR.dataset.name);
            $("#artistName").html(firstTR.dataset.artistName);
            $("#info_poster").prop("src",firstTR.dataset.albumPic);
        }

        function initPlayList(tracks){
            var num,name,artists=[],artistName,album,time,tr;
            //数据遍历
            $.each(tracks,function(index,track){
                //判断0-9数字前面+0成为双数
                num = (index+1<10)?"0"+(index+1):index+1;
                //获取名字
                name = track.name;
                //清空数组；
                artists = [];
                //数据遍历
                $.each(track.artistName,function(index,artist){
                    //数组插入数据
                    artists.push(artist.name);
                });
                //artists.join("/")是以/来划分连接数组数据；
                artistName = artists.join("/");
                album=track.album.albumname;
                //初始化歌曲时间
                //formatTime(track.duration/1000);

                tr=document.createElement("tr");
                tr.dataset.id=track.id;
                tr.dataset.index=index;
                tr.dataset.mp3url="http://music.163.com/song/media/outer/url?id="+track.id+".mp3";

                tr.dataset.name=name;
                tr.dataset.artistName=artistName;
                tr.dataset.album=album;
                tr.dataset.albumPic=track.album.picUrl;

                tr.innerHTML='<td class="index" data-num="'+num+'">'+num+'</td>'+
                '<td><i class="fa fa-heart-o" aria-hidden="true"></i>&nbsp;'+
                '<i class="fa fa-download" aria-hidden="true"><i></td>'+
                '<td>'+name+'</td>'+
                '<td>'+artistName+'</td>'+
                '<td>'+album+'</td>'+
                '<td>'+"03:55"+'<td>';
                //把数据加入列表
                $("#infoList_playlist").append(tr);
            });
        }
        $("#poster").on("click",function(){
            $("#pageSongDetail").css({"top":"60px","right":"0","opacity":"1"});
        })
    }
)