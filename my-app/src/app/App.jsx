import AppRoute from "./routes/AppRoutes.jsx";
import { AuthProvider } from "../features/auth/context/AuthContext";
import { ClubProvider } from "../features/club/context/ClubContext.jsx";
import { UserProvider } from "../features/profile/context/UserContext.jsx";
import { MembershipProvider } from "../features/membership/context/MembershipContext.jsx";
function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ClubProvider>
          <MembershipProvider>
            <AppRoute />
          </MembershipProvider>
        </ClubProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
