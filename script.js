// let testing = document.querySelector('#testing')
// console.log(testing)

// // testing.className = "modeChanger text-red manshi changemode sakshi"

// testing.classList.add('bg-black')
// testing.classList.add('font-bold')

// testing.classList.remove('manshi')

// console.log(testing.classList.contains('bg-black'))

// testing.classList.replace('text-red', 'text-blue')
// testing.classList.toggle('shyam')
// testing.classList.toggle('text-blue')

let body = document.querySelector("body");

let changemodeBtn = document.querySelector(".changemode");

changemodeBtn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    // body.classList.remove('light')
    // body.classList.add('dark')
    body.classList.replace("light", "dark");
    changemodeBtn.innerHTML = ` <i class="fa-regular fa-sun"></i>
                <span>Light Mode</span>`;
  } else {
    // body.classList.remove('dark')
    // body.classList.add('light')
    body.classList.replace("dark", "light");
    changemodeBtn.innerHTML = ` <i class="fa-regular fa-moon"></i>
                <span>Dark Mode</span>`;
  }
});

let toparrow = document.querySelector(".toparrow");

toparrow.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

let allCountry = [];

async function fetchCountryData() {
  let res = await fetch(
    "https://backend-projects-bqbd.onrender.com/api.restcountry/v3/all"
  );
  let data = await res.json();
  allCountry = data.results;
  displayCountry(data.results);
}

window.addEventListener("load", fetchCountryData);

const totalItems = 16;
let page = 1;
let totalPage;
let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");

prevBtn.disabled = true;

function displayCountry(country) {
  totalPage = Math.ceil(allCountry.length / totalItems);

  let startIndex = (page - 1) * totalItems;
  let endIndex = page * totalItems;

  let newContry = country.slice(startIndex, endIndex);

  console.log(country);
  let container = document.querySelector(".container");
  container.innerHTML = "";
  newContry.forEach((element) => {
    let divTag = document.createElement("div");
    divTag.classList.add("card");
    divTag.innerHTML = ` <div><img src="${element.flags.png}" alt="loading..."></div>
                <h1>${element.name.common}</h1>
                <p>Population: <span>${element.population}</span></p>
                <p>Region: <span>${element.region}</span></p>
                <p>Capital: <span>${element.capital}</span></p>`;

    container.append(divTag);
  });
}

nextBtn.addEventListener("click", () => {
  page++;
  if (page > 1) prevBtn.disabled = false;
  if (page >= totalPage) nextBtn.disabled = true;

  console.log(page);
  displayCountry(allCountry);
});

prevBtn.addEventListener("click", () => {
  page--;

  if (page <= 1) prevBtn.disabled = true;

  if (page < totalPage) nextBtn.disabled = false;

  displayCountry(allCountry);
});

let search = document.querySelector(".inputdata");

search.addEventListener("input", (e) => {
  console.log(e.target.value);
  let searchCountry = allCountry.filter((elm) =>
    elm.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  displayCountry(searchCountry);
});

let filterBtn = document.querySelector(".filter");
filterBtn.addEventListener("click", () => {
  document.querySelector(".filterlist").classList.toggle("hidden");
});

let allregion = document.querySelectorAll(".region");
allregion.forEach((list) => {
  list.addEventListener("click", (e) => {
    console.log(e.target.innerHTML.toLowerCase());

     allCountry = allCountry.filter((elm) =>
      elm.region.toLowerCase().includes(e.target.innerHTML.toLowerCase())
    );

    displayCountry(allCountry);
  });
});


document.querySelector('.allcountry').addEventListener('click',()=>{
    page = 1;
    fetchCountryData()
})