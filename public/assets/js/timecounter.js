let dt, ht, mt, st;
window.onload = function (e) {
    dt = document.getElementById("days-text");
    ht = document.getElementById("hours-text");
    mt = document.getElementById("minutes-text");
    st = document.getElementById("seconds-text");
    f();
};

var destination = moment("2019-06-22 09:30:00");
console.log(destination);
console.log(moment());
console.log(destination.diff(moment()));



function f() {
    var now = moment();
    var duration = moment.duration(destination.diff(now));
    var days = Math.floor(duration.asDays());
    var hours = duration.hours();
    var minutes = duration.minutes();
    var seconds = duration.seconds();

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