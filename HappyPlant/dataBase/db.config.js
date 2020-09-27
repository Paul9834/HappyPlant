const dbconfig = {
    HOST: "localhost",
    USER: "desarrollo",
    PASSWORD: "Dev12345",
    DB: "happy_plant",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = dbconfig;