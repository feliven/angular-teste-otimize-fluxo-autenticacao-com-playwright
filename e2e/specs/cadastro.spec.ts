import { gerarPerfil } from 'e2e/operacoes/gerarPerfil';
import { test } from '../setup/fixtures';

test.describe('Página de cadastro', () => {
  test('Deve conseguir fazer cadastro', async ({ paginaCadastro }) => {
    await paginaCadastro.visitar();

    const novoUsuario = gerarPerfil();

    console.log(novoUsuario);

    await paginaCadastro.inserirNome(novoUsuario.nome);
    await paginaCadastro.inserirDataNascimento(novoUsuario.dataNascimento);
    await paginaCadastro.selecionarGenero(novoUsuario.genero);
    await paginaCadastro.inserirCPF(novoUsuario.cpf);
    await paginaCadastro.inserirTelefone(novoUsuario.telefone);
    await paginaCadastro.inserirCidade(novoUsuario.cidade);
    await paginaCadastro.inserirEstado(novoUsuario.estado);
    await paginaCadastro.inserirEmail(novoUsuario.email);
    await paginaCadastro.inserirSenha(novoUsuario.senha);
    await paginaCadastro.inserirConfirmacaoEmail(novoUsuario.email);
    await paginaCadastro.inserirConfirmacaoSenha(novoUsuario.senha);
    await paginaCadastro.marcarCheckboxAceite();
    await paginaCadastro.clicarBotaoCadastrar();
    await paginaCadastro.cadastroFeitoComSucesso();
  });
});
