const mainSection = document.getElementById("main-section");
const categorySelect = document.getElementById("category-dropdown");
const options = document.querySelectorAll("option");
const viewCategoryBtn = document.getElementById("view-category-button");
const addBookmarkBtn = document.getElementById("add-bookmark-button");
const formSection = document.getElementById("form-section");
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const closeFormBtn = document.getElementById("close-form-button");
const addBookmarkBtnForm = document.getElementById("add-bookmark-button-form");
const bookmarkList = document.getElementById("bookmark-list-section");
const categoryHeading = document.querySelectorAll(".category-name");
const categoryList = document.getElementById("category-list");
const closeListBtn = document.getElementById("close-list-button");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

const getBookmarks = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem("bookmarks"));
    if (
      Array.isArray(parsed) &&
      parsed.every(
        (item) =>
          item.hasOwnProperty("category") &&
          item.hasOwnProperty("name") &&
          item.hasOwnProperty("url"),
      )
    ) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

let bookmarksData = getBookmarks();

const displayOrCloseForm = () => {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
};

const updateBookmarks = () => {
  const bookmark = {
    name: nameInput.value,
    category: categorySelect.value,
    url: urlInput.value,
  };
  localStorage.setItem(
    "bookmarks",
    JSON.stringify(getBookmarks().concat(bookmark)),
  );
};

const reset = () => {
  nameInput.value = "";
  urlInput.value = "";
};

const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden");
  bookmarkList.classList.toggle("hidden");
};

const fillBookmarkList = () => {
  categoryHeading[1].innerText =
    categorySelect.value.charAt(0).toUpperCase() +
    categorySelect.value.slice(1);
  const bookmarksToDisplay = getBookmarks().filter(
    (i) => i.category === categorySelect.value,
  );
  if (bookmarksToDisplay.length) {
    categoryList.innerHTML = "";
    for (const bookmark of bookmarksToDisplay) {
      categoryList.innerHTML += `
        <div>
          <input type="radio" name="bookmarks" id="${bookmark.name}" value="${bookmark.name}">
        <label for="${bookmark.name}">
          <a href="${bookmark.url}">${bookmark.name}</a>
        </label>
        </div>`;
    }
  } else {
    categoryList.innerHTML = "<p>No Bookmarks Found</p>";
  }
};

const deleteBookmark = () => {
  const radioBookmarks = document.querySelectorAll('input[type="radio"]');
  for (const radioBookmark of radioBookmarks) {
    if (radioBookmark.checked) {
      const bookmarks = getBookmarks();
      const indexToRemove = bookmarks.findIndex(
        (i) =>
          i.name == radioBookmark.value && i.category === categorySelect.value,
      );
      bookmarks.splice(indexToRemove, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      return;
    }
  }
};

addBookmarkBtn.addEventListener("click", () => {
  categoryHeading[0].innerText =
    categorySelect.value.slice(0, 1).toUpperCase() +
    categorySelect.value.slice(1);
  displayOrCloseForm();
});

closeFormBtn.addEventListener("click", () => displayOrCloseForm());

addBookmarkBtnForm.addEventListener("click", () => {
  const formInputsContainValues = nameInput.value || urlInput.value;
  if (formInputsContainValues) {
    updateBookmarks();
    displayOrCloseForm();
    reset();
  } else {
    alert("Please, provide valid name and URL.");
  }
  console.log(getBookmarks());
});

viewCategoryBtn.addEventListener("click", () => {
  categoryHeading[1].innerText =
    categorySelect.value.slice(0, 1).toUpperCase() +
    categorySelect.value.slice(1);

  fillBookmarkList();
  displayOrHideCategory();
});

closeListBtn.addEventListener("click", () => {
  displayOrHideCategory();
});

deleteBookmarkBtn.addEventListener("click", () => {
  deleteBookmark();
  fillBookmarkList();
});
