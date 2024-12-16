## STRUKTUR

/ - splash-sida, inloggning + val av företag/räkenskapsår
/overview - översikt över alla månader
/account/[account] - översikt över ett specifikt konto
/account/[account]/[month] - avstämningssida för specifik sida
/settings - inställningar
/month/[month] - översikt över en specifik månad
/group/[groupSlug] - översikt över en kontogrupp
/group/[groupSlug]/[month] - avstämningssida för kontogrupp

## DATABAS

Vi behöver lagra:

- Användare (kopior av Fortnox-datat)
- Behörigheter, vem som kan klarmarkera och vem som kan godkänna
- Avstämningsdata
  - Vilket belopp som stämts av (per konto och månad)
  - Bifogade filer
  - Om det är klarmarkerat/godkänt
- Kommentarer (på avstämningssidor)

## FÄRGER

Vår profilfärg: #DB7800

I tabeller:

- grön - #d4f3b8 - klarmarkerad och godkänd
- grön/röd-randig - godkänd med reservation ("fuck it"-knappen)
- blå - #9ddaf0 - automatiskt klarmarkerad
- gul - #fffdc1 - klarmarkerad
- röd - #f9b6b6 - påbörjad
- grå - ?? - ej påbörjad

Fortnox-profilgrön:

- på menyknappen - #003824
- i menyn - #003824
- i pagineringen - #007533

## TERMINOLOGI

Alternativ för godkännande-processen:

- förberedd + attesterad
- klarmarkerad + godkänd
- klar + attesterad

## Detaljer /overview

En riktigt fet tabell med massor av färger och shit
