<script type="text/javascript">
    var userId = <?= json_encode($userId) ?>;
</script>

<div class='my-3 mx-auto py-3 text-center bg-secondary'>
    <h3> <?= $_SESSION['username']?> </h3>
    <div class="container">
        <div class="row">
            <div class="col-sm text-right">
                <p>Leaderboard Rank:</p>
            </div>
            <div class="col-sm text-left">
                <span id="leaderboardRank">
                    <?= $leaderboardRank ?>
                </span>
            </div>
        </div>

        <div class="row">
            <div class="col-sm text-right">
                <p>Most Consecutive PCs:</p>
            </div>
            <div class="col-sm text-left">
                <span id="pcoCount">
                    <?= $pcoCount ?>
                </span>
            </div>
        </div>

        <div class="row">
            <div class="col-sm text-right">
                <p>Best PCO Score:</p>
            </div>
            <div class="col-sm text-left">
                <span id="pcoScore">
                    <?= $score ?>
                </span>
            </div>
        </div>
    </div>
</div>

<div class='my-3 mx-auto py-3 text-center bg-secondary'>
    <h3>Recent Games</h3>
    <div class="mx-3 w-50 mx-auto">
        <table id="leaderboard" class="table cell-border compact stripe order-column">
            <thead>
            <tr>
                <th>Player</th>
                <th>PCO Count</th>
                <th>Score</th>
            </tr>
            </thead>
        </table>
    </div>
</div>

<div class='my-3 mx-auto py-3 text-center bg-secondary'>
    <h3>Favorited Openers</h3>
    <div id="collectionGrid" class="d-flex flex-wrap justify-content-center">
    </div>
</div>
