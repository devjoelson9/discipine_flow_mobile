# 🔧 Instruções de Instalação

## Dependências Obrigatórias

O dashboard precisa de uma dependência adicional que não está no `package.json`:

### 1. Instalar expo-linear-gradient

```bash
npx expo install expo-linear-gradient
```

Se você não quer usar `expo-linear-gradient`, pode usar a versão alternativa do HeaderSection que usa apenas Tailwind CSS.

## Verificar Instalação

Depois de instalar, execute:

```bash
npm install
```

ou

```bash
yarn install
```

## Iniciar o App

```bash
npm start
```

Depois escolha a plataforma:

- `w` para web
- `a` para Android
- `i` para iOS

## 🎯 Testando o Dashboard

1. Depois que o app iniciar, navegue para `/dashboard`
2. Você deve ver:
   - Modal de onboarding (pode desativar no código)
   - Header com gradient azul
   - 4 cartões de estatísticas
   - Seção do timer
   - Resumo semanal

## ❌ Se encontrar erros

### Erro: "Cannot find module 'expo-linear-gradient'"

Solução: Execute `npx expo install expo-linear-gradient`

### Erro: "NativeWind not configured"

Solução: Certifique-se de que `nativewind` está configurado no seu projeto

### Erro: "Contexto de autenticação não encontrado"

Solução: Verifique se o `AuthProvider` está envolvendo a aplicação (ver `app/_layout.tsx`)

## 📱 Estrutura de Pastas Criadas

```
screens/
  └── dashboard/
      └── DashboardScreen.tsx

components/
  └── dashboard/
      ├── OnboardingModal.tsx
      ├── HeaderSection.tsx
      ├── StatsCards.tsx
      ├── TimerSection.tsx
      ├── WeeklySummarySection.tsx
      └── index.ts

app/
  └── dashboard.tsx
```

## 🔗 Links de Navegação no Dashboard

O dashboard possui os seguintes links:

- `/cadernos` - Página de cadernos
- `/cronograma` - Página de cronograma
- `/ajuda` - Página de ajuda
- `/configuracoes` - Página de configurações
- `/relatorios/semanal` - Relatórios semanais

Certifique-se de que essas rotas existem no seu projeto!

---

**Próximo passo**: Instale a dependência e teste no seu dispositivo! 🚀
