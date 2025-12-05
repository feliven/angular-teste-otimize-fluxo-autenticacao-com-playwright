import * as path from 'path';
import { expect } from '@playwright/test';

import { test } from './fixtures';
import PaginaCadastro from '../page-objects/PaginaCadastro';
import PaginaLogin from '../page-objects/PaginaLogin';
import { gerarPerfil } from '../operacoes/gerarPerfil';

export const testeLogado = test.extend<object, { arquivoInfoLogin: string }>({
  arquivoInfoLogin: [
    async ({ browser }, use) => {
      const id = test.info().parallelIndex;
      const caminhoArquivo = path.resolve(
        test.info().project.outputDir,
        `.auth/usuario-${id}.json`
      );

      const page = await browser.newPage({ storageState: undefined });
      const paginaCadastro = new PaginaCadastro(page);
      const paginaLogin = new PaginaLogin(page);
      const novoUsuario = gerarPerfil();

      await page.goto('http://localhost:4200/auth/cadastro');
      await paginaCadastro.cadastrarUsuario(novoUsuario);
      await expect(page).toHaveURL('http://localhost:4200/auth/login');

      await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
      await expect(page).toHaveURL('http://localhost:4200/home');

      await page.context().storageState({ path: caminhoArquivo });

      await use(caminhoArquivo);
    },
    { scope: 'worker' },
  ],
  storageState: ({ arquivoInfoLogin }, use) => {
    use(arquivoInfoLogin);
  },
});
