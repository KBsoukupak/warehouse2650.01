import { ProtectedRoute } from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { AuthProvider } from "./context/authContext";
import { Homepage } from "./pages/Homepage";
import { DodavatelePage } from "./pages/dodavatele/DodavatelePage";
import {SlitinyPage} from "./pages/slitiny/SlitinyPage";
import {Kontrakty} from "./pages/kontrakty/Kontrakty";
import {FixacePage} from "./pages/fixace/FixacePage";
import {SkladPage} from "./pages/sklad/SkladPage";

function App() {
  return (
    <div>
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/"
                       index={true}
                          element={<ProtectedRoute> <Homepage /> </ProtectedRoute>}/>
                <Route path="/dodavatele" element={<ProtectedRoute> <DodavatelePage /> </ProtectedRoute>}/>
                <Route path="/slitiny" element={<ProtectedRoute> <SlitinyPage /> </ProtectedRoute>}/>
                <Route path="/kontrakty" element={<ProtectedRoute> <Kontrakty /> </ProtectedRoute>}/>
                <Route path="/fixace" element={<ProtectedRoute> <FixacePage /> </ProtectedRoute>}/>
                <Route path="/sklad" element={<ProtectedRoute> <SkladPage /> </ProtectedRoute>}/>
            </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
