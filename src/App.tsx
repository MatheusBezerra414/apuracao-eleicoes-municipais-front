
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PageTabela } from './pages/tabela.pages';
import TabelaCandidatos from './components/tabelaCandidato';
import EditCandidato from './components/editCandidato';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageTabela />}>
            <Route index element={<TabelaCandidatos />} />
            <Route path="edit/:id" element={<EditCandidato />} />
            <Route path="create" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
