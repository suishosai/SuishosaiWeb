function onInputChange(){
    var value = document.getElementById("search-input").value;
    
    if(value === ""){
        console.log("発火");
        
        var els = document.querySelectorAll('.org-item');
        for (const el of els) {
            el.classList.remove("hide");
        }
        document.getElementById("empty").classList.add('hide');
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
                if(document.getElementById("search-input").value === ""){
                    return;
                }
                var orgs = JSON.parse(response);
                var els = document.querySelectorAll('.org-item');
                var count = 0;
                for(const el of els){
                    var org = el.getAttribute("data-org");
                    
                    if(orgs.includes(org)){
                        el.classList.remove("hide");
                        count ++;
                        
                    }else{
                        el.classList.add("hide");
                    }
                }
                lazyestload();
                console.log(count);
                if(count === 0){
                    document.getElementById("empty").classList.remove('hide');
                }
            }
        }
    )
}