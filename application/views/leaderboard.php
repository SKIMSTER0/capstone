<script type="text/javascript">
    var userId = <?= json_encode($userId) ?>;
</script>

<div class='my-3 mx-auto py-3 px-3 text-center bg-secondary'>
    <h3>Leaderboard</h3>
    <table id="leaderboard" class="table cell-border compact stripe order-column">
        <thead>
            <tr>
                <th>Player</th>
                <th>PCO Count</th>
                <th>Score</th>
                <th>Game Time</th>
                <th>Date Submitted</th>
            </tr>
        </thead>
    </table>
</div>

