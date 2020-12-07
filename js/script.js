let search = document.getElementById('search')
let button = document.getElementById('button')

let getData = async (query) => {
    const API = "https://api.flickr.com/services/rest/";
    const KEY = "19d3e6e0acfe9c438f368e2c2bab1c5d";
    const METHOD = "flickr.photos.search";
    const FORMAT = "json&nojsoncallback=1";
    let url = `${API}?api_key=${KEY}&method=${METHOD}&per_page=5&format=${FORMAT}&text=${query}`;
    let response = await fetch(url, { method: "GET" });
    let data = await response.json();
    console.log(data.photos.photo)
    getImage(data)
    return await data
};

button.addEventListener('click', function() {
    getData(search.value)
});
