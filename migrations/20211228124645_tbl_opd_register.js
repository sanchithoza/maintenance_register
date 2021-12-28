
exports.up = function(knex) {
    return knex.schema.createTable('tbl_opd_register', (table) => {
        table.increments('id').primary()
        table.integer('tbl_maintenance_request_id', 11).unsigned().references('id').inTable('tbl_maintenance_request')
        table.string('department').notNullable();
        table.string('case_number').notNullable();
        table.string('patient_name').notNullable();
        table.string('dispensary');
        table.string('bio_chemic');
        table.string('mother_tincher');
        table.string('minor_dressing');
        table.string('major_dressing');
        table.string('first_stiches');
        table.string('other_stiches');
        table.string('injection');
        table.string('ecg');
        table.string('total')
        table.string('entry_by').notNullable()
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
