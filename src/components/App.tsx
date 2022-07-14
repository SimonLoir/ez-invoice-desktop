import React, { createContext, useContext, useEffect, useState } from 'react';
import Link from './Link';
import Database from 'tauri-plugin-sql-api';

const database = Database.load('sqlite:database.db').then(initDb);
const DatabaseContext = createContext<Database | undefined>(undefined);
const UserContext = createContext<User | undefined>(undefined);

export function useDatabase() {
    const db = useContext(DatabaseContext) as Database;
    return db;
}

export function useUser() {
    const usr = useContext(UserContext) as User;
    return usr;
}

async function initDb(db: Database) {
    /**
     * Users
     */
    await db.execute(`DROP TABLE IF EXISTS users`);
    await db.execute(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        e_name TEXT NOT NULL, 
        e_VAT_number TEXT NOT NULL,
        e_street_name TEXT NOT NULL,
        e_street_number TEXT NOT NULL,
        e_city TEXT NOT NULL,
        e_postal_code TEXT NOT NULL,
        e_country_code TEXT NOT NULL
    )`);
    await db.execute(
        `INSERT INTO users VALUES (NULL, "sloir", "test", "Simon Loir", "BE0732788874", "Rue de la Forêt", "11", "Tenneville", "6970", "BE");`
    );
    /**
     * Customers
     */
    await db.execute(`DROP TABLE IF EXISTS contacts`);
    await db.execute(`CREATE TABLE IF NOT EXISTS contacts (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         e_id INTEGER NOT NULL,
         c_name TEXT NOT NULL, 
         c_company_name TEXT NOT NULL, 
         c_VAT_number TEXT NOT NULL,
         c_address TEXT NOT NULL,
         c_phone_number TEXT NOT NULL, 
         c_email TEXT NOT NULL UNIQUE
     )`);

    await db.execute(
        `INSERT INTO contacts VALUES (NULL,  1,"Simon Loir", "Simon Loir", "BE0732788874", "Rue de la Forêt, 11\n6970 Tenneville (BE)", "+32485452698", "simon-loir@hotmail.com")`
    );

    return db;
}

export default function App({ children }: { children?: React.ReactNode }) {
    const [db, setDb] = useState<Database>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        database.then(async (db) => {
            const usr = (
                await db.select<User[]>('SELECT * FROM users WHERE id = 1')
            )[0];
            usr.contacts = await db.select<Contact[]>(
                `SELECT * FROM contacts WHERE e_id = ${usr.id}`
            );
            console.log(usr);
            setUser(usr);
            setDb(db);
        });
    }, []);

    if (!db) return <>Chargement de la base de données...</>;
    if (!user)
        return (
            <>
                Une erreur inconnue est survenue. Impossible de charger
                l'utilisateur
            </>
        );
    return (
        <DatabaseContext.Provider value={db}>
            <UserContext.Provider value={user}>
                <header>
                    <span className='title'>EZ-invoice</span>
                    <nav>
                        <Link route='/'>Accueil</Link>
                        <Link route='/vat'>Déclaration TVA</Link>
                        <Link route='/test'>Factures</Link>
                        <Link route='/contacts'>Contacts</Link>
                        <span>
                            <b>{user?.e_name}</b>
                        </span>
                    </nav>
                </header>
                <main>{children}</main>
            </UserContext.Provider>
        </DatabaseContext.Provider>
    );
}
