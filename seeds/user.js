
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tbl_user').del()
    .then(function () {
      // Inserts seed entries
      return knex('tbl_user').insert([
        {
          id: 1, 
          institute_id: 1,
          user_name:'admin',
          password:'admin',
          role:'admin'
        },
        {
          id: 2, 
          institute_id: 2,
          user_name:'user',
          password:'user',
          role:'user'
        },
      ]);
    });
};
