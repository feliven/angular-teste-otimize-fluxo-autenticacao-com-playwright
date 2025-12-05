import { Locator, Page, expect } from '@playwright/test';

export default class PaginaCadastro {
  private readonly page: Page;
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly campoDataNascimento: Locator;
  private readonly campoNome: Locator;
  private readonly campoCPF: Locator;
  private readonly radioFeminino: Locator;
  private readonly radioMasculino: Locator;
  private readonly radioNaoInformar: Locator;
  private readonly campoTelefone: Locator;
  private readonly campoCidade: Locator;
  private readonly campoEstado: Locator;
  private readonly campoEmail: Locator;
  private readonly campoSenha: Locator;
  private readonly campoConfirmarEmail: Locator;
  private readonly campoConfirmarSenha: Locator;
  private readonly checkboxTermos: Locator;
  private readonly botaoEnviarFormulario: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botaoVisitarPaginaCadastro = page.getByTestId(
      'header-botao-cadastre-se'
    );
    this.campoNome = page.getByTestId('form-base-input-nome');
    this.campoDataNascimento = page.getByTestId(
      'form-base-input-data-nascimento'
    );
    this.campoCPF = page.getByTestId('form-base-input-cpf');
    this.radioFeminino = page.getByTestId('form-base-radio-genero-feminino');
    this.radioMasculino = page.getByTestId('form-base-radio-genero-masculino');
    this.radioNaoInformar = page.getByTestId(
      'form-base-radio-genero-nao-informar'
    );
    this.campoTelefone = page.getByTestId('form-base-input-telefone');
    this.campoCidade = page.getByTestId('form-base-input-cidade');
    this.campoEstado = page.getByTestId('form-base-container-estado');
    this.campoEmail = page.getByTestId('form-base-input-email');
    this.campoSenha = page.getByTestId('form-base-input-senha');
    this.campoConfirmarEmail = page.getByTestId(
      'form-base-input-confirmar-email'
    );
    this.campoConfirmarSenha = page.getByTestId(
      'form-base-input-confirmar-senha'
    );
    this.checkboxTermos = page.getByTestId('form-base-checkbox-termos');
    this.botaoEnviarFormulario = page.getByTestId(
      'form-base-botao-submeter-form'
    );
  }

  async visitar() {
    await this.page.goto('/');
    await this.botaoVisitarPaginaCadastro.click();
    await expect(this.page).toHaveURL('/auth/cadastro');
  }

  async estaMostrandoMensagemDeErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem);
    await expect(elementoErro).toBeVisible();
  }
}
