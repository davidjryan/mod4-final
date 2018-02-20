$(document).ready(function() {
  fetchItems();
});

const prependItems = items => {
  items.forEach((item, index) => {
    $("#card-container").prepend(`
    <article id="card${item.id}" class="card">
      <div class="title-container">
        <h4 class="title">${item.title}</h4>
        <button class="delete" onclick="myFunction()">Delete</button>
      </div>
    </article>`);
  });
};

function deleteButton() {

}
