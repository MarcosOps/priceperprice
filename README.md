## 

```
priceperprice/
├── src/
│   ├── screens/        # Telas do app
│   │   ├── HomeScreen.js
│   │   ├── CategoryScreen.js
│   │   ├── ComparisonScreen.js
│   ├── components/     # Componentes reutilizáveis
│   ├── App.js          # Arquivo principal do app
│   ├── navigation/     # Sistema de navegação
│   │   ├── StackNavigator.js
├── package.json        # Dependências do projeto
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