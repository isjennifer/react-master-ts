import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import fetchCoins from "./api";
import { Helmet } from "react-helmet";



const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
`;

const CoinsList = styled.ul`

`;

const Coin = styled.li`
    background-color: ${props => props.theme.textColor};
    color: ${props => props.theme.bgColor};
    margin-bottom: 15px;
    border-radius: 10px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in-out;
        display: flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
        transform: scale(1.1);
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor}
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;


interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

interface ICoinsProps {

}

function Coins({}:ICoinsProps) {
    const { isLoading, data } = useQuery<CoinInterface[]>("allcoins", fetchCoins)
    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>   
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (<Loader>Loading...</Loader>): 
                (<CoinsList>
                    {data?.slice(0,100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={ coin.name }>
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>))
                    }
                </CoinsList>)}
        </Container>
        )
}


export default Coins;