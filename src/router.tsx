import { Component, createContext, ReactNode, useContext } from 'react';
import App from './components/App';
import ContactsPage from './components/ContactsPage';
import HomePage from './components/HomePage';
import InvoicesPage from './components/InvoicesPage';
import NewInvoicePage from './components/NewInvoicePage';
import VATPage from './components/VATPage';

interface RouterState {
    route: string;
}

const RouterContext = createContext<Router | undefined>(undefined);

export function useRouter() {
    const router: Router = useContext(RouterContext) as Router;
    return router;
}

export default class Router extends Component {
    get route() {
        return this.state.route;
    }

    state: Readonly<RouterState> = {
        route: '/',
    };

    setRoute(base_route: string) {
        const route = base_route.split('?')[0];
        this.setState({ route });
    }

    render(): ReactNode {
        let screen: ReactNode = <>404 - The requested route does not exist</>;
        switch (this.state.route) {
            case '/':
                screen = <HomePage />;
                break;

            case '/contacts':
                screen = <ContactsPage />;
                break;

            case '/vat':
                screen = <VATPage />;
                break;

            case '/new-invoice':
                screen = <NewInvoicePage />;
                break;

            case '/invoices':
                screen = <InvoicesPage />;
                break;

            default:
                break;
        }
        return (
            <RouterContext.Provider value={this}>
                <App>{screen}</App>
            </RouterContext.Provider>
        );
    }
}
