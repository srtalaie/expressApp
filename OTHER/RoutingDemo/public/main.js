$(function(){
    let $h1 = $("h1");
    let $zip = $("input[name='zip']");

    $("form").on("submit", function(event){
        event.preventDefault();

        let zipCode = $.trim($zip.val());
        $h1.text("Loading...");

        let request = $.ajax({
            url: '/' + zipCode,
            dataType: "json"
        });

        request.done(function(data){
            let temperature = data.temperature;
            let city = data.city;
            let state = data.state;
            $h1.html(`It is ${temperature}&#176;F in ${city}, ${state} ${zipCode}.`)
        });

        request.fail(function(){
            $h1.text("Error!");
        });
    });
});