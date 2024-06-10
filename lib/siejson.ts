// import fs from 'fs';
import { IB, Konto, Res, SIEjson, UB } from 'types/types';

export const convertSIEFileToJSON = (rawSIE: string): SIEjson => {
  const flaggaMatch = rawSIE.match(/#FLAGGA\s+(\d+)/);
  const flagga = flaggaMatch ? parseInt(flaggaMatch[1]) : 0;

  const programMatch = rawSIE.match(/#PROGRAM\s+"([^"]+)"\s+(\d+\.\d+)/);
  const program = programMatch ? programMatch[1] : '';

  const genMatch = rawSIE.match(/#GEN\s+(\d+)/);
  const gen = genMatch ? genMatch[1] : '';
  const genDate = new Date(
    parseInt(gen.substring(0, 4)),
    parseInt(gen.substring(4, 6)),
    parseInt(gen.substring(6, 8))
  );

  const fnamnMatch = rawSIE.match(/#FNAMN\s+"([^"]+)"/);
  const fnamn = fnamnMatch ? fnamnMatch[1] : '';

  const formatMatch = rawSIE.match(/#FORMAT\s+(\w+)/);
  const format = formatMatch ? formatMatch[1] : '';

  const kontoRows = rawSIE.match(/#KONTO\s+(\d+)\s+"([^"]+)"/g) || [];
  const konto: Konto[] = kontoRows.map((row) => {
    const [, nr, namn] = row.match(/#KONTO\s+(\d+)\s+"([^"]+)"/) || [];
    return {
      nr: parseInt(nr),
      namn
    };
  });

  const ubRows = rawSIE.match(/#UB\s+(\d+)\s+(\d+)\s+([\d.-]+)/g) || [];
  const ub: UB[] = ubRows.map((row) => {
    const [, årsnr, konto, saldo] =
      row.match(/#UB\s+(\d+)\s+(\d+)\s+([\d.-]+)/) || [];
    return {
      årsnr: parseInt(årsnr),
      konto: parseInt(konto),
      saldo: parseFloat(saldo)
    };
  });

  const ibRows = rawSIE.match(/#IB\s+(-?\d+)\s+(\d+)\s+([\d.-]+)/g) || [];
  const ib: IB[] = ibRows.map((row) => {
    const [, årsnr, konto, saldo] =
      row.match(/#IB\s+(-?\d+)\s+(\d+)\s+([\d.-]+)/) || [];
    return {
      årsnr: parseInt(årsnr),
      konto: parseInt(konto),
      saldo: parseFloat(saldo)
    };
  });

  const resRows = rawSIE.match(/#RES\s+(-?\d+)\s+(\d+)\s+([\d.-]+)/g) || [];
  const res: Res[] = resRows.map((row) => {
    const [, årsnr, konto, saldo] =
      row.match(/#RES\s+(-?\d+)\s+(\d+)\s+([\d.-]+)/) || [];
    return {
      årsnr: parseInt(årsnr),
      konto: parseInt(konto),
      saldo: parseFloat(saldo)
    };
  });

  const sieData: SIEjson = {
    flagga,
    program,
    gen: {
      datum: genDate
    },
    fnamn,
    format,
    konto,
    ub,
    ib,
    res
  };
  return sieData;
};
