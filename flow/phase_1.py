from diagrams import Diagram, Edge
from diagrams.generic.blank import Blank
from diagrams.onprem.client import User
from diagrams.onprem.compute import Server
from diagrams.onprem.network import Internet
from diagrams.programming.framework import Flask
from diagrams.programming.language import Python
from diagrams.generic.device import Mobile

# Criando o diagrama
with Diagram("Workflow - Comparação de Preços por Unidade", show=False, direction="LR"):

    # Tela Principal
    tela_principal = Mobile("Tela Principal")  # Ícone de dispositivo móvel
    entrada_produto1 = User("Produto 1\n(Quantidade, Unidade, Preço)")  # Ícone de usuário para entrada de dados
    entrada_produto2 = User("Produto 2\n(Quantidade, Unidade, Preço)")  # Ícone de usuário para entrada de dados
    botao_calcular = Server("Botão 'Calcular'")  # Ícone de servidor para representar ação

    # Tela de Resultado
    tela_resultado = Internet("Tela de Resultado")  # Ícone de rede para representar a tela de resultado
    destaque_barato = Flask("Destaque Produto Mais Barato")  # Ícone de framework para destaque
    exibicao_preco_unidade = Python("Exibição Preço por Unidade")  # Ícone de linguagem para cálculo
    botao_nova_comparacao = Server("Botão 'Nova Comparação'")  # Ícone de servidor para ação

    # Fluxo do processo
    tela_principal >> Edge(label="Inserir dados") >> [entrada_produto1, entrada_produto2]
    [entrada_produto1, entrada_produto2] >> Edge(label="Clicar") >> botao_calcular
    botao_calcular >> Edge(label="Calcular") >> tela_resultado
    tela_resultado >> Edge(label="Exibir resultado") >> destaque_barato
    tela_resultado >> Edge(label="Exibir preço por unidade") >> exibicao_preco_unidade
    tela_resultado >> Edge(label="Resetar campos") >> botao_nova_comparacao
    botao_nova_comparacao >> Edge(label="Voltar") >> tela_principal