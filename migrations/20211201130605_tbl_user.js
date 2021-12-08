exports.up = function(knex) {
    return knex.schema.createTable('tbl_user', (table) => {
        table.increments('id').primary()
        table.integer('institute_id', 11).unsigned().references('id').inTable('tbl_institute')
        table.string('email')
        table.string('mobile')
        table.string('user_name').unique().notNullable()
        table.string('password').notNullable()
        table.string('role').notNullable()
        table.string('access')
        table.boolean('is_active').defaultTo(1)
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