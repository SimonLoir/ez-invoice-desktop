declare interface User {
    id: number;
    username: string;
    password: string;
    e_name: string;
    e_VAT_number: string;
    e_street_name: string;
    e_street_number: string;
    e_city: string;
    e_postal_code: string;
    e_country_code: string;
    contacts: Contact[];
}
