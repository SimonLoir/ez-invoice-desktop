export default function defaultTemplate({
    lang,
    title,
    i_nbr,
    i_date,
    i_end_date,
    logo,
    e_name,
    e_vat,
    e_addr,
    e_email,
    e_phone_number,
    e_website,
    c_name,
    c_enterprise_name,
    c_addr,
    c_vat_number,
    data,
    due_percentage = '0',
    duration,
    struct = '',
}: {
    lang: string;
    title: string;
    i_nbr: string;
    i_date: string;
    i_end_date: string;
    logo: string;
    e_name: string;
    e_vat: string;
    e_addr: string;
    e_email: string;
    e_phone_number: string;
    e_website: string;
    c_name: string;
    c_enterprise_name: string;
    c_addr: string;
    c_vat_number: string;
    data: any;
    due_percentage: string;
    duration: string;
    struct: string;
}) {
    let str_id = i_nbr.toString();
    let str_id_len = str_id.length;
    let zeros = '0'.repeat(10 - str_id_len);
    let body = str_id + zeros;
    let end = (parseInt(body) % 97).toString();
    let struct_com =
        struct === ''
            ? body + (end === '0' ? '97' : end.length === 1 ? '0' + end : end)
            : struct;

    return `<!DOCTYPE html>
    <html lang="${lang}">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <table class="paging">
                <thead>
                    <tr>
                        <td><div class="header-space">&nbsp;</div></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div id="invoice-from-to">
                                <div>
                                    <h3>${e_name}</h3>
                                    <span><%- e_addr }</span> <br />
                                    <span>${e_phone_number}</span><br />
                                    <span>${e_email}</span><br />
                                    <span>${e_website}</span>
                                </div>
                                <div>
                                    <h3>${c_enterprise_name}</h3>
                                    <% if(c_name != c_enterprise_name) { }
                                    <span>${c_name}</span><br />
                                    <% } }
                                    <span><%- c_addr }</span><br />
                                    <p>TVA : ${c_vat_number}</p>
                                </div>
                            </div>
    
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>Description</th>
                                        <th>Qté</th>
                                        <th>Prix HT</th>
                                        <th>TVA</th>
                                        <th>Total TVAC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <% let intra = false; } <%
                                    data.forEach((element, i) => { }
                                    <tr>
                                        <td></td>
                                        <td><%- element[0] }</td>
                                        <td><%- element[1] }</td>
                                        <td><%- element[2].toFixed(2) }€</td>
                                        <% if(element[4]) { } <% intra = true }
                                        <td>*</td>
                                        <% } else { }
                                        <td><%- element[3] }%</td>
                                        <% } }
                                        <td style="text-align: right">
                                            <%- (element[1] * (element[2] +
                                            (element[4] ? 0 : element[3] *
                                            element[2] / 100))).toFixed(2) }€
                                        </td>
                                    </tr>
                                    <% }) }
                                    <tr>
                                        <td colspan="4" class="hidden"></td>
                                        <td><b>Total HT</b></td>
                                        <td style="text-align: right">
                                            
                                        </td>
                                    </tr>
    
                                    <tr>
                                        <td colspan="4" class="hidden"></td>
                                        <td><b>Total TTC</b></td>
                                        <td style="text-align: right">
                                           
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
    
                            <% if(intra){ }
                            <p>* Non applicable car intra-communautaire</p>
                            <% } } <% if(due_percentage > 0){ }
                            <p><table>
                                <tr>
                                    <td><b>Conditions de payement</b></td>
                                    <td><b>:</b></td>
                                    <td>
                                        <%- duration  } jours
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>À payer</b></td>
                                    <td><b>:</b></td>
                                    <td>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Communication structurée</b></td>
                                    <td><b>:</b></td>
                                    <td>
                                        +++ ${struct_com.slice(
                                            0,
                                            3
                                        )} / ${struct_com.slice(
        3,
        7
    )} / ${struct_com.slice(7)} +++
                                    </td>
                                </tr>
                            </table></p>
                            <% } }
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <div class="footer-space">&nbsp;</div>
                        </td>
                    </tr>
                </tfoot>
            </table>
    
            <header>
                <div>
                    <img src="${logo}" alt="" />
                </div>
                <div id="invoice-header-info">
                    <h3>${title}</h3>
                    <span>Numéro de document : ${i_nbr}</span><br />
                    <span>Date d'émission : ${i_date}</span><br />
                    <span>Échéance : ${i_end_date}</span>
                </div>
            </header>
            <footer>
                <div>
                    <h3>${e_name}</h3>
                    <%- e_addr }<br />
                    <span>TVA : ${e_vat}</span>
                </div>
    
                <div>
                    <h3>Contact</h3>
                    <span>Simon Loir</span><br />
                    <span>+32 485 45 26 98</span><br />
                    <span>contact@simonloir.be</span>
                </div>
    
                <div>
                    <h3>Moyen de payement</h3>
                    <span>Simon Loir</span><br />
                    <span>IBAN : BE11 0018 6889 4148</span><br />
                    <span>Banque : BNP Paribas Fortis</span>
                </div>
            </footer>
    
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;900&display=swap');
                body {
                    background-size: 21cm 29.7cm;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 10pt;
                    font-weight: 300;
                    text-align: justify;
                    margin: 0;
                }
                h3 {
                    margin: 0;
                    padding: 0;
                }
                #invoice-header-info {
                    text-align: right;
                    font-size: 9pt;
                    line-height: 1.5;
                }
                #invoice-from-to {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    font-size: 8pt;
                    line-height: 1.65;
                    font-weight: 400;
                    margin-bottom: 1.6cm;
                }
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0;
                        margin: 1.4cm;
                        margin-top: 1.38cm;
                        margin-bottom: 2.3cm;
                    }
                    header {
                        top: 0;
                        height: 3.7cm;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                    .header-space {
                        height: 3.4cm;
                    }
                    .footer-space {
                        height: 3.4cm;
                    }
                    header img {
                        height: 2cm;
                    }
                    .pagebreak {
                        page-break-before: always;
                    }
                    header,
                    footer {
                        position: fixed;
                        width: 100%;
                    }
                    footer {
                        bottom: 0;
                    }
                }
                .table {
                    position: relative;
                    border-collapse: collapse;
                    width: 100vw;
                }
                .table td,
                .table th {
                    border: 0.01cm solid #dddddd;
                    text-align: left;
                    padding: 8px;
                    max-width: 50vw;
                }
                .table td.hidden {
                    background-color: white;
                    border: none;
                }
                .table tr:nth-child(even) {
                    background-color: #eee;
                }
                footer {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    font-size: 9pt;
                    line-height: 1.8;
                    border-top: 0.01cm solid #eee;
                    padding-top: 0.5cm;
                }
            </style>
        </body>
    </html>`;
}
