let html_thread =
    "<div class='title'>STUTUSTIQUES</div>" +
    "<div class='trug'>" +
    "    <span class='dropdown'>" +
    "        <button class='dropbtn' id='thread'>Accueil</button>" +
    "        <div class='dropdown-content'>" +
    "            <div id='btn0'>Accueil</div>" +
    "            <div id='btn1'>Thread 1</div>" +
    "            <div id='btn2'>Thread 2</div>" +
    "            <div id='btn3'>Thread 3</div>" +
    "            <!-- <div id='btn4'>Thread 4</div> -->" +
    "        </div>" +
    "    </span>" +
    "    <div id='refresh_div'>" +
    "        <img id='refresh' src='refresh.svg' alt='' height='20px' width='20px' margin='auto' />" +
    "    </div>" +
    "</div>" +
    "<div class='separator'></div>" +
    "<div id='tiles_container'>" +
    "    <div class='tile' id='tile_fastest'>" +
    "        <div class='tile_title' id='title_fastest'></div>" +
    "        <div class='data_container' id='fastest'></div>" +
    "    </div>" +
    "    <div class='tile' id='tile_latest'>" +
    "        <div class='tile_title' id='title_latest'></div>" +
    "        <div class='data_container' id='latest'></div>" +
    "    </div>" +
    "    <div class='tile' id='tile_errors'>" +
    "        <div class='tile_title' id='title_errors'></div>" +
    "        <div class='data_container' id='errors'></div>" +
    "    </div>" +
    "    <div class='tile' id='tile_serie'>" +
    "        <div class='tile_title' id='title_serie'></div>" +
    "        <div class='data_container' id='serie'></div>" +
    "    </div>" +
    "    <div class='tile' id='tile_perfect'>" +
    "        <div class='tile_title' id='title_perfect'></div>" +
    "        <div class='data_container' id='perfect'></div>" +
    "    </div>" +
    "    <div class='tile' id='tile_daily'>" +
    "        <div class='tile_title' id='title_daily'></div>" +
    "        <div class='data_container' id='daily'></div>" +
    "    </div>" +
    "    <div class='tile' id='tile_weekly'>" +
    "        <div class='tile_title' id='title_weekly'></div>" +
    "        <div class='data_container' id='weekly'></div>" +
    "    </div>" +
    "    <div class='tile' id='tile_medal'>" +
    "        <div class='tile_title' id='title_medal'></div>" +
    "        <div class='data_container' id='medal'></div>" +
    "    </div>" +
    "    <div class='tile' id='tile_sec'>" +
    "        <div class='tile_title' id='title_sec'></div>" +
    "        <div class='data_container' id='sec'></div>" +
    "    </div>" +
    "</div>" +
    "<div class='separator'></div>" +
    "<div id='div_chart_tutut_pie'>" +
    "    <canvas id='chart_tutut_pie'></canvas>" +
    "</div>" +
    "<div class='separator'></div>" +
    "<div id='div_chart_tutut_week'>" +
    "    <canvas id='chart_tutut_week'></canvas>" +
    "</div>" +
    "<div class='separator'></div>" +
    "<div id='div_chart_tutut_day'>" +
    "    <canvas id='chart_tutut_day'></canvas>" +
    "</div>" +
    "<div class='separator'></div>" +
    "<div id='div_chart_tutut_min'>" +
    "    <canvas id='chart_tutut_min'></canvas>" +
    "</div>" +
    "<div class='separator'></div>" +
    "<div id='div_two_weeks'>" +
    "    <canvas id='chart_two_weeks'></canvas>" +
    "</div>" +
    "<div class='separator'></div>" +
    "<div id='div_dyn_chart'>" +
    "    <canvas id='chart_tutut_dyn'></canvas>" +
    "</div>" +
    "<div id='progression'>" +
    "    <div id='current_day'></div>" +
    "</div>" +
    "<div id='controls'>" +
    "    <div id='reset'></div>" +
    "    <div id='slower'></div>" +
    "    <div id='play'></div>" +
    "    <div id='faster'></div>" +
    "    <div id='skip'></div>" +
    "</div>" +
    "<div class='separator'></div>" +
    "<div class='page-selector'>" +
    "    <img class='arrow' id='arrow-left' src='arrow.svg' alt='' height='40px' width='40px' />" +
    "    <div class='page-number' id='page_number'>Page 0</div>" +
    "    <img class='arrow' id='arrow-right' src='arrow.svg' alt='' height='40px' width='40px' />" +
    "</div>" +
    "<table id='log_table'>" +
    "    <tr id='log_hd'>" +
    "        <th id='Id'>Id</th>" +
    "        <th id='Name'>Nom</th>" +
    "        <th id='Date'>Date</th>" +
    "        <th id='Time'>Heure</th>" +
    "        <th id='Serie'>Série</th>" +
    "    </tr>" +
    "</table>";

