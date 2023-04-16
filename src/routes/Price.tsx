import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import styled from "styled-components";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

interface PriceProps {
    coinId: string | undefined;
}

interface ICoinHistory {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Price({coinId}:PriceProps) {
    const { isLoading, data } = useQuery<ICoinHistory[]>(["price",coinId],()=>fetchCoinHistory(coinId))
    return <div>{isLoading ? "Loading Price..." : 
        data?.map((price) => 
            <Overview>
                <OverviewItem>
                    <span>Date:</span>
                    <span>{new Date(price.time_close * 1000).toLocaleDateString()}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Open:</span>
                    <span>${price.open}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>High:</span>
                    <span>${price.high}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>low:</span>
                    <span>${price.low}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Close:</span>
                    <span>${price.close}</span>
                </OverviewItem>
            </Overview>
        )
    }</div>;
};

export default Price;