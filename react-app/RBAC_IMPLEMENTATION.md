# Role-Based Access Control (RBAC) Implementation

## Overview

This document outlines the role-based access control system implemented in the Bike Tours application. The system supports three distinct user roles with specific permissions and access restrictions.

## Implemented Roles

### 1. **Rider** 👥
**Purpose:** Regular users who want to book and register for bike tours.

**Permissions:**
- View all available rides
- Register for rides
- View their registrations
- Access booking/registration pages

**Access Rules:**
- Can access: Home, Rides listing, Booking pages, My Registrations
- Restricted from: Organizer Dashboard, Admin Dashboard
- Login: `/login` (Rider Login)
- Registration: `/register`

**Demo Credentials:**
- Email: `user@example.com` (after registration)
- Password: Any password set during registration

---

### 2. **Organizer** 🏍️
**Purpose:** Users who create and manage bike tours/rides.

**Permissions:**
- Create and edit their own rides
- Manage ride details
- View registered riders
- Access organizer-specific features

**Access Rules:**
- Can access: Organizer Dashboard, Manage Rides, View Registered Riders
- Restricted from: Rider booking pages (they manage instead of book), Admin Dashboard
- Login: `/organizer/login` (Organizer Login)

**Demo Credentials:**
- Organizer Name: `Demo Organizer`
- Password: `organizer123`

---

### 3. **Admin** 🔐
**Purpose:** System administrators who manage all aspects of the platform.

**Permissions:**
- View all users and rides
- Manage all bookings
- Access system settings
- View analytics and statistics
- Control application features

**Access Rules:**
- Can access: Everything on the platform
- Restricted from: Regular booking/registration flows
- Login: `/admin/login` (Admin Login)

**Demo Credentials:**
- Email: `admin@biketours.com`
- Password: `admin123`

---

## Architecture

### File Structure

```
src/
├── context/
│   └── RoleContext.jsx              # Role management context
├── components/
│   ├── RoleProtectedRoute.jsx       # Base protected route component
│   ├── RiderProtectedRoute.jsx      # Rider-specific protected route
│   ├── OrganizerProtectedRoute.jsx  # Organizer-specific protected route
│   ├── AdminProtectedRoute.jsx      # Admin-specific protected route
│   └── Navbar.jsx                   # Updated with role-based navigation
├── pages/
│   ├── Login.jsx                    # Rider login
│   ├── Register.jsx                 # Rider registration
│   ├── OrganizerLogin.jsx          # Organizer login
│   ├── AdminLogin.jsx              # Admin login
│   ├── AdminDashboard.jsx          # Admin panel
│   ├── OrganizerDashboard.jsx      # Organizer panel
│   └── ...
└── App.jsx                          # Main app with role provider
```

### RoleContext

The `RoleContext` provides centralized role management:

```javascript
useRole() // Hook to access role functions and current user

// Available functions:
- loginRider(userData)      // Set user as rider
- loginOrganizer(userData)  // Set user as organizer
- loginAdmin(userData)      // Set user as admin
- logout()                  // Clear current user
- hasRole(role)            // Check if user has specific role
- hasAnyRole(roles)        // Check if user has any of specified roles
```

### Protected Routes

Each role has a dedicated protected route component:

```javascript
{/* Rider-only route */}
<Route 
  path="/booking/:id" 
  element={
    <RiderProtectedRoute>
      <Booking />
    </RiderProtectedRoute>
  } 
/>

{/* Organizer-only route */}
<Route 
  path="/organizer" 
  element={
    <OrganizerProtectedRoute>
      <OrganizerDashboard />
    </OrganizerProtectedRoute>
  } 
/>

{/* Admin-only route */}
<Route 
  path="/admin/dashboard" 
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  } 
/>
```

---

## Authentication Flow

### Rider Registration & Login
1. User fills registration form at `/register`
2. Data is stored with `role: 'rider'`
3. Redirected to `/login`
4. After login, user can access rider features

### Organizer Login
1. User navigates to `/organizer/login`
2. Enters organizer credentials
3. Successfully logged-in users access `/organizer` dashboard
4. Can manage rides and view registered riders

### Admin Login
1. User navigates to `/admin/login`
2. Enters admin credentials
3. Successfully logged-in users access `/admin/dashboard`
4. Full system access granted

---

## Data Storage

User data is stored in localStorage with role information:

```javascript
// Rider
localStorage.setItem('riderUser', JSON.stringify({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  role: 'rider'
}))

// Organizer
localStorage.setItem('organizerUser', JSON.stringify({
  organizerName: 'Demo Organizer',
  email: 'demo@biketours.com',
  role: 'organizer',
  loginTime: '2026-02-26T...'
}))

// Admin
localStorage.setItem('adminUser', JSON.stringify({
  email: 'admin@biketours.com',
  role: 'admin',
  loginTime: '2026-02-26T...'
}))
```

---

## Navigation by Role

The Navbar automatically displays different links based on user role:

