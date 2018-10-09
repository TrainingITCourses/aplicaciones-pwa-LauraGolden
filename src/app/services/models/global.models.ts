import { Lanzamiento } from '../../interfaces/lanzamiento';
import { Estado } from '../../interfaces/estado';
import { Mision } from '../../interfaces/mision';
import { Valores } from '../../interfaces/valores';
import { Agencia } from '../../interfaces/agencia';

export interface Global {
    lanzamientos: Lanzamiento[];
    estados: Estado[];
    agencias: Agencia[];
    misiones: Mision[];
    valores: Valores[];
    numLanzamientos: number;
  }

  export const globalInitialState: Global = {
    lanzamientos: [],
    estados: [],
    agencias: [],
    misiones: [],
    valores: [],
    numLanzamientos: 0,
  };
