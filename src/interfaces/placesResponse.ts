// Generated by https://quicktype.io

export interface PlacesReponse {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_es: string;
  language_es?: Language;
  place_name_es: string;
  text: string;
  language?: Language;
  place_name: string;
  bbox?: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface Context {
  id: string;
  wikidata?: string;
  text_es: string;
  language_es?: Language;
  text: string;
  language?: Language;
  short_code?: string;
}

export enum Language {
  Es = 'es',
  Fr = 'fr',
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  wikidata?: string;
  foursquare?: string;
  landmark?: boolean;
  address?: string;
  category?: string;
}
