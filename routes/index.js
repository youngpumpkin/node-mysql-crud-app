module.exports = {
    getHomePage: (req, res) => {

       	let query = "SELECT * FROM players ORDER BY id ASC"; // query database to get all the players

		if (req.path == '/search') {
			let username = req.query.username
			let reg_date = req.query.reg_date
       		query = "SELECT * FROM players where user_name like '%" + username + "%' and reg_time::date = date '" + reg_date + "' ORDER BY id ASC";
		}
        // execute query
    	db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.render('index.ejs', {
                title: "Welcome to Socka | View Players"
                ,players: result
				,query: req.query
            });
        });
    },
};
