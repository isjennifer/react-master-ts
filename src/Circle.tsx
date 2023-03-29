import styled from "styled-components";

// 5) interface로 backgroundColor의 proptype 지정
interface ContainerProps {
    backgroundColor: string;
}

// 6) backgroundColor를 받아옴
const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.backgroundColor};
    border-radius: 100px;
`;

// 3) interface로 bgColor의 proptype 지정해줌
interface CircleProps {
    bgColor: string;
}

// 2) App 에서 받아온 bgColor 라는 prop을 받음 
// 4) Container 에 backgroundColor 라는 prop으로 bgColor를 보냄
function Circle({bgColor}:CircleProps) {
    return(
        <Container backgroundColor={bgColor}>
        </Container>     
    );
}

export default Circle;