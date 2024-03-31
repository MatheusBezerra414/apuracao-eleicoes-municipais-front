export interface CandidatosData {
    readonly _id: string;
  readonly nome: string;
  readonly partido: string;
  readonly cargo: string;
  readonly numero: string;
  readonly origem: {
    readonly uf: string;
    readonly cidade: string;
    readonly regiao: string;
  };
  readonly sexo: string;
  readonly isEleito: boolean;
  readonly votos: number;
}