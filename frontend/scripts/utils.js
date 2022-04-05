function getData(thread_id) {
    let content = '';
    var request = new XMLHttpRequest();
    request.open('GET', "https://tutut.popota.me/" + thread_id + ".csv", false);
    // request.open('GET', window.location.href + thread_id + '.csv', false);
    request.send(null);

    if (request.status === 200) {
        content = request.responseText;
    }
    return content;
}