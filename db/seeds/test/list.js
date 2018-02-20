exports.seed = function(knex, Promise) {
  return knex("mod4final_test")
    .del()
    .then(() => knex("mod4final_test").del())
    .then(() => {
      return Promise.all([
        knex("mod4final_test")
          .insert(
            [
              {
                title: "Do"
              },
              {
                title: "The"
              },
              {
                title: "Thing"
              }
            ],
            "id"
          )
          .then(() => console.log("Seeding complete!"))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
