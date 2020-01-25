const linkCategory = document.querySelector("#linkCategory");
const submitBtn = document.querySelector("#submitButton");
const addBtn = document.querySelector("#addBtn");
const cancelButton = document.querySelector("#cancelButton");
const addLinkPanel = document.querySelector("#addLinkPanel");
const addedCategories = document.querySelector("#addedCategories");
const linksList = document.querySelector("#linksList");
const addLinkContainer = document.querySelector('#addLinkContainer')

let editIndex = -1;

let linkCategories = [];
let links = [
  {
    title: "New link 1",
    url: "url.com",
    categories: ["node", "sfa"]
  },
  {
    title: "New link 2",
    url: "url.com",
    categories: ["js", "a"]
  },
  {
    title: "New link 3",
    url: "url.com",
    categories: ["bs4", "b"]
  }
];

displayLinks();

addBtn.addEventListener("click", event => {
  showFormPanel();
});
cancelButton.addEventListener("click", event => {
  event.preventDefault();
  hideFormPanel();
});

function showFormPanel() {
  addLinkContainer.classList.remove("hidden");
  displayLinkCatgeories();
}
function hideFormPanel() {
  addLinkContainer.classList.add("hidden");
  clearLinkForm();
}
linkCategory.addEventListener("keydown", function(event) {
  if (event.keyCode === 188) {
    event.preventDefault();
    linkCategories.push(linkCategory.value);
    linkCategory.value = "";

    //Display the updated catgories.
    displayLinkCatgeories();
  }
});

function displayLinkCatgeories() {
  addedCategories.innerHTML = "";
  for (let category of linkCategories) {
    var categoryHTMLString = `<span class="category">${category}</span>`;
    addedCategories.innerHTML += categoryHTMLString;
  }
}

function clearLinkForm() {
  linkTitle.value = "";
  linkUrl.value = "";
  linkCategory.value = "";
  linkCategoires = [];
  addedCategories.innerHTML = "";
}

submitBtn.addEventListener("click", event => {
  event.preventDefault();

  const title = linkTitle.value;
  const url = linkUrl.value;
  const categories = linkCategories;

  const newLink = {
    title,
    url,
    categories
  };
  if (editIndex === -1) {
    links.unshift(newLink);
  } else {
    links[editIndex] = newLink;
    editIndex = -1;
  }

  clearLinkForm();
  displayLinkCatgeories();

  //hide the addLinkForm
  hideFormPanel();

  displayLinks();
});

function displayLinks() {
  linksList.innerHTML = "";
  let index = 0;
  for (let link of links) {
    let linkHTMLString = `
    <div class="flex-item">
      <div class="link panel">
      <div class="link-options">
        <button class="btn-sm" onclick="deleteLink(${index})">Delete</button>
        <button class="btn-sm" onclick="editLink(${index})">Edit</button>
      </div>
      <a href="${link.url}">
        <h1 class="header">${link.title}</h1>
      </a>
      <p class="link-date">${Date.now()}</p>
      <div class="categories">
        categories:`;
    for (let category of link.categories) {
      linkHTMLString += `<span class="category">${category}</span>`;
    }
    innerHTML = `
      </div>
    </div>
    </div>
      `;
    linksList.innerHTML += linkHTMLString;
    index++;
  }
}

function deleteLink(index) {
  links.splice(index, 1);
  displayLinks();
}

function editLink(index) {
  editIndex = index;
  linkTitle.value = links[index].title;
  linkUrl.value = links[index].url;
  linkCategories = links[index].categories;
  showFormPanel();
}
