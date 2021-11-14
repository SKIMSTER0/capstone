window.addEventListener('load', function(){
    /**
     * fetch openers and ratings data in one collection data object
     * @returns {Promise<*|{ratings: (getCollectionData.ratings|*), openers: (getCollectionData.openers|*)}>}
     */
    async function getCollectionData(){
        this.getOpeners = await fetch('/capstone/collection/getOpeners');
        this.openers = await this.getOpeners.json();
        this.getRatings = await fetch("/capstone/collection/getRatings/" + userId);
        this.ratings = await this.getRatings.json();

        this.collectionData = {
            'openers' : this.openers,
            'ratings' : this.ratings
        }

        return(this.collectionData);
    }

    // from fetched collection data, initialize collection handlers
    getCollectionData().then(collectionData => {
        let openers = collectionData.openers;
        let ratings = collectionData.ratings;

        let collection = new Collection(openers, false);
        collection.generateBoards();

        //initialize rating
        ratings.forEach(function(rating){
            let ratingValue = rating['rating'];
            console.log(rating);

            if (ratingValue === '')ratingValue = 0;
            else ratingValue = parseInt(ratingValue);
            console.log(ratingValue);

            collection.setRating(parseInt(rating['pco_id']), ratingValue);
            if (parseInt(rating['favorited']) === 1) {
                collection.toggleFavorited(rating['pco_id']);
            }
        });

        //initialize click and hover logic for each opener
        $('.opener').each(function(pos, opener){
            let pieces = ($(this).attr("id"));
            let openerId = (($(this)).find($(".board"))).attr("id");
            let ratingIcons = ($(this)).find($(".icon-rating"));
            let favoritedIcon = ($(this)).find($(".icon-favorited"));

            //click and hover event handlers for each rating icon (star)
            ratingIcons.each(function(pos){
                let ratingValue = pos + 1;

                //rating will always come with favoriting
                $(this).click(function(){
                    collection.setRating(openerId, pos + 1);
                    submitRating(openerId, ratingValue, collection.statusFavorited(openerId));
                });
            });

            //click event handlers for each favorite icon (heart)
            //unfavoriting will set the assigned opener rating to null
            favoritedIcon.each(function(pos){
                $(this).click(function(){
                    let favorited = collection.toggleFavorited(openerId);

                    if (!favorited){
                        collection.setRating(openerId, null);
                        deleteRating(openerId);
                    } else {
                        submitRating(openerId, null, favorited);
                    }
                });
            })

            // search pieces query in collection
            $('#searchPCO').keyup(function() {
                let query = $(this).val();
                collection.filterBoards(query);
            });
        });
    });
});

/**
 * submit rating of user selected opening
 * @param {int} openerId
 * @param {int|null} rating value 1-5, null possible
 * @param {boolean} favorited True if favorited, False if not favorited
 */
function submitRating(openerId, rating, favorited){
    let data = JSON.stringify({
        openerId: openerId,
        rating: rating,
        favorited: favorited
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/capstone/collection/submitRating/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}

/**
 * delete rating of user selected opening
 * @param {int} openerId
 */
function deleteRating(openerId){
    let data = JSON.stringify({
        openerId: openerId,
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/capstone/collection/deleteRating/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}