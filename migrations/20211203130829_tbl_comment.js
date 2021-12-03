
exports.up = function(knex) {
    return knex.schema.createTable('tbl_comment', (table) => {
        table.increments('id').primary()
        table.integer('tbl_maintenance_request_id', 11).unsigned().references('id').inTable('tbl_maintenance_request')
        table.integer('user_id', 11).unsigned().references('id').inTable('tbl_user')
        table.text('discription').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
    }).then(() => {
        console.log(`tbl_comment created successfully . .`);
    }).catch((error) => {
        console.log(`Error creating tbl_users : ${error}`);
        throw error
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_comment')
};