const pool = require("../config/database");

module.exports = {
	create: (data, callBack) => {
		pool.query(
			`insert into customers(first_name, last_name,address_line_one, address_line_two,city,state,pincode,mobile,phone,gstin,email) 
                values(?,?,?,?,?,?,?,?,?,?,?)`,
			[
				data.first_name,
				data.last_name,
				data.address_line_one,
				data.address_line_two,
				data.city,
				data.state,
				data.pincode,
				data.mobile,
				data.phone,
				data.gstin,
				data.email
			],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results);
			}
		);
	},
	getUserByUserEmail: (email, callBack) => {
		pool.query(
			`select * from registration where email = ?`,
			[email],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	},
	getUserByUserId: (id, callBack) => {
		pool.query(
			`select id,firstName,lastName,gender,email,number from registration where id = ?`,
			[id],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	},
	fetchCustomers: callBack => {
		pool.query(`SELECT * FROM customers`, [], (error, results, fields) => {
			if (error) {
				callBack(error);
			}
			return callBack(null, results);
		});
	},
	updateUser: (data, callBack) => {
		pool.query(
			`update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
			[
				data.first_name,
				data.last_name,
				data.gender,
				data.email,
				data.password,
				data.number,
				data.id
			],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	},
	deleteUser: (data, callBack) => {
		pool.query(
			`delete from registration where id = ?`,
			[data.id],
			(error, results, fields) => {
				if (error) {
					callBack(error);
				}
				return callBack(null, results[0]);
			}
		);
	}
};
