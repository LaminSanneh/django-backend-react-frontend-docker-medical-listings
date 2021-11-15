import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MoleculesPage from './pages/MoleculesPage';
import NavBar from './components/NavBarComponent';
import NotFound from './pages/NotFound';
import MoleculePage from './pages/MoleculePage';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <NavBar />
            <Switch>
              <Route path="/" exact component={MoleculesPage} />
              <Route path="/molecules/:moleculeId" component={MoleculePage} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
