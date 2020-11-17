console.log('====================================');
console.log('Main.js running...');
console.log('====================================');

newDate = new Date();
y = newDate.getFullYear();
m = newDate.getMonth() + 1;
d = newDate.getDate();

//Time with AM/PM
function formatAMPM() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    document.querySelector(".time").innerHTML = strTime;
}

//Get Days
function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
        dayOfWeek
    ];
}

document.querySelector(".date").innerHTML = d;

//Get month name
var month_name = function (dt) {
    mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"
    ];
    return mlist[dt.getMonth()];
};
document.querySelector(".month").innerHTML = month_name(new Date());
document.querySelector(".year").innerHTML = y;
document.querySelector(".day").innerHTML = getDayOfWeek(new Date());
formatAMPM();
setInterval(formatAMPM, 10000);


//<<<<<<<<<<<<- Quote Show ->>>>>>>>>>>


let quotes = [

    'The best thing about a boolean is even if you are wrong, you are only off by a bit. (Anonymous)',
    'Without requirements or design, programming is the art of adding bugs to an empty text file. (Louis Srygley)',
    'Before software can be reusable it first has to be usable. (Ralph Johnson)',
    'The best method for accelerating a computer is the one that boosts it by 9.8 m/s2. (Anonymous)',
    'I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing. (Oktal)',
    'If builders built buildings the way programmers wrote programs, then the first woodpecker that came along would destroy civilization. (Gerald Weinberg)',
    'There are two ways to write error-free programs; only the third one works. (Alan J. Perlis)',
    'Ready, fire, aim: the fast approach to software development. Ready, aim, aim, aim, aim: the slow approach to software development. (Anonymous)',
    'It’s not a bug – it’s an undocumented feature. (Anonymous)',
    'One man’s crappy software is another man’s full-time job. (Jessica Gaston)',
    'A good programmer is someone who always looks both ways before crossing a one-way street. (Doug Linder)',
    'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live. (Martin Golding)',
    'Programming is like sex. One mistake and you have to support it for the rest of your life. (Michael Sinz)',
    'Deleted code is debugged code. (Jeff Sickel)',
    'Walking on water and developing software from a specification are easy if both are frozen. (Edward V Berard)',
    'If debugging is the process of removing software bugs, then programming must be the process of putting them in. (Edsger Dijkstra)',
    'Software undergoes beta testing shortly before it’s released. Beta is Latin for “still doesn’t work. (Anonymous)',
    'It’s a curious thing about our industry: not only do we not learn from our mistakes, but we also don’t learn from our successes. (Keith Braithwaite)',
    'There are only two kinds of programming languages: those people always bitch about and those nobody uses. (Bjarne Stroustrup)',
    'In order to understand recursion, one must first understand recursion. (Anonymous)',
    'The cheapest, fastest, and most reliable components are those that aren’t there. (Gordon Bell)',
    'The best performance improvement is the transition from the nonworking state to the working state. (J. Osterhout)',
    'The trouble with programmers is that you can never tell what a programmer is doing until it’s too late. (Seymour Cray)',
    'Don’t worry if it doesn’t work right. If everything did, you’d be out of a job. (Mosher’s Law of Software Engineering)'

];


// let btn=document.querySelector('.btn');
// btn.addEventListener('click', displayQuote);

function displayQuote() {
    //create an index of a random number 
    //convert it into between 0 to length of quotes[]
    let index = Math.floor(Math.random() * quotes.length);

    //display the quote of that index
    let div = document.querySelector('.quote');
    let quote = `<q> ${quotes[index]} </q>`;
    div.innerHTML = quote;

}

// Article fetch 

async function getNewsArticles(){
    
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    
    const apiKey = "56217ae0c7484c69a6663b7382fdf888";
    // const sources = "bbc-news"
    const sources = "techcrunch"
    
    const url = `http://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apiKey}`
    
    const res = await fetch(`${proxyUrl}${url}`)

    const data = await res.json();
    
    const articles = data.articles;
    
    // console.log(data);
    
    function showArticles(){

        const i = Math.floor(Math.random() * 10);
        // const i = 3;
        // console.log(articles[i]);
        document.getElementById('article-img').innerHTML = `<img src="${articles[i].urlToImage}" id="article-img">`;
        document.getElementById('article-text').innerHTML = `<p>${articles[i].description}<br><a href=${articles[i].url} target='_blank'>Read more</p>`;

    }
    showArticles();
    setInterval(showArticles, 40000)
    
}

async function getRandomImg(){
    const res = await fetch('https://source.unsplash.com/random/400x200');
    console.log(res.url);
    
    document.querySelector('.img-wrapper').innerHTML = `<img class="img-slide" src="${res.url}" alt="">`;
    // document.querySelector('.img-slide').src = res.url;
}

function changeBackground() {
    const background = localStorage.getItem('background');
    if (background === null) {
        const backgroundImages = ['bg-1.jpg','bg-2.png','bg-3.jpg','bg-4.jpg','bg-5.png','bg-6.jpg']
        var num = Math.floor(Math.random() * 6);
        console.log(num);
        var bg = backgroundImages[num];
        document.body.style.background = `url('../images/bg/${bg}')`;
        localStorage.setItem('background',bg);
    }else{
        document.body.style.background = `url('../images/bg/${background}')`;
    }
}

const bgButton = document.querySelector('#bg-btn');

bgButton.addEventListener('click', () => {
    localStorage.removeItem('background');
    changeBackground();
})

async function getCurrentWhether() {
    const key = '4bfd634c6c9a4d91ac841351201711';
    const location = 'delhi';
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`);
    const data = await res.json();
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    document.getElementById('wheather-icon').src = `${data.current.condition.icon}`;
    document.getElementById('temperature').innerText = `${data.current.temp_c}°c`;
    document.getElementById('feels-like').innerText = `feels like ${data.current.feelslike_c}°c`;
}

getCurrentWhether();
changeBackground();
displayQuote()
setInterval(displayQuote, 20000);
getNewsArticles();
// getRandomImg();
setInterval(getRandomImg,30000);