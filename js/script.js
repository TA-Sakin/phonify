// -----------------Search button----------------
const searchBtn = () => {
  const searchText = document.getElementById("search-box").value;
  if (searchText !== "") {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        showPhone(data.data);
        document.getElementById("error-msg").style.display = "none";
      });
    document.getElementById("search-box").value = "";
    document.getElementById("phone-container").innerHTML = "";
  } else {
    document.getElementById("error-msg").style.display = "block";
  }
};

// -----------------Show phone on UI----------------
const showPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  if (phones.length >= 20) {
    const first20 = phones.filter((_, i) => i < 20);
    phones = first20;
  }
  console.log(phones);
  for (const phone of phones) {
    console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col-lg-4");
    div.classList.add("col-md-6");
    div.innerHTML = `
          <div class="card mb-5 mt-5 text-center" style="width: 18rem">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h4 class="card-title">${phone.phone_name}</h4>
              <h5 class="card-title">${phone.brand}</h5>
              <a href="#" onclick="detailsBtn('${phone.slug}')" class="btn btn-secondary mt-3">Details</a>
            </div>
          </div>
          `;
    phoneContainer.appendChild(div);
  }
};

// -----------------Details button----------------
const detailsBtn = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => phoneDetails(data.data));
};

// -----------------Show details on UI----------------
const phoneDetails = (phone) => {
  console.log(phone);
  const phnDetails = document.getElementById("phone-details");

  phnDetails.innerHTML = `
  <div class="card mb-5 mt-5 h-100" style="width: 30rem;">
  <img src="${phone.image}" class="card-img-top" alt="..." />
  <div class="card-body">
              <h4 class="card-title text-center">${phone.name}</h4>
              <h5 class="card-title text-center">${phone.brand}</h5>
              <ul id="ul" class="list-group list-group-flush ">
                    <li class="list-group-item fw-bold text-center">${(phone.releaseDate =
                      phone.releaseDate
                        ? phone.releaseDate
                        : "No release date found")}</li>
                    <li class="list-group-item"><span class="bold">Sensors: </span> ${phone.mainFeatures.sensors.join(
                      ", "
                    )}.</li>
                    
                  </ul>
            </div>
          </div>
          `;
  const ul = document.getElementById("ul");
  for (const key in phone.others) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = ` 
                <span class="bold">  ${phone.others ? key : ""}: </span>${
      phone.others[key]
    }
            `;
    ul.appendChild(li);
  }
};
