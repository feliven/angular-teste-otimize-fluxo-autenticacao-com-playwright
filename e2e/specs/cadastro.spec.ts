import { gerarPerfil } from 'e2e/operacoes/gerarPerfil';
import { test } from '../setup/fixtures';
import { log } from 'console';

test.describe('Página de cadastro', () => {
  test('Deve conseguir fazer cadastro', async ({ paginaCadastro }) => {
    await paginaCadastro.visitar();

    const novoUsuario = gerarPerfil();

    console.log(novoUsuario);
  });
});
