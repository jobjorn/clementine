import fs from 'fs';
//import { getSession } from '@auth0/nextjs-auth0';
import { Typography } from '@mui/material';
import { convertSIEFileToJSON } from 'lib/siejson';
//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();

export default async function Page() {
  /*
  const session = await getSession();
  const user = session?.user ?? null;

  if (user) {
    // Add/update user in the Prisma database
    await prisma.user.upsert({
      where: { sub: user.sub },
      update: {
        name: user.name,
        email: user.email,
        picture: user.picture
      },
      create: {
        sub: user.sub,
        name: user.name,
        email: user.email,
        picture: user.picture
      }
    });
  }
  */

  const importedSIE = fs.readFileSync('public/SIE4 Exempelfil.SE', 'utf8');
  const sieJSON = convertSIEFileToJSON(importedSIE);
  //  console.log(sieJSON);

  if (!sieJSON) {
    return <Typography variant="h1">No SIE data found</Typography>;
  }

  if (!sieJSON.ver) {
    return <Typography variant="h1">No SIE journals found</Typography>;
  }

  if (sieJSON && sieJSON.ver && sieJSON.ver[0]) {
    console.log('sieJSON ver 0', sieJSON.ver[0]);
  }

  // loop through the #TRANS rows of all #VER blocks and make an array summing all transactions per kontonr
  const transactionSums =
    sieJSON.ver?.reduce((acc, ver) => {
      ver.trans.forEach((trans) => {
        if (!acc[trans.kontonr]) {
          acc[trans.kontonr] = 0;
        }
        acc[trans.kontonr] += trans.belopp;
      });
      return acc;
    }, {} as Record<string, number>) ?? {};

  console.log('transactionSums', transactionSums);

  // do the same thing again but per month and konto
  const transactionSumsPerMonth =
    sieJSON.ver?.reduce((acc, ver) => {
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

  // loop through the sieJSON object and make an array with all accounts, their names, IB, and UB
  const accounts = sieJSON.konto.map((konto) => {
    const ib = sieJSON.ib.find((ib) => ib.konto === konto.nr);
    const ub = sieJSON.ub.find((ub) => ub.konto === konto.nr);

    return {
      nr: konto.nr,
      namn: konto.namn,
      ib: ib?.saldo ?? 0,
      ub: ub?.saldo ?? 0,
      january: (ib?.saldo ?? 0) + (transactionSumsPerMonth[0]?.[konto.nr] ?? 0),
      february:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0),
      march:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0),
      april:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[3]?.[konto.nr] || 0),
      may:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[3]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[4]?.[konto.nr] || 0),
      june:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[3]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[4]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[5]?.[konto.nr] || 0),
      july:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[3]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[4]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[5]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[6]?.[konto.nr] || 0),
      august:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[3]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[4]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[5]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[6]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[7]?.[konto.nr] || 0),
      september:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[3]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[4]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[5]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[6]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[7]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[8]?.[konto.nr] || 0),
      october:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[3]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[4]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[5]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[6]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[7]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[8]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[9]?.[konto.nr] || 0),
      november:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[3]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[4]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[5]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[6]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[7]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[8]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[9]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[10]?.[konto.nr] || 0),
      december:
        (ib?.saldo ?? 0) +
        (transactionSumsPerMonth[0]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[1]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[2]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[3]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[4]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[5]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[6]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[7]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[8]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[9]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[10]?.[konto.nr] || 0) +
        (transactionSumsPerMonth[11]?.[konto.nr] || 0),

      ibub: Math.round(((ub?.saldo ?? 0) - (ib?.saldo ?? 0)) * 100) / 100
    };
  });

  // filter out all accounts where both ib and ub are 0
  const nonZeroAccounts = accounts.filter(
    (account) => account.ib !== 0 || account.ub !== 0
  );

  console.log('nonZeroAccounts', nonZeroAccounts);

  // return in a pretty table

  return (
    <>
      <table className="overviewTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Konto</th>
            <th className="currencyCell">IB</th>
            <th className="currencyCell">UB</th>
            <th className="currencyCell">January</th>
            <th className="currencyCell">February</th>
            <th className="currencyCell">March</th>
            <th className="currencyCell">April</th>
            <th className="currencyCell">May</th>
            <th className="currencyCell">June</th>
            <th className="currencyCell">July</th>
            <th className="currencyCell">August</th>
            <th className="currencyCell">September</th>
            <th className="currencyCell">October</th>
            <th className="currencyCell">November</th>
            <th className="currencyCell">December</th>
          </tr>
        </thead>
        <tbody>
          {nonZeroAccounts.map((account) => (
            <tr key={account.nr}>
              <td>{account.nr}</td>
              <td>{account.namn}</td>
              <td className="currencyCell">
                {account.ib.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.ub.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.january.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>

              <td className="currencyCell">
                {account.february.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>

              <td className="currencyCell">
                {account.march.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.april.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.may.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.june.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.july.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.august.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.september.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.october.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.november.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
              <td className="currencyCell">
                {account.december.toLocaleString('sv-SE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
