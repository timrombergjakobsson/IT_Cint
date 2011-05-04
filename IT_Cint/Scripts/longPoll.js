var url = '../../Scripts/respondents.json';

function fetchData() {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        data: json,
        contentType: 'application/json; charset=utf-8',
        async: true,

        success: function (data) {
            parseData(data);
            setTimeout(function () { fetchData() }, 5000);
            console.log(data);
        },
        error: function (data) {
            setTimeout(function () { fetchData() }, 5000);
        }

    });
}