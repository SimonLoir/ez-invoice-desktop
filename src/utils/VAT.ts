import { invoke } from '@tauri-apps/api/tauri';

export default class VAT {
    private __amounts: { [gridNumber: string]: number } = {};
    private __year: number = new Date().getFullYear();
    private __quarter: number = new Date().getMonth() / 3 + 1;
    private __clientListingNihil: boolean = false;
    private __restitution: boolean = false;
    private __payement: boolean = false;

    /**
     * Sets the VAT declaration values
     * @param __vatNumber the VAT number
     * @param __name the name of the declarant
     * @param __street the street of the declarant
     * @param __postCode the post code of the declarant
     * @param __city the city of the declarant
     * @param __countryCode the country code of the declarant
     * @param __emailAddress the email address of the declarant
     */
    constructor(
        private __vatNumber: string,
        private __name: string,
        private __street: string,
        private __postCode: string,
        private __city: string,
        private __countryCode: string,
        private __emailAddress: string
    ) {}

    /**
     * Exports the VAT data to an XML string
     * @returns
     */
    export() {
        const data = `<?xml version="1.0" encoding="UTF-8"?>
        <ns0:VATConsignment xmlns:ns0="http://www.minfin.fgov.be/VATConsignment" xmlns:ns1="http://www.minfin.fgov.be/InputCommon" VATDeclarationsNbr="1">
           <ns0:VATDeclaration SequenceNumber="1">
              <ns0:Declarant>
                 <ns1:VATNumber>${this.__vatNumber}</ns1:VATNumber>
                 <ns1:Name>${this.__name}</ns1:Name>
                 <ns1:Street>${this.__street}</ns1:Street>
                 <ns1:PostCode>${this.__postCode}</ns1:PostCode>
                 <ns1:City>${this.__city}</ns1:City>
                 <ns1:CountryCode>${this.__countryCode}</ns1:CountryCode>
                 <ns1:EmailAddress>${this.__emailAddress}</ns1:EmailAddress>
              </ns0:Declarant>
              
              <ns0:Period>
                 <ns0:Quarter>${this.__quarter}</ns0:Quarter>
                 <ns0:Year>${this.__year}</ns0:Year>
              </ns0:Period>
              
              <ns0:Data>
                 ${Object.keys(this.__amounts)
                     .map(
                         (gridNumber) =>
                             `<ns0:Amount GridNumber="${gridNumber}">${this.__amounts[gridNumber]}</ns0:Amount>`
                     )
                     .join('')}
              </ns0:Data>
              
              <ns0:ClientListingNihil>${this.yesNo(
                  this.__clientListingNihil
              )}</ns0:ClientListingNihil>

              <ns0:Ask Restitution="${this.yesNo(
                  this.__restitution
              )}" Payment="${this.yesNo(this.__payement)}"/>
           </ns0:VATDeclaration>
        </ns0:VATConsignment>`;
        return invoke('create_zip', { xml: data });
    }

    /**
     * Converts the boolean to a string
     * @param value the boolean value
     * @returns the string YES or NO
     */
    private yesNo(value: boolean) {
        return value ? 'YES' : 'NO';
    }

    /**
     * Sets the declaration quarter
     */
    set quarter(value: number) {
        this.__quarter = value;
    }

    /**
     * Gets the declaration quarter
     */
    get quarter() {
        return this.__quarter;
    }

    /**
     * Sets the declaration year
     */
    set year(value: number) {
        this.__year = value;
    }

    /**
     * Sets the declaration year
     */
    get year() {
        return this.__year;
    }

    /**
     * Sets the restitution value
     */
    set requestRestitution(value: boolean) {
        this.__restitution = value;
    }

    /**
     * Sets the payment value
     */
    set requestPayementForm(value: boolean) {
        this.__payement = value;
    }

    /**
     * Sets the client listing nihil value
     */
    set requestClientListingNihil(value: boolean) {
        this.__clientListingNihil = value;
    }
}
