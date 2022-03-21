async function fetchText() {
    let response = await fetch('http://86.75.156.96/tmp.txt');
    let data = await response.text();
    return data;
}

var text;

let data = fetchText();
data.then(log);

function log(data) {
    // Assign data to html divs
    var lines = data.split("\n");
    lines = lines.slice(-10);
    lines = lines.reverse();
    console.log(lines);
}