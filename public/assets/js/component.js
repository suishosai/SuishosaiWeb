A();
function A() {
    if(getUserID() !== null){
        console.log("you have already logged in");
        return;
    }
    getBrowserFingerPrint(function (fingerprint) {
        
        postData(
            "https://suishosai-server-php.herokuapp.com/redirect4.php",
            createRequest("userid", fingerprint),
            function (e) {
                var status = e.target.status;
                var readyState = e.target.readyState;
                var response = e.target.responseText;
                if (status === 200 && readyState === 4) {
                    window.localStorage.setItem("userid", fingerprint);
                }
            }
        )
    });
}

function postData(url, data, callback) {

    var xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');

    xhr.onreadystatechange = callback;

    xhr.send(data);
}

function createVoteRequestUrl(data1, data2, data3, data4) {
    var str =
        createRequest("data1", data1) + "&" +
        createRequest("data2", data2) + "&" +
        createRequest("data3", data3) + "&" +
        createRequest("data4", data4) + "&" +
        createRequest("accessToken", getUserID());

    return str;
}

function createStampRallyRequestUrl(content) {
    var str =
        createRequest("text", content) + "&" +
        createRequest("accessToken", getUserID());

    return str;
}

function createRequest(name, value) {
    return name + "=" + value;
}

function getUserID() {
    return window.localStorage.getItem("userid");
}

function getQueryString() {
    var result = {};
    if (1 < window.location.search.length) {
        var query = window.location.search.substring(1);

        var parameters = query.split('&');

        for (var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');

            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);

            result[paramName] = paramValue;
        }
    }
    return result;
}

function getBrowserFingerPrint(callback) {
    if (window.requestIdleCallback) {
        requestIdleCallback(function () {
            Fingerprint2.get(function (components) {
                var murmur = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31)
                callback(murmur)
            })
        })
    } else {
        setTimeout(function () {
            Fingerprint2.get(function (components) {
                var murmur = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31)
                callback(murmur)
            })
        }, 500)
    }
}
