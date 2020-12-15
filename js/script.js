// GLOBAL VARIABLES FOR ID'S
const search = document.getElementById('search');
const searchButton = document.getElementById('button');
const resetRender = document.getElementById('render');
const renderList = document.querySelector('.render-list')
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const pages = document.getElementById('pages');
const black = document.getElementById('black');
const coral = document.getElementById('coral');
const white = document.getElementById('white');

// SOME GLOBAL VALUES AND ARREYS
let list = new Array();
let pageList = new Array();
let borderChoosen = 'borderBlack'
let currentPage = 1;
let numberOfPages = 1;
const numberPerPage = 12;

// FETCH FUNCTION WITH SOME VARIABLES FOR THE URL AND RESETS THE ARREYS AND PAGE WHEN SEARCHING FOR SOMETHING ELSE
let getData = async (query) => {
    const API = 'https://api.flickr.com/services/rest/';
    const KEY = '19d3e6e0acfe9c438f368e2c2bab1c5d';
    const METHOD = 'flickr.photos.search';
    const FORMAT = 'json&nojsoncallback=1';
    let PAGE = 'per_page=';

    currentPage = 1;
    list = new Array();
    pageList = new Array();
    resetRend();
    const url = `${API}?api_key=${KEY}&method=${METHOD}&${PAGE}${getNumberOfImages()}&sort=relevance&format=${FORMAT}&text=${query}`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    getImage(data);
    load();
    return await data;
};

// HERE WE GET THE VALUE FROM THE INPUT AND SENDS IT TO THE FETCH SO WE GET WHAT WE WANT
// ALSO WE EMPTY THE INNERHTML SO WE CAN GET OUR NEW RENDER
searchButton.addEventListener('click', (e) => {
    if (search.value == '') {
        alert('please type something ffs ^_^')
    } else {
        e.preventDefault();
        resetRend();
        getData(search.value);
    }
});

// HERE WE RENDER OUR ARREY WITH IMG'S AND CALL FOR OUR LIGHTBOX FUNCTION
function drawList() {
    resetRender.innerHTML = '';
    for (x = 0; x < pageList.length; x++) {
        renderList.innerHTML += `<li>${pageList[x]}</li>`;
    }

    lightboxFunction();
};

// WE MAKE A LOOP AND USE THE ARREY METHOD PUSH TO GET OUR DATA INSIDE THE NEW ARREY.
function getImage(data) {
    data.photos.photo.forEach((element) => {
        let imageItem = renderList;
        imageItem.innerHTML = `<img id='light' src="https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg"/>`;
        list.push(imageItem.innerHTML);
    });
};

// DECLARE A VARIABLE THATS GONNA BE OUR LIGHTBOX CONTAINER
// WE GIVE THE NEW ELEMENT A ID
// WE APPEND THAT DIV TO THE BOTTOM OF THE BODY IN THE HTML
// WE MAKE AN VARIABLE TO GRAB ALL THE STUFF WITH THE ID #LIGHT
// FOR EACH LOOP, ADDS EVENTLISTNER, TOGGLE CLASS WITH "ACTIVE"
// WE USE SOME SHENANIGANS TO GET THE IMG.SRC INTO AN NEW IMG INSIDE THE DIV
// USE A WHILE LOOP TO REMOVE THE OLD CHILD WHEN CLICKING ON A NEW CHILD
function lightboxFunction() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    const images = document.querySelectorAll('#light')
    images.forEach((image) => {
        image.addEventListener('click', function () {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.classList.add(borderChoosen);
            img.src = image.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        })
    })
    // HERE WE USE AN EVENTLISTNER WITH IF STATEMENT THAT CHECKS THAT THE TWO ARE NOT THE SAME 
    lightbox.addEventListener('click', (event) => {

        if (event.target !== event.currentTarget) return;
        lightbox.classList.remove('active');
    })
};

function makeList() {
    numberOfPages = getNumberOfPages();
}

// HERE WE GET THE NUMBER OF PAGES
// CEIL ROUNDS IT UP TO ITS CLOSEST INTEGER. 
function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

// NEXT PAGE, ADDS ONE TO THE VARIABLE CURRENTPAGE
function nextPage() {
    currentPage += 1;
    loadList();
}

//PREVIOUS PAGE, REMOVES ONE FROM THE VARIABLE CURRENTPAGE
function previousPage() {
    currentPage -= 1;
    loadList();
}

// SLICE THE PAGELIST INTO DIFFRENT PAGES
function loadList() {
    let start = ((currentPage - 1) * numberPerPage);
    let end = start + numberPerPage;
    pageList = list.slice(start, end);
    drawList();
    check();
}

// TERNARY OPERATOR SHORTCUT FOR IF STATEMENT. TRUTHY OR FALSY
function check() {
    next.disabled = currentPage === numberOfPages ? true : false;
    previous.disabled = currentPage === 1 ? true : false;
}

next.addEventListener('click', () => {
    nextPage();
});

previous.addEventListener('click', () => {
    previousPage();
});

function load() {
    makeList();
    loadList();
}

// SELECTINDEX FOR THE DROPDOWN MENU. WITH IF STATEMENT TO GET VALUE OF HOW MANY IMAGES WE WANNA GET
function getNumberOfImages() {
    let select = document.getElementById('number-images');
    if (select.options[select.selectedIndex].value == 12) {
        return 12;
    } else if (select.options[select.selectedIndex].value == 24) {
        return 24;
    } else if (select.options[select.selectedIndex].value == 36) {
        return 36;
    } else if (select.options[select.selectedIndex].value == 48) {
        return 48;
    } else {
        return 12;
    }
};

// EMPTY THE RENDER
function resetRend() {
    resetRender.innerHTML = '';
}

// JQUERY METHOD CSS() STYLE SELECTED ELEMENT
function borderColorCoral() {
    $('img').css('border-color', 'rgb(249, 154, 154)');
};

function borderColorWhite() {
    $('img').css('border-color', 'rgb(255, 255, 255)');
};

function borderColorBlack() {
    $('img').css('border-color', 'rgb(17, 17, 17)');
};


// CHANGES THE BORDER COLOR EVENTLISTNER
black.addEventListener('click', function () {
    borderColorBlack();
    borderChoosen = 'borderBlack';
});

coral.addEventListener('click', function () {
    borderColorCoral();
    borderChoosen = 'borderCoral';
});

white.addEventListener('click', function () {
    borderColorWhite();
    borderChoosen = 'borderWhite';
});
