export default class VAT {
    private amounts: { [gridNumber: string]: number } = {};
    private year: number = new Date().getFullYear();
    private quarter: number = new Date().getMonth() / 3 + 1;
    private clientListingNihil: boolean = false;
    private restitution: boolean = false;
    private payement: boolean = false;

    /**
     * Sets the VAT declaration values
     * @param vatNumber the VAT number
     * @param name the name of the declarant
     * @param street the street of the declarant
     * @param postCode the post code of the declarant
     * @param city the city of the declarant
     * @param countryCode the country code of the declarant
     * @param emailAddress the email address of the declarant
     */
    constructor(
        private vatNumber: string,
        private name: string,
        private street: string,
        private postCode: string,
        private city: string,
        private countryCode: string,
        private emailAddress: string
    ) {}

    /**
     * Exports the VAT data to an XML string
     * @returns
     */
    export() {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <ns0:VATConsignment xmlns:ns0="http://www.minfin.fgov.be/VATConsignment" xmlns:ns1="http://www.minfin.fgov.be/InputCommon" VATDeclarationsNbr="1">
           <ns0:VATDeclaration SequenceNumber="1">
              <ns0:Declarant>
                 <ns1:VATNumber>${this.vatNumber}</ns1:VATNumber>
                 <ns1:Name>${this.name}</ns1:Name>
                 <ns1:Street>${this.street}</ns1:Street>
                 <ns1:PostCode>${this.postCode}</ns1:PostCode>
                 <ns1:City>${this.city}</ns1:City>
                 <ns1:CountryCode>${this.countryCode}</ns1:CountryCode>
                 <ns1:EmailAddress>${this.emailAddress}</ns1:EmailAddress>
              </ns0:Declarant>
              
              <ns0:Period>
                 <ns0:Quarter>${this.quarter}</ns0:Quarter>
                 <ns0:Year>${this.year}</ns0:Year>
              </ns0:Period>
              
              <ns0:Data>
                 ${Object.keys(this.amounts)
                     .map(
                         (gridNumber) =>
                             `<ns0:Amount GridNumber="${gridNumber}">${this.amounts[gridNumber]}</ns0:Amount>`
                     )
                     .join('')}
              </ns0:Data>
              
              <ns0:ClientListingNihil>${this.yesNo(
                  this.clientListingNihil
              )}</ns0:ClientListingNihil>

              <ns0:Ask Restitution="${this.yesNo(
                  this.restitution
              )}" Payment="${this.yesNo(this.payement)}"/>
           </ns0:VATDeclaration>
        </ns0:VATConsignment>`;
    }

    /**
     * Converts the boolean to a string
     * @param value the boolean value
     * @returns the string YES or NO
     */
    private yesNo(value: boolean) {
        return value ? 'YES' : 'NO';
    }
}
