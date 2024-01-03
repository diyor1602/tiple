import Fuse from "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs";

let typeListGroup = document.querySelector(".typeListGroup");
let allTypesLi = document.querySelector(".allTypesLi");
let brandListGroup = document.querySelector(".brandListGroup");
let searchFilterInput = document.querySelector(".searchFilterInput");
let searchFilterBtn = document.querySelector(".searchFilterBtn");
let allProducts = document.querySelector("#allProducts");

let allType = {};
let allBrand = {};
let allData = [];
let designType = "productCardTh";

fetch("../assets/data/furniture.json")
  .then((response) => response.json())
  .then((data) => {
    allData = data;
    data.forEach((element) => {
      // TYPE
      // Update the count for each type
      if (!allType[element.type]) {
        allType[element.type] = 1;
      } else {
        allType[element.type]++;
      }
      // BRAND
      if (!allBrand[element.brand]) {
        allBrand[element.brand] = 1;
      } else {
        allBrand[element.brand]++;
      }
      // Display each product
      displayProduct(element);
    });

    // Display each type and its count
    Object.keys(allType).forEach((type) => {
      let listGroupItem = document.createElement("li");
      listGroupItem.classList.add("list-group-item");
      listGroupItem.innerHTML = `
        ${type} <span>${allType[type]}</span>
      `;
      typeListGroup.appendChild(listGroupItem);
    });

    // Display the total number of products
    allTypesLi.innerHTML = `
      Total <span>${data.length}</span>
    `;
    // Display each brand and its count
    Object.keys(allBrand).forEach((brand) => {
      let listGroupItemBrand = document.createElement("li");
      listGroupItemBrand.classList.add("list-group-item");
      listGroupItemBrand.innerHTML = `
      <input
      class="form-check-input"
      type="checkbox"
      value="${brand}"
      id="flexCheck${brand}"
      />
      <label class="form-check-label" for="flexCheck${brand}">
        ${brand} <span>${allBrand[brand]}</span>
      </label>
      `;
      brandListGroup.appendChild(listGroupItemBrand);
    });
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

// dislay the product function
function displayProduct(element) {
  let productCard = document.createElement("div");
  productCard.classList.add(designType);
  productCard.classList.add(`elementN${element.id}`);
  productCard.innerHTML = `
    <img src="../assets/${element.image}" alt="${element.name}" />
    <div class="${designType}__info">
    <h5 class="${designType}__info__title">${element.name}</h5>
    <div>
    ${
      element.discountPrice
        ? `<p class="${designType}__info__discount">${element.price}$</p>
      <p class="${designType}__info__price">${element.discountPrice}$</p>
      `
        : `<p class="${designType}__info__price">${element.price}$</p>`
    }
    </div>
    
    <div class="${designType}__info__btns">
    <button class="btn btn-primary" onclick="buyProduct(${
      element.id
    })">Buy</button>
    <button
    class="btn btn-secondary"
    data-bs-toggle="modal"
    data-bs-target="#productDetailsModal1"
    onclick="displayModal(${element.id}, ${element.price}, ${
    element.discountPrice
  }, '${element.name}', '${element.image}', '${element.brand}', '${
    element.type
  }', '${element.size}', '${element.description.replace(/'/g, "\\'")}' )"
    >
    Details
    </button>
    </div>
    </div>
    `;
  allProducts.appendChild(productCard);
}
// fuse search function
function fuseSearch() {
  const options = {
    includeScore: true,
    keys: ["brand", "name", "type"],
  };

  const fuse = new Fuse(allData, options);
  let searchFilterInputValue =
    document.querySelector(".searchFilterInput").value;
  if (searchFilterInputValue === "") {
    allProducts.innerHTML = "";
    allData.forEach((element) => {
      displayProduct(element);
    });
    return;
  } else {
    const result = fuse.search(searchFilterInputValue);
    allProducts.innerHTML = "";
    if (result.length === 0) {
      allProducts.innerHTML = `
        <div class="alert alert-danger" role="alert">
        No results found!
        </div>
        `;
    } else {
      result.forEach((element) => {
        displayProduct(element.item);
      });
    }
  }
}

searchFilterBtn.addEventListener("click", fuseSearch);
searchFilterInput.addEventListener("keyup", fuseSearch);

// filter by type function
typeListGroup.addEventListener("click", (e) => {
  if (e.target.classList.contains("list-group-item")) {
    let type = e.target.innerText.split(" ")[0].split("\n")[0];
    if (type === "Total") {
      allProducts.innerHTML = "";
      allData.forEach((element) => {
        displayProduct(element);
      });
      return;
    } else {
      allProducts.innerHTML = "";
      allData.forEach((element) => {
        if (element.type === type) {
          displayProduct(element);
        }
      });
    }
  }
});

// filter by brand function
brandListGroup.addEventListener("change", (e) => {
  if (e.target.matches(".form-check-input")) {
    const checkedBrands = Array.from(
      document.querySelectorAll(".form-check-input:checked")
    ).map((input) => input.value);

    if (checkedBrands.length === 0) {
      allProducts.innerHTML = "";
      allData.forEach((element) => {
        displayProduct(element);
      });
    } else {
      allProducts.innerHTML = "";
      allData.forEach((element) => {
        if (checkedBrands.includes(element.brand)) {
          displayProduct(element);
        }
      });
    }
  }
});

// filter by price function
const priceInputs = document.querySelectorAll(".priceListInput input");

// Function to filter products based on price range
function filterByPrice() {
  const minPrice = parseFloat(priceInputs[0].value);
  const maxPrice = parseFloat(priceInputs[1].value);

  // If both inputs have valid numbers
  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    allProducts.innerHTML = "";
    allData.forEach((element) => {
      const productPrice = parseFloat(element.price);
      if (productPrice >= minPrice && productPrice <= maxPrice) {
        displayProduct(element);
      }
    });
  } else {
    // Handle invalid inputs or empty inputs
    if (priceInputs[0].value === "" && priceInputs[1].value === "") {
      allProducts.innerHTML = "";
      allData.forEach((element) => {
        displayProduct(element);
      });
    } else {
      allProducts.innerHTML = `
        <div class="alert alert-danger" role="alert">
          No results found!
        </div>
        `;
    }
  }
}

// Add event listeners to the price inputs
priceInputs.forEach((input) => {
  input.addEventListener("keyup", filterByPrice);
});

// filter by size function
const sizeCheckboxes = document.querySelectorAll(".sizeCheckbox");

// Function to filter products based on selected sizes
function filterBySize() {
  const selectedSizes = Array.from(sizeCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  allProducts.innerHTML = "";
  if (selectedSizes.length === 0) {
    allData.forEach((element) => {
      displayProduct(element);
    });
  } else {
    allData.forEach((element) => {
      if (selectedSizes.includes(element.size)) {
        displayProduct(element);
      }
    });
  }
}

// Add event listeners to size checkboxes
sizeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", filterBySize);
});

//  collapese arrow
const filterTitle = document.querySelector(".card-title");

filterTitle.addEventListener("click", function () {
  const icon = filterTitle.querySelector("i");
  if (icon.classList.contains("fa-chevron-down")) {
    icon.classList.remove("fa-chevron-down");
    icon.classList.add("fa-chevron-up");
  } else {
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
  }
});

// change designtype function
let listIcon = document.querySelector(".fa-list");
let thIcon = document.querySelector(".fa-th");

listIcon.addEventListener("click", function () {
  designType = "productCardList";
  allProducts.innerHTML = "";
  allData.forEach((element) => {
    displayProduct(element);
  });
  listIcon.classList.add("activeDesignType");
  thIcon.classList.remove("activeDesignType");
});

thIcon.addEventListener("click", function () {
  designType = "productCardTh";
  allProducts.innerHTML = "";
  allData.forEach((element) => {
    displayProduct(element);
  });
  thIcon.classList.add("activeDesignType");
  listIcon.classList.remove("activeDesignType");
});
