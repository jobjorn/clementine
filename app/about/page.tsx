import { Typography } from '@mui/material';

export default async function Page() {
  return (
    <>
      <Typography variant="h1">Om Clementine</Typography>
      <Typography sx={{ marginY: 1 }} variant="body1">
        Herp derp, här kommer det stå något vettigt om Clementine.
      </Typography>
    </>
  );
}
