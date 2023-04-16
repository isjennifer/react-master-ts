export default function fetchCoins() {
    return fetch("https://api.coinpaprika.com/v1/coins").then(
        response => response.json());
}

export function fetchInfoData(coinId:string) {
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(
        response => response.json());
}

export function fetchPriceData(coinId:string) {
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(
        response => response.json());
}
