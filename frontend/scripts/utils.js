async function getData(thread_id, func) {
    const response = await fetch("https://tutut.popota.me/" + "data/" + thread_id + ".csv");
    // waits until the request completes...
    text = await response.text().then(function (data) {
        func(data)
    });
}

// Every useful variables

var hourChart;
var dayChart;
var pieChart;
var secChart;
var dynChart;

var names = {
    100032236723941: "Theo",
    100009809855629: "Jodie",
    100014962631116: "Matthieu",
    100008800800648: "Cassandra",
    100040105721223: "Catherine"
}

var threads = {
    4567795139935838: "Voyage au centre de la Terre",
    100008800800648: "Cassandra / Théo",
    100009809855629: "Jodie / Théo",
    100014962631116: "Matthieu / Théo",
    100040105721223: "Catherine / Théo"
}

var in_thread = {
    4567795139935838: [100032236723941, 100009809855629, 100014962631116],
    100008800800648: [100008800800648, 100032236723941],
    100009809855629: [100009809855629, 100032236723941],
    100014962631116: [100014962631116, 100032236723941],
    100040105721223: [100040105721223, 100032236723941]
}

var colors = {
    100032236723941: '#e28027',
    100014962631116: '#b150a4',
    100009809855629: '#3a6aff',
    100008800800648: '#fa577f',
    100040105721223: "#65bd7a"
}

var hoverColors = {
    100032236723941: '#B76010',
    100014962631116: '#77356e',
    100009809855629: '#1650FF',
    100008800800648: '#f82659',
    100040105721223: "#2e6c3d"
}

// Functions to fill html tiles

function fastest(data) {
    let fastest = 59.999;
    let name = "Test";
    let value = "Test";
    var lines = data.split("\n").slice(0, -1);
    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        // If tutut is correct
        if (isCorrect(line)) {
            let tmp = moment(line.split(';')[1]);
            let tmp_val = tmp.seconds() + tmp.milliseconds() / 1000;
            if (tmp_val < fastest) {
                fastest = tmp_val;
                name = names[line.split(';')[0]];
                value = line.split(';')[1].slice(0, -3);

            }
        }
    }
    document.getElementById("fastest_name").innerHTML = name;
    document.getElementById("fastest_value").innerHTML = value;
}

function latest(data) {
    let latest = 0;
    let name = "Test";
    let value = "Test";
    var lines = data.split("\n").slice(0, -1);
    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        // If tutut is correct
        if (isCorrect(line)) {
            let tmp = moment(line.split(';')[1]);
            let tmp_val = tmp.seconds() + tmp.milliseconds() / 1000;
            if (tmp_val > latest) {
                latest = tmp_val;
                name = names[line.split(';')[0]];
                value = line.split(';')[1].slice(0, -3);
            }
        }
    }
    document.getElementById("latest_name").innerHTML = name;
    document.getElementById("latest_value").innerHTML = value;
}

function error_tile(data) {

    let name = "";
    let value = 0;

    let lines = data.split('\n').slice(0, -1);
    let nb_people = in_thread[glob_current_thread_id].length;
    var values = [];

    for (let index = 0; index < nb_people; index++) {
        values[index] = 0; // Incremented when we have an error
    }

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        if (!isCorrect(line)) {
            let current_name = line.split(';')[0];
            let id = in_thread[glob_current_thread_id].indexOf(parseInt(current_name))
            values[id] += 1;

            if (values[id] > value) {
                value = values[id];
                name = current_name;
            }
        }

    }

    document.getElementById("error_name").innerHTML = names[name];
    document.getElementById("error_value").innerHTML = value;
}

function serie(data, nb_log) {
    var lines = data.split("\n").slice(0, -1);
    let nb_people = in_thread[glob_current_thread_id].length;
    var values = [];
    var last_dates = [];
    var value = 0;
    var name = "";

    let res = []; // every values

    for (let index = 0; index < nb_people; index++) {
        values[index] = 0; // Incremented when the series is on
        last_dates[index] = moment("0000-01-01 00:00:00.000000");
    }

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        // If Tutut is correct
        if (isCorrect(line)) {
            let current_date = moment(line.split(';')[1]);
            let current_name = line.split(';')[0];
            let id = in_thread[glob_current_thread_id].indexOf(parseInt(current_name))
            let last_date = last_dates[id];

            // if it's next tutut (< 90min difference)
            if (Math.abs(current_date - last_date) < 5400000) {
                values[id] += 1;
                // if best
                if (values[id] > value) {
                    value = values[id];
                    name = current_name;
                }
            }
            else {
                values[id] = 1;
            }
            last_dates[id] = current_date;
            res[index] = String(values[id]);
        }
        else {
            res[index] = '';
        }
    }
    document.getElementById("serie_name").innerHTML = names[name];
    document.getElementById("serie_value").innerHTML = value;

    return res;
}

