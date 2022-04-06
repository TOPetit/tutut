var glob_current_thread_id = "4567795139935838";
var glob_nb_log = 20;
var page = 1;


// console.log(getData(glob_current_thread_id));

window.onload = function () {

    // Populate html content
    document.getElementById("thread").innerHTML = threads[glob_current_thread_id];

    // Thread
    document.getElementById("btn1").innerHTML = threads[4567795139935838];
    document.getElementById("btn2").innerHTML = threads[100008800800648];
    document.getElementById("btn3").innerHTML = threads[100014962631116];

    document.getElementById("btn1").onclick = function () { updatePage("4567795139935838") };
    document.getElementById("btn2").onclick = function () { updatePage("100008800800648") };
    document.getElementById("btn3").onclick = function () { updatePage("100014962631116") };

    // Page management
    document.getElementById("page_number").innerHTML = "Page " + String(page);
    document.getElementById("arrow-right").onclick = function () { pageChange(page + 1) };
    document.getElementById("arrow-left").onclick = function () { pageChange(page - 1) };

    populate();
}

function updatePage(thread) {
    pageChange(1);
    glob_current_thread_id = thread;
    document.getElementById("thread").innerHTML = threads[glob_current_thread_id];
    hourChart.destroy();
    dayChart.destroy();
    pieChart.destroy();
    secChart.destroy();
    populate();
}

function populate() {

    // We get the data
    let data = getData(glob_current_thread_id);

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
