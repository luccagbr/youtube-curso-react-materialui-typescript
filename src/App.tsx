import { BrowserRouter } from "react-router-dom";
import "./shared/forms/TraducoesYup";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { DrawerProvider } from "./contexts/DrawerContext";
import { MenuLateral } from './shared/components/menu-lateral/MenuLateral';
import { AuthProvider } from "./contexts";
import { Login } from "./shared/components";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>
          <DrawerProvider>
            <BrowserRouter>

              <MenuLateral>
                <AppRoutes/>
              </MenuLateral>
              
            </BrowserRouter>
          </DrawerProvider>
        </Login>
        
      </AppThemeProvider>
    </AuthProvider>
  );
}
