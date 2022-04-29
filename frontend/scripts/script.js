var glob_current_thread_id = "";
var glob_nb_log = 20;
var page = 1;

var pageUp = x => { let page_tmp = page; pageChange(page_tmp + 1, x) };
var pageDown = x => { let page_tmp = page; pageChange(page_tmp - 1, x) };
var pageReset = x => pageChange(1, x);


window.onload = function () {

    init_home();

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
    twoWeeksChart.destroy();
    dynChart.destroy();
    getData(glob_current_thread_id, populate);
}

function populate(data) {

    document.getElementById("thread").innerHTML = threads[glob_current_thread_id];

    // We use the data to fill html content
    nb_log = Math.min(data.split('\n').length - 1, glob_nb_log); // Can't show more log than what we have
    fastest(data);
    latest(data);
    error_tile(data);
    perfect_tile(data);
    daily_tile(data);
    weekly_tile(data);
    medal_tile(data);
    sec_tile(data)
    let res = serie(data, nb_log);
    serie_tile(data, res);
    new_log(data, res.reverse());

    tututPie(data);
    tututWeek(data);
    tututDay(data);
    tututMin(data);
    tututTwoWeeks(data);
    tututDyn(data);
}
