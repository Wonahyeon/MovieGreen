import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import Detail from "./components/Detail";

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
    </>
  );
}

export default App;
