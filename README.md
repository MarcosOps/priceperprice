# PricePerPrice App

A React Native app that helps users compare product prices based on different units of measurement.

## Project Structure

```
priceperprice/
├── App.js                  # Entry point that loads the main app component
├── README.md               # Project documentation
├── app.json                # Expo configuration file
├── flow/                   # Flow diagrams and planning files
│   ├── phase_1.png         # Visual diagram of phase 1 implementation
│   └── phase_1.py          # Python script for planning
├── navigation/             # Legacy navigation folder (not in use)
│   └── StackNavigator.js   # Legacy navigation configuration
├── package-lock.json       # NPM dependency lock file
├── package.json            # Project dependencies and scripts
└── src/                    # Main source code directory
    ├── components/         # Reusable UI components
    │   ├── ColoredTitle.js # Component for styled title text
    │   ├── ProductInputGroup.js # Component for product input fields (price, quantity, unit)
    │   └── ResultDisplay.js # Component for displaying comparison results
    ├── helpers/            # Utility functions and constants
    │   ├── format.js       # Functions for formatting currency and numbers
    │   ├── units.js        # Unit conversion definitions and comparison logic
    │   └── validation.js   # Input validation functions
    ├── screens/            # App screens
    │   ├── ConversionScreen.js # Main screen for price comparison
    │   └── SplashScreen.js # Initial loading screen
    └── styles/             # Style definitions
        └── styles.js       # Global styles for the app
```

### Para rodar o PricePerPrice (PPP) no seu ambiente de desenvolvimento usando Visual Studio Code, siga os passos abaixo:


1.Instalar Dependências

```
cd priceperprice
```

```
npm install
```

2. Iniciar o Projeto
```
npx expo start
```
Isso abrirá o Expo Developer Tools no navegador e mostrará um QR Code.


3. Testar no Celular

    Android/iOS: Instale o app Expo Go na Play Store ou App Store.
    Escaneie o QR Code com o Expo Go para rodar o app no celular.

Se estiver usando um emulador, verifique se ele está rodando antes de iniciar o app.

4. Testar no Emulador

Se quiser rodar no Android Emulator ou iOS Simulator:

    Android: Instale o Android Studio e ative um emulador.
    iOS: No Mac, use o Xcode para rodar o simulador.
```
npx expo start --android  # Para Android
npx expo start --ios      # Para iOS (somente no Mac)
```
ou usar essa alias:
```
alias limpa-npx='rm -rf .expo; rm -rf node_modules; npm install; npx expo start'
```

### ESTRUTURA  

#### FREE VERSION
Interface intuitiva: Uso de ícones para diferentes unidades e layout que destaque o preço por unidade.
Comparação de 2 produtos: Compara 2 produtos e exibir um ranking do mais barato ao mais caro.
Modo escuro: Adicione suporte a modo escuro para melhorar a experiência do usuário em ambientes com pouca luz.
Feedback visual: Destaque visualmente o produto mais barato com uma cor diferente ou um ícone de "melhor escolha".

#### PREMIUM VERSION
Comparação de mais de 2 produtos: Permitir inserir múltiplos produtos e exibir um ranking do mais barato ao mais caro.
Histórico de comparações: Para que o usuário possa consultar decisões anteriores.
Conversão automática de unidades: Se um produto está em kg e outro em g, o app faz a conversão automaticamente.
Modo scanner: Se quiser evoluir o app, um leitor de código de barras poderia preencher os valores automaticamente.
Gráficos de comparação: Mostre um gráfico simples para visualizar a diferença de preços entre os produtos.
Feedback visual: Destaque visualmente o produto mais barato com uma cor diferente ou um ícone de "melhor escolha".




#### Modo scanner
O modo scanner funciona usando a câmera do celular para capturar informações, geralmente por meio de um código de barras ou OCR (reconhecimento de texto). Existem duas formas principais que podem ser úteis para o PricePerPrice (PPP):

    Leitor de código de barras (UPC/EAN):
        O usuário aponta a câmera para o código de barras do produto.
        O app consulta um banco de dados (como OpenFoodFacts, GS1 ou supermercados locais) para obter informações como nome, quantidade e até o preço médio.
        Isso evita a necessidade de digitar os dados manualmente.

    Reconhecimento de texto (OCR):
        O app usa a câmera para ler e extrair informações diretamente de rótulos ou etiquetas de preço.
        Isso pode ajudar a preencher os campos de quantidade e valor sem precisar digitar.
        Pode ser útil em supermercados onde o preço está na prateleira e não no produto.


#### Categorias (Tela Inicial)

    Volume (ml, L, oz, gal) – Ícone de um copo ou garrafa.
    Length (cm, m, inch, ft) – Ícone de uma régua.
    Mass (mg, g, kg, lb, oz) – Ícone de um peso de balança.

#### Subcategorias (Após Seleção)


