import ContactsList from './Contacts/ContactsList';

export default function NewInvoicePage() {
    return (
        <>
            <section>
                <h2>Création de facture</h2>
                <p>Bienvenue sur l'assistant de création des factures</p>
            </section>

            <section>
                <h2>Client</h2>
                <ContactsList />
            </section>
        </>
    );
}
