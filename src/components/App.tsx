import React from 'react';
import Link from './Link';

export default function App({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <header>
                <span className='title'>EZ-invoice</span>
                <nav>
                    <Link route='/'>Accueil</Link>
                    <Link route='/test'>Déclaration TVA</Link>
                    <Link route='/test'>Mes factures</Link>
                </nav>
            </header>
            <main>{children}</main>
        </>
    );
}
