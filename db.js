require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_URL,
    {
        dialect: "postgres",
        logging: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Database Connected");

           app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = sequelize;