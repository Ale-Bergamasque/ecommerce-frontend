import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import useUser from './hooks/useUser';
import Login from './pages/Login';
import Main from './pages/Main';
import MyProducts from './pages/MyProducts';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import RegisterProduct from './pages/RegisterProduct';
import SignUp from './pages/SignUp';

function ProtectedRoutes({ redirectTo }) {
    const { token } = useUser();

    return token ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRouter() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<SignUp />} />
            <Route path='/' element={<Main />} />
            <Route path='/produto/:id' element={<ProductDetail />} />
            <Route path='/not-found' element={<NotFound />} />

            <Route element={<ProtectedRoutes redirectTo={'/'} />}>
                <Route path='/meus-produtos' element={<MyProducts />} />
                <Route path='/registrar-produto' element={<RegisterProduct />} />
                <Route path='/editar-produto/:id' element={<RegisterProduct />} />
            </Route>
        </Routes>
    );
}

export default MainRouter;