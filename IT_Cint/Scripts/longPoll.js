
function fetchRespondentData() {
    $.ajax({
        url: "/LivePanelists/getLiveRespondents",
        type: 'GET',
        dataType: 'json',
        cache: true,
        ifModified: true,
        success: function (data, e, request) {
            setTimeout(function () { fetchRespondentData() }, 10000);
            if (request.status == 304) {
                var response = request.responseText.split("|");
                alert(response);
            }
            console.debug(data);

        },
        error: function (xhr, status, errorThrown) {
            $("#jsonError").html("<strong>I'm sorry but we couldnt find anyone.\nPlease try again.\nStatus:</strong>" + status)
            $("#ajax-message").remove();
        }

    });
   

}