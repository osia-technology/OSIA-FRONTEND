import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import ProtectedRoute from 'src/components/ProtectedRoute';
import SuspenseLoader from 'src/components/SuspenseLoader';
import SchoolDetails from 'src/content/applications/Schools/actions/SchoolDetails';
import EditSchool from 'src/content/applications/Schools/actions/EditSchool';
import EditClass from './content/applications/Classes/actions/EditClass';
import ClassDetails from './content/applications/Classes/actions/ClassDetails';
import StudentDetails from './content/applications/Students/actions/StudentDetails';
import EditStudent from './content/applications/Students/actions/EditStudent';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );


// Login

const Login = Loader(lazy(() => import('src/content/applications/Auth/Login/login')));

// Dashboards

const AdminHome = Loader(lazy(() => import('src/content/dashboards/dashboardAdmin')));

const School_OfficialHome = Loader(lazy(() => import('src/content/dashboards/dashboardSchoolManager')));

const StudentHome = Loader(lazy(() => import('src/content/dashboards/dashboardStudent')));

const Levels =  Loader(lazy(() => import('src/content/applications/Levels')))

const Subjects =  Loader(lazy(() => import('src/content/applications/Subjects')))


// Applications

const ChatBot = Loader(
  lazy(() => import('src/content/applications/ChatBot'))
);
const Schools = Loader(
  lazy(() => import('src/content/applications/Schools'))
);
const Classes = Loader(
  lazy(() => import('src/content/applications/Classes/index'))
);
const Specialities = Loader(
  lazy(() => import('src/content/applications/Specialities/index'))
);

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);


const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboard',
    element: <ProtectedRoute><SidebarLayout /></ProtectedRoute>,
    children: [
      {
        path: 'admin/home',
        element: <ProtectedRoute><AdminHome /></ProtectedRoute>
      },
      {
        path: 'chat',
        element: <ProtectedRoute><ChatBot /></ProtectedRoute>
      },
      {
        path: 'student/home',
        element: <ProtectedRoute><StudentHome /></ProtectedRoute>
      },
      {
        path: 'school_official/home',
        element: <ProtectedRoute><School_OfficialHome /></ProtectedRoute>
      }
    ]
  },
  
  {
    path: 'management',
    element: <ProtectedRoute><SidebarLayout /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <Navigate to="schools" replace />
      },
      {
        path: 'schools',
        element: <ProtectedRoute><Schools /></ProtectedRoute>
      },
      {
        path: 'schools/details/:school_id',
        element: <ProtectedRoute><SchoolDetails /></ProtectedRoute>
      },
      {
        path: 'schools/edit/:school_id',
        element: <ProtectedRoute><EditSchool /></ProtectedRoute>
      },
      {
        path: 'levels',
        element: <ProtectedRoute><Levels /></ProtectedRoute>
      },
      {
        path: 'specialities',
        element: <ProtectedRoute><Specialities /></ProtectedRoute>
      },
      {
        path: 'classes',
        element: <ProtectedRoute><Classes /></ProtectedRoute>
      },
      {
        path: 'classes/details/:class_id',
        element: <ProtectedRoute><ClassDetails /></ProtectedRoute>
      },
      {
        path: 'classes/edit/:class_id',
        element: <ProtectedRoute><EditClass /></ProtectedRoute>
      },
      {
        path: 'students/details/:student_id/:class_id',
        element: <ProtectedRoute><StudentDetails /></ProtectedRoute>
      },
      {
        path: 'students/edit/:student_id/:class_id',
        element: <ProtectedRoute><EditStudent /></ProtectedRoute>
      },
      {
        path: 'subjects',
        element: <ProtectedRoute><Subjects /></ProtectedRoute>
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <ProtectedRoute><UserProfile /></ProtectedRoute>
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
];

export default routes;
