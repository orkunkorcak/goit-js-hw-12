import "./js/init";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

console.log(axios.isCancel("something"));

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchText = document.querySelector("#searchInput").value;
  const loader = document.querySelector(".loader");

  const apiKey = "48318006-868fd1918e5aa19d98c3706e2";
  const searchParams = new URLSearchParams({
    q: searchText,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
  });
  searchParams.q = searchText;
  loader.style.display = "flex";
  fetch(`https://pixabay.com/api/?key=${apiKey}&${searchParams.toString()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      loader.style.display = "none";
      const list = document.querySelector(".gallery");
      list.innerHTML = "";
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
      if (data.hits.length === 0) {
        return iziToast.error({
          message:
            "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
        });
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      iziToast.error({
        message: "Something went wrong! Please try again.",
        position: "topRight",
      });
      console.error("API request error:", error);
    });
});
