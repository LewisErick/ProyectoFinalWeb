void retrieveCart() {
    var email;
    $.ajax({
        url: "/api/session",
        type: 'GET',
        success: function(responseJSON) {
            if (responseJSON.ok) {
                email = responseJSON["email"];
            } else {
                throw new Error("Couldn't retrieve session. Running as user");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(`${xhr.status}: ${thrownError}`);
            $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
        }
    });
}

$(document).ready(function() {

});