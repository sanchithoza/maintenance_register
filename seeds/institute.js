
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tbl_institute').del()
    .then(function () {
      // Inserts seed entries
      return knex('tbl_institute').insert([
        {
          id: 1, 
          name: 'Agrawal Education Foundation', 
          alias:'AEF'
        },
        {
          id: 2, 
          name: 'S. S. Agrawal College of Commerece and Management', 
          alias:'SSACCM'
        }
      ]);
    });
};
