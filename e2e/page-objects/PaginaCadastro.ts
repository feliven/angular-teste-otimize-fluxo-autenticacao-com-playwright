import { Locator, Page, expect } from '@playwright/test';
import { Genero, Perfil } from '../operacoes/gerarPerfil';
import FormBaseCadastroEPerfil from './FormBaseCadastroEPerfil';

export default class PaginaCadastro {
  private readonly page: Page;
  private readonly formBase: FormBaseCadastroEPerfil;

  private readonly botaoVisitarPaginaCadastro: Locator;

  private readonly checkboxTermos: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formBase = new FormBaseCadastroEPerfil(page);

    this.botaoVisitarPaginaCadastro = page.getByTestId(
      'header-botao-cadastre-se'
    );

    this.checkboxTermos = page
      .getByTestId('form-base-checkbox-termos')
      .getByLabel('Li e aceito');
  }

  async visitar() {
    await this.page.goto('/');
    await this.botaoVisitarPaginaCadastro.click();
    await expect(this.page).toHaveURL('/auth/cadastro');
  }

  async marcarCheckboxAceite() {
    await this.checkboxTermos.check();
  }

  async cadastrarUsuario(usuario: Perfil) {
    await this.formBase.inserirNome(usuario.nome);
    await this.formBase.inserirDataNascimento(usuario.dataNascimento);
    await this.formBase.selecionarGenero(usuario.genero);
    await this.formBase.inserirCPF(usuario.cpf);
    await this.formBase.inserirTelefone(usuario.telefone);
    await this.formBase.inserirCidade(usuario.cidade);
    await this.formBase.inserirEstado(usuario.estado);
    await this.formBase.inserirEmail(usuario.email);
    await this.formBase.inserirSenha(usuario.senha);
    await this.formBase.inserirConfirmacaoEmail(usuario.email);
    await this.formBase.inserirConfirmacaoSenha(usuario.senha);
    await this.marcarCheckboxAceite();
    await this.formBase.clicarBotaoCadastrar();
  }

  async cadastroFeitoComSucesso() {
    await expect(this.page).toHaveURL('/auth/login');
  }

  async mostraMensagemErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem);
    await expect(elementoErro).toBeVisible();
  }
}
