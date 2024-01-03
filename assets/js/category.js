let category = ["sofa", "chair", "table", "shelf", "bed", "desk"];
let categoryWrapper = document.querySelector(".categoryWrapper");

for (let i of category) {
  let categoryCard = document.createElement("div");
  categoryCard.classList.add("categoryCard");
  categoryCard.innerHTML = `
    <a href="../pages/products.html">
    <div class="categoryTitle">
      ${i}
    </div>
    <div class="categoryImage">
      <img src="./assets/images/${i}.jpg" alt="${i}" />
    </div>
    `;
  categoryWrapper.appendChild(categoryCard);
  document.querySelectorAll(".categoryCard").forEach((newProduct) => {
    const randomAnimation = getRandomAOSAnimation();
    newProduct.setAttribute("data-aos", randomAnimation);
    newProduct.setAttribute("data-aos-delay", 300);
  });
}
