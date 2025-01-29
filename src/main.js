import "./js/init";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const searchButton = document.querySelector(".search-button");
const moreButton = document.querySelector(".more-button");
const list = document.querySelector(".gallery");
let page = 1;

async function fetchData(page) {
  const apiKey = "48318006-868fd1918e5aa19d98c3706e2";
  const searchText = document.querySelector("#searchInput").value.trim();

  if (!searchText) {
    iziToast.warning({
      message: "Please enter a search term!",
      position: "topRight",
    });
    return null;
  }

  const searchParams = new URLSearchParams({
    q: searchText,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: "40",
    page: page,
  });

  const searchUrlAdress = `https://pixabay.com/api/?key=${apiKey}&${searchParams}`;

  try {
    const response = await axios.get(searchUrlAdress);
    const data = response.data;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return null;
    }

    return data;
  } catch (error) {
    iziToast.error({
      message: "Failed to fetch data. Please check your internet connection.",
      position: "topRight",
    });
    return null;
  }
}

function renderData(data) {
  const markup = data.hits
    .map((image) => {
      return `
             <a href="${image.largeImageURL}" class="image-card">
                 <img src="${image.webformatURL}" alt="${image.tags}" />
                 <div class="image-info">
                   <div class="likes">
                     <p class="likes-text">Likes</p>
                     <p class="likes-count">${image.likes}</p>
                   </div>
                   <div class="views">
                     <p class="views-text">Views</p>
                     <p class="views-count">${image.views}</p>
                   </div>
                   <div class="comments">
                     <p class="comments-text">Comments</p>
                     <p class="comments-count">${image.comments}</p>
                   </div>
                   <div class="downloads">
                     <p class="downloads-text">Downloads</p>
                     <p class="downloads-count">${image.downloads}</p>
                   </div>
                 </div>
               </a>
          `;
    })
    .join("");
  list.innerHTML = markup;
  lightbox.refresh();
}

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const loader = document.querySelector(".loader");
  page = 1;
  list.innerHTML = "";
  loader.style.display = "flex";

  try {
    const data = await fetchData(page);
    if (data) {
      renderData(data);
      page += 1;
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong! Please try again.",
      position: "topRight",
    });
  } finally {
    loader.style.display = "none";
  }
});
