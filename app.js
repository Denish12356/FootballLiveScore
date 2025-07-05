const elapsedTime = document.querySelector('#elapsed');
const homeTeamLogo = document.querySelector('#homeLogo');
const homeTeamName = document.querySelector('#homeTeam');
const awayTeamLogo = document.querySelector('#awayLogo');
const awayTeamName = document.querySelector('#awayTeam');
const lastMatchGoals = document.querySelector('#goals');
const matchTable = document.querySelector('#matchTable');

const addMatchTile = (data) => {
    const matchTile = document.createElement('div');
    matchTile.classList.add('match-tile');

    const homeTeam = document.createElement('div');
    homeTeam.classList.add('team');

    const homeLogo = document.createElement('img');
    const homeName = document.createElement('p');
    homeLogo.src = data.teams.home.logo;
    homeName.innerText = data.teams.home.name;

    const awayTeam = document.createElement('div');
    awayTeam.classList.add('team');

    const awayLogo = document.createElement('img');
    const awayName = document.createElement('p');
    awayLogo.src = data.teams.away.logo;
    awayName.innerText = data.teams.away.name;

    homeTeam.appendChild(homeLogo);
    homeTeam.appendChild(homeName);

    awayTeam.appendChild(awayLogo);
    awayTeam.appendChild(awayName);

    const score = document.createElement('p');
    score.innerText = data.goals.home + " : " + data.goals.away;

    matchTile.appendChild(homeTeam);
    matchTile.appendChild(score);
    matchTile.appendChild(awayTeam);
    matchTable.appendChild(matchTile);
}

function getData() {
    fetch("https://v3.football.api-sports.io/fixtures?live=all", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "f58055c66e20f6477df439062584aa47"
        }
    })
        .then(response => response.json().then(data => {
            const matchesList = data.response;
            const fixture = matchesList[0].fixture;
            const goals = matchesList[0].goals;
            const teams = matchesList[0].teams;

            elapsedTime.innerText = fixture.status.elapsed + "'";
            homeTeamLogo.src = teams.home.logo;
            homeTeamName.innerText = teams.home.name;
            awayTeamLogo.src = teams.away.logo;
            awayTeamName.innerText = teams.away.name;
            lastMatchGoals.innerText= goals.home + " : " + goals.away;

            for(let i =1; i<matchesList.length;i++){
                addMatchTile(matchesList[i]);
            }
        }))
        .catch(err => {
            console.log(err);
        })
}
getData();

// const getData = async () => {
//     try {
//         const config = { headers: { "x-rapidapi-host": "v3.football.api-sports.io", "x-rapidapi-key": "f58055c66e20f6477df439062584aa47" } }
//         const res = await axios.get('https://v3.football.api-sports.io/fixtures?live=all', config);
//         const matchesList = res.data;
//         const fixture = matchesList[0].fixture;
//         const goals = matchesList[0].goals;
//         const teams = matchesList[0].teams;
//         console.log(fixture, goals, teams);
//     } catch (error) {
//         console.log("Error fetching live football data:", error);
//     }
// }