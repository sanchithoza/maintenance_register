
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
        },
        {
          id: 3, 
          name: 'S.S. Agrawal Institute of Management & Technology', 
          alias:'SSAIMT'
        },
        {
          id: 4, 
          name: 'S. S. Agrawal Institute of Engineering and Technology', 
          alias:'SSAIET'
        },
        {
          id: 5, 
          name: 'S. S. Agrawal Homoeopathic Medial College & Hospital', 
          alias:'HOMEO'
        },
        {
          id: 6, 
          name: 'S. S. Agrawal Public School', 
          alias:'SCHOOL'
        },
        {
          id: 7, 
          name: 'S S. Agrawal College of Nursing Training College and Research Centre', 
          alias:'NURSING'
        },
        {
          id: 8, 
          name: 'S.S.Agrawal Institute of Physiotherapy & Medical Care Education', 
          alias:'PHYSIO'
        }
      ]);
    });
};
