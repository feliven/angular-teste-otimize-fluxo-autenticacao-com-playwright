import { testeLogado } from '../setup/testeLogado';

testeLogado.describe('Página de perfil', () => {
  testeLogado('Editar perfil 1', async ({ paginaPrincipal }) => {
    // fazer cadastro de um novo perfil
    // fazer login desse perfil
    // editar esse perfil
    await paginaPrincipal.visitar();
  });

  testeLogado('Editar perfil 2', async ({ paginaPrincipal }) => {
    // fazer cadastro de um novo perfil
    // fazer login desse perfil
    // editar esse perfil
    await paginaPrincipal.visitar();
  });
});
