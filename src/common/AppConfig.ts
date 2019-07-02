import { ConnectionOptions } from 'typeorm';
import path from 'path'; // modul

export let dbConfig : ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306, // predefinisani port za mysql server
    username: 'root',
    password: 'root',
    database: 'quotes',
    entities:[
        path.join(__dirname, './../entities/*.js') // nadji mi putanju do entities i sve js fajlove
    ]
}