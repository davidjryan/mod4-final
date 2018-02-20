$(document).ready(function() {
  fetchItems();
});

const prependItems = items => {
  items.forEach((item, index) => {
    $("#card-container").prepend(`
    <article id="card${item.id}" class="card">
        <h4 class="title">${item.title}</h4>
        <button class="delete" onclick="myFunction()">Delete</button>
    </article>`);
  });
};

function deleteButton() {

}
