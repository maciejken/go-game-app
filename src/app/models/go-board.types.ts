import { Color } from 'godash/types/board';

export type Player = Color;

export type Board = Array<Player | null>;

export type BoardSize = 9 | 13 | 19;