// Logs

function pageChange(n_page, data) {
    page = Math.min(Math.ceil((data.split('\n').length - 1) / glob_nb_log), Math.max(1, n_page));
    document.getElementById("page_number").innerHTML = "Page " + String(page);
    let res = serie(data, nb_log) // Needs to be behind new_log
    new_log(data, res.reverse());
}

function new_log(data, series) {

    // Save first child
    let to_save = document.getElementById("log_table").firstElementChild;
    document.getElementById("log_table").innerHTML = "";
    document.getElementById("log_table").appendChild(to_save);

    // Creating the data to plug in
    let lines = data.split('\n').slice(0, -1 - (glob_nb_log * (page - 1)));
    lines = lines.reverse();

    // Getting the labels for ids
    let labels = []; // For ids
    let ths = document.getElementById("log_table").firstElementChild.firstElementChild.children;
    for (let index = 0; index < ths.length; index++) {
        const element = ths[index];
        labels[index] = element.innerHTML;
    }

    // Creating the table
    for (let index = 0; index < Math.min(lines.length, glob_nb_log); index++) {
        let newRow = createLogRow(index, labels, lines[index], String(lines.length).length, series);
        document.getElementById("log_table").appendChild(newRow);

        // Styling the rows
        if (index % 2 == 0) {
            newRow.style.backgroundColor = "rgb(46, 46, 61)";
        }
        else {
            newRow.style.backgroundColor = "rgb(70, 70, 95)";
        }

        if (index > 0) {
            let hour1 = lines[index - 1].split(' ')[1].split(':')[0]; // Hour of tutut after current
            let hour2 = lines[index].split(' ')[1].split(':')[0]; // Hour of current tutut
            if (hour1 != hour2) {
                newRow.style.borderTop = "4px solid rgb(22, 22, 29)";
            }
        }
    }

}

function createLogRow(index, labels, line, nb_zeros, series) {
    let strs = []; // Data to plug in
    let data = line.split(';');
    strs[0] = String(index + glob_nb_log * (page - 1)).padStart(nb_zeros, '0');
    strs[1] = names[data[0]];
    let tmp = data[1].split(' ');
    strs[2] = tmp[0];
    strs[3] = tmp[1].slice(0, -3);
    strs[4] = series[parseInt(strs[0])];
    let newRow = document.createElement("tr");
    for (let i = 0; i < labels.length; i++) {
        let newTd = document.createElement("td");
        newTd.setAttribute("id", labels[i] + String(index));
        // Styling the cells
        if (isCorrect(line)) {
            newTd.style.color = "lightgrey";
        }
        else {
            newTd.style.color = "#ff6853";
        }
        newTd.style.width = '1fr';
        if (labels[i] == "Serie") {
            newTd.style.width = "0.5fr";
        }
        if (labels[i] == "Id") {
            newTd.style.width = "0.5fr"
        }
        if (i > 0) {
            newTd.style.borderLeft = "1px solid rgb(22, 22, 29)"
        }
        newTd.style.textAlign = "center";
        let newContent = document.createTextNode(strs[i]);
        newTd.appendChild(newContent);
        newRow.appendChild(newTd);
    }
    return newRow;
}

// Graphs
Chart.defaults.family = 'Lato';
Chart.defaults.color = "lightgrey";
Chart.defaults.size = 20;


function tututPie(d) {

    let lines = d.split('\n').slice(0, -1);

    let values = [];
    for (let index = 0; index < in_thread[glob_current_thread_id].length; index++) {
        values[index] = 0;
    }

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            values[in_thread[glob_current_thread_id].indexOf(parseInt(element.split(';')[0]))] += 1;
        }
    }

    let data = values;
    let labels = in_thread[glob_current_thread_id].map(x => names[x]);
    var ctx = document.getElementById("chart_tutut_pie").getContext('2d');



    pieChart = new Chart(ctx, {
        type: 'pie',
        plugins: [ChartDataLabels],
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: in_thread[glob_current_thread_id].map(x => colors[x]),
                hoverBackgroundColor: in_thread[glob_current_thread_id].map(x => hoverColors[x]),
                borderColor: 'rgb(22, 22, 29)',
                borderWidth: 5,
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: "Lato"
                        }
                    }
                },
                datalabels: {
                    formatter: function (value, context) {
                        let sum = data.reduce((a, b) => a + b, 0);
                        if (sum != 0) {
                            return String(data[context.dataIndex]) + " (" + String(((data[context.dataIndex] / sum) * 100).toFixed(2)) + "%)"
                        }
                        else {
                            return "0%"
                        }
                    },
                    color: "lightgrey",
                    font: {
                        size: 20,
                        family: 'Lato'
                    },

                },
                title: {
                    display: true,
                    text: 'Number of Tutut per person',
                    color: "lightgrey",
                    font: {
                        size: 30,
                        family: 'Lato'
                    }
                }
            },
            maintainAspectRatio: false,
            responsive: true,
        }
    });
}

