async function e(t,r=1,a=12){let o=new URL("https://pixabay.com/api/");o.searchParams.set("key","54018062-2ce1155c5a6740a208b2c5d37"),o.searchParams.set("q",t),o.searchParams.set("image_type","photo"),o.searchParams.set("orientation","horizontal"),o.searchParams.set("safesearch","true"),o.searchParams.set("page",r),o.searchParams.set("per_page",a);let n=await fetch(o.toString());if(!n.ok)throw Error(`Pixabay API error: ${n.status}`);return await n.json()}let t=document.getElementById("search-form"),r=document.querySelector(".gallery"),a="",o=1,n=0;function s(e,t){let r=document.createDocumentFragment();t.forEach(e=>{let t=document.createElement("li");t.className="photo-card",t.innerHTML=`
      <a class="photo-link" href="${e.largeImageURL}" target="_blank" rel="noopener noreferrer">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><strong>Likes</strong> ${e.likes}</p>
        <p><strong>Views</strong> ${e.views}</p>
        <p><strong>Comments</strong> ${e.comments}</p>
        <p><strong>Downloads</strong> ${e.downloads}</p>
      </div>
    `,r.appendChild(t)}),e.appendChild(r)}function l(){let e;if((e=document.querySelector(".load-more-wrap"))&&e.remove(),12*o<n){let e=document.createElement("button");e.className="load-more",e.textContent="Load more",e.addEventListener("click",i);let t=document.createElement("li");t.className="load-more-wrap",t.appendChild(e),r.appendChild(t)}}async function i(){o+=1;try{let t=await e(a,o,12);s(r,t.hits),l(),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}catch(e){console.error(e),alert("Error loading more images")}}t.addEventListener("submit",async i=>{i.preventDefault();let c=t.querySelector('input[name="query"]').value.trim();if(c){a=c,o=1,r.innerHTML="";try{let t=await e(a,o,12);if(n=t.totalHits||0,!t.hits||0===t.hits.length){r.innerHTML=`<li class="empty">No images found for "${a}"</li>`;return}s(r,t.hits),l()}catch(e){console.error(e),r.innerHTML='<li class="error">Error loading images. Try again later.</li>'}}});
//# sourceMappingURL=goit-js-hw-25.a20cb06f.js.map
