import { Mision } from './mision';

export interface Lanzamiento {
    id: number;
    name: string;
    status: number;
    missions: Mision[];
}