Lista simples (mais rápida de navegar)
        Exibe os nomes das unidades (exemplo: "ml", "L", "oz", "gal") em formato de botões ou radio buttons.
        Fácil de implementar e direto ao ponto.


Ícones representativos (mais visual e intuitivo)
        Cada subcategoria teria um pequeno ícone ao lado do nome (exemplo: "ml" com um conta-gotas, "kg" com um saco de arroz).
        Pode tornar a experiência mais interativa, mas exige mais design.

Se quiser, podemos começar com a lista simples e depois testar os ícones para ver se melhora a experiência. O que acha?

### tela de animacao:

Melhorias Futuras

    Personalização da Animação:

        Você pode adicionar animações mais complexas, como zoom, rotação ou transições.

    Carregamento de Dados:

        Se o app precisar carregar dados iniciais (como configurações ou dados do usuário), você pode fazer isso durante a exibição da tela de apresentação.

    Logotipo:

        Adicione um logotipo ou imagem à tela de apresentação para torná-la mais atraente.

    Tempo de Exibição:

        Ajuste o tempo de exibição da tela de apresentação conforme necessário.

## Key Files Documentation

### Core Files

#### `src/helpers/units.js`
Contains all unit conversion logic and product comparison functionality:
- `unitConversionRates`: Defines conversion factors for all supported units (volume, weight, quantity, area)
- `unitCategories`: Groups units by category for compatibility checking
- `units`: Exports all available units as a flat array
- `areUnitsCompatible`: Checks if two units can be compared (same category)
- `convertToBaseUnit`: Converts a value from one unit to its base unit
- `calculateBasePrice`: Calculates price per base unit for comparison
- `compareProducts`: Core function that compares two products and determines which is cheaper

#### `src/components/ProductInputGroup.js`
Handles user input for product comparison:
- Renders unit selection (custom modal picker for iOS, native picker for Android)
- Manages quantity and price inputs with proper formatting
- Handles platform-specific UI differences between iOS and Android

#### `src/components/ResultDisplay.js`
Displays the comparison results:
- Shows which product is cheaper and by what percentage
- Formats price differences and base unit prices
- Handles different result states (incompatible units, invalid input, same price)

#### `src/helpers/format.js`
Contains formatting utilities:
- `formatCurrency`: Formats numeric values as currency with proper symbols

#### `src/screens/ConversionScreen.js`
Main screen of the application:
- Manages state for product inputs (unit, quantity, price)
- Handles comparison logic and result display
- Implements keyboard dismissal and other UI interactions

### Configuration Files

#### `package.json`
Contains project metadata and dependencies:
- Expo SDK version (currently 53.0.0)
- React and React Native versions
- Other dependencies for UI components and functionality

#### `app.json`
Expo configuration file:
- Defines the entry point for the application

## Supported Units

The app currently supports the following unit categories:

### Volume
- ml (milliliter) - base unit
- L (liter) - 1 L = 1000 ml
- oz (fluid ounce) - 1 oz = 29.5735 ml
- gal (gallon) - 1 gal = 3785.41 ml

### Weight
- g (gram) - base unit
- mg (milligram) - 1 mg = 0.001 g
- kg (kilogram) - 1 kg = 1000 g
- lb (pound) - 1 lb = 453.592 g
- oz (weight) - 1 oz = 28.3495 g

### Quantity
- unit - base unit

### Area
- cm² (square centimeter) - base unit
- in² (square inch) - 1 in² = 6.4516 cm²
- ft² (square foot) - 1 ft² = 929.03 cm²
- yd² (square yard) - 1 yd² = 8361.27 cm²
- m² (square meter) - 1 m² = 10000 cm²
- acre - 1 acre = 40468564.224 cm²
- hectare - 1 hectare = 100000000 cm²

## Recent Improvements

### SDK Compatibility Update
- Updated Expo SDK from version 52 to 53 to ensure compatibility with the latest Expo Go app
- Updated related dependencies to maintain compatibility:
  - React from 18.3.1 to 19.0.0
  - React Native from 0.76.7 to 0.79.3
  - Other related packages to their compatible versions

### iOS-Specific Enhancements
- Implemented a custom picker for iOS that shows a modal with unit options for better user experience
- Added keyboard dismissal functionality when tapping outside inputs or pressing buttons
- Adjusted button positioning and layout for better iOS display
- Fixed styling issues specific to iOS devices

### Unit Conversion Improvements
- Added area units for comparison:
  - Square centimeters (cm²), square inches (in²), square feet (ft²)
  - Square yards (yd²), square meters (m²)
  - Larger area units: acres and hectares
- Ensured proper conversion factors between all units
- Improved validation to prevent division by zero errors

### UI and UX Improvements
- Enhanced result display with clearer percentage difference explanation
- Improved error messages for invalid inputs and incompatible units
- Fixed currency formatting and calculation issues
- Added platform-specific optimizations for both Android and iOS

### Documentation
- Updated project documentation with detailed explanations of each file and component
- Added comprehensive unit conversion reference
- Documented the project structure and key files
