// Update with your config settings.

module.exports = {

  development: {
      client: 'mysql',
      connection: {
          //host: '0.tcp.ngrok.io',
          //port:'11838',
            host:'localhost',
            port:'3306',
            //user: 'root',
            //password: '',
            user:'requests_root',
            password:'Ssaccm@2021',
            database: 'requests_maintenance_db'
      }
  },
  /*production: {
      client: 'mysql',
      connection: {
          host: 'localhost',
          user: 'id17259105_root',
          password: 'Sanchit@2021',
          database: 'id17259105_price_finder_db'
      }
  }*/

};