import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthProvider } from "./utils/AuthProvider";
import Login from "./pages/Login";
import SnarePage from "./pages/SnarePage";
import SnareFormPage from "./pages/SnareFormPage";
import TomPage from "./pages/TomPage";
import TomFormPage from "./pages/TomFormPage";
import CymbalPage from "./pages/CymbalPage";
import CymbalFormPage from "./pages/CymbalFormPage";
import SnareDetailPage from "./pages/SnareDetailPage";
import TomDetailPage from "./pages/TomDetailPage";
import CymbalDetailPage from "./pages/CymbalDetailPage";


const queryClient = new QueryClient();

function App() {

  const router = createBrowserRouter(
        createRoutesFromElements(
          <Route>
            <Route path="/" element={<BaseLayout />}>
              <Route
                path="login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
            </Route>
            <Route path="/" element={<RootLayout />}>
              <Route
                index
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/snare"
                element={
                  <PrivateRoute>
                    <SnarePage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/snare/new"
                element={
                  <PrivateRoute>
                    <SnareFormPage />
                  </PrivateRoute>
                }
              />

<Route
                path="/snare/:id"
                element={
                  <PrivateRoute>
                    <SnareDetailPage />
                  </PrivateRoute>
                }
              />

                <Route
                path="/snare/:id/edit"
                element={
                  <PrivateRoute>
                    <SnareFormPage />
                  </PrivateRoute>
                }
              />
              <Route path="/tom" element={<PrivateRoute><TomPage /></PrivateRoute>} />
              <Route path="/tom/new" element={<PrivateRoute><TomFormPage /></PrivateRoute>} />
              <Route path="/tom/:id/edit" element={<PrivateRoute><TomFormPage /></PrivateRoute>} />
              <Route path="/tom/:id" element={<PrivateRoute><TomDetailPage /></PrivateRoute>} />


              <Route path="/cymbal" element={<PrivateRoute><CymbalPage /></PrivateRoute>} />
              <Route path="/cymbal/new" element={<PrivateRoute><CymbalFormPage /></PrivateRoute>} />
              <Route path="/cymbal/:id/edit" element={<PrivateRoute><CymbalFormPage /></PrivateRoute>} />
              <Route path="/cymbal/:id" element={<PrivateRoute><CymbalDetailPage /></PrivateRoute>} />
            </Route>
          </Route>
        )
      );


  return (
        <>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
        </>
      );
    }


export default App;


