/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const page = document.querySelector('.page');
const studentItems = document.querySelectorAll('.student-item')
const itemsPerPage = 10;



/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/
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

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/
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

function appendSearchBar() {
  let div = document.createElement('div');
  div.className = 'student-search';
  div.innerHTML = `
      <input placeholder="Search for students...">
      <button>Search</button>
    `;
  const searchInput = div.firstElementChild;
  const searchButton = div.lastElementChild;
  searchInput.addEventListener('input', () => {
    searchStudent(searchInput);
  }, false);
  searchButton.addEventListener('click', () => {
    searchStudent(searchInput);
  }, false);
  page.firstElementChild.appendChild(div);
}

function searchStudent(element) {
  const searchResults = [];
  const studentNames = document.querySelectorAll('.student-details h3');
  for (let i=0; i<studentNames.length; i++) {
    if (studentNames[i].textContent.includes(element.value.toLowerCase())) {
      studentNames[i].parentElement.parentElement.style.display = 'block';
    } else {
      studentNames[i].parentElement.parentElement.style.display = 'none';
    }
    for (let i=0; i<studentItems.length; i++) {
      if (studentItems[i].getAttribute('style') === 'display: none;') {
        searchResults.push(studentItems[i]);
      }
    }
  }
  if (searchResults.length === 0) {
    console.log('sorry');
  }
  // Sorry, no results found - try a different search
}


showPage(studentItems, 1);
appendPageLinks(studentItems);
appendSearchBar();




// Remember to delete the comments that came with this file, and replace them with your own code comments.
