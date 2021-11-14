window.addEventListener('load', function(){
    //load google statistics chart generator api
    google.charts.load('current', {packages: ['corechart, table, bar, calendar'], 'callback': drawCharts});
});

/**
 * draw all statistics on page
 */
function drawCharts(){
    drawFavorited();
    drawPlayHistory();
}

/**
 * render statistics chart calendar for scoring occuring each day
 */
function drawPlayHistory(){
    makeXHRRequest("GET", '/capstone/admin/getPlayHistory')
        .then(function(e) {
            let playHistory = JSON.parse(e.target.response);

            //initialize chart
            chartElement = document.getElementById('chartPlayHistory');
            let chart = new google.visualization.Calendar(chartElement);
            let data = new google.visualization.arrayToDataTable([]);
            let options = {
                title: 'Live Play history Scoring',
                hAxis: {title: 'Day Played'},
                vAxis: {title: 'Games Played'},
                showRowNumber: true,
                width: '100%',
                height: '100%',
                calendar: {
                    cellSize: 19,
                    cellColor: {
                        stroke: '#76a7fa',
                        strokeOpacity: 0.5,
                        strokeWidth: 1,
                    },
                    dayOfWeekLabel:{
                        color: '#000000'
                    },
                    monthLabel: {
                        color: '#000000'
                    },
                    yearLabel: {
                        color: '#000000'
                    },
                    monthOutlineColor: {
                        stroke: '#00008B',
                        strokeOpacity: 0.8,
                        strokeWidth: 2
                    },
                    unusedMonthOutlineColor: {
                        stroke: '#00008B',
                        strokeOpacity: 0.4,
                        strokeWidth: 1
                    },
                },
                colorAxis: {
                    colors:  ['#00FF00', '#FF0000']
                },
            }
            data.addColumn('date', 'Date Played');
            data.addColumn('number', 'Game Score');

            //populate chart
            playHistory.forEach((playHistory) => {
                data.addRow([
                    new Date(playHistory['dateSubmitted']),
                    parseInt(playHistory['score'])
                ]);
            });
            chart.draw(data, options);
        }, function(e) {
            console.log("Request failed: " + e.message);
            chartElement.html("Could not retrieve data for chart");
        });
}

/**
 * render statistics chart for counting favorited openers
 */
function drawFavorited(){
    makeXHRRequest("GET", '/capstone/admin/getFavoritedCount')
        .then(function(e) {
            let openers = JSON.parse(e.target.response);

            //initialize chart
            chartElement = document.getElementById('chartFavorited');
            let chart = new google.visualization.ColumnChart(chartElement);
            let options = {
                title: 'Frequency of Favorited Openers',
                hAxis: {title: 'Opener'},
                vAxis: {title: 'Favorited Count'},
                showRowNumber: true,
                width: '100%',
                height: '100%'
            }
            let data = new google.visualization.arrayToDataTable([]);
            data.addColumn('string', 'Opener');
            data.addColumn('number', 'Favorited Count');

            //populate chart
            openers.forEach((opener) => {
                data.addRow([
                    opener['pieces'],
                    parseInt(opener['favoritedCount']),
                ]);
            });

            chart.draw(data, options);
        }, function(e) {
            console.log("Request failed: " + e.message);
            chartElement.html("Could not retrieve data for chart");
        });
}