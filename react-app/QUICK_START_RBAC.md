# Quick Start Guide - Role-Based Access Control

## Overview
This guide helps you quickly get started with the role-based access control system in the Bike Tours application.

## Three User Roles

### 1. Rider (Regular User)
- **Access**: `/login` and `/register`
- **Demo**: Register with any credentials, login to access rides
- **Features**: View rides, book rides, manage registrations

### 2. Organizer (Tour Operator)
- **Access**: `/organizer/login`
- **Demo Creds**: 
  - Name: `Demo Organizer`
  - Password: `organizer123`
- **Features**: Create/manage rides, view registered riders

### 3. Admin (System Administrator)
- **Access**: `/admin/login`
- **Demo Creds**:
  - Email: `admin@biketours.com`
  - Password: `admin123`
- **Features**: Manage all users/rides/bookings, view analytics

## Quick Access Links

```
Rider:     http://localhost:5174/login
Organizer: http://localhost:5174/organizer/login
Admin:     http://localhost:5174/admin/login
```

## Implementation Summary

### Context-Based Role Management
```javascript
// RoleContext provides:
- currentUser        // Currently logged-in user data
- loginRider()       // Register as rider
- loginOrganizer()   // Login as organizer
- loginAdmin()       // Login as admin
- logout()           // Logout current user
- hasRole(role)      // Check if user has role
```

### Protected Routes
```javascript
<RiderProtectedRoute>      {/* Riders only */}
<OrganizerProtectedRoute>  {/* Organizers only */}
<AdminProtectedRoute>      {/* Admins only */}
```

### Using in Components
```javascript
import { useRole } from '../context/RoleContext';

function MyComponent() {
  const { currentUser, hasRole, logout } = useRole();
  
  return (
    <div>
      {currentUser && <p>Hello, {currentUser.email}</p>}
      {hasRole('rider') && <button>Book a Ride</button>}
      {hasRole('admin') && <button>View Reports</button>}
    </div>
  );
}
```

## Project Structure

```
src/
├── context/RoleContext.jsx           ← Core role management
├── components/
│   ├── RoleProtectedRoute.jsx        ← Base protection component
│   ├── RiderProtectedRoute.jsx       ← Rider access control
│   ├── OrganizerProtectedRoute.jsx   ← Organizer access control
│   ├── AdminProtectedRoute.jsx       ← Admin access control
│   └── Navbar.jsx                    ← Role-aware navigation
└── pages/
    ├── Login.jsx                     ← Rider login
    ├── Register.jsx                  ← Rider registration
    ├── OrganizerLogin.jsx           ← Organizer login
    ├── AdminLogin.jsx               ← Admin login
    ├── AdminDashboard.jsx           ← Admin panel
    └── OrganizerDashboard.jsx       ← Organizer panel
```

## Getting Started

### 1. Test Rider Flow
```
1. Go to http://localhost:5174/register
2. Fill in details and register
3. Go to http://localhost:5174/login
4. Login with your credentials
5. Access rider features
```

### 2. Test Organizer Flow
```
1. Go to http://localhost:5174/organizer/login
2. Name: Demo Organizer
3. Password: organizer123
4. Access organizer dashboard
```

### 3. Test Admin Flow
```
1. Go to http://localhost:5174/admin/login
2. Email: admin@biketours.com
3. Password: admin123
4. Access full admin panel
```

## Key Features

✅ **Complete Role Isolation** - Each role has separate login, dashboard, and features
✅ **Protected Routes** - Unauthorized users redirected automatically
✅ **Clean Navigation** - Navbar updates based on user role
✅ **Session Management** - Users stay logged in using localStorage
✅ **Role Checking** - Easy role verification in components with useRole hook
✅ **Extensible** - Easy to add new roles or modify existing ones

## Common Tasks

### Add a Rider-Only Feature
```javascript
import RiderProtectedRoute from './components/RiderProtectedRoute';

// In App.jsx
<Route 
  path="/my-new-page" 
  element={
    <RiderProtectedRoute>
      <MyNewPage />
    </RiderProtectedRoute>
  } 
/>
```

### Check User Role in Component
```javascript
import { useRole } from '../context/RoleContext';

const { currentUser, hasRole } = useRole();

if (hasRole('admin')) {
  // Show admin-only content
}
```

### Logout User
```javascript
import { useRole } from '../context/RoleContext';

const { logout } = useRole();

<button onClick={logout}>Logout</button>
```

## File Locations

| Feature | File |
|---------|------|
| Role management | `src/context/RoleContext.jsx` |
| Route protection | `src/components/*ProtectedRoute.jsx` |
| Rider login | `src/pages/Login.jsx` |
| Rider registration | `src/pages/Register.jsx` |
| Organizer login | `src/pages/OrganizerLogin.jsx` |
| Admin login | `src/pages/AdminLogin.jsx` |
| Admin dashboard | `src/pages/AdminDashboard.jsx` |
| Organizer dashboard | `src/pages/OrganizerDashboard.jsx` |
| Navigation | `src/components/Navbar.jsx` |

## Next Steps

1. **Customize Credentials**: Update demo credentials in login pages
2. **Add New Features**: Create role-specific components
3. **Backend Integration**: Connect to actual authentication API
4. **Styling**: Customize colors and styling for each role
5. **Features**: Add role-specific functionality

## Tips

- Use `useRole()` hook in any component to get current user
- Protected routes automatically redirect unauthorized users to login
- localStorage stores user session (survives page refresh)
- Navbar automatically shows/hides links based on user role
- Each login page has demo credentials displayed

For detailed documentation, see `RBAC_IMPLEMENTATION.md`
