import "./App.css";
import { BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppProviders from "./contexts/AppProviders";

function App() {
  return (
    <AppProviders>
      <Router>
        <AppRoutes />
      </Router>
    </AppProviders>
  );
}

export default App;
