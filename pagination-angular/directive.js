app.directive("pagination",[function(){
    return {
        scope:{
            pager:"=",
            perpagernum:"=",
            countBtn:"="
        },
        link:function($scope,$ele,$attrs,$ctrl){
            //每页显示条数
            var perpagernum=$scope.perpagernum||5;
            //下方显示的按钮数
            var countBtn=$scope.countBtn||5;

            init($scope.pager);

            $scope.$on("fresh",function(ev,data){
                console.log(data);
                init(data);
            });

            $scope.goToPage=function(index){
                $scope.currentPage=index>0?index:0;
                $scope.currentPage=index<$scope.countPages-1?index:$scope.countPages-1;
                //$scope.currentPage=index;
                $scope.isFirst=isFirst();
                $scope.isEnd=isEnd();
                changeBtn();
            };
            $scope.goPrev=function(){
                var currentPage=$scope.currentPage;
                currentPage--;
                $scope.goToPage(currentPage);
            }
            $scope.goNext=function(){
                var currentPage=$scope.currentPage;
                currentPage++;
                $scope.goToPage(currentPage);
            }

            function isFirst(){
                return $scope.currentPage==0;
            };
            function isEnd(){
                return $scope.currentPage==$scope.countPages-1;
            };
            function init(data){
                //总的pager;
                $scope.pager=data||[0];
                //总共page页数
                $scope.countPages=Math.ceil($scope.pager.length/perpagernum);
                //分页按钮
                $scope.pages=Array.apply(null,{length:$scope.countPages>countBtn?countBtn:$scope.countPages}).map(function(item,i){return i;});
                //默认当前页
                $scope.currentPage=0;
                $scope.isFirst=isFirst();
                $scope.isEnd=isEnd();
            }
            function changeBtn(){
                var currentPage=$scope.currentPage;
                //var countBtn=countBtn;
                var countPages=$scope.countPages;
                var pages=$scope.pages;
                var _pages=[];
                var _endNum=0;
                if(currentPage>pages[pages.length-1]){
                    _pages=[];
                    var diff=countPages-currentPage;
                    if(diff>countBtn){
                        for(var k=0;k<countBtn;k++){
                          _pages[k]=currentPage+k;
                        }
                    }else{
                        for(var m=countBtn-1;m>-1;m--){
                            _pages[m]=countPages-(countBtn-m);
                        }
                    }
                    $scope.pages=_pages;
                }else if(currentPage<pages[0]){
                    _pages=[];
                    for(var i=countBtn-1;i>-1;i--){
                        _pages[i]=currentPage+i;
                    }
                    $scope.pages=_pages;
                }
            }
        },
        replace:true,
        templateUrl:'./temp-pagination.html',
        restrict:"EA"
    };
}]);