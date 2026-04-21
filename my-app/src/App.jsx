import AppRoute from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
}

export default App;
