// -----------------Search button----------------
//-----------------------------------------------
const searchBtn = () => {
  const searchText = document.getElementById("search-box").value;
  document.getElementById("search-box").value = "";
  document.getElementById("spinner").style.display = "block";
  document.getElementById("phone-container").innerHTML = "";
  document.getElementById("phone-details").innerHTML = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showPhone(data.status, data.data);
    });
};

// -----------------Show phone on UI----------------
//--------------------------------------------------
const showPhone = (dataAvailable, phonesData) => {
  const phoneContainer = document.getElementById("phone-container");
  let phones = phonesData.slice(0, 20);
  console.log(phones);
  if (dataAvailable == true) {
    document.getElementById("error-msg").style.display = "none";
    document.getElementById("spinner").style.display = "none";
    for (const phone of phones) {
      console.log(phone);
      const div = document.createElement("div");
      div.classList.add("col-lg-4");
      div.classList.add("col-md-6");
      div.innerHTML = `
            <div class="card border-0 mb-5 mt-5 text-center" style="width: 18rem">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h4 class="card-title">${phone.phone_name}</h4>
                <h5 class="card-title">${phone.brand}</h5>
                <a href="#" onclick="detailsBtn('${phone.slug}')" class="btn btn-outline-secondary px-4 mt-3">Details</a>
              </div>
            </div>
            `;
      phoneContainer.appendChild(div);
    }
  } else {
    document.getElementById("error-msg").style.display = "block";
    document.getElementById("spinner").style.display = "none";
  }
};

// -----------------Details button------------------
//--------------------------------------------------
const detailsBtn = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => phoneDetails(data.data));
};

// -----------------Show details on UI----------------
//----------------------------------------------------
const phoneDetails = (phone) => {
  console.log(phone);
  const phnDetails = document.getElementById("phone-details");
  phnDetails.innerHTML = `
  <div class="card mb-5 mt-5 h-100" style="width: 30rem;">
  <img src="${
    phone.image
  }" class="mx-auto card-img-top w-50 " id="detail-img" alt="..." />
    <div class="card-body">
        <h3 class="card-title text-center">${phone.name}</h3>
        <h4 class="card-title text-center">${phone.brand}</h4>
        <ul id="ul" class="list-group list-group-flush ">
          <li class="list-group-item text-center">${
            phone.releaseDate ? phone.releaseDate : "No release date found"
          }</li>
        </ul>
    </div>
  </div>
`;
  //----------------- Main features and others data ---------------------
  //-----------------------------------------------------------------------
  moreInfo(phone.mainFeatures, phone, false);
  moreInfo(phone.others, phone, true);
};

//----------------- Main features and others data ---------------------
//-----------------------------------------------------------------------
const moreInfo = (info, phone, enter) => {
  const ul = document.getElementById("ul");
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  if (enter && phone.others) {
    li.innerHTML = `<li class="fw-bold text-center remove-dot">Others
    </li>`;
    ul.appendChild(li);
  } else if (!enter && phone.mainFeatures) {
    li.innerHTML = `<li class=" fw-bold text-center remove-dot">
    Main Features
    </li>`;
    ul.appendChild(li);
  }
  for (const key in info) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `<span class="bold">${
      info ? key[0].toUpperCase() + key.slice(1) : ""
    }: </span>${(info[key] =
      key === "sensors" ? info[key].join(", ") : info[key])}
              `;
    console.log(info[key]);
    ul.appendChild(li);
  }
};
