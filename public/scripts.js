$(document).ready(function() {
  fetchCards();
});

function prependCards(cards) {
  cards.forEach((card, index) => {
    $("#card-container").prepend(`
      <article id="${card.id}" class="card">
          <h4 class="title">${card.title}</h4>
          <button class="delete" onclick="deleteCard()">Delete</button>
      </article>`);
  });
};

const fetchCards = async () => {
  const cardFetch = await fetch('/api/v1/mod4final/')
  const cardData = await cardFetch.json()

  console.log(cardData)

  prependCards(cardData.title)
}

const submitCard = async () => {
  const title = $("#title-input").val();

  const savePost = await fetch("/api/v1/mod4final", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  const response = await savePost.json();
  console.log(response);

  prependCards([{ title, id: response.id }]);

  $(".header-input").val("");
};



async function deleteCard(event) {
  // why the hell does this conitinue to scope to window
  const ideaID = $(this).closest("article").prop("id");

  await fetch(`/api/v1/mod4final/${ideaID}`, {
    method: 'DELETE',
  })
  $(this).closest("article").remove();
}

$("#card-container").on("click", ".delete", deleteCard);
$("#submit-input").on("click", submitCard);
