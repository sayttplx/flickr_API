
// GLOBAL VARIABLES FOR ID'S
const search = document.getElementById("search");
const searchButton = document.getElementById("button");
const resetRender = document.getElementById('render');
const renderList = document.querySelector(".render-list")
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const pages = document.getElementById('pages');

// SOME GLOBAL VALUES AND ARREYS
let list = new Array();
let pageList = new Array();
let currentPage = 1;
let numberOfPages = 1;
const numberPerPage = 10;  


// FETCH FUNCTION WITH SOME VARIABLES FOR THE URL AND RESETS THE ARREYS AND PAGE WHEN SEARCHING FOR SOMETHING ELSE
let getData = async (query) => {
    const API = "https://api.flickr.com/services/rest/";
    const KEY = "19d3e6e0acfe9c438f368e2c2bab1c5d";
    const METHOD = "flickr.photos.search";
    const FORMAT = "json&nojsoncallback=1";
    let   PAGES_12 = "per_page=32";
    // const PAGES_24 = "per_page=24";
    // const PAGES_36 = "per_page=36";
    list = new Array();
    pageList = new Array();
    currentPage = 1;
    resetRender.innerHTML = '';
    const url = `${API}?api_key=${KEY}&method=${METHOD}&${PAGES_12}&sort=relevance&format=${FORMAT}&text=${query}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    getImage(data);
    load();
    return await data;
};

// HERE WE GET THE VALUE FROM THE INPUT AND SENDS IT TO THE FETCH SO WE GET WHAT WE WANT
// ALSO WE EMPTY THE INNERHTML SO WE CAN GET OUR NEW RENDER
searchButton.addEventListener('click', () => {
    resetRender.innerHTML = '';
    getData(search.value);
});

document.getElementById('test').addEventListener('click', () => {
console.log(pageList)
});

// HERE WE RENDER OUR ARREY WITH IMG'S
function drawList() {
    resetRender.innerHTML = '';
    for (x = 0; x < pageList.length; x++) {
        renderList.innerHTML += `<li>${pageList[x]}</li>`;
    }
    
}


// WE MAKE A LOOP AND USE THE ARREY METHOD PUSH TO GET OUR DATA INSIDE THE NEW ARREY.
function getImage(data) {
    data.photos.photo.forEach( (element) => {
        let imageItem = renderList;
        imageItem.innerHTML = `<img id="light" src="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg"/>`;
        list.push(imageItem.innerHTML);
    });
};


function makeList() {
    numberOfPages = getNumberOfPages();
}

function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function loadList() {
    let start = ((currentPage - 1) * numberPerPage);
    let end = start + numberPerPage;

    pageList = list.slice(start, end);
    drawList();
    check();
}

function check() {
    next.disabled = currentPage == numberOfPages ? true : false;
    previous.disabled = currentPage == 1 ? true : false;
}


next.addEventListener('click', () => {
    nextPage();
})
previous.addEventListener('click', () => {
    previousPage();
})

function load() {
    makeList();
    loadList();
}
