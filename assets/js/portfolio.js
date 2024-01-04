fetch("../assets/data/portfolio.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      let portfolioCard = document.createElement("div");
      portfolioCard.classList.add("portfolioCard");
      portfolioCard.innerHTML = `
        <img src="../assets/${element.image}" alt="${element.name}" />
        <div class="portfolioCard__title">
          ${element.name}
        </div>
        <div class="portfolioCard__description">
          ${element.description}
        `;
      document.querySelector(".portfolioWrapper").appendChild(portfolioCard);
    });
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });
