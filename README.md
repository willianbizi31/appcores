# Cores com a Betina

App web educativo para ensinar cores para crianças, com foco nas cores principais e interação por toque + áudio.

## Rodar localmente

```bash
python3 -m http.server 4173
```

Abra: `http://localhost:4173`

## Publicar no GitHub Pages

Este repositório já inclui workflow em `.github/workflows/deploy-pages.yml`.

1. Faça push para o GitHub.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Source: GitHub Actions**.
4. Após o workflow finalizar, o app ficará disponível em:
   - `https://<seu-usuario>.github.io/<nome-do-repositorio>/`
