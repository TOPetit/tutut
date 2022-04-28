async function getData(thread_id, func) {
    const response = await fetch("https://tutut.popota.me/" + "data/" + thread_id + ".csv");
    // waits until the request completes...
    text = await response.text().then(function (data) {
        data = formatData(data);
        func(data)
    });
}

// moment.js options
moment.locale('fr', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse : /PD|MD/,
    isPM : function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // Used to determine first week of the year.
    }
});

// Every useful variables

var hourChart;
var dayChart;
var pieChart;
var secChart;
var twoWeeksChart;
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
    100040105721223: "Catherine / Théo",
    100014962631116: "Matthieu / Théo"
}

var in_thread = {
    4567795139935838: [100032236723941, 100009809855629, 100014962631116],
    100008800800648: [100008800800648, 100032236723941],
    100009809855629: [100009809855629, 100032236723941],
    100014962631116: [100014962631116, 100032236723941],
    100040105721223: [100040105721223, 100032236723941],
    100014962631116: [100014962631116, 100032236723941]
}

var colors = {
    100032236723941: '#83dae5',
    100014962631116: '#b150a4',
    100009809855629: '#a2012f',
    100008800800648: '#fa577f',
    100040105721223: "#65bd7a"
}

var hoverColors = {
    100032236723941: '#27a9b9',
    100014962631116: '#77356e',
    100009809855629: '#5e011b',
    100008800800648: '#f82659',
    100040105721223: "#2e6c3d"
}

// Functions to fill html tiles

