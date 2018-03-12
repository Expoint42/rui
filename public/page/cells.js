$(document).ready(function() {

    var table = $('#example').DataTable({
        // DataTables - Features
        // Feature enable/disable https://datatables.net/reference/option/
        "processing": true,
        "serverSide": true,  
        "searching": true,
        "info": true,
        // https://datatables.net/release-datatables/examples/basic_init/dom.html
        // "dom": '<t><"row" <"col-lg-3" l><"col-lg-3" i><"col-lg-6" p>>',
        "ajax": api_server + "/cell",
        // Generated content for a column: https://datatables.net/examples/ajax/null_data_source.html
        columnDefs: [
            { targets:0, data: null, defaultContent: '<input type="checkbox">'},
            { targets:1, data: "mac" },
            { targets:2, data: "hostname" },
            { targets:3, data: "address" },
            { targets:4, data: "model" },
            { targets:5, data: "fv" },
            { targets:6, data: "location" },
            {   targets:7, 
                data: "status",
                render: function( data, type, row, meta ) {

                    if(data) {
                        return '<button type="button" class="btn btn-success btn-circle"></button>'
                    } else {
                        return '<button type="button" class="btn btn-danger btn-circle"></button>'
                    }
                }
            },
            {
                targets: 8,
                data: null,
                defaultContent: '<button class="btn btn-primary" data-toggle="modal" data-target="#modalDetail">详情</button>'
            },
            {
                targets: 9,
                data: '_id',
                render: function ( data, type, row, meta ) {
                    return '<a class="btn btn-primary" href="/cell/edit/'+data+'">修改</a>';
                }
                // defaultContent: '<button class="btn btn-primary" data-toggle="modal" id="btnUpdate" data-target="#myModal2">修改</button>'
                // defaultContent: '<button class="btn btn-primary btnUpdate">修改 ' + +  '</button>'                
            }
        ],
        // https://datatables.net/examples/basic_init/language.html
        // language: {
        //     "lengthMenu": "Display _MENU_ records per page",
        //     "zeroRecords": "Nothing found - sorry",
        //     "info": "Showing page _PAGE_ of _PAGES_",
        //     "infoEmpty": "No records available",
        //     "infoFiltered": "(filtered from _MAX_ total records)"
        // }
    });

    $('#example tbody').on('click', 'button', function () {

        var data = table.row( $(this).parents('tr') ).data();
        console.log(data)
        $("#netname").html(data.netname);
        $("#address").html(data.address);
        $("#subnet").html(data.subnet);
        $("#version").html(data.version);
        $("#mac").html(data.mac);
        $("#hostname").html(data.hostname);
        $("#password").html(data.password);
        $("#model").html(data.model);
        $("#fv").html(data.fv);
        $("#sn").html(data.sn);
        $("#adsl_id").html(data.adsl_id);
        $("#adsl_key").html(data.adsl_key);
        $("#ssid").html(data.ssid);
        $("#wifikey").html(data.wifikey);
        $("#area").html(data.area);
        $("#location").html(data.location);
        $("#scene").html(data.scene);
        $("#note").html(data.note);
    });

    $("#example .btnUpdate").on('click', 'button', function() {
        var data = table.row( $(this).parents('tr') ).data();
        alert(data)
    });


    var deleteIds = [];

    $("#example tbody").on('change', 'input[type="checkbox"]', function()  {

        var data = table.row( $(this).parents('tr') ).data();
        if(this.checked){
            deleteIds.push(data._id);
        } else {
            deleteIds.pop(data._id);
        }

        console.log(deleteIds);
    })

    // 创建
    $("#formCreate").submit(function(e) {
        $.ajax({
            type: "POST",
            url: '/api/1/router/add',
            data: $("#formCreate").serialize(),
            success: function(data){
                if(data.success === true) {
                    $(location).attr('href', 'routers');
                } else {
                    console.error(data.message)
                }
            }
        });

        e.preventDefault();
    });

    // 更新
    $("#formUpdate").submit(function(e){
        $.ajax({
            type: "POST",
            url: "/api/1/router/update",
            data: $("#formUpdate").serialize(),
            success: function(data) {
                if(data.success === true) {
                    $(location).attr('href', 'routers');
                } else {
                    console.error(data.message)
                }
            }
        });

        e.preventDefault();
    });


    $("#btnDelete").on("click", function(e) {
        $.ajax({
            type: "POST",
            url: "/api/1/router/delete",
            data: {
                ids: deleteIds.join(',')
            },
            success: function(data) {
                if(data.success === true) {
                    $(location).attr('href', 'routers');
                } else {
                    console.error(data.message)
                }
            }
        });

        e.preventDefault();
    })
});
