const dbconfig = {
    HOST: "ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    USER: "xn4re0pm5m3nb1hh",
    PASSWORD: "zv1y24bz6vd1ausl",
    DB: "tscpvfwb1fti1jtl",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = dbconfig;