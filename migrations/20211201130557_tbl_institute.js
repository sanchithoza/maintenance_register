
exports.up = function(knex) {
    return knex.schema.createTable('tbl_institute', (table) => {
        table.increments('id').primary()
        table.string('name').unique().notNullable()
        table.string('alias').unique()
        table.boolean('is_active').defaultTo(1)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    }).then(() => {
        console.log(`tbl_instutite created successfully . .`);
    }).catch((error) => {
        console.log(`Error creating tbl_organizarion : ${error}`);
        throw error
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbl_institute')
};