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

  const importedSIE = fs.readFileSync('public/SIE4 Exempelfil.SE', 'latin1');
  const sieJSON = convertSIEFileToJSON(importedSIE);
  console.log(sieJSON);

  return (
    <>
      <Typography variant="h1">Klementin</Typography>
    </>
  );
}
