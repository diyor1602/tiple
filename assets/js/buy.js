let buyWrapper = document.querySelector(".buyWrapper");

let buyProductPrice = document.querySelector("#buyProductPrice");
let decreaseQuantity = document.querySelector(".decreaseQuantity");
let increaseQuantity = document.querySelector(".increaseQuantity");
let buyProductQuantity = document.querySelector("#buyProductQuantity");
let buyProductTotal = document.querySelector("#buyProductTotal");
let buyProductName = document.querySelector("#buyProductName");
let buyProductShipping = document.querySelector("#buyProductShipping");

let productPrice = 0;
let productQuantity = 1;
let productTotal = 0;
let elementName;
let minShippingPrice = 100;
let shippingPrice = 0;
let tempPrice = 0;

const SMALL_DISCOUNT = 0.1; // 10% discount for small
const MEDIUM_DISCOUNT = 0; // 0% discount for medium
const LARGE_SURCHARGE = 0.1; // 10% surcharge for large

// get ID from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const elementID = urlParams.get("elementID");

fetch("../assets/data/furniture.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      if (element.id == elementID) {
        let buyCard = document.createElement("div");
        buyCard.classList.add("buyCard");
        elementName = element.name;
        tempPrice = element.discountPrice
          ? element.discountPrice
          : element.price;
        buyCard.innerHTML = `
          <img src="../assets/${element.image}" class="elementImage" alt="${
          element.name
        }" />
          <div class="buyCardDetails">
            <div class="buyElementName">
              ${element.name}
            </div>
            ${
              element.discountPrice
                ? `
                <div class="buyElementDiscountPrice">
                ${element.price} $
                </div>
                <div class="buyElementPrice"> ${element.discountPrice} $ </div>
                `
                : `
                <div class="buyElementPrice">
                ${element.price} $
                </div>
                `
            }
            <div class="buyElementDescription">
              ${element.description}
            </div>
            <div class="availableColors">
              ${generateColor(element.color)}
            </div>

            <div class="ratings">
            ${generateStarRating(element.rating)}
            </div>

          </div>
          `;
        buyWrapper.appendChild(buyCard);

        buyProductName.innerHTML = element.name;
        productPrice = element.discountPrice
          ? element.discountPrice
          : element.price;
        buyProductPrice.innerHTML = `${Math.trunc(productPrice)} $`;
        buyProductQuantity.innerHTML = productQuantity;
        buyProductTotal.innerHTML = `${Math.trunc(productPrice)} $`;

        decreaseQuantity.addEventListener("click", () => {
          if (productQuantity > 1) {
            productQuantity--;
            buyProductQuantity.innerHTML = productQuantity;
            productTotal = Math.trunc(productPrice * productQuantity);
            buyProductTotal.innerHTML = `${productTotal} $`;
          }
        });

        increaseQuantity.addEventListener("click", () => {
          productQuantity++;
          buyProductQuantity.innerHTML = productQuantity;
          productTotal = Math.trunc(productPrice * productQuantity);
          buyProductTotal.innerHTML = `${productTotal} $`;
        });

        generateSize(tempPrice);
      }
    });
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

function generateStarRating(rating) {
  const maxStars = 5;
  const filledStars = Math.ceil(rating);
  let starsHTML = "";

  for (let i = 0; i < maxStars; i++) {
    if (i < filledStars) {
      starsHTML += `<i class="fa-solid fa-star"></i>`;
    } else {
      starsHTML += `<i class="fa-regular fa-star"></i>`;
    }
  }
  return starsHTML + `<span> ${rating} </span>`;
}

function generateColor(colors) {
  colors = colors.split(",");
  let colorsHTML = "";
  colors.forEach((color) => {
    color = color.trim().toLowerCase();
    colorsHTML += `<div class="color" 
    onclick="changeImageColor('${color}', '${elementName}')">
      <div style="background-color: ${color}"></div>
    </div>`;
  });
  return colorsHTML;
}

function generateSize(tempPrice) {
  let smallDiscount = tempPrice - 0.1 * tempPrice;
  let mediumDiscount = tempPrice;
  let largeSurcharge = tempPrice + 0.1 * tempPrice;
  let buyElementOption = document.querySelector("#buyElementOption");

  buyElementOption.addEventListener("change", () => {
    if (buyElementOption.value == "1") {
      tempPrice = smallDiscount;
      buyProductPrice.innerHTML = `${Math.trunc(tempPrice)} $`;
      productTotal = Math.trunc(tempPrice * productQuantity);
      buyProductTotal.innerHTML = `${productTotal} $`;
    } else if (buyElementOption.value == "2") {
      tempPrice = mediumDiscount;
      buyProductPrice.innerHTML = `${Math.trunc(tempPrice)} $`;
      productTotal = Math.trunc(tempPrice * productQuantity);
      buyProductTotal.innerHTML = `${productTotal} $`;
    } else if (buyElementOption.value == "3") {
      tempPrice = largeSurcharge;
      buyProductPrice.innerHTML = `${Math.trunc(tempPrice)} $`;
      productTotal = Math.trunc(tempPrice * productQuantity);
      buyProductTotal.innerHTML = `${productTotal} $`;
    }
  });
}
