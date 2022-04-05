var glob_current_thread_id = "4567795139935838";
var glob_nb_log = 20;
var page = 1;


// console.log(getData(glob_current_thread_id));

window.onload = function () {

    // Add html static content
    document.getElementById("page_number").innerHTML = "Page " + String(page);

    // Add listeners
    document.getElementById("arrow-right").onclick = function () { pageChange(page + 1, data) };
    document.getElementById("arrow-left").onclick = function () { pageChange(page - 1, data) };

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
