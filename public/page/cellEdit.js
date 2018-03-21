$(document).ready(function() {
    // retrieve the cell id
    var cellId = document.URL.substring( document.URL.lastIndexOf('/'))

    function refreshData(data) {
        $("#netname").html(data.netname);
        $("#tIp").html(data.tIp);
        $("#subnet").html(data.subnet);
        $("#version").html(data.version);
        $("#mac").val(data.mac);
        $("#hostname").val(data.hostname);
        $("#password").val(data.password);
        $("#model").val(data.model);
        $("#fv").val(data.fv);
        $("#sn").val(data.sn);
        $("#adslId").val(data.adslId);
        $("#adslKey").val(data.adslKey);
        $("#ssid").val(data.ssid);
        $("#wifiKey").val(data.wifiKey);
        $("#area").val(data.area);
        $("#location").val(data.location);
        $("#scene").val(data.scene);
        $("#note").val(data.note);
    }

    // get data by this cell
    $.ajax({
        type: "GET",
        url: api_server + "/cell" + cellId,
        success: function(data) {
            refreshData(data)
        } 
    });

    // 更新
    $("#formUpdate").submit(function(e){
        $.ajax({
            type: "PUT",
            url: api_server + "/cell" + cellId,
            contentType: "application/x-www-form-urlencoded",
            data: $("#formUpdate").serialize()
        })
        .done(function(data){
            $(location).attr('href', '/cells');
        })
        .fail(function(msg){
            console.log("hahah")
        });

        e.preventDefault();
    });
});