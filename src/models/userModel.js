import pool from "../config/db.js";

export const getAllUsersService = async() => {
    const result = pool.query("SELECT * FROM users");
    return (await result).rows;
};