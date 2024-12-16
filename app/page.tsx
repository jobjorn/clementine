import fs from 'fs';
//import { getSession } from '@auth0/nextjs-auth0';
import { Typography } from '@mui/material';
import { generateMonthlyOverview } from 'lib/helpers';
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
  const sie = convertSIEFileToJSON(importedSIE);
  //  console.log(sie);

  if (!sie) {
    return <Typography variant="h1">No SIE data found</Typography>;
  }

  if (!sie.ver) {
    return <Typography variant="h1">No SIE journals found</Typography>;
  }

  const monthlyOverview = generateMonthlyOverview(sie);

  // return in a pretty table

  return (
    <>
      <table className="overviewTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Konto</th>
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
          {monthlyOverview.map((account) => (
            <tr key={account.accountNumber}>
              <td>{account.accountNumber}</td>
              <td>{account.accountName}</td>
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
