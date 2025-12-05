import * as path from 'path';
import { test } from './fixtures';

export const testeLogado = test.extend<object, { arquivoInfoLogin: string }>({
  arquivoInfoLogin: [
    async ({}, use) => {
      const id = test.info().parallelIndex;
      const caminhoArquivo = path.resolve(
        test.info().project.outputDir,
        `.auth/usuario-${id}.json`
      );
      await use(caminhoArquivo);
    },
    { scope: 'worker' },
  ],
  storageState: ({ arquivoInfoLogin }, use) => {
    use(arquivoInfoLogin);
  },
});
