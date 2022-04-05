
var glob_current_thread_id = "4567795139935838";

function getdata(thread_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://tutut.popota.me/" + thread_id + ".csv", true);
    // xhr.open("GET", window.location.href + thread_id + ".csv", true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}