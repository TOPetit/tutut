fetch('http://86.75.156.96/tmp.txt')
    .then(response => response.text())
    .then(data => {
        // Do something with your data
        console.log(data);
    });