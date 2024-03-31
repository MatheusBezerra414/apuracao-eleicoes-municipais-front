
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PageTabela } from './pages/tabela.pages';
import TabelaCandidatos from './components/tabelaCandidato';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<PageTabela />}>
                <Route index path="view" element={<TabelaCandidatos />} />
                <Route path="edit/:id" element={<App />} />
                <Route path="create" element={<App />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
