import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FrequencyData {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LatentAssociationData {}

export interface FrequencyRequest extends Request {
  body: {
    words: string[];
    // eslint-disable-next-line
    year_from: number;
    // eslint-disable-next-line
    year_to: number;
  };
}

export interface LatentAssociationRequest extends Request {
  body: {
    // eslint-disable-next-line
    concept_1: string[];
    // eslint-disable-next-line
    concept_2: string[];
    // eslint-disable-next-line
    year_from: number;
    // eslint-disable-next-line
    year_to: number;
  };
}
