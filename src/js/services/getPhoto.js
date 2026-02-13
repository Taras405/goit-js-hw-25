const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "54018062-2ce1155c5a6740a208b2c5d37";

export async function fetchPhotos(query, page = 1, per_page = 12) {
  const url = new URL(BASE_URL);
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("q", query);
  url.searchParams.set("image_type", "photo");
  url.searchParams.set("orientation", "horizontal");
  url.searchParams.set("safesearch", "true");
  url.searchParams.set("page", page);
  url.searchParams.set("per_page", per_page);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Pixabay API error: ${res.status}`);
  }
  const data = await res.json();
  return data;
}
