window.addEventListener('load', function(){
   let openersSource = "/capstone/collection/getFavorited/" + userId;

    makeXHRRequest("GET", openersSource)
        .then(function(e) {
            let openers = JSON.parse(e.target.response);

            let collection = new Collection(openers, true);
            collection.generateBoards();
        }, function(e) {
            console.log("Request failed: " + e.message);
        });
});