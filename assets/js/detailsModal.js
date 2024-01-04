function displayModal(
  elementId,
  elementPrice,
  elementDiscount,
  elementName,
  elementImg,
  elementBrand,
  elementType,
  elementSize,
  elementDescription
) {
  let modalTitle = document.querySelector("#exampleModalLabel");
  let modalBody = document.querySelector(".modal-body");

  modalBody.innerHTML = `
    <img src="../assets/${elementImg}" alt="${elementName}" style="width: 100%; margin-bottom: 20px" />
    <p>ID: ${elementId}</p>
    <p>Price: ${elementPrice}</p>
    ${elementDiscount ? `<p>Discount: ${elementDiscount}</p>` : ``}
    <p>Brand: ${elementBrand}</p>
    <p>Type: ${elementType}</p>
    <p>Size: ${elementSize}</p>
    <p>Description: ${elementDescription}</p>

    <a href="../pages/buy.html?elementID=${elementId}">
      <button class="btn btn-primary">Buy</button>
    </a> 
  `;
  modalTitle.innerHTML = `${elementName}`;
}

// buy product function
function buyProduct(elementId) {
  window.location.href = `../pages/buy.html?elementID=${elementId}`;
}
