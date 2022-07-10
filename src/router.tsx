import { Component, createContext, ReactNode, useContext } from 'react';
import App from './components/App';
import HomePage from './components/HomePage';

interface RouterState {
    route: string;
}

const RouterContext = createContext<Router | undefined>(undefined);

export function useRouter() {
    const router: Router = useContext(RouterContext) as Router;
    return router;
}

export default class Router extends Component {
    get name() {
        return 'hello';
    }

    state: Readonly<RouterState> = {
        route: '/',
    };

    setRoute(route: string) {
        this.setState({ route });
    }

    render(): ReactNode {
        let screen: ReactNode = <>404 - The requested route does not exist</>;
        switch (this.state.route) {
            case '/':
                screen = <HomePage />;
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
