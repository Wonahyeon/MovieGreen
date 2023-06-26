import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle/>
      <div>
        메인
      </div>
    </>
  );
}

export default App;