| Link | Rider | Organizer | Admin | Unauthenticated |
|------|-------|-----------|-------|-----------------|
| Home | ✅ | ✅ | ✅ | ✅ |
| Register | ❌ | ❌ | ❌ | ✅ |
| Rider Login | ❌ | ❌ | ❌ | ✅ |
| My Registrations | ✅ | ❌ | ❌ | ❌ |
| Organizer Login | N/A | ❌ | ❌ | ✅ |
| Organizer Dashboard | ❌ | ✅ | ❌ | ❌ |
| Admin Login | ❌ | ❌ | ❌ | ✅ |
| Admin Dashboard | ❌ | ❌ | ✅ | ❌ |

---

## Access Control Rules

### Route Restrictions

```
Rider can access:
  - / (Home)
  - /register
  - /login
  - /booking/:id (Protected)
  - /my-registrations (Protected)

Organizer can access:
  - / (Home)
  - /organizer/login
  - /organizer (Protected)

Admin can access:
  - / (Home)
  - /admin/login
  - /admin/dashboard (Protected)
```

### Feature-Level Access

```javascript
// In components, use the useRole hook
const { currentUser, hasRole } = useRole();

// Check current role
if (hasRole('rider')) {
  // Show rider-only features
}

if (hasRole('organizer')) {
  // Show organizer-only features
}

if (hasRole('admin')) {
  // Show admin-only features
}
```

---

## Security Considerations

### Current Implementation (Development)
- Credentials stored in localStorage (client-side)
- Admin credentials hardcoded for demo purposes
- No actual backend validation

### Production Recommendations
1. **Backend Authentication**
   - Implement proper JWT/session-based authentication
   - Validate credentials against secure database
   - Use secure password hashing (bcrypt, argon2)

2. **Token Management**
   - Implement refresh tokens
   - Add token expiration
   - Secure token storage

3. **HTTPS**
   - All communications over HTTPS
   - Secure cookies with httpOnly flag

4. **Role Validation**
   - Verify user role on every protected route request
   - Implement role-based API endpoints on backend
   - Validate permissions server-side

5. **Audit Logging**
   - Log all admin actions
   - Track role changes
   - Monitor unauthorized access attempts

---

## Usage Examples

### Creating a Rider-Protected Feature

```javascript
import RiderProtectedRoute from './components/RiderProtectedRoute';

// In App.jsx
<Route 
  path="/my-custom-page" 
  element={
    <RiderProtectedRoute>
      <MyCustomPage />
    </RiderProtectedRoute>
  } 
/>
```

### Using Role Information in Components

```javascript
import { useRole } from '../context/RoleContext';

function MyComponent() {
  const { currentUser, hasRole, logout } = useRole();

  if (!currentUser) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <p>Welcome, {currentUser.email}</p>
      <p>Your role: {currentUser.role}</p>
      
      {hasRole('rider') && <p>Rider features here</p>}
      {hasRole('organizer') && <p>Organizer features here</p>}
      {hasRole('admin') && <p>Admin features here</p>}
      
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Checking Multiple Roles

```javascript
const { hasAnyRole } = useRole();

// Check if user is organizer or admin
if (hasAnyRole(['organizer', 'admin'])) {
  // Show management features
}
```

---

## Testing the System

### Test Rider Flow
1. Go to `/register`
2. Fill the registration form
3. Login at `/login` with registered credentials
4. Access rider features like My Registrations

### Test Organizer Flow
1. Go to `/organizer/login`
2. Enter credentials: `Demo Organizer` / `organizer123`
3. Access organizer dashboard at `/organizer`
4. Manage rides and view registered riders

### Test Admin Flow
1. Go to `/admin/login`
2. Enter credentials: `admin@biketours.com` / `admin123`
3. Access admin dashboard at `/admin/dashboard`
4. View system statistics and manage all aspects

### Test Access Control
1. Login as Rider
2. Try accessing `/admin/dashboard` (should redirect)
3. Logout and login as Admin
4. Access should be granted

---

## Future Enhancements

- [ ] Backend API integration for role validation
- [ ] JWT-based authentication
- [ ] Role-based API permissions
- [ ] Dynamic permission system
- [ ] Two-factor authentication
- [ ] OAuth integration
- [ ] Audit logging system
- [ ] Role management UI for admins
- [ ] Permission matrix customization

---

## Troubleshooting

### User logged in but redirect to login page
- Check if RoleContext is wrapping the entire app
- Verify localStorage entries are being set correctly
- Check browser console for errors

### Navigation links not showing correctly
- Ensure Navbar is using the updated useRole hook
- Check if currentUser is being set properly
- Verify role values match exactly ('rider', 'organizer', 'admin')

### Protected routes not working
- Verify the protected route component exists
- Check if route is properly wrapped with ProtectedRoute
- Ensure RoleProvider wraps all routes in App.jsx

---

## Support

For issues or questions, refer to the relevant component documentation or check the browser console for error messages.
