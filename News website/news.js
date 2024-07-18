const APIKEY="dc984ddd48274dcdba05e22aa1465559";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"));

async function fetchNews(query) {
    const res=await fetch(`${url}${query}&apikey=${APIKEY}`)
    const data=await res.json();
    console.log(data);
    bindData(data.articles);

}

function bindData(articles) {
    const cardContainer=document.getElementById("card-container");
    const newscardtemplate=document.getElementById("template-news-card");
    cardContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=newscardtemplate.content.cloneNode(true);
        filldataincard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}

function filldataincard(cardClone,article) {
    const newsimage=cardClone.querySelector('#news-image');
    const newstitle=cardClone.querySelector('#newstitle');
    const newssource=cardClone.querySelector('#news-source');
    const newsdesc=cardClone.querySelector('#news-desc');

    newsimage.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone:"Asia/Jakarta"
    });

    newssource.innerHTML=`${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_self");
    });
}

let currselectnav=null;
function onNavitemclick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currselectnav?.classList.remove('active');
    currselectnav=navItem;
    currselectnav.classList.add('active');
}

const searchbutton=document.getElementById('searchbtn');
const inputsearchtext=document.getElementById('newsSearch');

searchbutton.addEventListener('click',()=>{
    const query=inputsearchtext.value;
    if(!query) return;
    fetchNews(query);
    currselectnav?.classList.remove('active');
    currselectnav=null;
})

function reload() {
    window.location.reload();
}