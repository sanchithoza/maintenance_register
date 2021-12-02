
exports.up = function(knex) {
    return knex.schema.createTable('tbl_maintenance_request', (table) => {
        table.increments('id').primary()
        table.integer('institute_id', 11).unsigned().references('id').inTable('tbl_institute')
        table.integer('user_id', 11).unsigned().references('id').inTable('tbl_user')
        table.string('building_name')
        table.string('floor_number').unique().notNullable()
        table.string('room_identification').notNullable()
        table.string('problem_category').notNullable()
        table.text('discription').notNullable()
        table.string('status').notNullable()
        table.text('admin_comment').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
    }).then(() => {
        console.log(`tbl_users created successfully . .`);
    }).catch((error) => {
        console.log(`Error creating tbl_users : ${error}`);
        throw error
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_user')
};