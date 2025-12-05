import { Locator, Page, expect } from '@playwright/test';
import { Genero } from 'e2e/operacoes/gerarPerfil';

export default class PaginaCadastro {
  private readonly page: Page;
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly campoDataNascimento: Locator;
  private readonly campoNome: Locator;
  private readonly campoCPF: Locator;

  //   private readonly radioFeminino: Locator;
  //   private readonly radioMasculino: Locator;
  //   private readonly radioNaoInformar: Locator;
  private readonly radiosGenero: { [chave in Genero]: Locator };

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

    const radioFeminino = page
      .getByTestId('form-base-radio-genero-feminino')
      .getByLabel('Feminino');
    const radioMasculino = page
      .getByTestId('form-base-radio-genero-masculino')
      .getByLabel('Masculino');
    const radioNaoInformar = page
      .getByTestId('form-base-radio-genero-nao-informar')
      .getByLabel('Prefiro não informar');

    this.radiosGenero = {
      [Genero.FEMININO]: radioFeminino,
      [Genero.MASCULINO]: radioMasculino,
      [Genero.OUTRO]: radioNaoInformar,
    };

    this.campoTelefone = page.getByTestId('form-base-input-telefone');
    this.campoCidade = page.getByTestId('form-base-input-cidade');
    this.campoEstado = page
      .getByTestId('form-base-container-estado')
      .getByLabel('Estado');

    this.campoEmail = page.getByTestId('form-base-input-email');
    this.campoSenha = page.getByTestId('form-base-input-senha');
    this.campoConfirmarEmail = page.getByTestId(
      'form-base-input-confirmar-email'
    );
    this.campoConfirmarSenha = page.getByTestId(
      'form-base-input-confirmar-senha'
    );

    this.checkboxTermos = page
      .getByTestId('form-base-checkbox-termos')
      .getByLabel('Li e aceito');
    this.botaoEnviarFormulario = page.getByTestId(
      'form-base-botao-submeter-form'
    );
  }

  async visitar() {
    await this.page.goto('/');
    await this.botaoVisitarPaginaCadastro.click();
    await expect(this.page).toHaveURL('/auth/cadastro');
  }

  async inserirNome(nome: string) {
    await this.campoNome.fill(nome);
  }

  async inserirDataNascimento(dataFormatoBR: Date) {
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    };

    const dataFormatoUS = dataFormatoBR.toLocaleDateString('en-US', options);

    await this.campoDataNascimento.fill(dataFormatoUS);
  }

  async selecionarGenero(opcao: Genero) {
    const radioGenero = this.radiosGenero[opcao];
    await radioGenero.check();

    // switch (opcao) {
    //   case 'FEMININO':
    //     await this.radiosGenero.check();
    //     break;

    //   case 'MASCULINO':
    //     await this.radioMasculino.check();
    //     break;

    //   case 'OUTRO':
    //     await this.radioNaoInformar.check();
    //     break;

    //   default:
    //     break;
    // }
  }

  async inserirCPF(cpf: string) {
    await this.campoCPF.fill(cpf);
  }

  async inserirTelefone(telefone: string) {
    await this.campoTelefone.fill(telefone);
  }

  async inserirCidade(cidade: string) {
    await this.campoCidade.fill(cidade);
  }

  async inserirEstado(estado: string) {
    await this.campoEstado.fill(estado);
  }

  async inserirEmail(email: string) {
    await this.campoEmail.fill(email);
  }

  async inserirSenha(senha: string) {
    await this.campoSenha.fill(senha);
  }

  async inserirConfirmacaoEmail(email: string) {
    await this.campoConfirmarEmail.fill(email);
  }

  async inserirConfirmacaoSenha(senha: string) {
    await this.campoConfirmarSenha.fill(senha);
  }

  async marcarCheckboxAceite() {
    await this.checkboxTermos.check();
  }

  async clicarBotaoCadastrar() {
    await this.botaoEnviarFormulario.click();
  }

  async cadastroFeitoComSucesso() {
    await expect(this.page).toHaveURL('/auth/login');
  }

  async estaMostrandoMensagemDeErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem);
    await expect(elementoErro).toBeVisible();
  }
}
