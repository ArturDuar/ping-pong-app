import { AuthProvider } from "./AuthContext";
import { JugadorProvider } from "./JugadorContext"
import { TorneoProvider } from "./TorneoContext";

const AppProviders = ({children}) => {
    return (
        <AuthProvider>
            <JugadorProvider>
                <TorneoProvider>
                    {children}
                </TorneoProvider>
           </JugadorProvider>
        </AuthProvider>
    )
}

export default AppProviders;