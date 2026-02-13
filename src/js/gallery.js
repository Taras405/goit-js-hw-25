import { fetchPhotos } from "./services/getPhoto.js";

const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");

let currentQuery = "";
let currentPage = 1;
const PER_PAGE = 12;
let totalHits = 0;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = form.querySelector('input[name="query"]');
    const query = input.value.trim();
    if (!query) return;
    
    currentQuery = query;
    currentPage = 1;
    clearGallery(gallery);
    
    try {
        const data = await fetchPhotos(currentQuery, currentPage, PER_PAGE);
        totalHits = data.totalHits || 0;
        
        if (!data.hits || data.hits.length === 0) {
            gallery.innerHTML = `<li class="empty">No images found for "${currentQuery}"</li>`;
            return;
        }
        
        renderPhotos(gallery, data.hits);
        maybeShowLoadMore();
    } catch (err) {
        console.error(err);
        gallery.innerHTML = `<li class="error">Error loading images. Try again later.</li>`;
    }
});

function clearGallery(container) {
  container.innerHTML = "";
}

function renderPhotos(container, photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const li = document.createElement("li");
    li.className = "photo-card";

    li.innerHTML = `
      <a class="photo-link" href="${photo.largeImageURL}" target="_blank" rel="noopener noreferrer">
        <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><strong>Likes</strong> ${photo.likes}</p>
        <p><strong>Views</strong> ${photo.views}</p>
        <p><strong>Comments</strong> ${photo.comments}</p>
        <p><strong>Downloads</strong> ${photo.downloads}</p>
      </div>
    `;
    fragment.appendChild(li);
  });

  container.appendChild(fragment);
}

function maybeShowLoadMore() {
    removeLoadMoreButton();
    const loaded = currentPage * PER_PAGE;

  if (loaded < totalHits) {
    const btn = document.createElement("button");
    btn.className = "load-more";
    btn.textContent = "Load more";
    btn.addEventListener("click", loadMore);

    const li = document.createElement("li");
    li.className = "load-more-wrap";
    li.appendChild(btn);
    gallery.appendChild(li);
  }
}

function removeLoadMoreButton() {
  const existing = document.querySelector(".load-more-wrap");
  if (existing) existing.remove();
}

async function loadMore() {
  currentPage += 1;
  try {
    const data = await fetchPhotos(currentQuery, currentPage, PER_PAGE);
    renderPhotos(gallery, data.hits);
    maybeShowLoadMore();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  } catch (err) {
    console.error(err);
    alert("Error loading more images");
  }
}
