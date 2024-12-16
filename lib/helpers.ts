import { MonthlyOverview, SIEjson } from 'types/types';

export const generateMonthlyOverview = (sie: SIEjson): MonthlyOverview[] => {
  const transactionSumsPerMonth =
    sie.ver?.reduce((acc, ver) => {
      ver.trans.forEach((trans) => {
        let month = new Date(ver.verdatum).getMonth();
        console.log('month', month);
        console.log('verdatum', ver.verdatum);
        if (!acc[month]) {
          acc[month] = {};
        }
        if (!acc[month][trans.kontonr]) {
          acc[month][trans.kontonr] = 0;
        }
        acc[month][trans.kontonr] += trans.belopp;
      });
      return acc;
    }, {} as Record<number, Record<string, number>>) ?? {};

  console.log('transactionSumsPerMonth', transactionSumsPerMonth);

  const accounts = sie.konto.map((konto) => {
    const ib = sie.ib.find((ib) => ib.konto === konto.nr);

    const january =
      (ib?.saldo ?? 0) + (transactionSumsPerMonth[0]?.[konto.nr] ?? 0);
    const february = january + (transactionSumsPerMonth[1]?.[konto.nr] ?? 0);
    const march = february + (transactionSumsPerMonth[2]?.[konto.nr] ?? 0);
    const april = march + (transactionSumsPerMonth[3]?.[konto.nr] ?? 0);
    const may = april + (transactionSumsPerMonth[4]?.[konto.nr] ?? 0);
    const june = may + (transactionSumsPerMonth[5]?.[konto.nr] ?? 0);
    const july = june + (transactionSumsPerMonth[6]?.[konto.nr] ?? 0);
    const august = july + (transactionSumsPerMonth[7]?.[konto.nr] ?? 0);
    const september = august + (transactionSumsPerMonth[8]?.[konto.nr] ?? 0);
    const october = september + (transactionSumsPerMonth[9]?.[konto.nr] ?? 0);
    const november = october + (transactionSumsPerMonth[10]?.[konto.nr] ?? 0);
    const december = november + (transactionSumsPerMonth[11]?.[konto.nr] ?? 0);

    return {
      accountNumber: konto.nr,
      accountName: konto.namn,
      january,
      february,
      march,
      april,
      may,
      june,
      july,
      august,
      september,
      october,
      november,
      december
    };
  });

  // filter out all accounts where both ib and ub are 0
  const nonZeroAccounts = accounts.filter(
    (account) =>
      account.january !== 0 ||
      account.february !== 0 ||
      account.march !== 0 ||
      account.april !== 0 ||
      account.may !== 0 ||
      account.june !== 0 ||
      account.july !== 0 ||
      account.august !== 0 ||
      account.september !== 0 ||
      account.october !== 0 ||
      account.november !== 0 ||
      account.december !== 0
  );

  return nonZeroAccounts;
};
