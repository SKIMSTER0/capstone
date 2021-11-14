//individual element in collection of opener
class CollectionBoard {
    constructor(opener, collectionGrid, minified){
        this.opener = opener
        this.minified = minified;

        // construct each board element in collection
        let openerElement = document.createElement('div');
        openerElement.className = "opener bg-light m-3";
        openerElement.id = opener["pieces"];
        collectionGrid.appendChild(openerElement);

        let openerTitle = document.createElement('h5');
        openerTitle.innerHTML = opener["pieces"];
        openerElement.appendChild(openerTitle);

        let boardElement = document.createElement('canvas');
        boardElement.id = opener["pco_id"];
        boardElement.className = "board m-3";
        openerElement.appendChild(boardElement);

        // minified collection does not contain ratings/favorites
        if (!this.minified){
            let ratingElement = document.createElement('div');
            ratingElement.id = "ratingOpener" + opener["pco_id"];
            ratingElement.className = 'rating bg-light';

            for(let i = 1; i <= 5; i++){
                ratingElement.innerHTML = ratingElement.innerHTML +
                    "<span id=icon-rating-" + i + " class='icon-rating fa fa-star text-decoration-none'></span>";
            }
            openerElement.appendChild(ratingElement);

            let favoritedElement = document.createElement('div');
            favoritedElement.id = "favoritedOpener" + opener["pco_id"];
            favoritedElement.className = "favoritedOpener";
            favoritedElement.innerHTML = "<span id=icon-favorited-" + opener["pco_id"] + " class='icon-favorited fa fa-heart text-decoration-none'></a>";
            openerElement.appendChild(favoritedElement);
        }

        // canvas graphics config
        this.canvas = document.getElementById(opener["pco_id"]);
        this.context = this.canvas.getContext('2d');

        // minified collection has reduced block size
        if (minified) this.BLOCK_SIZE = BLOCK_SIZE_COLLECTION_MINIFIED;
        else this.BLOCK_SIZE = BLOCK_SIZE_COLLECTION;

        this.context.canvas.width = COLS * this.BLOCK_SIZE;
        this.context.canvas.height = ROWS_TRUNCATED * this.BLOCK_SIZE;
        this.context.fillStyle = '#000000';
        this.context.strokeStyle = '#000000';
        this.context.fillRect(0,0, this.context.canvas.width, this.context.canvas.height);
    }

    /**
     * draws the opener on the canvas
     */
    render(){
        let index = 0;
        for (let row = 0; row < ROWS_TRUNCATED; row++){
            for (let col = 0; col < COLS; col++){
                this.context.fillStyle = PIECE_COLORS[PIECE_VALUE[this.opener["opener_data"].charAt(index)]];
                this.context.fillRect(col * this.BLOCK_SIZE, row * this.BLOCK_SIZE, this.BLOCK_SIZE, this.BLOCK_SIZE);

                index++;
            }
        }
    }
}

/**
 * collection of opener boards
 */
class Collection{
    constructor(openers, minified){
        this.collectionPCO = document.getElementById('collectionPCO');
        this.collectionNav = document.getElementById('collectionNav');
        this.collectionGrid = document.getElementById('collectionGrid');

        this.openers = openers
        this.searchQuery = "";
        this.minified = minified;
    }

    /**
     * draw grid of opening boards, along with rating and favorite features
     */
    generateBoards(){
        this.openers.forEach(opener => {
            let board = new CollectionBoard(opener, this.collectionGrid, this.minified);
            board.render();
        });
    }

    /**
     * filter boards in collection according to whether opener pieces found in search query
     * @param {string} searchQuery
     */
    filterBoards(searchQuery){
        $('.opener').each(function(pos, opener){
            let pieces = ($(this).attr("id"));
            if (pieces.indexOf(searchQuery.toUpperCase()) >= 0) {
                $(this).removeClass("d-none");
            } else {
                $(this).addClass("d-none");
            }
        });
    }

    /**
     * set the rating value of previous rated openers
     * @param {int} openerId id of opener
     * @param {int|null} ratingValue rating value 1-5, null possible
     */
    setRating(openerId, ratingValue){
        let rating = $('#ratingOpener' + openerId);
        let ratingIcons = rating.find($('.icon-rating'));

        if (ratingValue === null) ratingValue = 0;
        ratingIcons.each(function(pos){
            if (parseInt(ratingValue) < pos + 1){
                $(this).removeClass("text-warning");
            } else {
                $(this).addClass("text-warning");
            }
        });
    }

    /**
     * toggle favorited on opener
     * @param {int} openerId opener to toggle favorited
     * @returns {boolean} whether current state of opener is favorited or not (POST TOGGLE)
     */
    toggleFavorited(openerId){
        let favoritedIcon = $('#icon-favorited-' + openerId.toString());

        if (this.statusFavorited(openerId)){
            favoritedIcon.removeClass("text-danger");
            favoritedIcon.removeClass("favorited");
            return false;
        } else {
            favoritedIcon.addClass("text-danger");
            favoritedIcon.addClass("favorited");
            return true;
        }
    }

    /**
     * check favorited status of opener
     * @param {int} openerId
     * @returns {boolean}
     */
    statusFavorited(openerId){
        let favoritedIcon = $('#icon-favorited-' + openerId.toString());
        let classes = favoritedIcon[0].className.split(/\s+/);
        return (classes.includes('favorited'));
    }
}