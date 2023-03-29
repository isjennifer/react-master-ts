import styled from "styled-components";

interface ContainerProps {
    backgroundColor: string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.backgroundColor};
    border-radius: 100px;
    border: 3px solid ${(props) => props.borderColor};
`;

// optional props (선택적 props) : ? 붙이면 선택적 props가 됨(컴포넌트가 반드시 해당 props를 가지지 않아도 됨)
interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: string;
}

// borderColor ?? bgColor 의미 : Circle이 borderColor라는 prop을 가지고 있으면 borderColor 값을 주고, 없다면 bgColor 값을 준다.
function Circle({bgColor, borderColor, text = "default text"}:CircleProps) {
    return(
        <Container backgroundColor={bgColor} borderColor={borderColor ?? bgColor}>
            {text}
        </Container>
    );
}

export default Circle;