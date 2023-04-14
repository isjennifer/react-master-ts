import {BrowserRouter, Routes, Route} from "react-router-dom"
import Coins from "./Coins"
import Coin from "./Coin"


function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/:coinId/*" element={<Coin />}></Route>
                <Route path="/" element={<Coins />}></Route>    
            </Routes>
        </BrowserRouter>
    )
}

export default Router;


/*
react v6 nested router 구현방법 : 
부모 route의 path 마지막에 /*를 적어 
명시적으로 이 route의 내부에서 nested route가 render 될 수 있음을 표시하고 
자식 route를 부모 route의 element 내부에 작성하는 방법
*/