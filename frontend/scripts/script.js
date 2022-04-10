var glob_current_thread_id = "";
var glob_nb_log = 20;
var page = 1;

var pageUp = x => { let page_tmp = page; pageChange(page_tmp + 1, x) };
var pageDown = x => { let page_tmp = page; pageChange(page_tmp - 1, x) };
var pageReset = x => pageChange(1, x);


window.onload = function () {

    // refresh
    document.getElementById("refresh_div").onclick = function () { updatePage(glob_current_thread_id) };

    // Thread
    document.getElementById("btn1").innerHTML = threads[4567795139935838];
    document.getElementById("btn2").innerHTML = threads[100008800800648];
    document.getElementById("btn3").innerHTML = threads[100014962631116];

    document.getElementById("btn1").onclick = function () { updatePage("4567795139935838") };
    document.getElementById("btn2").onclick = function () { updatePage("100008800800648") };
    document.getElementById("btn3").onclick = function () { updatePage("100014962631116") };

    // Page management
    document.getElementById("page_number").innerHTML = "Page " + String(page);
    document.getElementById("arrow-right").onclick = function () { getData(glob_current_thread_id, pageUp) };
    document.getElementById("arrow-left").onclick = function () { getData(glob_current_thread_id, pageDown) };


    glob_current_thread_id = "4567795139935838";

    getData(glob_current_thread_id, populate);

}

function updatePage(thread) {
    if (thread != glob_current_thread_id) {
        getData(thread, pageReset);
        glob_current_thread_id = thread;
        document.getElementById("thread").innerHTML = threads[glob_current_thread_id];
    }
    hourChart.destroy();
    dayChart.destroy();
    pieChart.destroy();
    secChart.destroy();
    getData(glob_current_thread_id, populate);
}

function populate(data) {

    document.getElementById("thread").innerHTML = threads[glob_current_thread_id];

    // We use the data to fill html content
    nb_log = Math.min(data.split('\n').length - 1, glob_nb_log); // Can't show more log than what we have
    fastest(data);
    latest(data);
    error_tile(data);
    let res = serie(data, nb_log); // Needs to be behind new_log
    new_log(data, res.reverse());

    tututPie(data);
    tututWeek(data);
    tututDay(data);
    tututMin(data);
}
