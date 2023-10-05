import pool from '../db.js'; 
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export const register = async(req, res) => {
    const {username, password} = req.body;

    try {
        const passwordHash = await bcrypt.hash(password,10);

        const result = await pool.query(
            "INSERT INTO creador (username, password) VALUES ($1, $2) RETURNING *",
            [username, passwordHash]
        );
            
        const token = await createAccessToken({id: result.rows[0].id})
        res.cookie('token', token );
        res.json({
            message: "User created successfully"
        })   
    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error interno." });
    }
}

export const login = async(req, res) => {
    const {username, password} = req.body;
    const usernameIngresado = username;

    try {
        const result = await pool.query(
            "SELECT * FROM creador WHERE username = $1",
            [usernameIngresado]
        );
        
        if (result.rows.length > 0) {
            const isMatch = await bcrypt.compare(password, result.rows[0].password);
            if(!isMatch) return res.status(400).json({message: "Incorrect password"});

            const token = await createAccessToken({id: result.rows[0].id})
            res.cookie('token', token,{
                sameSite: 'none',
                secure: true,
                httpOnly: false
            });
            res.json({
                id: result.rows[0].id,
                username: result.rows[0].username
            })    
        } else {
            console.log('El creador no existe en la base de datos.');
        }

    } catch (error) {
        res.status(500).json({ error: "Ha ocurrido un error interno." });
    }
}

export const logout = (req, res) => {
   res.cookie('token', "", {expires: new Date(0)});
   return res.sendStatus(200);
}

export const profile = async(req, res) => {
    const userFound = await pool.query(
        "SELECT * FROM creador WHERE id = $1",
        [req.params.id]
    );
     console.log(userFound)

    if (userFound.rows.length > 0) {
        return res.json({
            id: userFound.rows[0].id,
            username: userFound.rows[0].username,
            imagen: userFound.rows[0].imagen,
        })

       
    }
    else{
        return res.status(400).json({message: "User not found"})
    }

}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: "Unauthorized"});

        jwt.verify(token, TOKEN_SECRET, async(err, user) =>{
            if(err) return res.status(401).json({message: "Unauthorized"});
            const userFound = await pool.query(
                "SELECT * FROM creador WHERE id = $1",
                [user.id]
            );
            if(!userFound) return res.status(401).json({message: "Unauthorized"});

            return res.json({
                id: userFound.rows[0].id,
                username: userFound.rows[0].username,
            });
        })
}