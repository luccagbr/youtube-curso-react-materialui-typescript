import { BrowserRouter } from "react-router-dom";
import "./shared/forms/TraducoesYup";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { DrawerProvider } from "./contexts/DrawerContext";
import { MenuLateral } from './shared/components/menu-lateral/MenuLateral';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
      <BrowserRouter>

        <MenuLateral>
          <AppRoutes/>
        </MenuLateral>
        
      </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}
