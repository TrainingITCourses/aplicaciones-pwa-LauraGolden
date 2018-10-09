import { Agencia } from './agencia';

export interface Mision {
    id: number;
    name: string;
    type: number;
    agencies: Agencia[];
}
