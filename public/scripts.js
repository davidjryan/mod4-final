$(document).ready(function() {
  fetchCards();
});

const prependCards = items => {
  items.forEach((item, index) => {
    $("#card-container").prepend(`
    <article id="card${item.id}" class="card">
        <h4 class="title">${item.title}</h4>
        <button class="delete" onclick="deleteButton()">Delete</button>
    </article>`);
  });
};

async function deleteButton() {

}

const fetchCards = async () => {
  const cardFetch = await fetch('http://localhost:3000/api/v1/mod4final/')
  const cardData = await cardFetch.json()

  console.log(cardData)

  prependCards(cardData.title)
}
