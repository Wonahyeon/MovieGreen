import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";

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
      <Header />
    </>
  );
}

export default App;
