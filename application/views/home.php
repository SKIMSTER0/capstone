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
    <br>
    <button type="button" class="btn btn-primary m-3" data-toggle="modal" data-target="#controls">
        See Controls
    </button>

    <div class="modal fade" id="controls" tabindex="-1" role="dialog" aria-labelledby="controlsLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="controlsLabel">Keyboard Mapping</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div>Move Left : Arrow Left</div>
              <div>Move Right : Arrow Right</div>
              <div>Rotate Clockwise : Key X</div>
              <div>Rotate Counter-Clockwise: Key Z</div>
              <div>Soft Drop : Arrow Down</div>
              <div>Hard Drop : Arrow Up</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</div>

