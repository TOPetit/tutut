// Inits

function init_fastest_tile(variables, i) {
    variables['name'][i] = names[in_thread[glob_current_thread_id][i]];
    variables['str_value'][i] = "";
    variables['num_value'][i] = 60;
}

function init_latest_tile(variables, i) {
    variables['name'][i] = names[in_thread[glob_current_thread_id][i]];
    variables['str_value'][i] = "";
    variables['num_value'][i] = 0;
}

function init_error_tile(variables, i) {
    variables['name'][i] = names[in_thread[glob_current_thread_id][i]];
    variables['value'][i] = 0;
}

function init_serie_tile(variables, i) {
    variables['name'][i] = names[in_thread[glob_current_thread_id][i]];
    variables['value'][i] = 0;
}

function init_perfect_tile(variables, i) {
    variables['name'][i] = names[in_thread[glob_current_thread_id][i]];
    variables['value'][i] = 0;
}

function init_daily_tile(variables, i) {
    variables['name'][i] = names[in_thread[glob_current_thread_id][i]];
    variables['value'][i] = 0;
}

function init_weekly_tile(variables, i) {
    variables['name'][i] = names[in_thread[glob_current_thread_id][i]];
    variables['value'][i] = 0;
}

// Computation

function compute_fastest_tile(variables, line) {
    if (isCorrect(line)) {
        let parsed = parseLine(line);
        let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
        if (parsed["value"] < variables['num_value'][name_index]) {
            variables['num_value'][name_index] = parsed["value"];
            variables['str_value'][name_index] = parsed["slash_date"] + ' ' + parsed["instant"];
        }
    }
}

function compute_latest_tile(variables, line) {
    if (isCorrect(line)) {
        let parsed = parseLine(line);
        let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
        if (parsed["value"] > variables['num_value'][name_index]) {
            variables['num_value'][name_index] = parsed["value"];
            variables['str_value'][name_index] = parsed["slash_date"] + ' ' + parsed["instant"];
        }
    }
}

function compute_error_tile(variables, line) {
    if (!isCorrect(line)) {
        let parsed = parseLine(line);
        let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
        variables['value'][name_index] += 1;
    }
}

function compute_serie_tile(variables, line, serie_value) {
    let parsed = parseLine(line);
    let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
    variables['value'][name_index] = Math.max(variables['value'][name_index], serie_value);
}

function compute_perfect_tile(variables, line) {
    if (isCorrect(line)) {
        let parsed = parseLine(line);
        if (parsed["hours"] == parsed["seconds"]) {
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            variables['value'][name_index] += 1;
        }
    }
}

function compute_daily_tile(variables, line, current_date) {
    if (isCorrect(line)) {
        let parsed = parseLine(line);
        if (parsed["slash_date"] == current_date) {
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            variables['value'][name_index] += 1;
        }
    }
}

function compute_weekly_tile(variables, line, current_week) {
    if (isCorrect(line)) {
        let parsed = parseLine(line);
        if (moment(parsed["time"]).week() == current_week) {
            let name_index = in_thread[glob_current_thread_id].indexOf(parsed["int_id"]);
            variables['value'][name_index] += 1;
        }
    }
}

// Sorting

function sort_fastest_tile(variables, nb_people) {
    let tmp_name = [];
    let tmp_value = [];
    let indexes = sortedIndex(variables['num_value']);
    for (let i = 0; i < nb_people; i++) {
        tmp_name[i] = variables['name'][indexes[i]];
        tmp_value[i] = variables['str_value'][indexes[i]];
    }
    variables['name'] = tmp_name;
    variables['str_value'] = tmp_value;
    variables['color'] = colors[in_thread[glob_current_thread_id][indexes[0]]];
}

function sort_latest_tile(variables, nb_people) {
    let tmp_name = [];
    let tmp_value = [];
    let indexes = sortedIndex(variables['num_value']).reverse();
    for (let i = 0; i < nb_people; i++) {
        tmp_name[i] = variables['name'][indexes[i]];
        tmp_value[i] = variables['str_value'][indexes[i]];
    }
    variables['name'] = tmp_name;
    variables['str_value'] = tmp_value;
    variables['color'] = colors[in_thread[glob_current_thread_id][indexes[0]]];
}

function sort_error_tile(variables, nb_people) {
    let tmp_name = [];
    let tmp_value = [];
    let indexes = sortedIndex(variables['value']);
    for (let i = 0; i < nb_people; i++) {
        tmp_name[i] = variables['name'][indexes[i]];
        tmp_value[i] = variables['value'][indexes[i]];
    }
    variables['name'] = tmp_name;
    variables['value'] = tmp_value;
    variables['color'] = colors[in_thread[glob_current_thread_id][indexes[0]]];
}

