module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM players ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            console.log('result length:', result.length)
            res.render('index.ejs', {
                title: "Welcome to Socka | View Players"
                ,players: result
            });
        });
    },
};
