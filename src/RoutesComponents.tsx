import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import 'antd/dist/antd.css';


export const RoutesComponents = () => {



    return (

        <Routes>
            <Route path={'/main'} element={<Main />} />
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/'} element={<Login />} />
        </Routes>

    )
}