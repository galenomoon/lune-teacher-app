# PWA - Progressive Web App

A aplicação Lune Professor agora é uma PWA completa seguindo o mesmo padrão do Lune Admin! 🎉

## Recursos Implementados

### ✅ Install Prompt
- Solicita ao usuário que instale o app
- Mostra automaticamente 3 segundos após o carregamento
- Pode ser descartado e mostrado novamente mais tarde

### ✅ Service Worker
- Cache de recursos estáticos
- Sincronização offline
- Página de offline customizada

### ✅ Manifest
- Informações da aplicação
- Ícones para diferentes tamanhos
- Screenshots para diferentes dispositivos
- Cor de tema personalizada

### ✅ Metadata
- Tags Meta para iOS
- Tags Meta para Android
- Viewport otimizado para dispositivos móveis

## Como Testar

### Desktop (Chrome/Edge)
1. Abra a aplicação em `http://localhost:3000`
2. Veja o botão de instalação na barra de endereço (canto superior direito)
3. Clique em "Instalar" ou aguarde 3 segundos para ver o prompt

### Android
1. Abra a aplicação no Chrome
2. Aguarde 3 segundos para ver o prompt de instalação
3. Clique em "Instalar" para adicionar à tela inicial

### iOS
1. Abra a aplicação no Safari
2. Toque em "Compartilhar" → "Adicionar à Tela inicial"
3. O app aparecerá com o ícone personalizado

## Estrutura de Arquivos

```
public/
├── manifest.json          # Configuração PWA
├── sw.js                  # Service Worker
├── offline.html           # Página offline
└── *.png                  # Ícones

hooks/
└── use-pwa.ts            # Hook para gerenciar PWA

components/
└── global/
    ├── pwa-install-prompt.tsx      # Componente do prompt
    └── service-worker-register.tsx # Registro do SW
```

## Funcionalidades Offline

Quando o usuário está offline:
- A página offline é exibida
- Um button "Tentar Novamente" permite recarregar
- Status de conexão é monitorado em tempo real
- Ao reconectar, a página é recarregada automaticamente

## Customização

### Mudar Cores e Nome
Edit `public/manifest.json`:
- `name`: Nome completo do app
- `short_name`: Nome curto (máx 12 caracteres)
- `theme_color`: Cor da barra de status
- `background_color`: Cor de fundo ao abrir

### Mudar Ícones
Substitua os arquivos em `public/`:
- `192x192.png`
- `256x256.png`
- `384x384.png`
- `512x512.png`

## 🔍 Debugging - Por que o Prompt não aparece?

Abra o DevTools (F12) e verifique os logs no console:

### ✅ Logs esperados (em ordem):

```
🔵 PWA Hook: Inicializando...
🔵 PWA Hook: Listeners registrados
✅ Event 'beforeinstallprompt' disparado!
✅ PWA é instalável! Prompt registrado.
PWA Status: { isInstallable: true, isInstalled: false, hasShownPrompt: false }
Preparando para mostrar PWA Install Prompt em 3 segundos...
Mostrando PWA Install Prompt!
```

### ❌ Problemas comuns e soluções:

**1. Event `beforeinstallprompt` não dispara**
- ❌ A app já está instalada
- ❌ Browser não suporta PWA
- ❌ Não é HTTPS (exceto localhost)
- ❌ Manifest.json inválido

**Solução:**
```javascript
// No DevTools Console:
// Verificar status
navigator.getInstalledRelatedApps().then(apps => console.log(apps))
// Desinstalar e recarregar
location.reload()
```

**2. `isInstalled: true` (mas não quer instalar)**
- App já está instalada
- **Solução:** Desinstale e recarregue

**3. `hasShownPrompt: true`**
- Prompt já foi mostrado
- **Solução:** Limpar localStorage ou nova sessão

**4. `isInstallable: false`**
- `beforeinstallprompt` não foi capturado
- **Solução:** Ver problema 1

### 🛠️ Checklist DevTools:

**Application → Manifest:**
- [ ] manifest.json está válido (sem erros)
- [ ] Ícones estão carregando (✓ verde)
- [ ] Colors configuradas (theme_color, background_color)
- [ ] start_url = "/"
- [ ] display = "standalone"

**Application → Service Workers:**
- [ ] SW está registrado
- [ ] Status = "activated and running"
- [ ] Scope = "/"

**Console:**
- [ ] Ver logs acima
- [ ] Sem erros vermelhos
- [ ] Verificar network tab para erros de recurso

## Próximas Melhorias

- [ ] Sincronização em background
- [ ] Notificações push
- [ ] Acesso à câmera offline
- [ ] Download de dados para acesso offline
