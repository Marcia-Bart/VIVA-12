# VIVA 12 — aplicativo pessoal

Aplicativo web instalável (PWA), em português, para acompanhar 12 áreas da vida, tarefas diárias, notas, rotina semanal, projetos e revisões.

## Publicar gratuitamente no GitHub Pages

1. Entre em https://github.com e crie uma conta, se ainda não tiver.
2. Clique em **New repository**.
3. Nome sugerido: `viva12`. Marque **Public** e crie o repositório.
4. Descompacte o arquivo ZIP. Envie os arquivos e pastas que estão dentro da pasta `viva12` para a raiz do repositório (não envie apenas o ZIP).
5. No GitHub, abra **Settings → Pages**.
6. Em **Build and deployment**, escolha **Deploy from a branch**.
7. Selecione **Branch: main** e **Folder: / (root)** e clique em **Save**.
8. Aguarde a publicação. O endereço será `https://SEU-USUARIO.github.io/viva12/`.

## Instalar no computador

1. Abra o endereço publicado no Chrome ou Edge.
2. Use o ícone de instalação na barra de endereço ou o botão **Instalar app** dentro do VIVA 12.
3. O aplicativo passa a abrir em janela própria.

## Instalar no celular

- **Android (Chrome):** abra o endereço HTTPS, menu ⋮ → **Instalar app** ou **Adicionar à tela inicial**.
- **iPhone/iPad (Safari):** abra o endereço HTTPS, Compartilhar → **Adicionar à Tela de Início**.

## Dados e privacidade

- Os dados ficam no armazenamento local do navegador/dispositivo.
- Não existe conta de usuário nem servidor de sincronização nesta versão.
- Exporte regularmente um backup em **Revisões → Exportar meus dados**.
- Para usar em mais de um dispositivo, faça backup e restaure no outro dispositivo. Sincronização automática exige backend/conta ou integração adicional.
- O app não envia seus dados para terceiros. O Google Fonts é carregado externamente para tipografia; pode ser removido do CSS para uso totalmente local.

## Google Agenda

A tela Agenda oferece um arquivo `.ics` básico para importar no Google Calendar. Revise os horários e o fuso ao importar. A sincronização bidirecional e lembretes confiáveis em segundo plano exigem integração com a API Google Calendar e autenticação OAuth, que não está incluída nesta versão.

## Limitações desta versão

- Protótipo PWA funcional, não aplicativo nativo publicado nas lojas.
- Notificações dependem das permissões e do suporte do navegador; não há agendamento garantido com o app fechado.
- Os dados não sincronizam automaticamente entre celular e computador.
- Os horários de estudos bíblicos de sábado e domingo aparecem como “tarde”, pois não foram informados horários exatos.
- A exportação `.ics` é um ponto de partida e deve ser revisada antes de importar.

## Personalização

Edite `app.js` para ajustar tarefas, notas e rotina; `styles.css` para cores e aparência; `manifest.webmanifest` para nome e ícones.
