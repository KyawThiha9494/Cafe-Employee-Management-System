import React from 'react';
import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Welcome from './pages/Welcome';
import Employee from './pages/Employee';
import EmployeeForm from './pages/EmployeeForm';
import Cafe from './pages/Cafe';
import CafeForm from './pages/CafeForm';

const queryClient = new QueryClient();


const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet /> 
    </div>
  ),
});

const employee = createRoute({
  path: 'employee/$id',
  component: Employee,
  getParentRoute: () => rootRoute,
});


const employeeForm = createRoute({
  path: 'employee-form/$id', 
  component: EmployeeForm,
  getParentRoute: () => rootRoute,
});

const welcome = createRoute({
  path: '/',
  component: Welcome,
  getParentRoute: () => rootRoute,
});

const cafe = createRoute({
  path: 'cafe',
  component: Cafe,
  getParentRoute: () => rootRoute,
});

const cafeForm = createRoute({
  path: 'cafe-form/$id',
  component: CafeForm,
  getParentRoute: () => rootRoute,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([employee, employeeForm, cafe, welcome, cafeForm]),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
