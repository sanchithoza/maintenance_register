
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tbl_institute').del()
    .then(function () {
      // Inserts seed entries
      return knex('tbl_institute').insert([
        {
          id: 1,
          name: 'Admin Department', 
          alias:'Admin'
        },
        {
          id: 2, 
          name: 'Commerece Department', 
          alias:'Commerece'
        },
        {
          id: 3, 
          name: 'Science Department', 
          alias:'Science'
        },
        {
          id: 4, 
          name: 'MBA Department', 
          alias:'MBA'
        },
        {
          id: 5, 
          name: 'MCA Department', 
          alias:'MCA'
        },
        {
          id: 6, 
          name: 'Engineering Department', 
          alias:'Engineering'
        },
        {
          id: 7, 
          name: 'Homeopathy Department', 
          alias:'Homeopathy'
        },
        {
          id: 8, 
          name: 'School', 
          alias:'SCHOOL'
        },
        {
          id: 9, 
          name: 'Nursing Department', 
          alias:'Nursing'
        },
        {
          id: 10, 
          name: 'Physiotherapy Department', 
          alias:'Physiotherapy'
        }
      ]);
    });
};
