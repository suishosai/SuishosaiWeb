function onInputChange(){
    var value = document.getElementById("search-input").value;
    if(value === "") return;

    postData(
        "https://suishosai-server-php.herokuapp.com/search.php",
        createRequest("query", value),
        function (e) {
            var status = e.target.status;
            var readyState = e.target.readyState;
            var response = e.target.responseText;
            if (status === 200 && readyState === 4) {
                console.log(JSON.parse(response));
            }
        }
    )
}