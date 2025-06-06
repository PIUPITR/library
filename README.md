# Knygų Biblioteka – Next.js Projektas

Tai yra [Next.js](https://nextjs.org) pagrindu sukurtas projektas, skirtas knygų kolekcijos valdymui. Šis projektas naudoja MongoDB duomenų bazę, Tailwind CSS ir Bootstrap stilių sistemas.

## Kaip pradėti naudotis projektu

### 1. Kaip atsisiųsti (klonuoti) projektą

1. Atidarykite savo kompiuteryje „Terminal“ (arba „Komandinę eilutę“).
2. Įrašykite šią komandą ir paspauskite Enter (vietoje `<jūsų-repozitorijos-nuoroda>` įrašykite nuorodą į šį projektą, pvz., iš GitHub):

   ```bash
   git clone <jūsų-repozitorijos-nuoroda>
   ```

3. Įeikite į projekto aplanką:

   ```bash
   cd library
   ```

### 2. Kaip įdiegti reikalingas bibliotekas

1. Įsitikinkite, kad jūsų kompiuteryje įdiegtas [Node.js](https://nodejs.org/) (rekomenduojama 20 versija ar naujesnė).
2. Projekte yra failas `package.json`, kuriame surašytos visos reikalingos bibliotekos.
3. Įrašykite vieną iš šių komandų (naudokite tik vieną, pvz., `npm install`):

   ```bash
   npm install
   # arba
   yarn install
   # arba
   pnpm install
   # arba
   bun install
   ```

   Ši komanda automatiškai atsisiųs ir įdiegs visas reikalingas bibliotekas.

### 3. Kaip sukonfigūruoti duomenų bazės prisijungimą

1. Sukurkite failą `.env.local` projekto šakniniame aplanke (`c:\Projects\library\library\.env.local`).
2. Į šį failą įrašykite savo MongoDB prisijungimo nuorodą. Pakeiskite `<naudotojas>`, `<slaptažodis>`, `<jūsų-klasterio-nuoroda>` ir, jei reikia, duomenų bazės pavadinimą:

   ```bash
   # c:\Projects\library\library\.env.local

   MONGODB_URI=mongodb+srv://<naudotojas>:<slaptažodis>@<jūsų-klasterio-nuoroda>/libraryDB?retryWrites=true&w=majority

   mongodb://localhost:27017/myDatabase
   MONGODB_URI="mongodb://localhost:27017/myDatabase"
   ```

### 4. Kaip paleisti projektą

1. Įrašykite vieną iš šių komandų (naudokite tik vieną):

   ```bash
   npm run dev
   # arba
   yarn dev
   # arba
   pnpm dev
   # arba
   bun dev
   ```

2. Atidarykite naršyklę ir įveskite adresą: [http://localhost:3000](http://localhost:3000)

### 5. Kaip naudotis programa

- Galite peržiūrėti knygų sąrašą, pridėti naujų knygų, redaguoti ar ištrinti esamas.
- Visi puslapiai yra lietuvių kalba ir pritaikyti paprastam naudojimui.

## Projekto struktūra

- `src/app/` – pagrindiniai puslapiai ir maršrutai.
- `src/app/api/` – API užklausų apdorojimas (backend).
- `src/lib/` – pagalbinės funkcijos (pvz., prisijungimas prie duomenų bazės).
- `src/models/` – duomenų modeliai (pvz., `Book.ts`).
- `public/` – statiniai failai (pvz., paveikslėliai).
- `tailwind.config.ts` – Tailwind CSS nustatymai.
- `.env.local` – aplinkos kintamieji (slapti duomenys).

## Dažniausios problemos

- Jei matote klaidą apie MongoDB prisijungimą – patikrinkite `.env.local` failą ir ar MongoDB veikia.
- Jei neišsaugojote bibliotekų – pakartokite `npm install` ar kitą diegimo komandą.
