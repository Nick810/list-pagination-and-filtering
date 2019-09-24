/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Variable Declarations
const page = document.querySelector('.page');
const studentItems = document.querySelectorAll('.student-item')
const itemsPerPage = 10;

// ----- Functions ----- //
// Show items per page by their indexes
function showPage(list, page) {
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;
  list.forEach((element, i) => {
    if (i >= startIndex && i < endIndex) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

// Append pagination to the bottom of the page + calculate the total page needs
// by diving total students by items per page
// Manage active state of paginations links when clicked
function appendPageLinks(list) {
  const totalPage = Math.ceil(list.length / itemsPerPage);
  let div = document.createElement('div');
  let ul = document.createElement('ul');
  for (let i=0; i<totalPage; i++) {
    let li = document.createElement('li');
    let aLink = document.createElement('a');
    aLink.setAttribute('href', '#');
    aLink.textContent = i + 1;
    aLink.addEventListener('click', (e) => {
      if (e.target.getAttribute('class') === null) {
        document.querySelectorAll('.pagination a').forEach(element => element.removeAttribute('class'));
      }
      e.target.setAttribute('class', 'active');
      showPage(studentItems, parseInt(e.target.textContent));
    }, false);
    li.appendChild(aLink);
    ul.appendChild(li);
  }
  ul.firstElementChild.firstElementChild.setAttribute('class', 'active')
  div.className = 'pagination';
  div.appendChild(ul)
  page.appendChild(div);
}

// Append search bar to the page + addEventListener to buttons and search box
function appendSearchBar() {
  let div = document.createElement('div');
  div.className = 'student-search';
  div.innerHTML = `
      <input placeholder="Search for students...">
      <button>Search</button>
    `;
  const searchInput = div.firstElementChild;
  const searchButton = div.lastElementChild;
  searchButton.style.cursor = 'pointer';
  searchInput.addEventListener('input', () => {
    searchStudent(searchInput);
  }, false);
  searchButton.addEventListener('click', () => {
    searchStudent(searchInput);
  }, false);
  page.firstElementChild.appendChild(div);
}

// Searching function for live searching and when the button 'search' is clicked
// Show paginations upon search items found
// Display 'search not found' message when no search results is equal to 0
// Manage items per page if the search bar is empty
function searchStudent(element) {
  const searchResults = [];
  const studentNames = document.querySelectorAll('.student-details h3');

  for (let i=0; i<studentNames.length; i++) {
    if (studentNames[i].textContent.includes(element.value.toLowerCase())) {
      studentNames[i].parentElement.parentElement.style.display = 'block';
      searchResults.push(studentNames[i].parentElement.parentElement);
    } else {
      studentNames[i].parentElement.parentElement.style.display = 'none';
    }
  }

  if (searchResults.length === 0) {
    const h4 = document.createElement('h4');
    h4.textContent = 'Sorry, no results found - try a different search';
    page.removeChild(page.lastElementChild);
    page.appendChild(h4);
  } else {
    page.removeChild(page.lastElementChild);
    appendPageLinks(searchResults)
  }

  if (element.value === '') {
    showPage(studentItems, 1);
  }
}

// ----- Function Calls prior to page loads ----- //
//  Show 10 students per page
showPage(studentItems, 1);

//  Append paginations to a page
appendPageLinks(studentItems);

// Append search bar
appendSearchBar();
