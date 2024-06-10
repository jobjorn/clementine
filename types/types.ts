export type Severity = 'error' | 'warning' | 'info' | 'success';

export interface StatusMessage {
  severity: Severity;
  message: string;
  timestamp: number;
}

export type IB = {
  årsnr: number;
  konto: number;
  saldo: number;
  kvantitet?: number;
};
export type UB = IB;
export type Res = IB;

export type Konto = {
  nr: number;
  namn: string;
};

export type Dim = {
  nr: number;
  namn: string;
};

export type Underdim = {
  nr: number;
  namn: string;
  dim: number;
};

export type Objekt = {
  dim: number;
  nr: string;
  namn: string;
};

export type Ver = {
  serie: string | number;
  vernr: number;
  verdatum: Date;
  vertext?: string;
  regdatum?: Date;
  sign?: string;
  trans: (Trans | RTrans | BTrans)[];
};

type Trans = {
  kontonr: string | number;
  objektlista: (string | number)[];
  belopp: number;
  transdat?: Date;
  transtext?: string;
  kvantitet?: number;
  sign?: string;
};

type RTrans = Trans;
type BTrans = Trans;

export type SIEjson = {
  flagga: number;
  program: string;
  format: string;
  gen: { datum: Date; sign?: string };
  sietyp?: 1 | 2 | 4 | '4i';
  fnamn: string;
  fnr?: string;
  orgnr?: string;
  adress?: string;
  rar?: string;
  kptyp?: string;
  ub: UB[];
  ib: IB[];
  res: Res[];
  konto: Konto[];
  dim?: Dim[];
  underdim?: Underdim[];
  objekt?: Objekt[];
  ver?: Ver[];
};
