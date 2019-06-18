function getSearchValue(type) {

  var searchInput = document.getElementById('searchInput');
  var searchValue = searchInput.value;
  var htmlElement = document.documentElement;
  var searchCloseButton = document.getElementById('searchCloseButton');

  htmlElement && htmlElement.addEventListener('click', closeSearchDropdown, false);
  searchCloseButton.addEventListener('click', closeSearchDropdown, false);

  var options = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "name"
    ]
  };

  var searchResultsUL = document.getElementById('searchResults');
  searchResultsUL.setAttribute('data-isvisable', searchValue.length > 0);
  searchCloseButton && searchCloseButton.setAttribute('data-isvisable', searchValue.length > 0);

  function closeSearchDropdown() {
    searchResultsUL.setAttribute('data-isvisable', false);
    searchCloseButton.setAttribute('data-isvisable', false);
    while (searchResultsUL.firstChild) {
      searchResultsUL.removeChild(searchResultsUL.firstChild);
    }
    searchInput.value = '';
  }

  var fuse = new Fuse(searchData, options);
  var results = fuse.search(searchValue);

  while (searchResultsUL.firstChild) {
    searchResultsUL.removeChild(searchResultsUL.firstChild);
  }

  if (results.length > 0) {
    for (var s = 0; s < results.length; ++s) {

        var name = results[s].item.name;
        var link = results[s].item.link;
        var listItem = document.createElement('li');
        var listLink = document.createElement('a');

        listItem.classList.add('_item');
        listLink.classList.add('link');
        listLink.setAttribute('title', name)
        listLink.setAttribute('href', link)
        listLink.innerHTML = name;
        listItem.appendChild(listLink);
        searchResultsUL.appendChild(listItem);
    }
  } else {
    var listItem = document.createElement('li');
    listItem.classList.add('_item-no-result');
    listItem.innerText = 'No results';
    searchResultsUL.appendChild(listItem);
  }
}