function fastest(data) {

    let lines = data.split('\n').slice(0, -1);
    let name = [];
    let value = [];
    let fastest = [];

    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        name[index] = names[in_thread[glob_current_thread_id][index]];
        value[index] = "";
        fastest[index] = 60;
    }

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        if (isCorrect(line)) {
            let parsed = parseLine(line);
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            if (parsed["value"] < fastest[name_index]) {
                fastest[name_index] = parsed["value"];
                value[name_index] = parsed["slash_date"] + ' ' + parsed["instant"];
            }
        }
    }

    let tmp_name = [];
    let tmp_value = [];

    let indexes = sortedIndex(fastest);

    for (let index = 0; index < indexes.length; index++) {
        tmp_name[index] = name[indexes[index]];
        tmp_value[index] = value[indexes[index]];
    }

    let data_container = document.getElementById("fastest");

    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = tmp_name[index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = tmp_value[index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function latest(data) {

    let lines = data.split('\n').slice(0, -1);
    let name = [];
    let value = [];
    let latestt = [];

    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        name[index] = names[in_thread[glob_current_thread_id][index]];
        value[index] = "";
        latestt[index] = 0;
    }

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        if (isCorrect(line)) {
            let parsed = parseLine(line);
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            if (parsed["value"] > latestt[name_index]) {
                latestt[name_index] = parsed["value"];
                value[name_index] = parsed["slash_date"] + ' ' + parsed["instant"];
            }
        }
    }

    let tmp_name = [];
    let tmp_value = [];

    let indexes = sortedIndex(latestt).reverse();

    for (let index = 0; index < indexes.length; index++) {
        tmp_name[index] = name[indexes[index]];
        tmp_value[index] = value[indexes[index]];
    }


    let data_container = document.getElementById("latest");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = tmp_name[index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = tmp_value[index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function error_tile(data) {

    let lines = data.split('\n').slice(0, -1);
    let name = [];
    let value = [];

    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        name[index] = names[in_thread[glob_current_thread_id][index]];
        value[index] = 0;
    }

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        if (!isCorrect(line)) {
            let parsed = parseLine(line);
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            value[name_index] += 1;
        }
    }

    let tmp_name = [];
    let tmp_value = [];

    let indexes = sortedIndex(value);

    for (let index = 0; index < indexes.length; index++) {
        tmp_name[index] = name[indexes[index]];
        tmp_value[index] = value[indexes[index]];
    }


    let data_container = document.getElementById("errors");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = tmp_name[index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = tmp_value[index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
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

    return res;
}

function serie_tile(data, res) {

    let lines = data.split('\n').slice(0, -1);
    let name = [];
    let value = [];

    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        name[index] = names[in_thread[glob_current_thread_id][index]];
        value[index] = 0;
    }

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        let parsed = parseLine(line);
        let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
        value[name_index] = Math.max(value[name_index], res[index]);
    }

    let tmp_name = [];
    let tmp_value = [];

    let indexes = sortedIndex(value).reverse();

    for (let index = 0; index < indexes.length; index++) {
        tmp_name[index] = name[indexes[index]];
        tmp_value[index] = value[indexes[index]];
    }


    let data_container = document.getElementById("series");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = tmp_name[index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = tmp_value[index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function perfect_tile(data) {

    let lines = data.split('\n').slice(0, -1);
    let name = [];
    let value = [];

    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        name[index] = names[in_thread[glob_current_thread_id][index]];
        value[index] = 0;
    }

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        if (isCorrect(line)) {
            let parsed = parseLine(line);
            if (parsed["hours"] == parsed["seconds"]) {
                let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
                value[name_index] += 1;
            }
        }
    }

    let tmp_name = [];
    let tmp_value = [];

    let indexes = sortedIndex(value).reverse();

    for (let index = 0; index < indexes.length; index++) {
        tmp_name[index] = name[indexes[index]];
        tmp_value[index] = value[indexes[index]];
    }


    let data_container = document.getElementById("perfect");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = tmp_name[index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = tmp_value[index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function daily_tile(data) {

    let lines = data.split('\n').slice(0, -1).reverse();
    let name = [];
    let value = [];

    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        name[index] = names[in_thread[glob_current_thread_id][index]];
        value[index] = 0;
    }

    let current_date = moment().format("DD/MM/YYYY");

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        if (isCorrect(line)) {
            let parsed = parseLine(line);
            if (parsed["slash_date"] == current_date) {
                let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
                value[name_index] += 1;
            }
            else {
                break;
            }
        }
    }

    let tmp_name = [];
    let tmp_value = [];

    let indexes = sortedIndex(value).reverse();

    for (let index = 0; index < indexes.length; index++) {
        tmp_name[index] = name[indexes[index]];
        tmp_value[index] = value[indexes[index]];
    }


    let data_container = document.getElementById("daily");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = tmp_name[index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = tmp_value[index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function weekly_tile(data) {

    let lines = data.split('\n').slice(0, -1).reverse();
    let name = [];
    let value = [];

    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        name[index] = names[in_thread[glob_current_thread_id][index]];
        value[index] = 0;
    }

    let current_week = moment().week();

    for (let index = 0; index < lines.length; index++) {
        let line = lines[index];
        if (isCorrect(line)) {
            let parsed = parseLine(line);
            if (moment(parsed["time"]).week() == current_week) {
                let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
                value[name_index] += 1;
            }
            else {
                break;
            }
        }
    }

    let tmp_name = [];
    let tmp_value = [];

    let indexes = sortedIndex(value).reverse();

    for (let index = 0; index < indexes.length; index++) {
        tmp_name[index] = name[indexes[index]];
        tmp_value[index] = value[indexes[index]];
    }


    let data_container = document.getElementById("weekly");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = tmp_name[index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = tmp_value[index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
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
                    text: 'Nombre de tututs par personne',
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

    let datasets = [];
    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        datasets[index] = {
            data: [0, 0, 0, 0, 0, 0, 0],
            label: in_thread[glob_current_thread_id].map(x => names[x])[index],
            backgroundColor: in_thread[glob_current_thread_id].map(x => colors[x])[index],
            hoverBackgroundColor: in_thread[glob_current_thread_id].map(x => hoverColors[x])[index],
        }
    }

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            let parsed = parseLine(element);
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            let date = moment(element.split(';')[1]);
            datasets[name_index]["data"][(date.days() + 6) % 7] += 1;
        }
    }

    let labels = ["Monday", "Thursday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var ctx = document.getElementById("chart_tutut_week").getContext('2d');

    dayChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Nombre de tututs par jour',
                    color: "lightgrey",
                    font: {
                        size: 30,
                        family: 'Lato'
                    }
                },
                legend: {
                    labels: {
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: "Lato"
                        }
                    }
                },
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    stacked: true,
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
                    stacked: true,
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
    let labels = [];

    let nb_hours = 24;

    for (let index = 0; index < nb_hours; index++) {
        labels[index] = String(index).padStart(2, '0') + 'h' + String(index).padStart(2, '0');
    }

    let datasets = [];
    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        datasets[index] = {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            label: in_thread[glob_current_thread_id].map(x => names[x])[index],
            backgroundColor: in_thread[glob_current_thread_id].map(x => colors[x])[index],
            hoverBackgroundColor: in_thread[glob_current_thread_id].map(x => hoverColors[x])[index],
        }
    }

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            let parsed = parseLine(element);
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            let date = moment(element.split(';')[1]);
            datasets[name_index]["data"][parseInt(date.hours())] += 1;
        }
    }

    var ctx = document.getElementById("chart_tutut_day").getContext('2d');

    hourChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Nombre de tututs par heure',
                    color: "lightgrey",
                    font: {
                        size: 30,
                        family: 'Lato'
                    }
                },
                legend: {
                    labels: {
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: "Lato"
                        }
                    }
                },
            },
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    stacked: true,
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
                    stacked: true,
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

    for (let index = 0; index < nb_sec * nbPointParSec; index++) {
        labels[index + 1] = String((index / nbPointParSec + 1 / (2 * nbPointParSec))).padStart(2, '0') + 's';
    }
    labels.push("60s");

    let datasets = [];
    let nb_people = in_thread[glob_current_thread_id].length;


    for (let index = 0; index < nb_people; index++) {
        datasets[index] = {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            label: in_thread[glob_current_thread_id].map(x => names[x])[index],
            backgroundColor: in_thread[glob_current_thread_id].map(x => colors[x])[index],
            borderColor: in_thread[glob_current_thread_id].map(x => colors[x])[index]
        }
    }

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            let parsed = parseLine(element);
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            let date = moment(element.split(';')[1]);
            datasets[name_index]["data"][Math.floor(nbPointParSec * parseInt(date.seconds()) + Math.floor(date.milliseconds() / (1000 / nbPointParSec))) + 1] += 1;
        }
    }

    var ctx = document.getElementById("chart_tutut_min").getContext('2d');

    secChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            tension: 0.45,
            plugins: {
                title: {
                    display: true,
                    text: 'Nombre de tututs sur la minute',
                    color: "lightgrey",
                    font: {
                        size: 30,
                        family: 'Lato'
                    }
                },
                legend: {
                    labels: {
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: "Lato"
                        }
                    }
                },
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

