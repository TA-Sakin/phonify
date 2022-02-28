const searchBtn = () => {
  const searchText = document.getElementById("search-box").value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPhone(data.data));
  document.getElementById("search-box").value = "";
  document.getElementById("phone-container").innerHTML = "";
};

const showPhone = (phones) => {
  const first20 = phones.filter((_, i) => i < 20);
  console.log(first20);

  const phoneContainer = document.getElementById("phone-container");
  for (const phone of phones) {
    // if (phones.length >= 20) {
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.innerHTML = `
        <div class="card mb-5 mt-5" style="width: 18rem">
                <img src="${phone.image}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h4 class="card-title">${phone.brand}</h4>
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">Details</a>
                </div>
              </div>
        `;
    phoneContainer.appendChild(div);
    // }
  }
};
