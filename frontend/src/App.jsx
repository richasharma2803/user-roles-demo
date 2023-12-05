import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login';
import Protected from './Protected';
import Dashboard from './components/dashboard/dashboard';
import Roles from './components/roles/Roles';
import Users from './components/users/Users';
import RoleListing from './components/roles/RoleListing';
import RoleAddEdit from './components/roles/RoleAddEdit';
import UserListing from './components/users/UserListing';
import UserAddEdit from './components/users/UserAddEdit';
import AssignRolePermission from './components/roles/AssignRolePermission';
import UserProfile from './components/profile/UserProfile';
import AuthService from './services/AuthService';
import { useDispatch } from 'react-redux';
import { setuserState } from './redux/Action/UserAction';

function App() {
  const user = AuthService.getCurrentUser();
  const dispatch = useDispatch();

  dispatch(setuserState(user));

  return (
    <>
        <ToastContainer />
        <Routes>
          <Route exact path='/'>
            <Route path='' element={<Login />} />
            <Route path='dashboard' element={<Protected Component={Dashboard} />} />
            <Route path='profile/:userId' element={<Protected Component={UserProfile} />} />
            <Route path='roles' element={<Protected Component={Roles} />}>
              <Route path='' element={<RoleListing />} />
              <Route path='add-role' element={<RoleAddEdit />} />
              <Route path='edit-role/:roleId' element={<RoleAddEdit />} />
            </Route>
            <Route path='assign-role-permission' element={<Protected Component={AssignRolePermission} />} />
            <Route path='users' element={<Protected Component={Users} />}>
              <Route path='' element={<UserListing />} />
              <Route path='add-user' element={<UserAddEdit />} />
              <Route path='edit-user/:userId' element={<UserAddEdit />} />
            </Route>
          </Route>
          <Route path='/*' element={<h4>404 Not found.</h4>} />
        </Routes>
    </>
  )
}

export default App
