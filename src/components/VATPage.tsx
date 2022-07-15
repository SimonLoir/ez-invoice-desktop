import { Component } from 'react';
import VAT from '../utils/VAT';
import { UserContext } from './App';

export default class VATPage extends Component {
    render() {
        return (
            <>
                <UserContext.Consumer>
                    {(user) =>
                        user ? (
                            <>
                                <section>
                                    <h2>Déclaration de TVA</h2>
                                    <button
                                        onClick={async () => {
                                            const vat = new VAT(
                                                user.e_VAT_number,
                                                user.e_name,
                                                user.e_street_name,
                                                user.e_postal_code,
                                                user.e_city,
                                                user.e_country_code,
                                                user.username
                                            );
                                            console.log('test');
                                            try {
                                                const file = await vat.export();
                                                console.log(file);
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }}
                                    >
                                        test
                                    </button>
                                </section>
                                <section>
                                    <h2>Déclaration précédentes</h2>
                                </section>
                            </>
                        ) : (
                            'Une erreur est survenue'
                        )
                    }
                </UserContext.Consumer>
            </>
        );
    }
}