function tututWeek(d) {

    let lines = d.split('\n').slice(0, -1);

    let nb_day = 7;

    let values = [];
    for (let index = 0; index < nb_day; index++) {
        values[index] = 0;
    }

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            let date = moment(element.split(';')[1]);
            values[(date.days() + 6) % 7] += 1;
        }
    }

    let data = values;
    let labels = ["Monday", "Thursday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var ctx = document.getElementById("chart_tutut_week").getContext('2d');

    dayChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderWidth: 2,
                backgroundColor: "#f8c4ad",
                hoverBackgroundColor: "#ef8050",
                borderColor: "#ef8050",
                hoverBorderColor: "#f8c4ad"
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Number of Tutut per day',
                    color: "lightgrey",
                    font: {
                        size: 30,
                        family: 'Lato'
                    }
                },
                legend: {
                    display: false
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: 'Lato'
                        }
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: "rgb(45, 45, 59)",
                    },
                    ticks: {
                        beginAtZero: true,
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: 'Lato'
                        }
                    }
                }

            }
        }
    });
}

function tututDay(d) {

    let lines = d.split('\n').slice(0, -1);

    let nb_hour = 24;

    let labels = [];

    let values = [];
    for (let index = 0; index < nb_hour; index++) {
        values[index] = 0;
        labels[index] = String(index).padStart(2, '0') + 'h' + String(index).padStart(2, '0');
    }

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            let date = moment(element.split(';')[1]);
            values[parseInt(date.hours())] += 1;
        }
    }

    let data = values;
    var ctx = document.getElementById("chart_tutut_day").getContext('2d');

    hourChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderWidth: 2,
                backgroundColor: "#f8c4ad",
                hoverBackgroundColor: "#ef8050",
                borderColor: "#ef8050",
                hoverBorderColor: "#f8c4ad"
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Number of Tutut per hour',
                    color: "lightgrey",
                    font: {
                        size: 30,
                        family: 'Lato'
                    }
                },
                legend: {
                    display: false
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: 'Lato'
                        }
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: "rgb(45, 45, 59)",
                    },
                    ticks: {
                        beginAtZero: true,
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: 'Lato'
                        }
                    }
                }

            }
        }
    });
}

function tututMin(d) {

    let lines = d.split('\n').slice(0, -1);

    let nbPointParSec = 1 / 4;

    let nb_sec = 60;

    let labels = ["0s"];

    let values = [0];
    for (let index = 0; index < nb_sec * nbPointParSec; index++) {
        values[index + 1] = 0;
        labels[index + 1] = String((index / nbPointParSec + 1 / (2 * nbPointParSec))).padStart(2, '0') + 's';
    }

    values.push(0);
    labels.push("60s");

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            let date = moment(element.split(';')[1]);

            values[Math.floor(nbPointParSec * parseInt(date.seconds()) + Math.floor(date.milliseconds() / (1000 / nbPointParSec))) + 1] += 1;
        }
    }

    let data = values;
    var ctx = document.getElementById("chart_tutut_min").getContext('2d');

    secChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderWidth: 2,
                borderColor: "#b43927",
                hoverBorderColor: "beige"
            }]
        },
        options: {
            tension: 0.45,
            plugins: {
                title: {
                    display: true,
                    text: 'Number of Tutut per second',
                    color: "lightgrey",
                    font: {
                        size: 30,
                        family: 'Lato'
                    }
                },
                legend: {
                    display: false
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    display: true,
                    grid: {
                        color: "rgb(45, 45, 59)",
                    },
                    ticks: {
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: 'Lato'
                        }
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: "rgb(45, 45, 59)",
                    },
                    ticks: {
                        beginAtZero: true,
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: 'Lato'
                        }
                    }
                }
            }
        }
    });
}

