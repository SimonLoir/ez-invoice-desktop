import { useRouter } from '../router';

export default function InvoicesPage() {
    const router = useRouter();
    return (
        <>
            <section>
                <h2>Factures</h2>
                <p>Bienvenue sur l'assistant de gestion des factures.</p>
                <p className='ta-right'>
                    <button onClick={() => router.setRoute('/new-invoice')}>
                        Nouvelle facture
                    </button>
                </p>
            </section>
        </>
    );
}
