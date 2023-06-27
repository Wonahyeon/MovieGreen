import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import Signin from "./components/Signin";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background: #e9ecef;
    color: black;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle/>
      <Signin />

    </>
  );
}

export default App;
