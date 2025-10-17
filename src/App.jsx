import "./App.css";
import AuthPage from "./Views/Auth/AuthPage";
import Menu from "./Views/Menu/Menu";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./Views/NotFound/NotFoun";
import Admin from "./Views/Admin/Admin";
import Protected from "./Components/Menu/protected/Protected";
import { ToastContainer } from "react-toastify";
import ProtectedDashboard from "./Components/Menu/Protected/ProtectedDashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<ProtectedDashboard><Admin /></ProtectedDashboard>} />
          <Route
            path="/"
            element={
              <Protected>
                <Menu />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
};

export default App;
