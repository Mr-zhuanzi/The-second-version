window.addEventListener('DOMContentLoaded',function () {
    // 获取dom元素
    var liNodes = document.querySelectorAll('.list li');
    var arrow = document.querySelector('.arrow');
    var downNodes = document.querySelectorAll('.down');

    var contentUlNode = document.querySelector('#content-main');
    var content = document.querySelector('#content');
    var contentHeight = content.offsetHeight;
    var nowIndex = 0;
    //  头部 的完成
    header();
    function header() {
        // 让小箭头默认第一个li下面
        arrow.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth / 2
            - arrow.offsetWidth / 2 + 'px';
        // 让小房子默认颜色为黑色
        downNodes[0].style.width = '100%';
        // 点击li,li变色，小箭头的位移值等于
        for (var i = 0; i < liNodes.length; i++) {
            liNodes[i].index = i;
            // 点击li，小箭头去哪个地方
            liNodes[i].onclick = function () {
                nowIndex = this.index;
                move(nowIndex);
            }
        }
    }

    // 小贱头和ul的移动
    function move(nowIndex) {
        for (var j = 0; j < downNodes.length; j++) {
            downNodes[j].style.width = '';
        }
        //设置当前width为100%
        downNodes[nowIndex].style.width = '100%';
        //让小箭头去当前点击的li的下面
        arrow.style.left = liNodes[nowIndex].getBoundingClientRect().left + liNodes[nowIndex].offsetWidth / 2
            - arrow.offsetWidth / 2 + 'px';
        // 让move函数移动
        contentUlNode.style.top = -nowIndex * contentHeight + 'px';
    }
            move(2);
    // 滚轮和内容的移动
    contentHandle();
    function contentHandle() {
    // 滚轮事件
    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll', wheel);

    function wheel(event) {
        // 兼容
        event = event || window.event;

        var flag = '';
        if (event.wheelDelta) {
            //ie/chrome
            if (event.wheelDelta > 0) {
                flag = 'up';
            } else {
                flag = 'down'
            }
        } else if (event.detail) {
            //firefox火狐
            if (event.detail < 0) {
                flag = 'up';
            } else {
                flag = 'down'
            }
        }

        switch (flag) {
            case 'up' :
                if (nowIndex > 0) {
                    // ul向上3 2 1递减
                    nowIndex--;
                    move(nowIndex);
                    break;
                }

            case 'down' :
                if (nowIndex < 4) {
                    // ul向下1 2 3 递增
                    nowIndex++;
                    move(nowIndex);
                    break;
                }

        }

        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }

}

    // FIRSTVIEW
    firstView();
    function firstView() {
        var homeCnodes = document.querySelectorAll('.home-carousel li');
        var homePnodes = document.querySelectorAll('.home-point li');
        var lastIndex = 0;
        var nowIndex = 0;
        // 给每一个小圆点绑定点击事件
        for(var i = 0;i < homePnodes.length;i++){
            homePnodes[i].index =i;
            homePnodes[i].onclick = function(){
                // 同步index
                nowIndex = this.index;
                if(nowIndex === lastIndex) return;
                if(nowIndex > lastIndex){
                    // 点击右边 右边增加right-show 左边增加left-hide
                    homeCnodes[nowIndex].className = 'right-show ';
                    homeCnodes[lastIndex].className = 'left-hide ';
                }else{
                    // 点击左边 左边增加left-show，右边增加right-hide
                    homeCnodes[nowIndex].className = 'left-show';
                    homeCnodes[lastIndex].className = 'right-hide';
                }

                // 小圆点变换
                homePnodes[lastIndex].className = '';
                this.className= 'active';
                lastIndex=nowIndex;
            }
        }
    }

    // 自动轮播
})