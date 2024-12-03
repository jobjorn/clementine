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

  // loop through the sieJSON object and make an array with all accounts, their names, IB, and UB
  const accounts = sieJSON.konto.map((konto) => {
    const ib = sieJSON.ib.find((ib) => ib.konto === konto.nr);
    const ub = sieJSON.ub.find((ub) => ub.konto === konto.nr);

    // add transaction sums from the transactionSums object to the account object
    // and round to 2 decimals
    const transactionSum =
      Math.round((transactionSums[konto.nr] ?? 0) * 100) / 100;

    return {
      nr: konto.nr,
      namn: konto.namn,
      ib: ib?.saldo ?? 0,
      ub: ub?.saldo ?? 0,
      transactionSum: transactionSum,
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
      <table>
        <thead>
          <tr>
            <th>Account number</th>
            <th>Account name</th>
            <th>IB</th>
            <th>UB</th>
            <th>Transactions</th>
            <th>IB-UB</th>
          </tr>
        </thead>
        <tbody>
          {nonZeroAccounts.map((account) => (
            <tr key={account.nr}>
              <td>{account.nr}</td>
              <td>{account.namn}</td>
              <td>{account.ib}</td>
              <td>{account.ub}</td>
              <td>{account.transactionSum}</td>
              <td>{account.ibub}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