function tututTwoWeeks(d) {

    let lines = d.split('\n').slice(0, -1).reverse();

    let datasets = [];
    let labels = [];
    let nb_people = in_thread[glob_current_thread_id].length;

    for (let index = 0; index < nb_people; index++) {
        datasets[index] = {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            label: in_thread[glob_current_thread_id].map(x => names[x])[index],
            backgroundColor: in_thread[glob_current_thread_id].map(x => colors[x])[index],
            hoverBackgroundColor: in_thread[glob_current_thread_id].map(x => hoverColors[x])[index],
            borderColor: in_thread[glob_current_thread_id].map(x => colors[x])[index]
        }
    }

    let two_weeks_ago = moment().subtract(2, 'weeks');
    two_weeks_ago.hour(23);
    two_weeks_ago.minutes(59);
    two_weeks_ago.seconds(59);
    two_weeks_ago.milliseconds(999);

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            let date = moment(element.split(';')[1]);
            if (!labels.includes(date.format("ddd DD"))) {
                labels.unshift(date.format("ddd DD"));
            }
            if (date - two_weeks_ago < 0) {
                break;
            }
        }
    }
    labels = labels.slice(1);

    for (let index = 0; index < lines.length; index++) {
        const element = lines[index]
        if (isCorrect(element)) {
            let parsed = parseLine(element);
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            let date = moment(element.split(';')[1]);
            if (!labels.includes(date.format("ddd DD"))) {
                break;
            }
            
            let index_data = labels.indexOf(date.format("ddd DD"));
            datasets[name_index]["data"][index_data] += 1;
        }
    }

    var ctx = document.getElementById("chart_two_weeks").getContext('2d');

    twoWeeksChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            tension: 0.45,
            plugins: {
                title: {
                    display: true,
                    text: 'Nombre de tututs par jour sur les deux dernières semaines',
                    color: "lightgrey",
                    font: {
                        size: 30,
                        family: 'Lato'
                    }
                },
                legend: {
                    labels: {
                        color: "lightgrey",
                        font: {
                            size: 18,
                            family: "Lato"
                        }
                    }
                },
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
                        min: 0,
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

    let indexes = sortedIndex(values).reverse();

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
    if (nb_dyn == 0) {
        dynChart.options.plugins.title.text = ["Course des tututs", parseLine(d.split('\n')[0])["slash_date"]];
    }
    else {
        dynChart.options.plugins.title.text = ["Course des tututs", parseLine(lines.reverse()[0])["slash_date"]];
    }

    //dynChart.options.scales.x.min = Math.max(0, tmp_data.slice(-1)[0] - 20);
    //dynChart.options.scales.x.max = 400;
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
                    text: ["Course des tututs", parseLine(d.split('\n')[0])["slash_date"]],
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

var step = 500;
var interval_showing = 1050;
var interval_background = 1050;
var min_interval = 50;
var max_interval = 3050;

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

function parseLine(line) {
    let parsed = {};
    let tmp = line.split(";");
    parsed["id"] = tmp[0];
    parsed["time"] = tmp[1].slice(0, -3);
    parsed["int_id"] = parseInt(tmp[0]);
    let tmp1 = tmp[1].slice(0, -3).split(" ");
    parsed["date"] = tmp1[0];
    let tmpDate = tmp1[0].split("-");
    parsed["year"] = tmpDate[0];
    parsed["month"] = tmpDate[1];
    parsed["day"] = tmpDate[2];
    parsed["slash_date"] = tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0];
    parsed["instant"] = tmp1[1];
    let tmp2 = tmp1[1].split(':');
    parsed["hours"] = parseInt(tmp2[0]);
    parsed["minutes"] = parseInt(tmp2[1]);
    let tmp3 = tmp2[2].split('.');
    parsed["seconds"] = parseInt(tmp3[0]);
    parsed["milliseconds"] = parseInt(tmp3[1]);
    parsed["value"] = parsed["seconds"] + parsed["milliseconds"] / 1000;
    return parsed;
}

function formatData(data) {
    let lines = data.split('\n')
    for (let index = 0; index < lines.length - 1; index++) {
        let line = lines[index];
        let splitted = line.split(';');
        if (splitted[1].length == 19) {
            splitted[1] = splitted[1] + ".999000";
        }
        lines[index] = splitted.join(';');
    }
    return lines.join('\n');
}