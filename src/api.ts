import axios from "axios";
import { CandidatosData } from "./interfaces/candidatos.inferface";
import { Regioes, Sexo } from "./utils/utils.enum";

const api = axios.create({
    baseURL: 'http://localhost:3001/candidatos'
})

export const apiService = {
    findAll: () => api.get('/'),
    findEleitos: () => api.get('/eleitos'),
    findEleitosRegiao: (regiao: Regioes) => api.get(`/eleitos/regiao?regiao=${regiao}`),
    findEleitosSexo: (sexo: Sexo) => api.get(`/eleitos/sexo?sexo=${sexo}`),
    findVereadoresEleitos: () => api.get('/eleitos/vereadores'),
    findPrefeitosEleitos: () => api.get('/eleitos/prefeitos'),
    findCandidatoById: (id: string) => api.get(`/${id}`),
    updateCandidato: (id: string, candidato: CandidatosData) => api.put<CandidatosData>(`/update/${id}`, candidato),
    create: (candidatos: CandidatosData[]) => api.post('/', candidatos),
}