let search = document.getElementById("search");
let button = document.getElementById("button");
let smallSize = document.getElementById('small-size');
let mediumSize = document.getElementById('medium-size');
let largeSize = document.getElementById('large-size');
let size = '_s';


let getData = async (query) => {
    const API = "https://api.flickr.com/services/rest/";
    const KEY = "19d3e6e0acfe9c438f368e2c2bab1c5d";
    const METHOD = "flickr.photos.search";
    const FORMAT = "json&nojsoncallback=1";
    const PAGES_12 = "per_page=12";
    //const PAGES_24 = "per_page=24";
    // const PAGES_36 = "per_page=36";

    let url = `${API}?api_key=${KEY}&method=${METHOD}&${PAGES_12}&sort=relevance&format=${FORMAT}&text=${query}`;
    let response = await fetch(url, { method: "GET" });
    let data = await response.json();
    getImage(data);
    return await data;
};

button.addEventListener("click", function () {
    getData(search.value);
});

function getImage(data) {
    let render = document.getElementById("render");
        
    data.photos.photo.forEach((element) => {
        let imageItem = document.createElement("li");
        imageItem.classList.add('test')
        imageItem.innerHTML = `<img src="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}${size}.jpg"/>`;
        render.appendChild(imageItem);
    });
};

const selectElement = document.querySelector('.size');
    selectElement.addEventListener('change', (event) => {
    size = event.target.value;
});

