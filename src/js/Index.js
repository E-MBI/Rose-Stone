/*** Start Selectors ****/
//Start Header
const links = document.querySelectorAll(".nav-item .nav-link");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");

//Start Services
const component_sec = document.querySelectorAll(".comp-product");
const buttons = document.querySelectorAll(".controlebtn > a");
const filterBtn = document.querySelector('button[data-filter="filter"]');

//**Start Products***//
const api_url = "https://admin.rosestone.net/";
// GRC PRODUCTS
const grc_cont = document.querySelector(".grc-cont");

// WOOD PRODUCTS
const wood_cont = document.querySelector(".wood-cont");

//**Start Event***//
const eventSec = document.querySelector(".event");
const eventTitle = document.querySelector(".event-cont > .text > .title");
const eventPosition = document.querySelector(".event-cont > .text > .position");
const eventLetter = document.querySelector(".event-cont > .text > .letter");
const eventImage = document.querySelector(".event-cont > .img > img");

/*** End Selectors ****/

// --------------------------------------------------------------------------------

//-----------Start functionalty--------------------//

//***********Start Header**********//
//add postion fixed to navbar when scrolling
function scrolling() {
  if (this.scrollY >= 600) {
    navbar.classList.add("fix-nav");
  } else {
    navbar.classList.remove("fix-nav");
  }
}

//active linke in  navbar when scrolling into its section
function activeLink() {
  sections.forEach((sec) => {
    let rect = sec.getBoundingClientRect();
    if (rect.top >= -150 && rect.top <= 250) {
      let sec_id = sec.id;
      //callback func that activated the like
      active(sec_id);
    }
  });
}

function active(sec) {
  links.forEach((link) => {
    link.classList.remove("active");
  });
  let linkActive = document.querySelector(`a[href="#${sec}"]`);
  linkActive.classList.add("active");
}

//***********End Header**********//

//***********Start Services**********//
function filterProduct() {
  buttons.forEach((btn) => {
    //when click above btn controle
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let filterVar = e.target.dataset.word;

      //looping above all section and active it's class contains the filterVar
      component_sec.forEach((sec) => {
        sec.style.display = "none";
        if (sec.classList.contains(`${filterVar}`)) {
          sec.style.display = "block";
        }
      });
    });
  });
}
filterProduct();
//***********End Services**********//

//-----------End functionalty--------------------//
// --------------------------------------------------------------------------------

//-----------Start Events--------------------//
//***********start Header**********//

//add clss active & remove from  another
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    links.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");
  });
});

//add postion fixed to navbar when scrolling
window.addEventListener("scroll", scrolling);

//active linke in  navbar when scrolling into its section
window.addEventListener("scroll", activeLink);

//***********End Header**********//

//***********Start Services**********//

// add active class to the all btn
window.onload = function () {
  document.querySelector('a[data-word="all"]').classList.add("active");
};
//when click above btn controle
buttons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    buttons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
  });
});

//***********End Services**********//

//----------- End Events --------------------//
// --------------------------------------------------------------------------------

//############## Start FETCH DATA FROM API'S ########################

//GRC PRODUCTS

let grc_api = api_url + "api/projectsByCat/g";
fetch(grc_api)
  .then((res) => {
    let Request = res.json();
    return Request;
  })
  .then((res) => {
    let cardData = res.data;

    if (cardData.length !== 0) {
      cardData.forEach((product) => {
        let path_img;
        if (product.images.length === 0) {
          path_img = "images/project/GRC/default.png";
        } else {
          path_img =
            api_url +
            "rosestone/public/assets/images/projects/" +
            product.images[0].image;
        }

        let title = product.name_en.trim().toUpperCase();
        let cardBody = product.details_en
          .split(" ")
          .slice(0, 20)
          .join(" ")
          .toLowerCase();

        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="image " style="height: 48vh">
        <img src="${path_img}" class="card-img-top" alt="product photo"/>
      </div>

      <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${cardBody}</p>
      <a href="https://www.facebook.com/RoseStone.GRC" class="btn btn-warning">
      show
      </a>
      </div>
      `;
        grc_cont.appendChild(card);
      });
    } else {
      let defaultDiv = document.querySelector(".grc-cont > .default");
      defaultDiv.style.display = "flex";
    }
  })
  .catch((rej) => {
    let defaultDiv = document.querySelector(".grc-cont > .default");
    defaultDiv.style.display = "flex";
  });

// ##############################
//Wood PRODUCTS

let wood_api = api_url + "api/projectsByCat/w";
fetch(wood_api)
  .then((res) => {
    let Request = res.json();
    return Request;
  })
  .then((res) => {
    let cardData = res.data;

    if (cardData.length !== 0) {
      cardData.forEach((product) => {
        let path_img;
        if (product.images.length === 0) {
          path_img = "images/project/Wood/default.png";
        } else {
          path_img =
            api_url +
            "rosestone/public/assets/images/projects/" +
            product.images[0].image;
        }

        let title = product.name_en.trim().toUpperCase();
        let cardBody = product.details_en
          .split(" ")
          .slice(length - 9, length - 1)
          .join(" ")
          .toLowerCase();
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="image " style="height: 48vh">
          <img src="${path_img}" class="card-img-top" alt="product photo"/>
        </div>
  
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${cardBody}</p>
          <a href="https://www.facebook.com/RoseStone.GRC" class="btn btn-warning">
          show
          </a>
        </div>
        `;
        wood_cont.appendChild(card);
      });
    } else {
      let defaultDiv = document.querySelector(".wood-cont > .default");
      defaultDiv.style.display = "flex";
    }
  })
  .catch((rej) => {
    let defaultDiv = document.querySelector(".wood-cont > .default");
    defaultDiv.style.display = "flex";
  });

// ##############################
//Blog
let blog_api = api_url + "api/blogs";

fetch(blog_api)
  .then((res) => {
    let response = res.json();
    return response;
  })
  .then((res) => {
    let eventData = res.data;
    if (eventData.length !== 0) {
      eventData.forEach((val) => {
        let path_img = "images/test/events.png";
        eventImage.setAttribute("src", path_img);
        eventTitle.textContent = val.type.trim().toUpperCase();
        eventPosition.textContent = val.title_en;
        eventLetter.textContent = val.body_en;
      });
    } else {
      eventSec.style.display = "none";
    }
  })
  .catch((rej) => {
    throw new Error(`${rej}`);
  });

//############## End FETCH DATA FROM API'S ########################
