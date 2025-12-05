import { gerarPerfil, Perfil } from 'e2e/operacoes/gerarPerfil';
import { test } from '../setup/fixtures';
import PaginaCadastro from 'e2e/page-objects/PaginaCadastro';

test.describe('Página de cadastro', () => {
  let novoUsuario: Perfil;

  test.beforeEach(async ({ paginaCadastro }) => {
    await paginaCadastro.visitar();

    novoUsuario = gerarPerfil();
  });

  test('Deve conseguir fazer cadastro', async ({ paginaCadastro }) => {
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();
  });

  test('Não deve conseguir fazer cadastro com email duplicado', async ({
    paginaCadastro,
  }) => {
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();

    await paginaCadastro.visitar();

    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.mostraMensagemErro('E-mail já utilizado');
  });
});
