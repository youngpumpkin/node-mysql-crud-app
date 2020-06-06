module.exports = {
    getHomePage: (req, res) => {
		var page_num = 1;
			if (typeof req.query.page_num !== 'undefined') {
				page_num = Number(req.query.page_num);
			}
		
		const item_num = 1;
		const page_size = 10;
		const skip_size = (page_num - 1) * item_num;
		const page_query = "LIMIT " + item_num + " OFFSET " + skip_size;
		var page_start = 1;
		var page_end = 1;
		var page_total = 1;
		var total_count = 1;

		db.query("SELECT COUNT(*) FROM players", (err, result) => {				
			total_count = Number(result.rows[0].count);

			page_total = Math.ceil(total_count / item_num); 

    		page_start = ((Math.ceil(page_num / page_size) - 1) * page_size) + 1;
			page_end = (page_start + page_size) - 1;

			
			if (page_end > page_total) 
				page_end = page_total;

			
		});

       	let query = "SELECT * FROM players ORDER BY id ASC " + page_query; 
		
		if (req.path == '/search') {
			let username = req.query.username
			let reg_date = req.query.reg_date
       		query = "SELECT * FROM players WHERE user_name like '%" + username + "%' \
						AND reg_time::date = date '" + reg_date + "' ORDER BY id ASC " + page_query;
		}
		
		
    	db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
			
			const page_info = {
				num: page_num,
				start: page_start,
				end: page_end,
				total: page_total
			}
			
            res.render('index.ejs', {
                title: "Welcome to Socka | View Players"
                ,players: result
				,query: req.query
				,page: page_info
            });
        });
    },
};
