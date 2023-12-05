import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login'
import Protected from './Protected'
import Dashboard from './components/dashboard/dashboard'
import UserProfile from './components/profile/UserProfile'
import { RoleListing } from './components/roles/RoleListing'
import Roles from './components/roles/Roles'
import { RoleAddEdit } from './components/roles/RoleAddEdit'
import { AssignRolePermission } from './components/roles/AssignRolePermission'
import { UserListing } from './components/users/UserListing'
import Users from './components/users/Users'
import { UserAddEdit } from './components/users/UserAddEdit'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/'>
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
      </Routes>
    </>
  )
}

export default App
