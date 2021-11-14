/**
 * create XHR promise-based request to specified url
 * @param {"GET"|"POST"} method "GET" or "POST" supported
 * @param {string} url sending xhr request to
 * @returns {Promise<resolve, reject>} async function to fulfill request
 */
function makeXHRRequest(method, url){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = resolve;
        xhr.onerror = reject;

        xhr.send();
    });
}