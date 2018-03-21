$(document).ready(function() {

    $('#btnLogin').click(function() {
        console.log('OK1')

        var username = $("#username").val();
        var password = $("#password").val();

        if(username !== "" && password !== "") {
            console.log(username + " / " + password )
            $.ajax({
                type: "POST",
                url: api_server + '/auth',
                data: {
                    username: username,
                    password: password
                }
            })
            .done(function(data) {                
                localStorage.setItem('token', data.token);

                if( localStorage.getItem('token') != null && 
                    localStorage.getItem('token') != "" ) {
                    window.location = '/index'
                }
            })
            .fail(function(err) {
                console.log(err.responseJSON)
            })

        } else {
            console.log("username or password can't be empty")
        }
    })
})