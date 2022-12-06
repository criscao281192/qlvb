import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import Cases from "./pages/Cases";
import NewCase from "./pages/Cases/NewCase";
import NewCase2 from "./pages/Cases/NewCase2";
import Home from "./pages/Home";

const Container = styled.div`
  max-width: 1680px;
  margin: auto;
`;

const Main = styled.div`
  min-height: 1000px;
`;

function App() {
  return (
    <Router>
      <Main>
        <Header />
        <Container>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/quan-ly-van-ban/new">
              <NewCase />
            </Route>
            <Route path="/quan-ly-van-ban/edit/:id">
              <NewCase />
            </Route>
            <Route path="/quan-ly-van-ban/new2">
              <NewCase2 />
            </Route>
            <Route path="/quan-ly-van-ban/edit/:id">
              <NewCase2 />
            </Route>
            <Route path="/quan-ly-van-ban">
              <Cases />
            </Route>
          </Switch>
        </Container>
      </Main>
    </Router>
  );
}

export default App;
