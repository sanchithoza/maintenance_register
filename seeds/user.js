
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tbl_user').del()
    .then(function () {
      // Inserts seed entries
      return knex('tbl_user').insert([
        {
          id: 1, 
          institute_id: 1,
          name:'Admin',
          user_name:'admin',
          password:'admin@ssa',
          role:'admin'
        },
        {
          id: 2, 
          institute_id: 2,
          name:'Principal Commerce',
          user_name:'commerece',
          password:'commerece@ssa',
          role:'user'
        },
        {
          id: 3, 
          institute_id: 3,
          name:'Principal Science',
          user_name:'science',
          password:'science@ssa',
          role:'user'
        },
        {
          id: 4, 
          institute_id: 4,
          name:'Principal MBA',
          user_name:'mba',
          password:'mba@ssa',
          role:'user'
        },
        {
          id: 5, 
          institute_id: 5,
          name:'Principal MCA',
          user_name:'mca',
          password:'mca@ssa',
          role:'user'
        },
        {
          id: 6, 
          institute_id: 6,
          user_name:'engineering',
          name:'Principal Engineering',
          password:'engineering@ssa',
          role:'user'
        },
        {
          id: 7, 
          institute_id: 7,
          name:'Principal Hpmeopathy',
          user_name:'homeopathy',
          password:'homeopathy@ssa',
          role:'user'
        },
        {
          id: 8, 
          institute_id: 8,
          name:'Principal School',
          user_name:'school',
          password:'school@ssa',
          role:'user'
        },
        {
          id: 9, 
          institute_id: 9,
          name:'Principal Nursing',
          user_name:'nursing',
          password:'nursing@ssa',
          role:'user'
        },
        {
          id: 10, 
          institute_id: 10,
          name:'Principal Physiotherapy',
          user_name:'physiotherapy',
          password:'physiotherapy@ssa',
          role:'user'
        },
        {
          id: 11, 
          institute_id: 1,
          name:'Mukesh Agrawal',
          user_name:'mukesh.agrawal',
          password:'trustee@ssa',
          role:'admin'
        },
        {
          id: 12, 
          institute_id: 1,
          name:'Hemraj Ravalji',
          user_name:'hemraj.ravalji',
          password:'hemraj@ssa',
          role:'admin'
        },
        {
          id: 13, 
          institute_id: 1,
          name:'Ketan Patel',
          user_name:'ketan.patel',
          password:'ketan@ssa',
          role:'admin'
        },
        {
          id: 14, 
          institute_id: 1,
          name:'Amit Patel',
          user_name:'amit.patel',
          password:'amit@ssa',
          role:'supervisior'
        },
        {
          id: 15, 
          institute_id: 1,
          name:'Dharmesh Patel',
          user_name:'dharmesh.patel',
          password:'amit@ssa',
          role:'supervisior'
        },
        {
          id: 16, 
          institute_id: 1,
          name:'Dipesh Patel',
          user_name:'dipesh.patel',
          password:'dipesh@ssa',
          role:'supervisior'
        }
      ]);
    });
};
