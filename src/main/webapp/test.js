function getData() {

    var url = document.getElementById("query").value;

    // use ajaxPrefilter and heroku cors-anywhere

    $.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    $.ajax({
        url: url,
        dataType: 'html',
        type: 'POST',
        success: function(response, status) {
            console.log('AJAX success: ' + response);
            $('#responseData').text(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('AJAX error:' + textStatus);
        }
    });
}