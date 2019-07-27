var toDoArray = []

// QUERY SELECTORS
var aside = document.querySelector('.aside');
var asideIdeas = document.querySelector('.form__div-idea-input');

// EVENT LISTENERS
aside.addEventListener('click', function () {
  event.preventDefault();
  if (event.target.closest('.form__section-img')) {
    addInitialItems();
  }
  if (event.target.closest()) {
    
  }
})


function addInitialItems(event) {
  var asideIdeaInput = document.querySelector('.form__section-input')
  asideIdeas.insertAdjacentHTML(
    'beforeend',
    `<container class="form__container container1">
      <input type="image" class="form__container-img image" src="images/delete.svg" alt="delete task item button">
      <p class="form__container-p" >${asideIdeaInput.value}</p>
    </container>`
  );
  
}

function makeTaskList(event) {
  
}