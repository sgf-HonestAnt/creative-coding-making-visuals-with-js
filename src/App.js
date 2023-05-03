import styled from "styled-components";
import Boxes from "./pages/Boxes";
import Arc from "./pages/Arc";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CanvasContainer = styled.div``;

function App() {
  return (
    <Container>
      <CanvasContainer>
        <Boxes />
      </CanvasContainer>
      <CanvasContainer>
        <Arc />
      </CanvasContainer>
    </Container>
  );
}

export default App;
