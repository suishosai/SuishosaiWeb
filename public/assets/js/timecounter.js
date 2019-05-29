let dt, ht, mt, st;
window.onload = function (e) {
    dt = document.getElementById("days-text");
    ht = document.getElementById("hours-text");
    mt = document.getElementById("minutes-text");
    st = document.getElementById("seconds-text");
    f();
};

function f() {
    var destination = new Date(2019, 5, 21, 0, 30, 0).valueOf();
    var now = Date.now();
    var _til = destination - now;
    var til = new Date(_til);
    var days = parseInt(_til / (1000 * 60 * 60 * 24));
    var hours = til.getHours();
    var minutes = til.getMinutes();
    var seconds = til.getSeconds();

    var d = ('0' + days).slice(-2);
    var h = ('0' + hours).slice(-2);
    var m = ('0' + minutes).slice(-2);
    var s = ('0' + seconds).slice(-2);

    dt.innerHTML = d;
    ht.innerHTML = h;
    mt.innerHTML = m;
    st.innerHTML = s;

    setTimeout(f, 1000);

}