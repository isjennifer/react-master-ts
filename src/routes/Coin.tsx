import { Routes, Route, useLocation, useParams, useMatch } from "react-router";
import { Link } from "react-router-dom"
import { useQuery } from "react-query";
import styled, { ThemeProvider } from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { fetchInfoData } from "./api";
import { fetchPriceData } from "./api";
import { Helmet } from "react-helmet";
import { DefaultTheme } from "styled-components";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:first-child{
        font-size: 30px;
        font-weight: 100;
    }
    span:last-child{
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
    }
`;

const Img = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

const Title = styled.h1`
    font-size: 48px;
    margin-top: 10px;
    color : ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.textColor};
  color : ${props => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color : ${props => props.theme.bgColor};
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color: ${props => props.theme.textColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  color : ${props => props.theme.bgColor};
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => props.theme.textColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  a {
    display: block;
  }
`;

interface RouteParams {
    coinId: string,
}

interface RouteState {
    state:string;
}

interface IInfoData {
    id:string;
    name:string;
    symbol:string;
    rank:number;
    is_new:boolean;
    is_active:boolean;
    type:string;
    logo:string;
    description:string;
    message:string;
    open_source:boolean;
    started_at:string;
    development_status:string;
    hardware_wallet:boolean;
    proof_type:string;
    org_structure:string;
    hash_algorithm:string;
    first_data_at:string;
    last_data_at:string;
}


interface IPriceData {
    id:string;
    name:string;
    symbol:string;
    rank:number;
    circulating_supply:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes:{
        USD:{
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}


interface ICoinProps {

}

function Coin({}:ICoinProps) {
    const { coinId } = useParams<keyof RouteParams>();
    const { state } = useLocation() as RouteState;
    const chartMatch = useMatch("/:coinId/chart");
    const priceMatch = useMatch("/:coinId/price");
    const { isLoading:infoLoading , data:infoData } = useQuery<IInfoData>(["info",coinId], () => fetchInfoData(String(coinId)))
    const { isLoading:tickersLoading , data:tickersData } = useQuery<IPriceData>(
        ["tickers",coinId], 
        () => fetchPriceData(String(coinId)),
        {
            refetchInterval: 5000,
        }
        );
    const loading = infoLoading || tickersLoading
    return (
        <Container>
            <Helmet>
                <title>{state ? state : loading ? "Loading..." : infoData?.name}</title>
            </Helmet>
            <Header>
                <span><Link to={"/"}>&larr;</Link></span>
                <span>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`} />
                    <Title>{state ? state : loading ? "Loading..." : infoData?.name}</Title>
                </span>
            </Header>
            {loading ? <Loader>Loading...</Loader> : 
            <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>${infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price:</span>
                    <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
                </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total Suply:</span>
                    <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{tickersData?.max_supply}</span>
                </OverviewItem>
            </Overview>

            <Tabs>
                <Tab isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/chart`}>Chart</Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/price`}>Price</Link>
                </Tab>
            </Tabs>

            <Routes>
                <Route path="price" element={<Price coinId={coinId}/>}></Route>
            </Routes>
            <Routes>
                <Route path="chart" element={<Chart coinId={coinId}/>}></Route>
            </Routes>
            </>
        }
        </Container>
    )
    
}

export default Coin;