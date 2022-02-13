import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NoMatch from "./Pages/NoMatch";
import Subjects from "./Pages/Subjects/Subjects";

const token = localStorage.getItem('token');

const ArrayRoutes = [
    {
        path: '/',
        element: token ? <Dashboard /> : <Login /> ,
    },
    {
        path: '/signup',
        element: <SignUp /> ,
    },
    {
        path: '/Subjects',
        element: <Subjects /> ,
    },
    {
        path: '*',
        element: <NoMatch /> ,
    },
];
export default ArrayRoutes;