# Dashboard Screen - React Native

Este é o dashboard convertido de um template Laravel Blade para React Native com Expo.

## 📁 Estrutura de Arquivos

```
screens/
  └── dashboard/
      └── DashboardScreen.tsx      # Tela principal do dashboard

components/
  └── dashboard/
      ├── OnboardingModal.tsx      # Modal de onboarding (3 passos)
      ├── HeaderSection.tsx        # Seção de cabeçalho com gradient
      ├── StatsCards.tsx           # Cartões de estatísticas
      ├── TimerSection.tsx         # Seção do timer
      ├── WeeklySummarySection.tsx # Resumo semanal
      └── index.ts                 # Exportações
```

## 🚀 Como Usar

### 1. Adicionar a rota no seu layout (se necessário)

O arquivo `app/dashboard.tsx` já foi criado e exporta a tela automaticamente.

### 2. Navegar para o Dashboard

```typescript
import { useRouter } from "expo-router";

const router = useRouter();
router.push("/dashboard");
```

### 3. Personalizações Possíveis

#### Alterar cores dos gradientes

No `HeaderSection.tsx`:

```typescript
<LinearGradient
  colors={['#4f46e5', '#3b82f6']}  // Mude as cores aqui
  ...
/>
```

#### Conectar com API real

No `DashboardScreen.tsx`, substitua a função `loadDashboardData`:

```typescript
const loadDashboardData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // Atualizar estados com dados reais
  } catch (error) {
    console.error("Erro:", error);
  }
};
```

#### Usar dados do contexto de autenticação

```typescript
const { user, token } = useAuth();
// Usar user e token conforme necessário
```

## 📋 Funcionalidades Implementadas

✅ Seção de Onboarding com 3 passos  
✅ Header com informações da semana  
✅ Cartões de estatísticas (4 colunas)  
✅ Resumo de tempo de estudo (hoje/semana)  
✅ Status do timer  
✅ Resumo semanal por disciplina  
✅ Navegação com links (expo-router)  
✅ Responsividade para mobile

## 🔄 Fluxo de Dados

```
DashboardScreen (container)
├── OnboardingModal
├── HeaderSection
├── StatsCards
├── TimerSection
└── WeeklySummarySection
```

## 🎨 Tailwind Classes Usados

O projeto usa NativeWind para Tailwind CSS no React Native.

Classes principais:

- `rounded-*` - Bordas arredondadas
- `bg-*` - Cores de fundo
- `text-*` - Tamanho e estilo de texto
- `border` - Bordas
- `shadow-*` - Sombras
- `flex-*` - Layout flexível
- `gap-*` - Espaçamento entre itens
- `p-*` - Padding
- `m-*` - Margin

## 🔗 Dependências

O projeto precisa das seguintes dependências (que devem estar instaladas):

```
- expo-router
- expo-linear-gradient
- nativewind
- tailwindcss
- react-native-safe-area-context
```

## 💡 Próximos Passos

1. Conectar com API real
2. Adicionar funcionalidades do timer
3. Implementar compartilhamento de stories (se necessário)
4. Adicionar gráficos com react-native-chart-kit
5. Testar em dispositivos reais

---

**Convertido de**: dashboard.blade.php (Laravel Blade)  
**Data**: Maio 12, 2026














