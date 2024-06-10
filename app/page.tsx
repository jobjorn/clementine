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

  const exampleSIE = `#FLAGGA 0
#FORMAT PC8
#SIETYP 4
#PROGRAM "Kapitas" 1.1
#GEN 20240610
#FNAMN "2010 Trots allt"
#VALUTA SEK
#RAR 0 20230101 20231231
#RAR -1 20220101 20221231
#KPTYP EUBAS97

#KONTO 1350 "Godfond"
#KONTO 1510 "Kundfordringar"
#KONTO 1650 "Momsfordran"
#KONTO 1671 "IOGT-NTO-f�rbundet"
#KONTO 1672 "UNF-distriktet"
#KONTO 1680 "Andra kortfristiga fordringar"
#KONTO 1910 "Kassa"
#KONTO 1920 "PlusGiro"
#KONTO 1930 "Swedbank"
#KONTO 2067 "Eget kapital vid �rets b�rjan"
#KONTO 2069 "�rets resultat"
#KONTO 2440 "Leverant�rsskulder"
#KONTO 2611 "Utg�ende moms p� f�rs�ljning inom Sverige, 25%"
#KONTO 2640 "Ing�ende moms"
#KONTO 2650 "Redovisningskonto f�r moms"
#KONTO 2820 "Utl�gg"
#KONTO 2821 "Mohammed Utl�gg"
#KONTO 2822 "Per Eric utl�gg"
#KONTO 2823 "Malin utl�gg"
#KONTO 2824 "Lisa Nordemo utl�gg"
#KONTO 2825 "Niklas utl�gg"
#KONTO 2826 "Jobj�rn utl�gg"
#KONTO 2890 "�vriga kortfristiga skulder"
#KONTO 3001 "Medlemsavgifter"
#KONTO 3002 "Pumpenvinst"
#KONTO 3003 "Deltagaravgifter"
#KONTO 3011 "S�kta bidrag"
#KONTO 3012 "Bidrag (IOGT-NTO-distriktet)"
#KONTO 3013 "Bidrag (UNF-f�rbundet)"
#KONTO 3101 "F�rs�ljning av varor inom Sverige, 25% moms"
#KONTO 3301 "F�rs�ljning tj�nster inom Sverige, 25% moms"
#KONTO 3740 "�res- och kronutj�mning"
#KONTO 3999 "�vriga int�kter"
#KONTO 4001 "Administration"
#KONTO 4002 "Extern verksamhet"
#KONTO 4003 "F�reningsfadder"
#KONTO 4004 "Opinionsbildning"
#KONTO 4005 "Pumpenfest"
#KONTO 4006 "Stor fest"
#KONTO 4007 "Styrelsen"
#KONTO 4008 "Verksamhet"
#KONTO 4009 "V�rvningsmaterial"
#KONTO 4101 "Ink�p I av handelsvaror A"
#KONTO 5400 "F�rbrukningsinventarier och f�rbrukningsmaterial (gruppkonto)"
#KONTO 5800 "Resekostnader (gruppkonto)"
#KONTO 6200 "Tele och post (gruppkonto)"
#KONTO 8999 "�rets resultat"

#IB 0 1350 40000.00
#UB 0 1350 40000.00
#IB 0 1930 38060.65
#UB 0 1930 38060.65
#IB 0 2067 -91798.93
#UB 0 2067 -91798.93
#IB 0 2069 15338.28
#UB 0 2069 15338.28
#IB 0 2821 0.00
#UB 0 2821 -300.00
#IB 0 2822 0.00
#UB 0 2822 -2274.40
#IB 0 2823 0.00
#UB 0 2823 0.00
#IB 0 2824 0.00
#UB 0 2824 -70.00
#IB 0 2825 0.00
#UB 0 2825 -3809.21
#IB 0 2826 0.00
#UB 0 2826 -5558.61
#IB 0 2890 -1600.00
#UB 0 2890 -1600.00
#RES 0 4002 161.24
#RES 0 4007 80.97
#RES 0 4008 11770.01


#VER "V" "1" 20231115 "Lisa teater"
{
#TRANS 2824 {} -770.00
#TRANS 4008 {} 770.00
}

#VER "V" "2" 20231212 "Lisa ICA"
{
#TRANS 2824 {} -158.55
#TRANS 4008 {} 158.55
}

#VER "V" "3" 20231213 "Lisa ICA"
{
#TRANS 2824 {} -45.00
#TRANS 4008 {} 45.00
}

#VER "V" "4" 20231217 "Lisa fika f�gels�ngen"
{
#TRANS 2824 {} -406.00
#TRANS 4008 {} 406.00
}

#VER "V" "5" 20230318 "Malin resa D�M"
{
#TRANS 2823 {} -39.00
#TRANS 4008 {} 39.00
}

#VER "V" "6" 20230318 "Malin SL"
{
#TRANS 2823 {} -39.00
#TRANS 4008 {} 39.00
}

#VER "V" "7" 20230318 "Malin resplus"
{
#TRANS 2823 {} -107.00
#TRANS 4008 {} 107.00
}

#VER "V" "8" 20230318 "Malin resplus"
{
#TRANS 2823 {} -107.00
#TRANS 4008 {} 107.00
}

#VER "V" "9" 20230318 "Malin resplus"
{
#TRANS 2823 {} -132.00
#TRANS 4008 {} 132.00
}

#VER "V" "10" 20230917 "Malin lidl"
{
#TRANS 2823 {} -85.70
#TRANS 4008 {} 85.70
}

#VER "V" "11" 20231217 "Mohamed fika"
{
#TRANS 2821 {} -327.00
#TRANS 4008 {} 327.00
}

#VER "V" "12" 20231202 "Mohammed pizza"
{
#TRANS 2821 {} -635.00
#TRANS 4008 {} 635.00
}

#VER "V" "13" 20230101 "Niklas Eurovision 2022 (f�r sent redovisat)"
{
#TRANS 2825 {} -836.00
#TRANS 4008 {} 836.00
}

#VER "V" "14" 20230418 "Niklas Nationsrunda"
{
#TRANS 2825 {} -415.00
#TRANS 4008 {} 415.00
}

#VER "V" "15" 20230524 "Niklas Nationsutg�ng"
{
#TRANS 2825 {} -823.00
#TRANS 4008 {} 823.00
}

#VER "V" "16" 20230531 "Niklas Grillkv�ll"
{
#TRANS 2825 {} -732.00
#TRANS 4008 {} 732.00
}

#VER "V" "17" 20230917 "Niklas Kick-off"
{
#TRANS 2825 {} -645.41
#TRANS 4008 {} 645.41
}

#VER "V" "18" 20231205 "Niklas Julmustprovning"
{
#TRANS 2825 {} -357.80
#TRANS 4008 {} 357.80
}

#VER "V" "19" 20230928 "Per Eric fika"
{
#TRANS 2822 {} -114.59
#TRANS 4008 {} 114.59
}

#VER "V" "20" 20230930 "Per Eric kanothyra"
{
#TRANS 2822 {} -1000.00
#TRANS 4008 {} 1000.00
}

#VER "V" "21" 20231107 "Per Eric te"
{
#TRANS 2822 {} -328.00
#TRANS 4008 {} 328.00
}

#VER "V" "22" 20231225 "Mohammed Julmust till Upplands (endast 300)"
{
#TRANS 2821 {} -300.00
#TRANS 4008 {} 300.00
}

#VER "V" "23" 20230619 "Jobj�rn->Mohammed trots allt bio"
{
#TRANS 2826 {} -499.00
#TRANS 2821 {} 499.00
}

#VER "V" "24" 20230628 "Jobj�rn->Per Eric"
{
#TRANS 2826 {} -1254.83
#TRANS 2822 {} 1254.83
}

#VER "V" "25" 20231025 "Jobj�rn->Malin"
{
#TRANS 2826 {} -424.00
#TRANS 2823 {} 424.00
}

#VER "V" "26" 20231211 "Jobj�rn->Mohammed trots allt Pizza"
{
#TRANS 2826 {} -635.00
#TRANS 2821 {} 635.00
}

#VER "V" "27" 20231219 "Jobj�rn->Lisa"
{
#TRANS 2826 {} -1309.55
#TRANS 2824 {} 1309.55
}

#VER "V" "28" 20231220 "Jobj�rn->Mohammed fika"
{
#TRANS 2826 {} -327.00
#TRANS 2821 {} 327.00
}

#VER "V" "29" 20231220 "Jobj�rn->Malin"
{
#TRANS 2826 {} -85.70
#TRANS 2823 {} 85.70
}

#VER "V" "30" 20230204 "Per Eric UL"
{
#TRANS 2822 {} -448.00
#TRANS 4008 {} 448.00
}

#VER "V" "31" 20230328 "Per Eric hantverkskv�ll + spelkv�ll"
{
#TRANS 2822 {} -111.90
#TRANS 2822 {} -105.72
#TRANS 4008 {} 217.62
}

#VER "V" "32" 20230331 "Per Eric spelkv�ll + skridskor"
{
#TRANS 2822 {} -180.20
#TRANS 2822 {} -166.80
#TRANS 4008 {} 347.00
}

#VER "V" "33" 20230602 "Styrelsem�te + v�rvning"
{
#TRANS 2822 {} -80.97
#TRANS 4007 {} 80.97
#TRANS 2822 {} -161.24
#TRANS 4002 {} 161.24
}

#VER "V" "34" 20230216 "Mohammed fyris"
{
#TRANS 2821 {} -499.00
#TRANS 4008 {} 499.00
}

#VER "V" "35" 20230702 "Per Eric ink�p av GT-dricka"
{
#TRANS 2822 {} -440.00
#TRANS 4008 {} 440.00
}

#VER "V" "36" 20231220 "Per Eric fika"
{
#TRANS 2822 {} -391.81
#TRANS 4008 {} 391.81
}

#VER "V" "37" 20230226 "Jobj�rn fika �rsm�te"
{
#TRANS 2826 {} -297.14
#TRANS 4008 {} 297.14
}

#VER "V" "38" 20231116 "Jobj�rn fika Pumpen"
{
#TRANS 2826 {} -521.40
#TRANS 4008 {} 521.40
}

#VER "V" "39" 20231004 "Jobj�rn kanelbullens dag spelvk�ll"
{
#TRANS 2826 {} -302.44
#TRANS 2826 {} 39.95
#TRANS 2826 {} 57.50
#TRANS 4008 {} 204.99
}


#IB -1 1350 40000.00
#UB -1 1350 40000.00
#IB -1 1671 1500.00
#UB -1 1671 0.00
#IB -1 1680 0.00
#UB -1 1680 0.00
#IB -1 1930 52423.03
#UB -1 1930 38060.65
#IB -1 2067 -96855.47
#UB -1 2067 -91798.93
#IB -1 2069 5056.54
#UB -1 2069 15338.28
#IB -1 2820 -524.10
#UB -1 2820 0.00
#IB -1 2890 -1600.00
#UB -1 2890 -1600.00
#RES -1 3003 -4250.00
#RES -1 3013 -5350.00
#RES -1 3999 -1200.00
#RES -1 4001 1807.00
#RES -1 4006 14362.00
#RES -1 4007 262.90
#RES -1 4008 9706.38
#RES -1 8999 -15338.28
`;

  const importedSIE = fs.readFileSync('public/SIE4 Exempelfil.SE', 'latin1');
  const sieJSON = convertSIEFileToJSON(importedSIE);
  console.log(sieJSON);

  return (
    <>
      <Typography variant="h1">Klementin</Typography>
    </>
  );
}
