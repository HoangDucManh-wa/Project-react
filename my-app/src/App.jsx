import AppRoute from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ClubProvider } from "./context/ClubContext.jsx";
import { MembershipProvider } from "./context/MembershipContext.jsx";
function App() {
  return (
    <AuthProvider>
      <ClubProvider>
        <MembershipProvider>
          <AppRoute />
        </MembershipProvider>
      </ClubProvider>
    </AuthProvider>
  );
}

export default App;
