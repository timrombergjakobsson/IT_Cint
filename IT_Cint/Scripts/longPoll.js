var url = '../../Scripts/respondents.json';

function fetchRespondentData() {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: function (data) {
            setTimeout(function () { fetchRespondentData() }, 10000);
            console.log(data);
        },
        error: function (xhr, status, errorThrown ) {
            console.log("There was an error processing your request.\nPlease try again.\nStatus: " + status);
            setTimeout(function () { fetchRespondentData() }, 10000)
        }

    });

}