import React, { createContext, useContext, useEffect, useState } from 'react';
import Link from './Link';
import Database from 'tauri-plugin-sql-api';

const database = Database.load('sqlite:database.db');
const DatabaseContext = createContext<Database | undefined>(undefined);

export function useDatabase() {
    const db = useContext(DatabaseContext) as Database;
    return db;
}

export default function App({ children }: { children?: React.ReactNode }) {
    const [db, setDb] = useState<Database>();

    useEffect(() => {
        database.then((db) => setDb(db));
    }, []);

    if (!db) return <>Chargement de la base de données...</>;
    return (
        <DatabaseContext.Provider value={db}>
            <header>
                <span className='title'>EZ-invoice</span>
                <nav>
                    <Link route='/'>Accueil</Link>
                    <Link route='/test'>Déclaration TVA</Link>
                    <Link route='/test'>Mes factures</Link>
                </nav>
            </header>
            <main>{children}</main>
        </DatabaseContext.Provider>
    );
}
