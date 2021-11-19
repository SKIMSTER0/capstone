window.addEventListener('load', function(){
    let tableSource = "/capstone/leaderboard/getLeaderboardUser/" + userId;

    //create xhr request to retrieve leaderboard data
    makeXHRRequest("GET", tableSource)
        .then(function(e) {
            let leaderboardData = JSON.parse(e.target.response);

            //populate and render leaderboard
            let leaderboard = new DataTable('#leaderboard', {
                columns: [
                    {data: "username"},
                    {data: "pco_count"},
                    {data: "score"},
                    {data: "game_time"},
                    {data: "date_submitted"},
                ]
            });

            leaderboardData.forEach(function(entry) {
                leaderboard.row.add(entry);
            });
            leaderboard.draw();
        }, function(e) {
            console.log("Request failed: " + e.message);
        });
});