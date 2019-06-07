function onInputChange(){
    var value = document.getElementById("search-input").value;
    if(value === ""){
        var els = document.querySelectorAll('.org-item');
        for (const el of els) {
            el.classList.remove("hide");
        }
        return;
    }

    postData(
        "https://suishosai-server-php.herokuapp.com/search.php",
        createRequest("query", value),
        function (e) {
            var status = e.target.status;
            var readyState = e.target.readyState;
            var response = e.target.responseText;
            if (status === 200 && readyState === 4) {
                
                var orgs = JSON.parse(response);
                var els = document.querySelectorAll('.org-item');
                for(const el of els){
                    var org = el.getAttribute("data-org");
                    
                    if(orgs.includes(org)){
                        el.classList.remove("hide");
                    }else{
                        el.classList.add("hide");
                    }
                }
            }
        }
    )
}