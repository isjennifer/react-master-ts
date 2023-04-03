import styled from "styled-components";

const Title = styled.h1`
    color : ${props => props.theme.accentColor} 
`;

function Coins() {
    return <Title>Coinsss</Title>
}

export default Coins;