function sort_serie_tile(variables, nb_people) {
    let tmp_name = [];
    let tmp_value = [];
    let indexes = sortedIndex(variables['value']).reverse();
    for (let i = 0; i < nb_people; i++) {
        tmp_name[i] = variables['name'][indexes[i]];
        tmp_value[i] = variables['value'][indexes[i]];
    }
    variables['name'] = tmp_name;
    variables['value'] = tmp_value;
    variables['color'] = colors[in_thread[glob_current_thread_id][indexes[0]]];
}

function sort_perfect_tile(variables, nb_people) {
    let tmp_name = [];
    let tmp_value = [];
    let indexes = sortedIndex(variables['value']).reverse();
    for (let i = 0; i < nb_people; i++) {
        tmp_name[i] = variables['name'][indexes[i]];
        tmp_value[i] = variables['value'][indexes[i]];
    }
    variables['name'] = tmp_name;
    variables['value'] = tmp_value;
    variables['color'] = colors[in_thread[glob_current_thread_id][indexes[0]]];
}

function sort_daily_tile(variables, nb_people) {
    let tmp_name = [];
    let tmp_value = [];
    let indexes = sortedIndex(variables['value']).reverse();
    for (let i = 0; i < nb_people; i++) {
        tmp_name[i] = variables['name'][indexes[i]];
        tmp_value[i] = variables['value'][indexes[i]];
    }
    variables['name'] = tmp_name;
    variables['value'] = tmp_value;
    variables['color'] = colors[in_thread[glob_current_thread_id][indexes[0]]];
}

function sort_weekly_tile(variables, nb_people) {
    let tmp_name = [];
    let tmp_value = [];
    let indexes = sortedIndex(variables['value']).reverse();
    for (let i = 0; i < nb_people; i++) {
        tmp_name[i] = variables['name'][indexes[i]];
        tmp_value[i] = variables['value'][indexes[i]];
    }
    variables['name'] = tmp_name;
    variables['value'] = tmp_value;
    variables['color'] = colors[in_thread[glob_current_thread_id][indexes[0]]];
}


// Display
function display_fastest_tile(variables, nb_people) {
    let css = '#tile_fastest:hover {box-shadow: 0 0 15px ' + variables['color'] + '}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    document.getElementById("title_fastest").innerHTML = "Tutut le plus tôt";

    let data_container = document.getElementById("fastest");

    data_container.innerHTML = "";

    for (let i = 0; i < nb_people; i++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = variables['name'][i];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = variables['str_value'][i];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function display_latest_tile(variables, nb_people) {
    let css = '#tile_latest:hover {box-shadow: 0 0 15px ' + variables['color'] + '}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    document.getElementById("title_latest").innerHTML = "Tutut le plus tard";

    let data_container = document.getElementById("latest");

    data_container.innerHTML = "";

    for (let i = 0; i < nb_people; i++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = variables['name'][i];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = variables['str_value'][i];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function display_error_tile(variables, nb_people) {
    let css = '#tile_errors:hover {box-shadow: 0 0 15px ' + variables['colors'] + '}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    document.getElementById("title_errors").innerHTML = "Nombre d'erreurs";

    let data_container = document.getElementById("errors");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = variables['name'][index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = variables['value'][index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function display_serie_tile(variables, nb_people) {
    let css = '#tile_serie:hover {box-shadow: 0 0 15px ' + variables['colors'] + '}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    document.getElementById("title_serie").innerHTML = "Séries de tutut";

    let data_container = document.getElementById("serie");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = variables['name'][index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = variables['value'][index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function display_perfect_tile(variables, nb_people) {
    let css = '#tile_perfect:hover {box-shadow: 0 0 15px ' + variables['colors'] + '}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    document.getElementById("title_perfect").innerHTML = "Nombre de tututs parfaits";

    let data_container = document.getElementById("perfect");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = variables['name'][index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = variables['value'][index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function display_daily_tile(variables, nb_people) {
    let css = '#tile_daily:hover {box-shadow: 0 0 15px ' + variables['colors'] + '}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    document.getElementById("title_daily").innerHTML = "Tututs du jour";

    let data_container = document.getElementById("daily");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = variables['name'][index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = variables['value'][index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}

function display_weekly_tile(variables, nb_people) {
    let css = '#tile_weekly:hover {box-shadow: 0 0 15px ' + variables['colors'] + '}';
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    document.getElementById("title_weekly").innerHTML = "Tututs de la semaine";

    let data_container = document.getElementById("weekly");
    data_container.innerHTML = "";

    for (let index = 0; index < nb_people; index++) {

        let data_obj = document.createElement("div");
        data_obj.setAttribute("class", "data");

        let data_name = document.createElement("div");
        data_name.setAttribute("class", "name");
        data_name.innerHTML = variables['name'][index];

        let data_value = document.createElement("div");
        data_value.setAttribute("class", "value");
        data_value.innerHTML = variables['value'][index];

        data_obj.appendChild(data_name);
        data_obj.appendChild(data_value);
        data_container.appendChild(data_obj);
    }
}