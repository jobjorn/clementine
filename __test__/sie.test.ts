const sie = require('../lib/sie-reader.js');

test('testing sie reader', async () => {
  await sie.readFile(
    '__test__/test.si',
    (
      err: any,
      data: {
        list: (arg0: string) => any;
        getKonto: (arg0: any) => any;
        getObjekt: (arg0: any, arg1: any) => any;
      }
    ) => {
      if (err) {
        console.log(err);
        expect(1).toBe(0); // fail test
        return;
      }
      // Använd data

      let fnamn = data.list('fnamn');
      expect(fnamn[0]['företagsnamn']).toBe('Testföretaget');
      var ver = data.list('ver');
      expect(ver.length).toBe(2);
      expect(ver[0].vernr).toBe('1');
      expect(ver[0].poster.length).toBe(6);
      expect(ver[0].poster[2].belopp).toBe('11025.00');
      var k = data.getKonto(ver[0].poster[2].kontonr);
      expect(k.kontonamn).toBe('Bank, checkräkningskonto');
      expect(k.kontoplan).toBe('EUBAS97');
      var o = data.getObjekt(
        ver[0].poster[2].objektlista[0].dimensionsnr,
        ver[0].poster[2].objektlista[0].objektnr
      );
      expect(o.objektnamn).toBe('Utbildning');
      expect(o.namn).toBe('Konsult Utbildning');
    }
  );
});
