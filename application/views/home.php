<script type="text/javascript">
    var openers = <?php echo (json_encode($openers)) ?>;
</script>

<div id="game" class="container my-3">
    <div class="row">
        <div class="col d-flex align-items-end flex-column-reverse py-2">
            <div class="bg-secondary w-50 pt-2" id="gameInfo">
                <p id="gameTime">Time :</p>
                <p id="gamePcoCount">#PCO :</p>
                <p id="gameScore">Score :</p>
            </div>
        </div>
        <div class="col-sm-auto px-0">
            <canvas class="" id="board"></canvas>
        </div>
        <div class="col text-left">
            <div class="short-div">
                <canvas class="forecast" id="forecast1"></canvas>
            </div>
            <div class="short-div">
                <canvas class="forecast" id="forecast2"></canvas>
            </div>
            <div class="short-div">
                <canvas class="forecast" id="forecast3"></canvas>
            </div>
            <div class="short-div">
                <canvas class="forecast" id="forecast4"></canvas>
            </div>
            <div class="short-div">
                <canvas class="forecast" id="forecast5"></canvas>
            </div>
        </div>
    </div>

    <br>
    <button class="btn btn-success" id="guideButton">Show PCO Guide</button>
</div>

