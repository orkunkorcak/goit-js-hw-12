import{S as m,i,a as y}from"./assets/vendor-BJlxXftY.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();window.global||(window.global=window);const g=new m(".gallery a",{captionsData:"alt",captionDelay:250}),w=document.querySelector(".search-button"),l=document.querySelector(".more-button"),d=document.querySelector(".gallery"),u=document.querySelector(".loader");let c=1,p=0;async function f(r){const t="48318006-868fd1918e5aa19d98c3706e2",s=document.querySelector("#searchInput").value.trim();if(!s)return i.warning({message:"Please enter a search term!",position:"topRight"}),null;const n=new URLSearchParams({q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"40",page:r}),e=`https://pixabay.com/api/?key=${t}&${n}`;try{const a=(await y.get(e)).data;return!a.hits||a.hits.length===0?(i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),null):(p=a.totalHits,a)}catch{return i.error({message:"Failed to fetch data. Please check your internet connection.",position:"topRight"}),null}}function h(r){const t=r.hits.map(s=>`
             <a href="${s.largeImageURL}" class="image-card">
                 <img src="${s.webformatURL}" alt="${s.tags}" />
                 <div class="image-info">
                   <div class="likes">
                     <p class="likes-text">Likes</p>
                     <p class="likes-count">${s.likes}</p>
                   </div>
                   <div class="views">
                     <p class="views-text">Views</p>
                     <p class="views-count">${s.views}</p>
                   </div>
                   <div class="comments">
                     <p class="comments-text">Comments</p>
                     <p class="comments-count">${s.comments}</p>
                   </div>
                   <div class="downloads">
                     <p class="downloads-text">Downloads</p>
                     <p class="downloads-count">${s.downloads}</p>
                   </div>
                 </div>
               </a>
          `).join("");d.insertAdjacentHTML("beforeend",t),g.refresh()}w.addEventListener("click",async r=>{r.preventDefault(),c=1,d.innerHTML="",u.style.display="flex",l.style.display="none";try{const t=await f(c);t&&(h(t),c+=1,p>40&&(l.style.display="flex"))}catch{i.error({message:"Something went wrong! Please try again.",position:"topRight"})}finally{u.style.display="none"}});l.addEventListener("click",async r=>{if(r.preventDefault(),(c-1)*40>=p){i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),l.style.display="none";return}try{const t=await f(c);if(t){const s=d.lastElementChild;if(h(t),c+=1,s){const{height:n}=s.getBoundingClientRect();window.scrollBy({top:n*2,behavior:"smooth"})}}}catch{i.error({message:"Something went wrong! Please try again.",position:"topRight"})}});
//# sourceMappingURL=index.js.map
