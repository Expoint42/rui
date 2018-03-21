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
        "ajax": api_server + "/vpn",
        // Generated content for a column: https://datatables.net/examples/ajax/null_data_source.html
        columnDefs: [
            { targets:0, data: "netname" },
            { targets:1, data: "gateway" },
            { targets:2, data: "port" },
            {
                targets: 3,
                data: '_id',
                render: function ( data, type, row, meta ) {
                    return '<a class="btn btn-primary" href="/vpn/'+data+'">详情</a>';
                }             
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
        $("#gateway").html(data.gateway);
        $("#port").html(data.port);
    });

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
});
