import AppRoute from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ClubProvider } from "./context/ClubContext.jsx";

function App() {
  return (
    <AuthProvider>
      <ClubProvider>
        <AppRoute />
      </ClubProvider>
    </AuthProvider>
  );
}

export default App;