var html_menu =
    "<div class='title'>STUTUSTIQUES</div>" +
    "<div class='trug'>" +
    "    <span class='dropdown'>" +
    "        <button class='dropbtn' id='thread'>Accueil</button>" +
    "        <div class='dropdown-content'>" +
    "            <div id='btn0'>Accueil</div>" +
    "            <div id='btn1'>Thread 1</div>" +
    "            <div id='btn2'>Thread 2</div>" +
    "            <div id='btn3'>Thread 3</div>" +
    "            <!-- <div id='btn4'>Thread 4</div> -->" +
    "        </div>" +
    "    </span>" +
    "    <div id='refresh_div'>" +
    "        <img id='refresh' src='refresh.svg' alt='' height='20px' width='20px' margin='auto' />" +
    "    </div>" +
    "</div>" +
    "<div class='separator'></div>" +
    "<div id='message'> La page d'accueil est en cours de développement</div>";

var thread_initialized = false;

function init_thread() {
    document.body.innerHTML = "";
    document.body.innerHTML = html_thread;

    // refresh
    document.getElementById("refresh_div").onclick = function () { updatePage(glob_current_thread_id) };

    // Thread
    document.getElementById("btn1").innerHTML = threads[4567795139935838];
    document.getElementById("btn2").innerHTML = threads[100008800800648];
    document.getElementById("btn3").innerHTML = threads[100014962631116];

    document.getElementById("btn0").onclick = function () { init_home(); glob_current_thread_id = "" };
    document.getElementById("btn1").onclick = function () { init_thread(); updatePage("4567795139935838"); reset() };
    document.getElementById("btn2").onclick = function () { init_thread(); updatePage("100008800800648"); reset() };
    document.getElementById("btn3").onclick = function () { init_thread(); updatePage("100014962631116"); reset() };

    // Page management
    document.getElementById("page_number").innerHTML = "Page " + String(page);
    document.getElementById("arrow-right").onclick = function () { getData(glob_current_thread_id, pageUp) };
    document.getElementById("arrow-left").onclick = function () { getData(glob_current_thread_id, pageDown) };

    // Race controls
    document.getElementById("slower").onclick = function () { slower() };
    document.getElementById("faster").onclick = function () { faster() };
    document.getElementById("play").onclick = function () { if (playing) { pause() } else { play() } };
    document.getElementById("reset").onclick = function () { reset() };
    document.getElementById("skip").onclick = function () { skip() };

    thread_initialized = true;
}

function init_home() {
    document.body.innerHTML = "";
    document.body.innerHTML = html_menu;

    glob_current_thread_id = "";

    // refresh
    document.getElementById("refresh_div").onclick = function () { console.log("update_homepage") };

    document.getElementById("thread").innerHTML = "Acceuil";

    // Thread
    document.getElementById("btn1").innerHTML = threads[4567795139935838];
    document.getElementById("btn2").innerHTML = threads[100008800800648];
    document.getElementById("btn3").innerHTML = threads[100014962631116];

    document.getElementById("btn0").onclick = function () { init_home(); glob_current_thread_id = "" };
    document.getElementById("btn1").onclick = function () { init_thread(); glob_current_thread_id = "4567795139935838"; getData(glob_current_thread_id, populate); reset() };
    document.getElementById("btn2").onclick = function () { init_thread(); glob_current_thread_id = "100008800800648"; getData(glob_current_thread_id, populate); reset() };
    document.getElementById("btn3").onclick = function () { init_thread(); glob_current_thread_id = "100014962631116"; getData(glob_current_thread_id, populate); reset() };

    thread_initialized = false;
}
