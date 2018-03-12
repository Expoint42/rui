var socket = io("http://ianki.cn:1338");
var snapshot = null;

function byteToMb (bytes) {
    //             Kb     Mb
    return (bytes / 1024 / 1024).toFixed(2)
}

function secondToHour( seconds ) {

    var hour = Math.floor(seconds / 3600);
    var min  = Math.floor ( (seconds % 3600) / 60 )
    return hour +" h "+ min+ " m"
}

function moreInfo(cellId) {
    if(snapshot == null) return;

    var idx = 0;
    snapshot.state.forEach(function(cell) {
        if(cell.id == cellId) {
            var clientListContent = "";

            cell.clients.forEach(function(client) {
                idx++;
                var item ="<tr><td>"+ idx + "</td>"
                            + "<td>"+ client.name +"</td>"
                            + "<td>"+ client.mac +"</td>"
                            + "<td>"+ byteToMb(client.dl) +"</td>"
                            + "<td>"+ byteToMb(client.ul) +"</td>"
                            + "<td>"+ client.login +"</td>"
                            + "<td>"+ secondToHour(client.online) +"</td></tr>"

                clientListContent += item 
            })

            $("#clientList").html(clientListContent)
        }
    })
}

function refreshState(data) {
        
    if(data == null) return;

    snapshot = data;

    $("#routerNum").html(data.cellNum)
    $("#onlineNum").html(data.clientNum)
    $("#connectNum").html(data.connectNum)
        
    var cellListContent = "";
    var idx = 0;
    data.state.forEach(cell => {
        idx ++;
        var item ="<tr><td>" + idx + "</td>"
                    + "<td>" + cell.id +"</td>"
                    + "<td>" + secondToHour(cell.uptime) +"</td>"
                    + "<td>" + cell.memfree +"</td>"
                    + "<td>" + cell.load +"</td>"
                    + "<td>" + cell.sessions +"</td>"
                    + "<td>" + cell.cpu +"</td>"
                    + "<td>" + cell.clients.length +"</td>"
                    + "<td>" + '<a onclick="moreInfo(\''+ cell.id +'\')">More</a>' +"</td></tr>"                       
        cellListContent += item
    });

    $("#cellList").html(cellListContent)
}

$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: api_server + "/state",
    })
    .done(function(data) {
        refreshState(data);
    })
    .fail(function(msg){
        console.error(msg)
    })

    socket.on('state', function(data){
        refreshState(data)
    })
})