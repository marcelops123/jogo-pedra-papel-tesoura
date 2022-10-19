import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";



export const RoutesComponents = () => {



    return (

        <Routes>
            <Route  path={'/'} element={<Main />} />

        </Routes>

    )
}