void retrieveCart() {
    $.ajax({
        url: url,
        type: 'GET',
        success: function(responseJSON) {
            var ht = "";

            $.each(responseJSON, function(i, val) {
                ht += `
                    <li>${JSON.stringify(val)}</li>
                `;
            });

            $("#postList").html(ht);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(`${xhr.status}: ${thrownError}`);
            $("#errorDiv").html(`${xhr.status}: ${thrownError}`);
        }
    });
}

$(document).ready(function() {

});