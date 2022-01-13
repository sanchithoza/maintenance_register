
exports.up = function(knex) {
    return knex.schema.createTable('tbl_opd_register', (table) => {
        table.increments('id').primary()
        table.string('department').notNullable();
        table.string('case_number').notNullable();
        table.string('patient_name').notNullable();
        table.float('registration').defaultTo(0);
        table.float('consultation').defaultTo(0);
        table.float('lab').defaultTo(0);
        table.float('dispensary').defaultTo(0);
        table.float('bio_chemic').defaultTo(0);
        table.float('mother_tincher').defaultTo(0);
        table.float('minor_dressing').defaultTo(0);
        table.float('major_dressing').defaultTo(0);
        table.float('first_stiches').defaultTo(0);
        table.float('other_stiches').defaultTo(0);
        table.float('injection').defaultTo(0);
        table.float('ecg').defaultTo(0);
        table.float('total').defaultTo(0);
        table.string('entry_by').notNullable();
        table.text('remark');
        table.timestamp('created_at').defaultTo(knex.fn.now())
    }).then(() => {
        console.log(`tbl_opd_register created successfully . .`);
    }).catch((error) => {
        console.log(`Error creating tbl_opd_register : ${error}`);
        throw error
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_opd_register')
};
