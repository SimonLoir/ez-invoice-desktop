import { useState } from 'react';
import nl2br from 'react-nl2br';
import { useUser } from '../App';

export default function ContactsList() {
    const { contacts } = useUser();
    const [filter, setFilter] = useState('');
    return (
        <>
            <p>
                <input
                    type='text'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder='Recherche'
                />
            </p>
            {contacts
                .filter((c) => c.c_name.toLowerCase().includes(filter))
                .map((customer) => (
                    <div key={customer.id}>
                        <b>
                            {customer.c_name} [{customer.c_company_name},{' '}
                            {customer.c_VAT_number}]
                        </b>
                        <p>
                            {customer.c_email} - {customer.c_phone_number}
                            <br />
                            {nl2br(customer.c_address)}
                        </p>
                    </div>
                ))}
        </>
    );
}
