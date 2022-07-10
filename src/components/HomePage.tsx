import { fs, os } from '@tauri-apps/api';
import { invoke } from '@tauri-apps/api/tauri';
import defaultTemplate from '../templates/default';

export default function HomePage() {
    return (
        <>
            <section>
                <h2>Bienvenue</h2>
                <p>Bienvenue sur EZ-invoice !</p>
                <button
                    onClick={async () => {
                        console.log();
                        try {
                            const tmp = (await os.tempdir()) + '/ezbiz/';
                            await fs.createDir(tmp, { recursive: true });
                            await fs.writeFile(
                                tmp + 'index.html',
                                defaultTemplate({
                                    lang: '',
                                    title: '',
                                    i_nbr: '',
                                    i_date: '',
                                    i_end_date: '',
                                    logo: '',
                                    e_name: '',
                                    e_vat: '',
                                    e_addr: '',
                                    e_email: '',
                                    e_phone_number: '',
                                    e_website: '',
                                    c_name: '',
                                    c_enterprise_name: '',
                                    c_addr: '',
                                    c_vat_number: '',
                                    data: '',
                                    due_percentage: '',
                                    duration: '',
                                    struct: '',
                                })
                            );
                        } catch (error) {
                            console.error(error);
                        }
                        const r = await invoke('print_pdf');
                        console.log(r);
                    }}
                >
                    test
                </button>
            </section>
        </>
    );
}
