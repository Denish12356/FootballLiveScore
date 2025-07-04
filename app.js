function getData() {
    fetch("https://v3.football.api-sports.io/fixtures?live=all", {
        "method" : "GET",
        "headers" : {
             "x-rapidapi-host": "v3.football.api-sports.io",
             "x-rapidapi-key": "3ba267193dmsh0c451caadd593acp1509aajsne2b10c6fd427"
        }
})
   .then(response => response.json().then(data =>{
    const matchesList = data['resopnse'];
    const fixture = matchesList[0]['fixture'];
   }))
}

getData();