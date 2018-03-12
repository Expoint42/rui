/**
 * Created by visionsmile on 2017/9/12.
 */
//消息框的js
var cjy_alert = function (str) {
    var html = '<div class="cjy-mask" id="cjy-mask"></div>' +
        '<div class="cjy-alert" id="cjy-alert">' +
        '<div class="cjy-alertHed" id="cjy-alertHed">提示：</div><hr>' +
        '<p class="cjy-alertCon">' + str + '</p>' +
        '<div class="cjy-alertBtndiv"><button class="btn cjy-alertBtn" id="cjy-alertBtn">确定</button></div>' +
        '</div>';
    $('#cjy-maskBox').html(html);
    $('#cjy-alertBtn').on('click', function () {
        $('#cjy-maskBox').html('');
        clearInterval(timer);
    })
    var timer = setInterval(function () {
        $('#cjy-maskBox').html('');
        clearInterval(timer);
    }, 5000);
}