import { useTheme } from "./components/theme-provider";
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";

import { NavigationMenu } from "./components/menu";

import Users from "./containers/user";
import UserEdit from "./containers/user-edit";

function Layout() {
  return (
    <div>
      <NavigationMenu />

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
