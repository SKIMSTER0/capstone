<script type="text/javascript">
    var userId = <?php echo (json_encode($userId))?>;
</script>

<div id="collectionPCO" class="m-5">
    <div id="collectionNav" class="m-3">
        <form class="form">
            <div class="form-group row w-20">
                <input type="text" class="form-control" name="searchPCO" id="searchPCO" placeholder="Opener Search (IITO)">
            </div>
        </form>
    </div>

    <div id="collectionGrid" class="d-flex flex-wrap justify-content-center">
    </div>
</div>
