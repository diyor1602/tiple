AOS.init({
  // once: true,
});

const aosAnimations = [
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
  "fade-up-right",
  "fade-up-left",
  "fade-down-right",
  "fade-down-left",
  "flip-left",
  "flip-right",
  "flip-up",
  "flip-down",
  "zoom-in",
  "zoom-in-up",
  "zoom-in-down",
  "zoom-in-left",
  "zoom-in-right",
  "zoom-out",
  "zoom-out-up",
  "zoom-out-down",
  "zoom-out-left",
  "zoom-out-right",
];

function getRandomAOSAnimation() {
  const randomIndex = Math.floor(Math.random() * aosAnimations.length);
  return aosAnimations[randomIndex];
}

let todayDate = new Date();
let showMaxProducts = 5;
let minDays = 62;
let countShowProducts = 0;

fetch("../assets/data/furniture.json")
  .then((response) => response.json())
  .then((data) => {
    data.filter((element) => {
      let productDate = new Date(element.date);
      let timeDiff = Math.abs(todayDate.getTime() - productDate.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays <= minDays && countShowProducts < showMaxProducts) {
        countShowProducts++;
        let newProduct = document.createElement("div");
        newProduct.classList.add("newProduct");
        newProduct.innerHTML = `
          <a href="pages/buy.html?elementID=${element.id}">
          <img src="./assets/${element.image}" alt="${element.name}" />
          <div class="newProduct__title">
            ${element.name}
          </div>
          `;
        if (element.discountPrice) {
          newProduct.innerHTML += `
            <div class="newProduct__discount_price">
              ${element.price} $
            </div>
            <div class="newProduct__actual_price">
              ${element.discountPrice} $
            </div>
            <div class="newProduct__discount_icon">
              <i class="fa-solid fa-badge-percent"></i>
            </div>
            </a>
            `;
        } else {
          newProduct.innerHTML += `
            <div class="newProduct__actual_price">
              ${element.price} $
            </div>
            <div class="newProduct__trend_icon">
              <i class="fa-solid fa-fire"></i>
            </div> </a>
            `;
        }
        document.querySelector(".newProductsWrapper").appendChild(newProduct);
        document.querySelectorAll(".newProduct").forEach((newProduct) => {
          const randomAnimation = getRandomAOSAnimation();
          newProduct.setAttribute("data-aos", randomAnimation);
          newProduct.setAttribute("data-aos-delay", 300);
        });
      }
    });
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });
