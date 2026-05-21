import AppRoute from "./routes/AppRoutes.jsx";
import { AuthProvider } from "../modules/auth/context/AuthProvider.jsx";
import { ClubProvider } from "../modules/club/context/ClubProvider.jsx";
import { MembershipProvider } from "../modules/membership/context/MembershipProvider.jsx";
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
