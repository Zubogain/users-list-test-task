// Imports grouped by their origin
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useTheme } from './components/theme-provider';
import Users from './containers/users';
import UserEdit from './containers/user-edit';
import UserCreate from './containers/user-create';
import Header from './components/header';

// Layout component for consistent structure
function Layout() {
  return (
    <div className="h-screen py-8 container">
      <Header />
      <Outlet />
    </div>
  );
}

// Main App component with routing
function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="users/:id" element={<UserEdit />} />
          <Route path="create" element={<UserCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