function sortedIndex(values) {
    var len = values.length;
    var indices = new Array(len);
    for (var i = 0; i < len; ++i) { indices[i] = i }
    indices.sort(function (a, b) { return values[a] < values[b] ? -1 : values[a] > values[b] ? 1 : 0; });
    return indices;
}

// Bar chart race

function setDyn(d) {
    let lines = d.split('\n').slice(0, -1).slice(0, nb_dyn);

    let values = [];
    for (let index = 0; index < in_thread[glob_current_thread_id].length; index++) {
        values[index] = 0;
    }

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            values[in_thread[glob_current_thread_id].indexOf(parseInt(element.split(';')[0]))] += 1;
        }
    }

    let labels = in_thread[glob_current_thread_id].map(x => names[x]);
    let nique = in_thread[glob_current_thread_id].map(x => colors[x]);
    let nique2 = in_thread[glob_current_thread_id].map(x => hoverColors[x]);

    let tmp_data = [];
    let tmp_label = [];
    let tmp_color = [];
    let tmp_hover = [];

    indexes = sortedIndex(values).reverse();

    for (let index = 0; index < indexes.length; index++) {
        tmp_data[index] = values[indexes[index]];
        tmp_label[index] = labels[indexes[index]];
        tmp_color[index] = nique[indexes[index]];
        tmp_hover[index] = nique2[indexes[index]];
    }


    dynChart.data.datasets[0].data = tmp_data;
    dynChart.data.labels = tmp_label;
    dynChart.data.datasets[0].backgroundColor = tmp_color;
    dynChart.data.datasets[0].hoverBackgroundColor = tmp_hover;
    //dynChart.options.scales.x.min = Math.max(0, tmp_data.slice(-1)[0] - 20);
    dynChart.options.scales.x.max = 400;
    dynChart.update();
}

function tututDyn(d) {

    var ctx = document.getElementById("chart_tutut_dyn").getContext('2d');
    dynChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: in_thread[glob_current_thread_id].map(x => names[x]),
            datasets: [{
                barThickness: 40,
                data: in_thread[glob_current_thread_id].map(x => 0),
                borderWidth: 2,
                backgroundColor: in_thread[glob_current_thread_id].map(x => colors[x]),
                hoverBackgroundColor: in_thread[glob_current_thread_id].map(x => hoverColors[x]),
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Tutut race',
                    color: "lightgrey",
                    font: {
                        size: 30,
                        family: 'Lato'
                    }
                },
                legend: {
                    display: false
                }
            },
            indexAxis: 'y',
            animation: {
                duration: 200,
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    display: true,
                    min: 0,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: 'Lato'
                        }
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: "rgb(45, 45, 59)",
                    },
                    ticks: {
                        beginAtZero: true,
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: 'Lato'
                        }
                    }
                }
            }
        }
    });
}

// Controls

var step = 50;
var interval_showing = 1000;
var interval_background = 1000;
var min_interval = 50;
var max_interval = 3000;

var playing = false; // false is pause, true is play

var counter = interval_showing;

var updating = setInterval(clock, 10);
var nb_dyn = 0;

function clock() {

    counter -= step;

    if (playing) {
        document.getElementById("play").style.backgroundImage = "url('media_icons/media-pause.svg')";
    }
    else {
        document.getElementById("play").style.backgroundImage = "url('media_icons/media-play.svg')";
    }

    if (counter < 0) {
        counter = interval_showing;
        console.log(interval_showing);
        if (playing) {
            nb_dyn += 1;
            getData(glob_current_thread_id, setDyn);
        }
    }
    // console.log("interval_showing = " + String(interval_showing) + '\interval_background = ' + String(interval_background) + '\n')
}

function play() {
    interval_showing = interval_background;
    playing = true;
}

function pause() {
    playing = false;
}

function faster() {
    interval_background = Math.max(min_interval, interval_background - step);
    if (playing) {
        play();
    }
}

function slower() {
    interval_background = Math.min(max_interval, interval_background + step);
    if (playing) {
        play();
    }
}

function reset() {
    interval_showing = 1000;
    interval_background = 1000;
    nb_dyn = 0;
    playing = false;
    counter = interval_showing;
    getData(glob_current_thread_id, setDyn)
}

function skip() {
    playing = false;
    nb_dyn = 10000000;
    getData(glob_current_thread_id, setDyn)
}

// Functions sandbox

function isCorrect(line) {
    let tmp = line.split(';')[1];
    var tmp_date = moment(tmp);
    return (tmp_date.hours() == tmp_date.minutes());
}