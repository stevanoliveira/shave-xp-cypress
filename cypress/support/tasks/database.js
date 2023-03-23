const { Pool } = require("pg")

const dbConfig = {
	host: "motty.db.elephantsql.com",
	user: "ohrueptr",
	password: "b9cLIAshh9D27nv2UnW7giADuI837qxR",
	database: "ohrueptr",
	port: 5432,
}

module.exports = {
	removeUser(email) {
		return new Promise(function (resolve) {
			const pool = new Pool(dbConfig)

			pool.query("DELETE FROM users WHERE email = $1", [email], function (error, result) {
				if (error) {
					throw error
				}
				resolve({ success: result })
			})
		})
	},
}
