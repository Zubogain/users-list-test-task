import { useTheme } from "./components/theme-provider";
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";

import { NavigationMenu } from "./components/menu";

import Users from "./containers/users";
import UserEdit from "./containers/user-edit";
import UserCreate from "./containers/user-create";
import Header from "./components/header";

function Layout() {
  return (
    <div className="h-screen py-8 container">
      <Header />

      <Outlet />
    </div>
  );
}

function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="/users/:id" element={<UserEdit />} />
          <Route path="/create" element={<UserCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
