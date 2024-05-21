// SemestersScreen.js
import { React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
  Modal,
  TextInput,
  Button,
} from "react-native";
import * as Print from "expo-print"; // Importação do Expo Print
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

const coursesData = {
  "Língua Inglesa e Literatura": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Lingua Inglesa Basico I",
        "Prática Pedagógica I",
        "Núcleo de Estudos Científicos",
        "Aspectos Históricos e Culturais",
        "Filosofia da Linguagem",
        "Lingua Inglesa Instrumental",
        "Políticas e Organização do Sis...",
      ],
      "Segundo Semestre": [
        "Língua Inglesa Básico II",
        "Prática Pedagógica II",
        "Núcleo de Estudos Científicos e Interd. II",
        "Teorias da Aprendizagem da Linguagem",
        "Teoria Literária",
        "Estudos Linguísticos I",
        "Estudos Fonéticos e Fonológicos I",
      ],
      "Terceiro Semestre": [
        "Lingua Inglesa Intermediário I",
        "Prática Pedagógica III",
        "Núcleo de Estudos Científicos Interd. III",
        "Teoria de Aquisição de L2 e L...",
        "Let. Lit. e Literatura Infanto-Juvenil",
        "Estudos Linguísticos II",
        "Estudos Fonéticos e Fonoógicos II",
      ],
      "Quarto Semestre": [
        "Lingua Inglesa Intermed. II",
        "Prática Pedagógica IV",
        "Núcleo de Estudos Científicos e Interd. IV",
        "Cultura e Literatura Negras e Indígenas",
        "Estudos Literários I: Narrativ...",
        "Estudos de Morfossintaxe em Li...",
      ],
      "Quinto Semestre": [
        "Lingua Inglesa Intermed. III",
        "Prática Pedagógica V",
        "Estágio Curricular Supervisionado I",
        "Núcleo de Estudos Científicos e Interd. V",
        "Libras",
        "Estudos Literários II: Poesia",
        "Linguística Aplicada",
      ],
      "Sexto Semestre": [
        "Lingua Inglesa Avançado I",
        "Estágio Curricular Supervisionado II",
        "Núcleo de Estudos Científicos e Interd. VI",
        "Tec. Dig. da Inf. e da Comunicação Aplicada",
        "Estudos Literários III: Teatro",
        "Análise de Discurso",
        "Compreensão e Produção Oral em Língua Inglesa",
      ],
      "Sétimo Semestre": [
        "Lingua Inglesa Avançado II",
        "Estágio Curricular Supervisionado III",
        "TCC I",
        "Estudos Contemp. da Literatura em Lingua Inglesa",
        "Compreensão e Produção Esc. em Lingua Inglesa",
        "Estudos da Tradução",
      ],
      "Oitavo Semestre": [
        "Lingua Inglesa Avançado III",
        "Estágio Curricular Avançado IV",
        "TCC II",
        "Literatura Comparada e Outras Artes",
        "English for Especific Purpose",
      ],
    },
  },
  História: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "História Indígena",
        "Teoria E Metodologia Da História",
        "Sociologia",
        "Antropologia",
        "História Da Bahia Processo De ...",
        "Estudo De Antiguidades",
        "Metodologia Do Estudo E Da Pesquisa",
        "História Da Educação",
        "Sociologia Da Educação",
        "Laboratório De Ensino De História",
      ],
      "Segundo Semestre": [
        "Estud Do Bra Colônia: Poder, E ...",
        "História Da Bahia",
        "História Do Brasil E Escravidão",
        "História Da Europa Medieval",
        "História Da Arte Na Idade Média",
        "Lab De Ensino De História Ii",
        "Historiografia",
        "Sociologia Do Trabalho",
        "Pensamento Negro E Anti-racismo",
        "Produção Textual",
        "História Da América: Pré-colombo",
      ],
      "Terceiro Semestre": [
        "Brasil Império",
        "Literatura E Identidade Nacional",
        "A Cidade Medieval",
        "Cidade Renascentista",
        "História Das Nações Americanas",
        "Antrop Sobre O Negro Como Obje...",
        "Filosofia",
        "Filosofias Da História",
        "Educação Especial",
        "Laboratório De Ens. De Hist. Iii",
        "História Ibérica",
        "Hist Da Saúde E Da Doença No Brasil",
      ],
      "Quarto Semestre": [
        "Brasil Império: Leit. Sobre Escravidão",
        "Historiografia Do Brasil Colônia",
        "Renasc Maneirismo E Barroc Eur...",
        "Hist. Da América Latina No Presente",
        "História Social Inglesa",
        "História Cultural",
        "Hist Do Conhec. Cient., Social E Hu...",
        "Introd Teórica E Metod. Ao Pens. Ma...",
        "Transição Para A Modernidade",
        "História Moderna E História Oral",
        "Hist. Do Trab: Questões Teó. E Met...",
        "Libras",
        "Lab De Ensino De História Iv",
        "História, Política E Gestão Ed",
        "Didática",
      ],
      "Quinto Semestre": [
        "Europa Moderna: Socied, Eco. E Pol...",
        "História Da Europa Moderna",
        "História Do Trabalho No Brasil",
        "Lab. Do Ensino De História Iv",
        "Pesquisa Histórica I",
        "Novas Tecnologias Em Educação",
        "áfrica I",
        "Estágio Supervisionado I",
        "Introd Ao Pensamento Marxista",
      ],
      "Sexto Semestre": [
        "Estágio Supervisionado Ii",
        "Lab. De Ensino De História Vi",
        "Brasil República: Estado E Mov. Sociail",
        "Eur: O Longo Século Xix 1789-1914",
        "áfrica Ii",
        "Pesquisa Histórica Ii",
        "Estudos Do Feudalismo Ao Capit.",
        "Sociologia Urbana",
      ],
      "Sétimo Semestre": [
        "Pesquisa Histórica Iii",
        "Brasil República: Trab., Naciodes E Pop...",
        "Europa: O Breve Século Xx",
        "História Da Europa No Tempo Presente",
        "áfrica Iii",
        "Hist. Da África: Problem De Mét...",
        "Cultura Documental E Patrimonio I",
        "Lab. De Ensino De História Vii",
        "Lab. De Ensino De História V",
        "Estágio Supervisionado Iii",
        "Brasil República: O Regime Militar",
        "Hist. Do Brasil No Tempo Presente:",
      ],
      "Oitavo Semestre": [
        "Estágio Supervisionado Iv",
        "Hist. E Cult. Afro-brasil Indígena",
        "Cultura Documental E Patrim. Ii",
        "Pesquisa Histórica Iv",
        "Lab. De Ensino De História Viii",
        "Lab. De Ensino De História Ix",
        "ásia",
        "ásia - Questões De Teoria E His...",
      ],
    },
  },
  "Sistemas de Informação.": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Sociologia",
        "Comunicação Técnica e Científica",
        "Seminário Interdisciplinar I",
        "Lógica e Matemática Discreta",
        "Algoritmos",
        "Fundamentos da Informática",
      ],
      "Segundo Semestre": [
        "Filosofia da Ciência",
        "Teoria Geral da Administração",
        "Sistemas de Informação",
        "Cálculo I",
        "Linguagem de Programação I",
        "Arquitetura de Computadores",
      ],
      "Terceiro Semestre": [
        "Estrutura de Dados I",
        "Economia",
        "Cálculo II",
        "Metod. da Pesq. em Informática",
        "Linguagem de Programação II",
        "Sistemas Operacionais",
      ],
      "Quarto Semestre": [
        "Probabilidade e Estatística",
        "Estrutura de Dados II",
        "Metodologia de Desenvolvimento de Sistemas I",
        "Banco de Dados I",
        "Linguagem de Programação II",
        "Rede de Computadores I",
      ],
      "Quinto Semestre": [
        "Seminário Interdisciplinar II",
        "Contabilidade",
        "Metodologia de Desenvolvimento de Sistemas II",
        "Fundamentos de Compiladores",
        "Interface Homem-Máquina",
        "Rede de Computadores II",
      ],
      "Sexto Semestre": [
        "Psicologia Apl. às Organizações",
        "Projeto Avan. de Sistemas",
        "Engenharia de Programas",
        "Interface H. Computador",
        "Laboratório de Aplicações Web",
        "Sistemas Distribuídos",
      ],
      "Sétimo Semestre": [
        "Ética Profissional",
        "Planejamento Estratégico e Governança em TI",
        "Engenharia de Software",
        "Estágio Supervisionado",
      ],
      "Oitavo Semestre": [
        "Trabalho de Conclusão I",
        "Inteligência Artificial",
        "Empreendedorismo",
        "Tópicos Especiais em Engenharia de Software",
        "Gestão da Segurança da Informação",
      ],
      "Nono Semestre": [
        "Trabalho de Conclusão II",
        "Tópicos Esp. em Banco de Dados",
        "Computadores e Sociedade",
      ],
    },
  },
  Medicina: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
      "Décimo Semestre",
      "Décimo Primeiro Semestre",
      "Décimo Segundo Semestre",
      "Optativas",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Biossegurança",
        "Morfofuncional I",
        "PIASC I",
        "Iniciação ao Exame Clínico",
        "Embriologia",
        "Biologia e Bioquímica",
        "Bioética e Medicina",
        "Comunicação e Saúde",
        "Produção Textual",
        "Inglês Técnico",
      ],
      "Segundo Semestre": [
        "PIASC II",
        "Estatística em Saúde",
        "Epidemiologia",
        "Morfofuncional II",
        "Mecanismos de Agressão e de Defesa I ",
        "Primeiros Socorros",
        "Antropologia Médica",
        "Semiologia Médica I",
      ],
      "Terceiro Semestre": [
        "PIASC III ",
        "Farmacologia",
        "Mecanismos de Agressão e de Defesa II",
        "Morfofuncional III",
        "PIASC Med",
        "Semiologia Médica II",
        "Estudos Epidemiológicos",
      ],
      "Quarto Semestre": [
        "Morfofuncional IV",
        "Patologia Médica",
        "PIASC IV",
        "Procedimentos Cirúrgicos",
        "Farmacologia II ",
        "Semiologia Médica III",
        "Metodologia da Pesquisa Médica",
      ],
      "Quinto Semestre": [
        "Clínica Médica I",
        "Pediatria I ",
        "Clínica Cirúrgica I",
        "Saúde Coletiva I",
        "Genética Médica I",
        "Psicologia Médica e Espiritualidade",
        "Psicopatologia",
        "Imagenologia",
        "Projeto de TCC",
        "Medicina Legal",
      ],
      "Sexto Semestre": [
        "Clínica Cirúrgica II",
        "Clínica Médica II",
        "Oftalmologia",
        "Otorrinolaringologia",
        "Pediatria II",
        "Psiquiatria",
        "Saúde Coletiva II",
        "Orientação de TCC I",
        "Hematologia",
        "Homeopatia e Práticas Integrativas ",
      ],
      "Sétimo Semestre": [
        "Clínica Cirúrgica III",
        "Pediatria III",
        "Genética Médica II",
        "Clínica Médica III",
        "Orientação de TCC II",
        "Saúde Coletiva III ",
        "Ginecologia",
        "Sexualidade d Doenças Sexualmente Transmissíveis",
        "Infectologia",
      ],
      "Oitavo Semestre": [
        "Clínica Cirúrgica IV",
        "Pediatria IV",
        "Dermatologia",
        "Oncologia",
        "Clínica Médica IV",
        "Orientação de TCC III",
        "Ortopedia e Traumatologia",
        "Tanatologia e Medicina Paliativa",
        "Obstetrícia",
        "Dilemas Éticos",
        "Atividades Complementares",
        "Componentes Optativos",
      ],
      "Nono Semestre": [
        "Internato em Clínica Médica I",
        "Internato em Pediatria I",
        "Internato em Gineco-Obstetrícia I ",
      ],
      "Décimo Semestre": [
        "Internato em Clínica Cirúrgica I",
        "Internato em Saúde Mental",
        "Internato em Emergências I",
        "Internato em Saúde Da Família E Comunidade I",
        "Internato em Saúde Coletiva",
      ],
      "Décimo Primeiro Semestre": [
        "Internato Clínica Médica II",
        "Internato Pediatria II",
        "Internato Gineco-obstetrícia II",
      ],
      "Décimo Segundo Semestre": [
        "Internato Clínica Cirúrgica II",
        "Internato Emergências II",
        "Internato em Saúde da Família e Comunidade II",
      ],
      Optativas: ["Gestão E Empreendedorismo Em Medicina", "Libras"],
    },
  },
  "Turismo e Hotelaria": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Optativas",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Introdução a Administração",
        "Sociologia Geral e do Lazer",
        "História da Bahia",
        "Teoria Geral do Turismo",
        "Introdução a Hospitalidade",
        "Fundamentos de Geografia",
        "Comunicação Linguagem e Turismo",
      ],
      "Segundo Semestre": [
        "Antropologia e Turismo",
        "Lazer e Recreação",
        "História da Cultura",
        "Sistema Turístico",
        "Meios de Hospedagem",
        "Geografia do Turismo",
        "Leitura e Produção do Texto Científico",
      ],
      "Terceiro Semestre": [
        "Metodologia do Trabalho Científico",
        "Psicologia Social",
        "Filosofia e Ética Profissional",
        "Economia do Turismo",
        "Estrutura e Funcionamento da Hotelaria",
        "Estatística Aplicada ao Turismo",
        "Língua Inglesa Aplicada ao Turismo e Hotelaria I",
      ],
      "Quarto Semestre": [
        "Regime Jurídico do Turismo e da Hotelaria",
        "Informática Aplicada ao Turismo e a Hotelaria",
        "Contabilidade e Custos",
        "Sistema de Transportes",
        "Hospedagem I",
        "Pesquisa e Análise do Mercado Turístico",
        "Língua Inglesa Aplicada ao Turismo e Hotelaria II",
      ],
      "Quinto Semestre": [
        "Gestão da Qualidade em Serviços e Produtos",
        "Gestão de Pessoas em Turismo e Hotelaria",
        "Administração Financeira",
        "Agenciamento",
        "Hospedagem II",
        "Turismo e Meio Ambiente",
        "Língua Espanhola Aplicada ao Turismo e Hotelaria I",
      ],
      "Sexto Semestre": [
        "Interpretação do Patrimônio",
        "Marketing Aplicado ao Turismo e a Hotelaria",
        "Elaboração e Análise de Projetos Turísticos",
        "Alimentos e Bebidas",
        "Estágio Supervisionado I",
        "Língua Espanhola Aplicada ao Turismo e Hotelaria II",
      ],
      "Sétimo Semestre": [
        "Metodologia e Técnica de Pesquisa em Turismo e Hotelaria",
        "Planejamento e Organização de Eventos",
        "Planejamento Urbano",
        "Gastronomia",
        "Estágio Supervisionado II",
      ],
      "Oitavo Semestre": [
        "Trabalho de Conclusão do Curso (TCC)",
        "Tópicos Especiais em Turismo e Hotelaria",
        "Planejamento do Turismo",
      ],
      Optativas: [
        "Relações Internacionais",
        "Planejamento Estratégico e Governamental",
        "Economia Internacional",
        "Conflitos e Técnicas de Negociações",
        "Políticas Públicas",
        "Tópicos Especiais em Hospitalidade",
        "Turismo Religioso",
        "Turismo e Homossexualidade",
        "Planejamento Ecoturístico",
        "Turismo em Áreas Naturais",
        "Cerimonial e Protocolo",
        "Enologia",
        "Organização e Análise de Espaços para Hotelaria",
        "Técnicas Publicitárias para Turismo e Hotelaria",
        "O segmento Populacional da 3ª Idade",
        "Comportamento Organizacional em Hotéis",
        "Economia da Cultura, Turismo e Desenvolvimento",
      ],
    },
  },
  "Pedagogia.": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Educação e Pesquisa",
        "História da Educação I",
        "Práticas de Leitura e de Produção de Texto",
        "Sociologia e Educação",
        "Antropologia e Educação",
        "Libras",
        "Introdução à Filosofia",
      ],
      "Segundo Semestre": [
        "História da Educação II",
        "Organização Educacional e Escolar I",
        "Fundamentos de Psicologia",
        "Literatura e Educação",
        "Arte e Educação",
        "Pesquisa e Prática Pedagógica I",
        "História e Cultura Indígena",
      ],
      "Terceiro Semestre": [
        "Estudos Linguísticos e Educação I",
        "Didática I",
        "Psicologia do Desenvolvimento e Educação",
        "História e Cultura Afro-Brasileira e Africana",
        "Organização Educacional e Escolar II",
        "Educação Inclusiva",
        "Pesquisa e Prática Pedagógica II",
      ],
      "Quarto Semestre": [
        "Psicologia da Aprendizagem e Educação",
        "Currículo e Educação",
        "Estudos Linguísticos e Educação II",
        "Didática II",
        "Epistemologia e Metodologia da Alfabetização e Letramento",
        "Pesquisa e Prática Pedagógica III ",
        "Ludicidade e Educação",
      ],
      "Quinto Semestre": [
        "Referenciais Teórico-Metodológicos do Ensino da Língua Portuguesa",
        "Educação de Jovens e Adultos",
        "Referenciais Teórico-Metodológicos do Ensino da Matemática na Educação Fundamental",
        "Referenciais Teórico-Metodológicos do Ensino da Geografia",
        "Referenciais Teórico-Metodológicos do Ensino da História no Ensino Fundamental",
        "Referenciais Teórico-Metodológicos do Ensino das Ciências Naturais no Ensino Fundamental",
        "Estágio Supervisionado I",
      ],
      "Sexto Semestre": [
        "Referenciais Teórico-Metodológicos do Ensino de Artes",
        "Seminários Temáticos de Educação I",
        "Gestão de Projetos Educacionais e do Trabalho Pedagógico",
        "Gestão Escolar e Educacional ",
        "Avaliação Educacional",
        "Estágio Supervisionado II",
        "Educação e Relações Étnico-Raciais",
      ],
      "Sétimo Semestre": [
        "Estágio Supervisionado III",
        "Referenciais Teórico-Metodológicos do Ensino de Ciências Sociais na Educação Infantil",
        "Referenciais Teórico-Metodológicos de Ciências Naturais na Educação Infantil",
        "Trabalho de Conclusão de Curso I",
        "Referenciais Teórico-Metodológicos do Ensino da Matemática na Educação Infantil ",
        "Seminários Temáticos de Educação II",
        "Iniciação Musical",
      ],
      "Oitavo Semestre": [
        "Trabalho de Conclusão de Curso II",
        "Estágio Supervisionado IV* (Aprofundamento)",
        "Educação e Tecnologia da Informação e Comunicação",
        "Seminários Temáticos de Educação III",
      ],
    },
  },
  "Jogos Digitais": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Game Design I",
        "Introdução a Programação",
        "Roteiro e Storyboard I",
        "Semiótica",
        "Game e Cultura",
        "Inglês Instrumental",
        "Cinema, Games e Aplicativos",
      ],
      "Segundo Semestre": [
        "Programação de Jogos",
        "Game Design II",
        "Roteiro e Storyboard II",
        "Prática Integrada I",
        "Arte Conceitual",
        "Prototipagem para Jogos",
        "Economia Criativa",
        "Roteiro Multilinear Interativo",
      ],
      "Terceiro Semestre": [
        "Modelagem 3D",
        "Animação 2D",
        "Interface de Games I",
        "Prática Integrada II",
        "Criação de Personagem 2D",
        "Game Design III",
        "Inovação, Empreendedorismo e Gestão de Negócios",
      ],
      "Quarto Semestre": [
        "Inteligência Artificial",
        "Seminários Temáticos I",
        "Modelagem 2D",
        "Computação Gráfica 3D Avançada",
        "Práticas Integradas",
        "Game Design IV",
        "Game Áudio",
      ],
      "Quinto Semestre": [
        "Seminários Temáticos II",
        "Game Design V",
        "Criação de Personagem 3D",
        "Metodologia Científica",
        "Game Prodution",
        "Estágio Supervisionado I",
        "Game, Educação e Saúde",
      ],
      "Sexto Semestre": [
        "Acessibilidade e Games",
        "Gestão de projetos e captação de recursos",
        "EVTECA",
        "Estágio Supervisionado II",
        "Trabalho de Conclusão de Curso (TCC)",
      ],
    },
  },
  Psicologia: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
      "Décimo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Filosofia",
        "Ética em Psicologia",
        "História da Psicologia",
        "Neurociências",
        "Sociologia",
        "Tecnologia e Informação em Psicologia",
        "Metodologia do Trabalho Científico",
      ],
      "Segundo Semestre": [
        "Antropologia",
        "Bases Biológicas do Comportamento",
        "Psicologia do Desenvolvimento – Infância",
        "Psicomotricidade",
        "Processos Psicológicos Básicos – Percepção, Memória e Atenção",
        "Fundamentos Epistemológicos da Psicologia",
        "Estágio Básico em Desenvolvimento da Criança",
      ],
      "Terceiro Semestre": [
        "Processos Psicológicos Básicos – Aprendizagem, Pensamento e Linguagem",
        "Teorias da Aprendizagem",
        "Sistemas Psicológicos – Psicologia Experimental e Behaviorismo Radical",
        "Psicologia Social I",
        "Medidas em Psicologia",
        "Psicologia do Desenvolvimento – Adolescência e Idade Adulta",
        "Estágio Básico em Adolescência",
      ],
      "Quarto Semestre": [
        "Sistemas Psicológicos – Freud e os Pós-freudianos",
        "Psicopatologia",
        "Psicofarmacologia",
        "Processos Psicológicos Básicos - Motivação e Emoção",
        "Psicologia Social II",
        "Teorias da Personalidade",
        "Estágio Básico em Saúde Mental",
      ],
      "Quinto Semestre": [
        "Psicopatologia infanto-juvenil",
        "Sistemas Psicológicos – Lacan",
        "Teorias e Técnicas Humanistas e Fenomenológico-existencial",
        "Psicologia e Saúde Coletiva",
        "Técnicas de Avaliação Psicológica I",
        "Psicologia e Educação",
        "Psicologia do Desenvolvimento - Velhice",
      ],
      "Sexto Semestre": [
        "Teoria e Técnica Cognitivo-Comportamental",
        "Teoria da Gestalt e Gestalt-terapia",
        "Psicologia Organizacional e do Trabalho",
        "Teorias e Técnicas de Dinâmica de Grupo",
        "Psicologia e Linguagem",
        "Técnicas de Avaliação Psicológica II",
      ],
      "Sétimo Semestre": [
        "Teorias e Técnicas Sistêmicas",
        "Psicodiagnóstico",
        "Psicologia e Gestão de Pessoas",
        "TCC I",
        "Orientação Profissional",
        "Estágio Básico em Psicodiagnóstico",
      ],
      "Oitavo Semestre": [
        "Práticas Psicológicas na Escola",
        "TCC II",
        "Libras",
        "Estágio Supervisionado em Processos Sociais e Educativos I",
      ],
      "Nono Semestre": [
        "Psicologia Comunitária",
        "Psicologia Jurídica",
        "Seminários Especiais I",
        "TCC III",
        "Estágio Supervisionado em Processos Sociais e Educativos II",
      ],
      "Décimo Semestre": [
        "Saúde e Trabalho",
        "Seminários Especiais II",
        "Estágio Supervisionado em Processos Sociais e Educativos III",
      ],
    },
  },
  Nutrição: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
      "Décimo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Biologia Celular",
        "Anatomia",
        "Biossegurança",
        "Química Analítica",
        "Metodologia Científica e do Trabalho Científico",
        "Estudos Sócio-Antropológicos",
        "Filosofia e Ética",
        "Programa de Integração, Academia, Serviço e Comunidade - PIASC (I)",
      ],
      "Segundo Semestre": [
        "Histologia e Embriologia",
        "Fisiologia",
        "Bioquímica Metabólica",
        "Estatística em Saúde",
        "Psicologia e Saúde",
        "Nutrição, Alimentos e Nutrientes",
        "Comunicação e Saúde",
        "Programa de Integração Academia, Serviço e Comunidade – PIASC (II)",
      ],
      "Terceiro Semestre": [
        "Biologia Molecular e Genética",
        "Parasitologia",
        "Epidemiologia",
        "Políticas Públicas e Legislação em Saúde",
        "Bioquímica de Alimentos",
        "Nutrição nas Diversas Fases da Vida",
        "Técnica Dietética I",
        "Programa de Integração, Academia, Serviço e Comunidade – PIASC (III)",
      ],
      "Quarto Semestre": [
        "Imunologia",
        "Patologia",
        "Administração e Economia na Produção de Alimentos",
        "Microbiologia Geral e dos Alimentos",
        "Bromatologia",
        "Educação Nutricional",
        "Avaliação Nutricional",
      ],
      "Quinto Semestre": [
        "Nutrição Social",
        "Fisiologia da Nutrição",
        "Gestão em Serviços de Alimentação I",
        "Nutrição na Atenção a Saúde da Mulher e da Criança",
        "Vigilância e Legislação dos Alimentos",
        "Tecnologia dos Alimentos I",
      ],
      "Sexto Semestre": [
        "Nutrição em Gerontologia",
        "Fisiopatologia e Dietoterapia I",
        "Técnica Dietética Aplicada à Dietoterapia",
        "Tecnologia dos Alimentos II",
        "Vigilância Sanitária e Ambiental",
        "Fitoterapia",
        "Tópicos Especiais",
      ],
      "Sétimo Semestre": [
        "Políticas de Segurança Alimentar e Nutricional",
        "Administração e Economia na Produção de Alimentos",
        "Fisiopatologia e Dietoterapia II",
        "Deontologia da Nutrição",
        "Gestão em Serviços de Alimentação II",
        "Farmacologia Aplicada à Nutrição",
        "Análise Sensorial dos Alimentos",
        "Tecnologia dos Alimentos II",
        "Nutrição Esportiva",
      ],
      "Oitavo Semestre": [
        "Antropologia da Alimentação",
        "Metodologia da Pesquisa em Saúde",
        "Terapia Nutricional",
        "Psicologia nos Distúrbios Nutricionais",
        "Nutrição Clínica Avançada",
        "Fisiopatologia e Dietoterapia em Pediatria",
        "Toxicologia dos Alimentos",
      ],
      "Nono Semestre": [
        "Trabalho de Conclusão de Curso I",
        "Estágio Curricular Supervisionado em Nutrição Social",
        "Dietoterapia Aplicada",
      ],
      "Décimo Semestre": [
        "Trabalho de Conclusão de Curso II",
        "Estágio Curricular Supervisionado em Nutrição em Unidades de Alimentação e Nutrição",
        "Estágio Curricular Supervisionado em Nutrição Clínica",
      ],
    },
  },
  "Vernáculas.": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Introdução aos Estudos Literários",
        "Teoria da Literatura e demais componentes do eixo dos estudos literários",
        "Estudos Linguísticos",
        "Leitura e Produção Textual",
        "Estudos Pedagógicos I",
        "Prática Pedagógica I",
        "Libras",
      ],
      "Segundo Semestre": [
        "Teoria da Literatura",
        "Fonética e Fonologia da Língua Portuguesa",
        "Linguística Textual",
        "Estudos Pedagógicos II",
        "Prática Pedagógica II",
        "Literatura Portuguesa I",
        "Prática de Pesquisa I",
      ],
      "Terceiro Semestre": [
        "Literatura do Brasil Colonial",
        "Morfologia da Língua Portuguesa",
        "Literatura Portuguesa II",
        "Estudos Pedagógicos III",
        "Prática Pedagógica III",
        "Sociolinguística",
        "Literatura e Cultura Afro-brasileira",
      ],
      "Quarto Semestre": [
        "Literatura Brasileira e Identidade Cultural",
        "Sintaxe da Língua Portuguesa",
        "Literatura e Práticas de Leitura",
        "Crítica Textual e Edições",
        "Prática Pedagógica IV",
        "Introdução a Linguística Histórica",
        "Língua e Cultura Latinas",
      ],
      "Quinto Semestre": [
        "Literatura Brasileira Contemporânea",
        "Semântica da Língua Portuguesa",
        "Língua, Literatura e Cultura Latinas",
        "História das Línguas Românicas",
        "Estágio I",
        "Literatura e Cultura Indígena",
      ],
      "Sexto Semestre": [
        "Literatura Baiana",
        "Análise do Discurso",
        "História da Língua Portuguesa no Brasil",
        "Literaturas Africanas de Língua Portuguesa",
        "Estágio II",
        "Prática de Pesquisa II",
      ],
      "Sétimo Semestre": ["Estágio III", "Pesquisa Orientada"],
      "Oitavo Semestre": ["TCC", "Componente Opcional", "Estágio IV"],
    },
  },
  "Letras Espanhol": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudos Filológicos",
        "Língua Espanhola - Básico I",
        "Núcleo De Estudos Interdisciplinares I",
        "Prática De Ensino De Língua Espanhola I",
        "Literatura E Sociedade",
        "Aspectos Históricos E Interculturais ",
        "Língua Brasileira De Sinais - Libras",
      ],
      "Segundo Semestre": [
        "Estudos Fonéticos E Fonológicos Em Língua Espanhola",
        "Língua Espanhola - Básico Ii",
        "Introdução Aos Estudos Linguísticos",
        "Núcleos De Estudos Interdiciplinares Ii",
        "Prática De Ensino De Língua Espanhola Ii ",
        "Teoria Literária",
        "História E Cultura Afro-brasileira E Indígena",
      ],
      "Terceiro Semestre": [
        "Estudos Da Tradução",
        "Estudos Da Morfossintaxe Da Língua Espanhola",
        "Língua Espanhola - Intermediário I",
        "Núcleo De Estudos Interdisciplinares Iii",
        "Prática De Ensino De Língua Espanhola Iii",
        "Conto Em Língua Espanhola",
        "Tecnologias Aplicadas Ao Ensino Da Língua Espanhola",
      ],
      "Quarto Semestre": [
        "Compreensão E Produção Oral Em Língua Espanhola",
        "Língua Espanhola - Intermediário Ii",
        "Núcleo De Estudos Interdisciplinares Iv",
        "Prática De Ensino De Língua Espanhola Iv",
        "Poesia Em Língua Espanhola",
        "Introdução À Análise Do Discurso Em Língua Espanhola",
        "Política E Organização Dos Sistemas De Ensino",
      ],
      "Quinto Semestre": [
        "Estágio I",
        "Leitura E Produção Textual Em Língua Espanhola",
        "Língua Espanhola Avançado I",
        "Projeto De Pesquisa I",
        "Prática De Ensino De Língua Espanhola V",
        "Ensino Da Literatura Em Língua Espanhola",
        "Psicologia Da Educação",
      ],
      "Sexto Semestre": [
        "Estágio Ii",
        "Língua Espanhola - Avançado Ii",
        "Projeto De Pesquisa Ii",
        "Prática De Ensino De Língua Espanhola Vi",
        "Teatro Em Língua Espanhola",
        "Ensino Do Espanhol Para Fins Específicos",
        "Linguística Aplicada Ao Ensino/aprendizagem Em Língua Espanhola",
      ],
      "Sétimo Semestre": [
        "Estágio Iii",
        "Língua Espanhola - Avançado Iii",
        "Trabalho De Conclusão De Curso I - Tcc I",
        "Romance Em Língua Espanhola",
        "Aquisição De Língua Espanhola",
      ],
      "Oitavo Semestre": [
        "Estágio Iv",
        "Trabalho De Conclusão De Curso Ii - Tcc Ii",
        "Direitos Humanos E Cidadania",
        "Educação E Diversidade",
      ],
    },
  },
  Fisioterapia: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Introdução à Fonoaudiologia",
        "Anatomia",
        "Biologia Celular",
        "Biossegurança",
        "Linguística e Integração do Conhecimento",
        "Estudos Socioantropológicos",
        "Metodologia Científica e do Trabalho Científico",
        "Filosofia e Ética",
        "PIASC (I)",
      ],
      "Segundo Semestre": [
        "Histologia e Embriologia",
        "Fisiologia",
        "Fundamentos da Biofísica em Fonoaudiologia",
        "Fonética e Fonologia",
        "Comunicação e Saúde",
        "Estatística em Saúde",
        "Psicologia e Saúde",
        "PIASC (II)",
      ],
      "Terceiro Semestre": [
        "Aquisição e Desenvolvimento da Linguagem",
        "Anatomia e Fisiologia dos Órgãos da Fala e da Audição",
        "Patologia",
        "Biologia Molecular e Genética",
        "Psicologia do Desenvolvimento",
        "Políticas Públicas e Legislação em Saúde",
        "Epidemiologia",
        "Práticas Educativas em Saúde",
        "PIASC (III)",
      ],
      "Quarto Semestre": [
        "Neuroanatomia",
        "Patologia dos Órgãos da Fala e da Audição",
        "Avaliação e Diagnóstico Auditivo Básico",
        "Linguagem Escrita",
        "Transtornos do Desenvolvimento da Linguagem",
        "Desenvolvimento Dentofacial",
        "Motricidade Orofacial e Cervical",
        "Fluência",
        "Seminário Integrado em Fonoaudiologia",
      ],
      "Quinto Semestre": [
        "Neurociências",
        "Estágio em Audiologia I",
        "Avaliação e Diagnóstico Auditivo Complementar",
        "Avaliação e Diagnóstico Auditivo Básico",
        "Clínica Fonoaudiológica",
        "Fonoaudiologia Educacional",
        "Psicomotricidade",
        "Metodologia da Pesquisa em Fonoaudiologia I",
      ],
      "Sexto Semestre": [
        "Farmacologia",
        "Neurologia e Fonoaudiologia",
        "Estágio em Audiologia II",
        "Avaliação Audiológica na Infância",
        "Estágio em Linguagem I",
        "Clínica Fonoaudiológica",
        "Transtornos Adquiridos da Linguagem",
        "Voz",
        "Pesquisa Orientada em Fonoaudiologia I",
      ],
      "Sétimo Semestre": [
        "Estágio em Voz I",
        "Reabilitação Vestibular",
        "Estágio em Audiologia III",
        "Deontologia em Fonoaudiologia",
        "Estágio em Linguagem II",
        "Estágio em Motricidade Orofacial e Cervical I",
        "Tópicos Especiais em Fonoaudiologia",
        "Libras",
        "Psicologia e Clínica Fonoaudiológica",
        "Metodologia da Pesquisa em Fonoaudiologia II",
      ],
      "Oitavo Semestre": [
        "Estágio em Voz II",
        "Reabilitação Auditiva",
        "Estágio em Audiologia IV",
        "Avaliação e Reabilitação Vestibular",
        "Estágio em Linguagem III",
        "Fonoaudiologia Hospitalar",
        "Tópicos Especiais em Fonoaudiologia",
        "Fonoaudiologia e Saúde do Trabalhador",
        "Pesquisa Orientada em Fonoaudiologia II",
      ],
      "Nono Semestre": [
        "Voz Profissional",
        "Estágio em Audiologia V",
        "Estágio em Linguagem IV",
        "Fonoaudiologia Hospitalar",
        "Tópicos Especiais em Fonoaudiologia",
        "Trabalho de Conclusão do Curso",
      ],
    },
  },
  Fisioterapia: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Biologia",
        "Fundamentos em Fisioterapia",
        "Anatomia Humana",
        "Introdução à Filosofia",
        "Bioquímica",
        "Psicologia em Saúde",
        "Meio Ambiente e Saúde",
      ],
      "Segundo Semestre": [
        "Neurociências",
        "Anatomia Humana Histologia e Embriologia",
        "Biologia Fisiologia Humana",
        "Antropologia em Saúde",
        "Biofísica",
        "Farmacologia Básica",
        "Metodologia da Pesquisa em Saúde I",
        "Ética",
      ],
      "Terceiro Semestre": [
        "Deontologia em Fisioterapia",
        "Cinesiologia",
        "Fisiologia do Exercício",
        "Introdução à Epidemiologia",
        "Patologia Geral",
        "Ciências Sociais em Saúde",
        "Eletroterapia, Termoterapia, e Fototerapia",
      ],
      "Quarto Semestre": [
        "Hidroterapia",
        "Bioimagem",
        "Métodos e Técnicas de Avaliação Fisioterápica",
        "Cinesioterapia e Mecanoterapia",
        "Epidemiologia I",
        "Clínica Médica",
        "Recursos Terapêuticos Manuais",
      ],
      "Quinto Semestre": [
        "Fisioterapia Preventiva",
        "Reeducação Funcional",
        "Fisioterapia Pneumofuncional I",
        "Relações Interpessoais em Saúde",
        "Fisioterapia em Ortotrauma e Reumatologia I",
        "Fisioterapia em Recém-Nascido, Criança e Adolescente I",
        "Fisioterapia em Clínica Médica",
        "Políticas de Saúde",
      ],
      "Sexto Semestre": [
        "Administração em Fisioterapia",
        "Fisioterapia em Neurologia I",
        "Fisioterapia Pneumofuncional II",
        "Fisioterapia em Ortopedia, Traumatologia e Reumatologia II",
        "Fisioterapia em Recém-Nascido, Criança e Adolescente II",
        "Fisioterapia em Geriatria I",
      ],
      "Sétimo Semestre": [
        "Fisioterapia em Neurologia II",
        "Fisioterapia em Angiologia",
        "Fisioterapia em Clínica Uroginecológica e Obstétrica",
        "Fisioterapia em Geriatria II",
        "Órteses e Próteses",
        "Educação em Saúde",
        "Metodologia da Pesquisa em Saúde II",
      ],
      "Oitavo Semestre": [
        "Metodologia da Pesquisa em Saúde III (TCC)",
        "Estágio Curricular Supervisionado I",
      ],
      "Nono Semestre": [
        "Seminário Integrado",
        "Estágio Curricular Supervisionado II",
      ],
    },
  },
  Filosofia: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Sociologia",
        "Psicologia",
        "Introdução À Filosofia",
        "Lógica I",
        "História Da Filosofia Antiga I",
      ],
      "Segundo Semestre": [
        "Filosofia Da Educação",
        "Didática",
        "Sociologia Clássica",
        "Ontologia",
        "Lógica Ii",
        "História Da Filosofia Antiga Ii",
        "Seminário Temático I",
      ],
      "Terceiro Semestre": [
        "Políticas Da Educação",
        "Ensino De Filosofia I",
        "Filosofia Política",
        "Antropologia Filosófica",
        "História Da Filosofia Medieval",
        "Laboratório Do Ensino De Filosofia I",
        "Oficina De Docência I",
      ],
      "Quarto Semestre": [
        "Direitos Humanos E Educação",
        "Ensino De Filosofia Ii",
        "ética",
        "Filosofia Da Ciência",
        "História Da Filosofia Moderna I",
        "Laboratório Do Ensino De Filosofia Ii",
        "Oficina De Docência Ii",
      ],
      "Quinto Semestre": [
        "Relações Étnico-raciais",
        "Ensino De Filosofia Iii",
        "Estética",
        "Teoria Do Conhecimento",
        "História Da Filosofia Moderna Ii",
        "Laboratório Do Ensino De Filosofia Iii",
        "Oficina De Docência Iii",
      ],
      "Sexto Semestre": [
        "Libras",
        "Estágio Curricular Supervisionado I",
        "Filosofia Da Linguagem",
        "História Da Filosofia Contemporânea I",
        "Seminário Temático Ii",
      ],
      "Sétimo Semestre": [
        "Educação Indígena",
        "Estágio Curricular Supervisionado Ii",
        "História Da Filosofia Contemporânea Ii",
        "Seminário Temático Iii",
        "Trabalho De Conclusão De Curso I",
      ],
      "Oitavo Semestre": [
        "Introdução À Educação Musica",
        "Estágio Curricular Supervisionado Iii",
        "Trabalho De Conclusão De Curso Ii",
      ],
    },
  },
  "Ciên. Sociais - Bacharelado": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Fundamentos da Antropologia",
        "Fundamentos da Sociologia",
        "Fundamento de Ciências Políticas",
        "História e Ciências Sociais",
        "Leitura e Produção de Texto em Ciências Sociais",
        "Filosofia, Ética e Contemporaneidade",
      ],
      "Segundo Semestre": [
        "Antropologia Clássica",
        "Ciência Política Clássica",
        "Sociologia Clássica",
        "Fundamentos da Economia",
        "Geografia, Sociedade E Natureza",
        "Estatística",
      ],
      "Terceiro Semestre": [
        "Antropologia Contemporânea",
        "Ciência Política Contemporânea",
        "Sociologia Contemporânea",
        "Psicologia Social",
        "História do Brasil",
        "História e Cultura Afro-Brasileira",
      ],
      "Quarto Semestre": [
        "Sociologia no Brasil",
        "Metodologia e Técnicas de Pesquisa e Intervenção Social em Ciências Sociais",
        "Antropologia no Brasil",
        "Ciência Política no Brasil",
        "Etnologia e História dos Povos Indígenas",
      ],
      "Quinto Semestre": [
        "Ciências Sociais na Bahia",
        "Epistemologia das Ciências Sociais",
        "Análise de Dados Qualitativos",
        "Análise de Dados Quantitativos ",
        "Educação, Gênero e Sexualidade",
        "Pesquisas Práticas Contemporânea em Antropologia",
      ],
      "Sexto Semestre": [
        "Técnicas de Elaboração de Projetos",
        "Pesquisa e Metodologia com Software Aplicados às Ciências Sociais",
        "Pesquisa e Prática Contemporânea em Sociologia",
        "Estágio Curricular Supervisionado I",
      ],
      "Sétimo Semestre": [
        "Pesquisa Orientada Ciso I (TCC I)",
        "Estágio Curricular Supervisionado II",
        "Pesquisas e Práticas Contemporâneas em Ciências Política",
      ],
      "Oitavo Semestre": [
        "Pesquisa Orientada Ciso II (Tcc II)",
        "Estágio Curricular Supervisionado III",
      ],
    },
  },
  "Ciên. Sociais - Licenciatura": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Fundamentos da Antropologia",
        "Fundamentos da Sociologia",
        "Fundamento de Ciências Políticas",
        "História e Ciências Sociais",
        "Pesquisa e Prática Pedagógica I- Formação de Professor e Ensino de Sociologia",
        "Estudos Sócio-Antropológicos",
        "Metodologia Cientifica e do Trabalho Cientifico",
        "Filosofia, Ética e Contemporaneidade",
      ],
      "Segundo Semestre": [
        "Antropologia Clássica",
        "Ciência Política Clássica",
        "Sociologia Clássica",
        "História da Educação",
        "Pesquisa e Prática Pedagógica II- Planejamento da Educação e da Organização Escolar",
        "Geografia, Sociedade E Natureza",
        "Estatística",
      ],
      "Terceiro Semestre": [
        "Antropologia Contemporânea",
        "Ciência Política Contemporânea",
        "Sociologia Contemporânea",
        "Psicologia da Educação",
        "Educação e Diversidades",
        "História e Cultura Afro-Brasileira",
        "Pesquisa e Prática Pedagógica III- Gestão da Educação e Gestão Escolar",
      ],
      "Quarto Semestre": [
        "Sociologia no Brasil",
        "Metodologia e Técnicas de Pesquisa e Intervenção Social em Ciências Sociais",
        "Educação e Inclusão ",
        "Educação e Direitos Humanos",
        "Etnologia e História dos Povos Indígenas",
        "Pesquisa e Prática Pedagógica IV-Avaliação da Educação da Aprendizagem e D",
      ],
      "Quinto Semestre": [
        "Ciências Sociais na Bahia",
        "Epistemologia das Ciências Sociais",
        "Análise de Dados Qualitativos",
        "Análise de Dados Quantitativos ",
        "Educação, Gênero e Sexualidade",
        "Pesquisas Práticas Contemporânea em Educação",
      ],
      "Sexto Semestre": [
        "Técnicas de Elaboração de Projetos",
        "Sociologia e Educação",
        "Língua Brasileira de Sinais-Libras",
        "Estágio Curricular Supervisionado I",
      ],
      "Sétimo Semestre": [
        "Pesquisa Orientada Ciso I (TCC I)",
        "Estágio Curricular Supervisionado II",
      ],
      "Oitavo Semestre": [
        "Pesquisa Orientada Ciso Ii (Tcc Ii)",
        "Estágio Curricular Supervisionado III",
      ],
    },
  },
  Farmácia: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
      "Decimo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Química Geral E Inorgânica",
        "Fisica E Físico-química Em Farmácia",
        "Biologia Celular",
        "Biossegurança",
        "Anatomia",
        "Estudos Sócio-antropológicos",
        "Metodologia Cientifica E Do Trabalho Cientifico",
        "Programa De Integração Academia, Serviço E Comunidade (Piasc)",
        "Farmácia E Sociedade",
      ],
      "Segundo Semestre": [
        "Química Orgânica",
        "Estatísitica Em Saúde",
        "Bioquimica",
        "Histologia E Embriologia",
        "Fisiologia",
        "Farmacobotânica",
        "Psicologia Em Saúde",
        "Programa De Integração Academia, Serviço E Comunidade Ii (Piasc Ii)",
      ],
      "Terceiro Semestre": [
        "Química Analítica",
        "Cálculos Em Farmácia",
        "Biologia Molecular E Genética",
        "Microbiologia",
        "Parasitologia",
        "Deontologia Farmacêutica",
        "Vigilância À Saúde",
        "Epidemiologia",
        "Programa De Integração Academia, Serviço E Comunidade Iii (Piasc Iii)",
      ],
      "Quarto Semestre": [
        "Análise Instrumental De Fármacos",
        "Química Farmacêutica",
        "Farmacologia ",
        "Imunologia",
        "Patologia",
        "Assistência Farmacêutica",
        "Estágio Curricular I",
      ],
      "Quinto Semestre": [
        "Pesquisa E Desenvolvimento De Fármacos",
        "Bioquímica Clínica",
        "Farmacognosia",
        "Farmacologia Clínica",
        "Atenção Farmacêutica",
        "Metodologia Da Pesquisa Em Farmácia I",
        "Estágio Curricular Ii",
      ],
      "Sexto Semestre": [
        "Farmacotécnica",
        "Parasitologia Clínica",
        "Bromatologia E Nutrição ",
        "Farmacoterapia - Processos Agudos",
        "Farmácia Hospitalar",
        "Toxicologia",
        "Processos Econômicos Em Farmácia",
        "Orientação De Pesquisa Em Farmácia I",
      ],
      "Sétimo Semestre": [
        "Tópicos Especiais",
        "Microbiologia Clinica",
        "Toxicologia Analítica",
        "Farmacoterapia - Processos Crônicos",
        "Tecnologia Farmacêutica",
        "Farmacoepidemiologia ",
        "Administração Farmacêutica",
        "Metodologia Da Pesquisa Em Farmácia Ii",
      ],
      "Oitavo Semestre": [
        "Hematologia Clínica",
        "Biotecnologia Industrial",
        "Homeopatia",
        "Gestão De Processos Farmacêuticos",
        "Orientação De Pesquisa Em Farmácia Ii",
        "Estágio Curricular Iii ",
      ],
      "Nono Semestre": [
        "Controle De Qualidade Físico-químico",
        "Imunologia Clínica",
        "Citologia Clínica",
        "Fitoterapia",
        "Trabalho De Conclusão De Curso - Tcc",
        "Tecnologia Da Construção Iii",
        "Estágio Curricular Iv",
      ],
      "Decimo Semestre": [
        "Controle De Qualidade Biologico S",
        "Estágio Curricular V",
        "Projeto De Produto E Da Fábrica",
        "Informática Aplicada À Eng. De Produção",
        "Tecnologia Da Pré - Fabricação",
        "Administração De Materiais",
        "Chefia E Liderança",
        "Redação Técnica",
        "Inglês Técnico",
      ],
    },
  },
  "Engenharia de Produção Civil": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
      "Decimo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Matemática Básica ",
        "Cálculo I",
        "Física Geral e Experimental I",
        "Química Geral ",
        "Desenho Básico",
        "Introdução à Engenharia de Produção",
        "Filosofia e Ética",
        "PIASC- (I)",
      ],
      "Segundo Semestre": [
        "Cálculo II ",
        "Álgebra Linear",
        "Física Geral e Experimental II",
        "Desenho Técnico",
        "Computação Aplicada à Engenharia",
        "Metodologia Científica se Tecnologia da Produção",
      ],
      "Terceiro Semestre": [
        "Cálculo III",
        "Física Geral e Experimental III",
        "Desenho de Construção Civil",
        "Microbiologia",
        "Mecânica Geral",
        "Materiais de Construção Civil I",
      ],
      "Quarto Semestre": [
        "Calculo Numérico",
        "Estatística",
        "Eletricidade",
        "Resistência dos Materiais",
        "Topografia",
        "Ergonomia",
      ],
      "Quinto Semestre": [
        "Fenômenos de Transportes",
        "Técnicas e Economia de Transportes",
        "Materiais de Construção Civil II",
        "Pesquisa Operacional Aplicada à Produção I",
        "Administração Aplicada à Produção",
        "Economia Aplicada à produção I",
      ],
      "Sexto Semestre": [
        "Hidráulica",
        "Teoria das Estruturas",
        "Tecnologia de Construção I",
        "Relações Humanas",
      ],
      "Sétimo Semestre": [
        "Construção de Estradas e Pavimentação",
        "Hidrologia Aplicada",
        "Estruturas Metálicas",
        "Estruturas de Concreto",
        "Tecnologia de Construção II",
        "Pesquisa Operacional Aplicada à Produção II",
        "Economia Aplicada à Produção II",
      ],
      "Oitavo Semestre": [
        "Fundações",
        "Estruturas de Madeira",
        "Concreto Armado",
        "Planejamento e Controle da Construção",
        "Higiene e Segurança do Trabalho",
        "Engenharia e Meio Ambiente",
      ],
      "Nono Semestre": [
        "Saneamento Básico",
        "Gerenciamento de Projetos e Contratos",
        "Gerenciamento de Obras",
        "Estágio Supervisionado",
        "Computação Gráfica",
        "Tecnologia da Construção III",
        "Patologia e Recuperação das Construções",
        "Administração de Recursos Humanos",
      ],
      "Decimo Semestre": [
        "Qualidade e Produtividade na Construção Civil",
        "Estudo de Tempos e Métodos",
        "Projeto de Produto e da Fábrica",
        "Informática Aplicada à Eng. De Produção",
        "Tecnologia da Pré - Fabricação",
        "Administração de Materiais",
        "Chefia e Liderança",
        "Redação Técnica",
        "Inglês Técnico",
      ],
    },
  },
  Enfermagem: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
      "Decimo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Enfermagem e Saúde Ciências da Enfermagem",
        "Anatomia",
        "Biologia Celular",
        "Biossegurança e Conhecimentos Biotecnológicos",
        "Estudos Socioantropológicos",
        "Metodologia Científica e do Trabalho Científico",
        "Filosofia e Ética",
        "PIASC- (I)",
      ],
      "Segundo Semestre": [
        "Comunicação e Saúde",
        "Deontologia em Enfermagem",
        "Eixo 1 - Enfermagem Educação Saúde e Sociedade",
        "Histologia e Embriologia",
        "Nutrição, Alimentos e Nutrientes",
        "Fisiologia",
        "Bioquímica",
        "Estatística e Saúde",
        "Psicologia em Saúde",
        "PIASC- (II)",
      ],
      "Terceiro Semestre": [
        "Metodologia da Pesquisa em Enfermagem",
        "Imunologia",
        "Patologia",
        "Microbiologia",
        "Biologia Molecular e Genética",
        "Processo de Cuidar na Atenção Básica",
        "Políticas Públicas e Legislação em Saúde",
        "Epidemiologia",
        "PIASC - (III)",
      ],
      "Quarto Semestre": [
        "Processo de Cuidar na Média e Alta Complexidade",
        "Farmacologia",
        "Enfermagem na Promoção e Vigilância à Saúde",
        "Enfermagem na Saúde do Adulto em Atenção Básica",
        "Planificação e Gestão em Saúde",
        "Parasitologia",
        "Biofísica",
      ],
      "Quinto Semestre": [
        "Enfermagem na Saúde do Adulto",
        "Psicologia dos Processos Patológicos e Perdas",
        "Práticas Integrativas e Complementares em Saúde",
        "Metodologia da Pesquisa em Enfermagem",
        "Vigilância em Saúde",
        "Seminário Interdisciplinar",
        "Controle de Infecção em Serviços de Saúde",
        "Tópicos Especiais",
      ],
      "Sexto Semestre": [
        "Enfermagem nas Unidades de Clínica Cirúrgica, Centro Cirúrgico e CME",
        "Enfermagem nas Unidades de Emergência e Terapia Intensiva",
        "Planificação e Gestão em Unidade Hospitalar",
        "Pesquisa Orientada em Enfermagem",
        "Enfermagem em Gerontologia e Geriatria",
        "Seminário Interdisciplinar",
      ],
      "Sétimo Semestre": [
        "Enfermagem em Atenção a Saúde Mental",
        "Enfermagem na Saúde da Criança e do Adolescente na Atenção Básica",
        "Práticas Educativas em Enfermagem",
        "Pesquisa Orientada em Enfermagem",
        "Enfermagem na Saúde da Mulher na Atenção Básica e Ginecologia",
        "Farmacologia Clínica",
        "Tópicos Especiais",
      ],
      "Oitavo Semestre": [
        "Metodologia da Pesquisa em Enfermagem",
        "Enfermagem na Atenção a Saúde do Homem",
        "Enfermagem na Saúde da Mulher no Parto e Puerpério",
        "Enfermagem na Saúde da Criança e do Adolescente Hospitalizado",
        "Seminário Interdisciplinar",
        "Estágio Curricular em Gestão da Enfermagem",
        "Tópicos Especiais",
        "Pesquisa Orientada em Enfermagem",
      ],
      "Nono Semestre": [
        "Estágio Curricular em Gestão de Programas em Saúde",
        "TCC",
        "Estágio Curricular",
      ],
      "Decimo Semestre": ["Estágio Curricular", "TCC"],
    },
  },
  Direito: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
      "Decimo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Introdução ao Estudo do Direito I",
        "Direito e Sociedade",
        "Teoria Geral do Estado",
        "Produção de Texto Técnico Científico",
        "Filosofia",
        "Economia Brasileira",
        "História do Direito",
        "Seminário Interdisciplinar de Pesquisa I",
      ],
      "Segundo Semestre": [
        "Introdução ao Estudo do Direito II ",
        "Sociologia Jurídica –",
        "Ciência Política",
        "Direito e Linguagem",
        "Direito Penal I",
        "Seminário Interdisciplinar de Pesquisa II",
      ],
      "Terceiro Semestre": [
        "Antropologia Jurídica",
        "Direito Administrativo I",
        "Direito do Trabalho I",
        "Teoria Geral do Processo",
        "Direito Constitucional I",
        "Direito Penal II",
        "Direito Civil II (Teoria Geral II)",
        "Seminário Interdisciplinar de Pesquisa III",
      ],
      "Quarto Semestre": [
        "Direito Administrativo II",
        "Direito do Trabalho II",
        "Direito Ambiental e Agrário",
        "Direito Processual Civil I",
        "Direito Constitucional II",
        "Direito Penal III",
        "Direito Civil III (Obrigações)",
        "Seminário Interdisciplinar de Pesquisa IV",
      ],
      "Quinto Semestre": [
        "Direito Empresarial I",
        "Direito Tributário e Finanças Públicas",
        "Direito Processual Civil II",
        "Direito Constitucional III",
        "Direito Penal IV",
        "Direito Civil IV (Responsabilidade Civil)",
        "Seminário Interdisciplinar de Pesquisa V",
      ],
      "Sexto Semestre": [
        "Direito Empresarial II",
        "Legislação Tributária",
        "Direito Processual Civil III",
        "Direito Internacional",
        "Criminologia",
        "Direito Civil V (Contratos)",
        "Seminário Interdisciplinar de Pesquisa VI",
      ],
      "Sétimo Semestre": [
        "Direito e os Movimentos Sociais",
        "Direito Processual Civil IV",
        "Tópicos Especiais de Direito Urbano",
        "Direito Processual Penal I",
        "Direito Civil V I (Reais)",
        "Seminário Interdisciplinar de Pesquisa VII",
        "Estágio de Prática Jurídica I",
      ],
      "Oitavo Semestre": [
        "Direito do Consumidor",
        "Direito Processual Penal II",
        "Direito Civil VII (Família)",
        "Estágio de Prática Jurídica II",
        "Monografia I",
      ],
      "Nono Semestre": [
        "Direito da Seguridade Social",
        "Direito Processual Penal III",
        "Direito Eleitoral",
        "Direito Civil VIII (Sucessões)",
        "Estágio de Prática Jurídica III",
        "Monografia II",
      ],
      "Decimo Semestre": [
        "Estágio de Prática Jurídica IV",
        "Direito Processual Penal III",
        "Direito Eleitoral",
        "Direito Civil VIII (Sucessões)",
        "Estágio de Prática Jurídica III",
        "Monografia III",
        "Seminário de Estudo do Direito Avançado",
      ],
    },
  },
  "Ciências Contábeis": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Contabilidade Introdutória",
        "Leitura e Prática de Produção Textual",
        "Fundamentos da Matemática",
        "Psicologia Organizacional",
        "Sociologia Organizacional",
        "Teoria Econômica",
        "Seminário Interdisciplinar I",
      ],
      "Segundo Semestre": [
        "Contabilidade Básica",
        "Fundamentos da Administração",
        "Matemática e Contabilidade",
        "Metodologia Científica e do Trabalho Científico",
        "Direito Público e Privado",
        "Economia das Organizações",
        "Seminário Interdisciplinar II",
      ],
      "Terceiro Semestre": [
        "Contabilidade Empresarial",
        "Filosofia e Ética Profissional",
        "Matemática Financeira",
        "Teoria da Contabilidade",
        "Direito Administrativo",
        "Macroeconomia",
        "Seminário Interdisciplinar III",
      ],
      "Quarto Semestre": [
        "Contabilidade Societária",
        "Gestão de Negócios",
        "Estatística e Contabilidade",
        "Elementos de Custos",
        "Direito Empresarial",
        "Direito Tributário",
        "Seminário Interdisciplinar IV",
      ],
      "Quinto Semestre": [
        "Contabilidade Sócio-ambiental",
        "Métodos Quantitativos e Contabilidade",
        "Contabilidade e Análise de Custos",
        "Análise Tributária",
        "Orçamento Público",
        "Estágio Curricular Supervisionado I",
      ],
      "Sexto Semestre": [
        "Análise das Demonstrações Contábeis",
        "Mercado Financeiro e de Capitais",
        "Contabilidade Tributária",
        "Legislação Trabalhista e Previdenciária",
        "Contabilidade do Setor Público",
        "Estágio Curricular Supervisionado II",
      ],
      "Sétimo Semestre": [
        "Controladoria",
        "Perícia Contábil e Arbitragem",
        "Tópicos Específicos de Contabilidade (TEC)",
        "Auditoria Introdutória",
        "Orientação TCC",
        "Sistemas de Informações Contábeis",
        "Tópicos Específicos de Contabilidade (TEC)",
      ],
      "Oitavo Semestre": [
        "Tópicos Específicos de Contabilidade (TEC)",
        "Tópicos Específicos de Contabilidade (TEC)",
        "Auditoria Privada",
        "Auditoria Governamental",
        "Trabalho de Conclusão de Curso – TCC",
      ],
    },
  },
  Administração: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Administração e Filosofia",
        "Fundamentos de Administração",
        "Teoria Microeconômica",
        "Matemática Básica",
        "Metodologia Científica e do Trabalho Científico",
        "Fundamentos de Sociologia",
        "Filosofia e Ética",
        "Seminário Interdisciplinar I",
      ],
      "Segundo Semestre": [
        "Sociologia das Organizações",
        "Teoria Geral da Administração",
        "Teoria Macroeconômica",
        "Matemática",
        "Fundamentos da Contabilidade",
        "Estudos Socio-Antropológicos das Organizações",
        "Instituições de Direito Público e Privado",
        "Seminário Interdisciplinar II",
      ],
      "Terceiro Semestre": [
        "Psicologia das Organizações",
        "Organização, Sistemas e Métodos",
        "Fundamentos e Análise de Custos",
        "Fundamentos de Estatística",
        "Legislação Trabalhista e Seguridade Social",
        "Psicologia e Administração",
        "Matemática Financeira",
        "Seminário Interdisciplinar III",
      ],
      "Quarto Semestre": [
        "Administração e Informações Gerenciais",
        "Gestão de Pessoas",
        "Estatística das Organizações",
        "Contabilidade Gerencial",
        "Direito Empresarial",
        "Marketing",
        "Sistemas de Informações Gerenciais",
        "Seminário Interdisciplinar IV",
      ],
      "Quinto Semestre": [
        "Administração e Desenvolvimento Humano",
        "Comportamento Organizacional",
        "Pesquisa Operacional",
        "Direito Tributário",
        "Políticas de Vendas",
        "Fundamentos de Administração Financeira",
        "Administração Pública",
        "Seminário Interdisciplinar V",
      ],
      "Sexto Semestre": [
        "Comunicação Organizacional",
        "Administração de Materiais e Logística",
        "Plano de Negócios e Empreendedorismo",
        "Administração Financeira e Orçamentária",
        "Administração Estratégica",
        "Comunicação Organizacional",
        "Técnicas e Métodos de Pesquisa",
        "Seminário Interdisciplinar VI",
        "Estágio Curricular I",
      ],
      "Sétimo Semestre": [
        "Gestão da Produção e Sociedade",
        "Projetos em Administração",
        "Administração da Produção",
        "Gestão Ambiental e Sustentabilidade",
        "Orientação de TCC",
        "NDE (Gestão Social)",
        "NDE (Gestão do Varejo)",
        "Seminário Interdisciplinar VII",
        "Estágio Curricular II",
      ],
      "Oitavo Semestre": [
        "Gestão, Tecnologia e Inovação",
        "Gestão da Inovação Tecnológica",
        "Trabalho de Conclusão de Curso - TCC",
        "NDE (Mercados de Capitais)",
        "NDE (Auditoria e Controladoria)",
        "Seminário Interdisciplinar VIII",
        "Estágio Curricular III",
      ],
    },
  },
  Design: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Seminário Temático I",
        "Fenomenologia do Desenho",
        "Processos Criativos",
        "Metodologia da Pesquisa Cientifica",
        "História da Arte I",
        "Teorias da Percepção",
        "Representação Gráfica I",
        "Representação Gráfica II",
      ],
      "Segundo Semestre": [
        "Seminário Temático II",
        "Estética",
        "Computação Gráfica I",
        "Metodologia e Prática do Projeto I",
        "História da Arte II",
        "Fotografia",
        "Representação Gráfica III",
        "Representação Gráfica IV",
      ],
      "Terceiro Semestre": [
        "Seminário Temático III",
        "Teoria do Design",
        "Computação Gráfica II",
        "Metodologia e Prática do Projeto II",
        "História do Design",
        "Estudos da Cultura",
        "Estudos da Significação",
        "Tipografia",
      ],
      "Quarto Semestre": [
        "Oficina de Design Experimental",
        "Metodologia e Prática do Projeto III",
        "Computação Gráfica III",
        "Produção Gráfica I",
        "Estrutura I",
        "Tecnologia I",
        "Ergonomia I",
        "Ilustração do Produto",
      ],
      "Quinto Semestre": [
        "Oficina de Design Experimental II",
        "Metodologia e Prática do Projeto IV",
        "Computação Gráfica IV",
        "Produção Gráfica II",
        "Estrutura II",
        "Tecnologia II",
        "Audiovisual I",
      ],
      "Sexto Semestre": [
        "Oficina de Design Experimental III",
        "Metodologia e Prática do Projeto V",
        "Computação Gráfica V",
        "Interfaces",
        "Design Editorial",
        "Audiovisual II",
      ],
      "Sétimo Semestre": [
        "TCC I (Orientação/Elaboração)",
        "Design e Sociedade",
        "Computação Gráfica VI",
        "Gestão e Empreendedorismo",
        "Ética e Legislação",
      ],
      "Oitavo Semestre": [
        "TCC II (Orientação/Elaboração)",
        "Estágio Supervisionado",
      ],
    },
  },
  "Comunicação Social": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Introdução a Comunicação",
        "Introdução às Relações Públicas",
        "Sociologia e Comunicação",
        "Comunicação e Sociedade",
        "Oficina de Produção Textual",
        "Lab. de Leitura e Produção de Texto",
        "Filosofia",
      ],
      "Segundo Semestre": [
        "Teorias da Comunicação",
        "Teorias Aplicadas às Relações Públicas",
        "Metodologia de Pesquisa em Comunicação",
        "Oficina de Programação Visual",
        "Psicologia",
      ],
      "Terceiro Semestre": [
        "Teorias dos Signos",
        "Técnicas de Relações Públicas",
        "Estudos Organizacionais",
        "Oficina de Comunicação e Expressão",
        "Antropologia Cultural",
      ],
      "Quarto Semestre": [
        "Estética da Comunicação",
        "Legislação e Ética da Comunicação e das Relações Públicas",
        "Pesquisa Institucional e de Opinião Pública",
        "Oficina de Assessoria e Consultoria",
      ],
      "Quinto Semestre": [
        "Comunicação e Política",
        "Conflitos e Negociações",
        "Comunicação e Cultura",
        "Oficina de Linguagem Audiovisual",
      ],
      "Sexto Semestre": [
        "Comunicação Comunitária",
        "Planejamento I",
        "Comunicação e Tecnologia",
        "Oficina de Campanha em Relações Públicas",
      ],
      "Sétimo Semestre": [
        "Elaboração de Projeto em Comunicação",
        "Planejamento II",
        "Oficina de Produtos Midiáticos",
      ],
      "Oitavo Semestre": [
        "Projeto Experimental",
        "Seminários Avançados em Comunicação e Relações Públicas",
      ],
    },
  },
  "Ciências Biológicas": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudo Evolutivo das Geosferas",
        "Fundamentos de Química",
        "Tópicos de Física",
        "Biologia Celular e Molecular",
        "Epistemologia da Ciência",
        "Lab. de Leitura e Produção de Texto",
        "Prática Pedagógica I",
        "Seminário Temático I",
      ],
      "Segundo Semestre": [
        "Biofísica",
        "Bioquímica",
        "Biologia dos Protoctistas ",
        "Biologia Vegetal I ",
        "Lab. de Leitura e Produção de Imagens ",
        "Prática Pedagógica II",
        "Genética",
        "Seminário Temático II",
      ],
      "Terceiro Semestre": [
        "Genética",
        "Biologia dos Invertebrados I",
        "Biologia do Desenvolvimento",
        "Anatomia e Organografia Vegetal",
        "Prática Pedagógica III",
        "Seminário Temático III",
      ],
      "Quarto Semestre": [
        "Biologia dos Invertebrados II",
        "Sistemática Vegetal",
        "Genética e Evolução",
        "Bioestatística",
        "Biologia dos Fungos",
        "Prática Pedagógica IV",
        "Seminário Temático IV",
      ],
      "Quinto Semestre": [
        "Biologia de Cordados",
        "Microbiologia",
        "Fisiologia Vegetal",
        "Ecologia Geral",
        "Prática Pedagógica e Estágio Supervisionado I",
      ],
      "Sexto Semestre": [
        "Fisiologia Animal Comparada",
        "Anatomia dos Vertebrados",
        "Bioética",
        "Projeto de Pesquisa I",
        "Prática Pedagógica e Estágio Supervisionado II",
      ],
      "Sétimo Semestre": [
        "Paleontologia",
        "Ecologia e Meio Ambiente",
        "Projeto de Pesquisa II",
        "Estágio Supervisionado I",
      ],
      "Oitavo Semestre": ["Monografia", "Estágio Supervisionado II"],
    },
  },
  "Ed. Física - Bacharel.": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Optativas",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Filosofia E Educação Física",
        "Socioantropologia E Ed Física",
        "História Da Educação Física",
        "Biologia Celular E Bioquímica",
        "Anatomia Humana",
        "Ens, Pesq E Ext Univ Em Ed Fís",
        "Prática - I Camp De At Em Ed F",
      ],
      "Segundo Semestre": [
        "Psicologia E Educação Física",
        "Fisiologia Humana",
        "Comportamento Motor",
        "Educação Física, Saúde E Nutri",
        "Hist E Cult. Afro-brasil E Indí",
        "Leit, Inter E Produ De Text Ac",
        "Prát Ii - Ed Física, Esp E Laz",
      ],
      "Terceiro Semestre": [
        "Fisiologia Do Exercício",
        "Estudos Do Lazer",
        "Cinesiologia E Biomecânica",
        "Atividade Motora Adaptada",
        "Libras",
        "Metod Do Trab E Pesq Cient",
        "ética E Direitos Humanos",
        "Prática Iii - Ed Física E Educ",
      ],
      "Quarto Semestre": [
        "Primeiros Socorros",
        "Tecnologias E Educação Física",
        "Polit Púb, Gest Esp E De Lazer",
        "Medi E Aval Em Ed Fìsic E Espo",
        "Treinamento Esportivo",
        "Estatística Básica",
        "Prática Iv - Ed Física E Saúde",
      ],
      "Quinto Semestre": [
        "Conhec E Metod Do Jogo E Brinc",
        "Conhecimento E Metod Da Ginást",
        "Conhec E Metod Da Capoeira",
        "Educação Física E Saúde Públic",
        "Epidemiologia Da Atividade Fís",
        "Treinamento De Força",
        "Estágio I - Gestão, Cult E Laz",
      ],
      "Sexto Semestre": [
        "Conhec E Metod Das Ativ Aquáti",
        "Conhecimento E Metod Dos Esp I",
        "Conhec E Metod Dos Esp Ii",
        "Seminário De Pesquisa I",
        "Ativ Física Para Grup Específi",
        "Estágio Ii - Saúde Pública",
      ],
      "Sétimo Semestre": [
        "Conhec E Metod Da Dança",
        "Conhec E Metod Dos Esp Iii",
        "Seminário De Pesquisa Ii",
        "Prescrição De Exercício Físico",
        "Atividade Física E Envelhecimento",
        "Cent Ativ Fis E Prog Condi Fis",
        "Estag Iii - Cent Fis E Prog Co",
      ],
      "Oitavo Semestre": [
        "Conhec E Metod Da Luta",
        "Con E Metod Dos Esp Iv",
        "Prát Corporais Alter E Na Natu",
        "Seminário De Pesquisa Iii",
        "Gestão De Negócios Em Ed Físic",
        "Estágio Iv - Esporte",
      ],
      Optativas: [
        "Avaliação E Prescrição De Exercícios Para A Promoção Da Saúde ",
        "Introdução À Informática",
        "Língua Estrangeira",
        "Nutrição No Esporte",
        "Língua Portuguesa: Leitura E Produção De Textos",
        "Atividade Física Na Empresa",
        "Atividade Física Para Idosos",
        "Conhecimento E Metodologia Do Esporte Iii",
        "Conhecimento E Metodologia Da Musculação",
        "Conhecimento E Metodologia Do Pilates",
        "Corpo, Movimento E Escolarização",
        "Estudo Das Teorias Psicocorporais",
      ],
    },
  },
  "Ed. Física - Licensiat.": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Optativas",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Filosofia E Educação Física",
        "Socioantropologia E Ed Física",
        "História Da Educação Física",
        "Biologia Celular E Bioquímica",
        "Anatomia Humana",
        "Ens, Pesq E Ext Univ Em Ed Fís",
        "Prática - I Camp De At Em Ed F",
      ],
      "Segundo Semestre": [
        "Psicologia E Educação Física",
        "Fisiologia Humana",
        "Comportamento Motor",
        "Educação Física, Saúde E Nutri",
        "Hist E Cult. Afro-brasil E Indí",
        "Leit, Inter E Produ De Text Ac",
        "Prát Ii - Ed Física, Esp E Laz",
      ],
      "Terceiro Semestre": [
        "Fisiologia Do Exercício",
        "Estudos Do Lazer",
        "Cinesiologia E Biomecânica",
        "Atividade Motora Adaptada",
        "Libras",
        "Metod Do Trab E Pesq Cient",
        "ética E Direitos Humanos",
        "Prática Iii - Ed Física E Educ",
      ],
      "Quarto Semestre": [
        "Primeiros Socorros",
        "Tecnologias E Educação Física",
        "Polit Púb, Gest Esp E De Lazer",
        "Medi E Aval Em Ed Fìsic E Espo",
        "Treinamento Esportivo",
        "Estatística Básica",
        "Prática Iv - Ed Física E Saúde",
      ],
      "Quinto Semestre": [
        "Conhec E Metod Do Jogo E Brinc",
        "Conhecimento E Metod Da Ginást",
        "Conhec E Metod Da Capoeira",
        "Teorias Curriculares E Ed Física",
        "Políticas E Gestão Educacional",
        "Didática E Educação Física Esc",
        "Estágio I - Ed Física Na Ed In",
      ],
      "Sexto Semestre": [
        "Conhec E Metod Das Ativ Aquáti",
        "Conhecimento E Metod Dos Esp I",
        "Conhec E Metod Dos Esp Ii",
        "Seminário De Pesquisa I",
        "Educação Física Inclusiva",
        "Estágio Ii - Ed Física N",
      ],
      "Sétimo Semestre": [
        "Conhec E Metod Da Dança",
        "Conhec E Metod Dos Esp Iii",
        "Seminário De Pesquisa Ii",
        "Avaliação Em Educação",
        "Estágio Iii - Ed Fís No Ens Médio",
        "Estágio Iv - Ed Fís Na Ed Especial",
      ],
      "Oitavo Semestre": [
        "Conhec E Metod Da Luta",
        "Con E Metod Dos Esp Iv",
        "Prát Corporais Alter E Na Natu",
        "Ed Fís Esc Em Amb Não Urbano",
        "Seminário De Pesquisa Iii",
        "Estágio V - Gestão Educacional",
      ],
      Optativas: [
        "Avaliação E Prescrição De Exercícios Para A Promoção Da Saúde ",
        "Introdução À Informática",
        "Língua Estrangeira",
        "Nutrição No Esporte",
        "Língua Portuguesa: Leitura E Produção De Textos",
        "Atividade Física Na Empresa",
        "Atividade Física Para Idosos",
        "Conhecimento E Metodologia Do Esporte Iii",
        "Conhecimento E Metodologia Da Musculação",
        "Conhecimento E Metodologia Do Pilates",
        "Corpo, Movimento E Escolarização",
        "Estudo Das Teorias Psicocorporais",
      ],
    },
  },
  "Eng. Ambiental e Sanitária": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Nono Semestre",
      "Décimo Semestre",
      "Optativas",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Geometria Analítica",
        "Cálculo 1",
        "Química Geral",
        "Int. à Eng. Sanitária e Ambiental",
        "Leitura e Produção de Texto",
        "Biologia Geral",
        "Desenho Técnico",
      ],
      "Segundo Semestre": [
        "Álgebra Linar",
        "Cálculo II",
        "Química Orgânica",
        "Geologia e Solos",
        "Ecologia Geral",
        "Biologia Sanitária e Ambiental",
        "Geometria Descritiva",
      ],
      "Terceiro Semestre": [
        "Física I",
        "Cálculo III",
        "Bioquímica",
        "Topografia",
        "Ecossistemas Aquáticos e Terrestres e suas Interfaces",
        "Poluição e Impacto Ambiental",
        "Computação",
      ],
      "Quarto Semestre": [
        "Fisica II",
        "Tópicos Sociológicos e Antropológicos",
        "Mecânica dos Solos",
        "Cartografia e Geoprocessamento",
        "Climatologia",
        "Métodos Numéricos e Computacionais",
        "Legislação Ambiental e Sanitária",
      ],
      "Quinto Semestre": [
        "Física III",
        "Microbiologia Ambiental",
        "Química Ambiental",
        "Estatística Básica",
        "Hidrologia e Solo",
        "Análise Ambiental",
      ],
      "Sexto Semestre": [
        "Física Ambiental",
        "Fenômenos de Transporte",
        "Hidráulica I",
        "Resistência dos Materiais",
        "Materiais e Técnicas de Construção",
        "Administração Básica",
        "Controle de Poluição das Águas",
      ],
      "Sétimo Semestre": [
        "Biotecnologia e Meio Ambiente",
        "Educação Ambiental",
        "Hidráulica II",
        "Saúde Pública e Ambiental",
        "Planejamento e Gestão Ambiental",
        "Economia e Meio Ambiente",
      ],
      "Oitavo Semestre": [
        "Mecânica dos Fluídos",
        "Projeto de Pesquisa",
        "Obras Hidráulicas",
        "Sistema de Abastecimento e Tratamento de Água",
        "Resíduos Sólidos e Gestão",
        "Controle e Recuperação de Áreas Degradadas",
      ],
      "Nono Semestre": [
        "Estágio Supervisionado I",
        "Orientação de TCC",
        "Recursos Naturais e Manejo",
        "Drenagem e Controle de Enchentes",
        "Sistema de Esgotamento",
        ,
      ],
      "Décimo Semestre": [
        "Estágio Supervisionado II",
        "Controle de Poluição Atmosférica",
        "Trabalho de Conclusão de Curso",
      ],
      Optativas: [
        "Política e Gestão Ambiental",
        "Tecnologias Limpas",
        "Modelagem Ambiental",
        "Ética e Cidadania",
        "Toxicologia Ambiental",
        "Biologia Molecular",
        "Práticas em Licenciamento Ambiental",
        "Manutenção e Controle de Aterros Sanitários",
        "Introdução ao Geoprocessamento",
      ],
    },
  },
  Vernáculas: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudos Filosóficos",
        "Significação e Contexto",
        "Estudos Teóricos do Texto Literário",
        "Leitura e Produção de Texto",
        "Estabelecimento dos Estudos Lingüísticos",
        "Prática Pedagógica I",
        "Seminário Interdisciplinar de Pesquisa I",
      ],
      "Segundo Semestre": [
        "Morfologia e Construção do Significado",
        "Tradição e Ruptura em Literaturas de Língua Portuguesa",
        "Estudos Sócio-Antropológicos",
        "Estudo da Produção Literária no Brasil",
        "Prática Pedagógica II",
        "Seminário Interdisciplinar de Pesquisa II",
      ],
      "Terceiro Semestre": [
        "Estudos Epistemológicos da Aprendizagem",
        "Construção do Sentido no Texto Literário",
        "Relações Sintáticas na Língua",
        "O Estético e o Lúdico na Literatura Infanto- Juvenil",
        "Literatura e Outras Artes",
        "Prática Pedagógica III",
        "Seminário Interdisciplinar de Pesquisa III",
      ],
      "Quarto Semestre": [
        "Psicologia e Educação",
        "Texto e Discurso",
        "Cânones e Contextos na Literatura Brasileira",
        "Estudos Fonéticos e Fonológicos",
        "Diversidade Lingüística",
        "Prática Pedagógica IV",
        "Seminário Interdisciplinar de Pesquisa IV",
      ],
      "Quinto Semestre": [
        "Cânones e Contextos na Literatura Portuguesa",
        "Constituição das Línguas Românicas",
        "Literatura e Cultura Afro-Brasileira",
        "Língua e Cultura Latinas",
        "Estudo da Ficção Brasileira Contemporânea",
        "Seminário Interdisciplinar de Pesquisa V",
        "Formação Histórica das Línguas Românicas",
      ],
      "Sexto Semestre": [
        "Literatura: Crítica, História, Cultura e Sociedade",
        "Língua Estrangeira Instrumental I",
        "Aspectos da Literatura Portuguesa",
        "Língua e Literatura Latinas",
        "Seminário Interdisciplinar de Pesquisa VI",
        "Constituição Histórica do Português Brasileiro",
        "Estudos da Produção Literária Baiana",
        "Crítica Textual: Edições e Estudos",
      ],
      "Sétimo Semestre": [
        "Seminário Interdisciplinar de Pesquisa VII",
        "Estágio Curricular Sup. III",
        "Constituição Histórica do Português Brasileiro",
        "Estudo da Produção Literária Baiana",
        "Crítica Textual: ED. e Estudos",
        "Lingua Estrangeira Instrumental II",
      ],
      "Oitavo Semestre": ["Estágio Curricular Supervisionado IV", "TCC"],
    },
  },
  "Língua Francesa e Literatura": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Aspectos Hist. e Cult. em Lingua Francesa",
        "Aspectos Hist. e Cult. em Lingua Materna",
        "Estudos Soc. Antrop. Ens. L. Fran.",
        "Lingua Portuguesa Instrumental",
        "Lingua Francesa Instrumental",
        "Lingua Francesa - Básico I",
        "Núcleo de Est. Intercisc. I",
      ],
      "Segundo Semestre": [
        "Estudos Filosóficos",
        "Leitura e Produção Textual",
        "Teo. Lit. em Lingua Fran. e Lingua Materna",
        "Aspectos Históricos e Culturais da África e da Diáspora ",
        "Estudos Linguísticos I",
        "Lingua Francesa - Básico II",
        "Núcleo de Est. Interdisciplinar II",
      ],
      "Terceiro Semestre": [
        "Compreensão e Produção Oral",
        "Est. da Morf. da Lingua Francesa I",
        "Estudos Fonéticos e Fonológicos I",
        "Estudos Linguísticos II",
        "Lingua Francesa-Intermediaria",
        "Núcleo de Est. Interdisciplinar III",
        "Panorama da Prod. Lit.: Da Origem Até a Modernidade",
      ],
      "Quarto Semestre": [
        "Lingua Francesa-Intermed. II",
        "Núcleo de Est. Interdisciplinar IV",
        "Políticas e Org. dos Sist. de Ensino",
        "Estudos Fonét. e Fonológicos II",
        "Estudos Comp. da Lit. em Lingua Francesa",
        "Produção do Texto Oral e Escrito",
        "Est. da Morf. da Lingua Francesa II",
      ],
      "Quinto Semestre": [
        "Estágio Curricular Supervisionado I",
        "Estudos Comparativos Linguísticos",
        "Estudos Comparativos da Lit. Francesa",
        "Estudos Fonéticos e Fonológicos III",
        "Lingua Francesa Intermediário III",
        "Linguística Aplicada no Ens. da Ling. Francesa I",
        "Núcleo de Estudos Interdisciplinares V",
      ],
      "Sexto Semestre": [
        "Libras",
        "Lingua Francesa Avançado I",
        "Núcleo de Estudos Interdisciplinares VI",
        "Estágio Curricular Supervisionado II",
        "Estudo Comp. da Lit. de Lingua Franc. e Ling. Materna",
        "Linguistica Aplicada e Lingua Francesa II",
        "LSP - Ensino da Ling. Franc. para fins específicos ",
      ],
      "Sétimo Semestre": [
        "Lingua Francesa - Avançado II",
        "TCC I",
        "Estágio Curricular Supervisionado III",
        "Prática de Tradução",
        "Análise Literária",
        "Novas Tecnologias E. D. e L. L. Francesa",
      ],
      "Oitavo Semestre": [
        "Lingua Francesa - Avançado III",
        "TCC II",
        "Estágio Curricular Supervisionado IV",
      ],
    },
  },
  "Lingua Inglesa e Literatura": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudo Evolutivo das Geosferas",
        "Fundamentos de Química",
        "Tópicos de Física",
        "Biologia Celular e Molecular",
        "Epistemologia da Ciência",
        "Lab. de Leitura e Produção de Texto",
        "Prática Pedagógica I",
        "Seminário Temático I",
      ],
      "Segundo Semestre": [
        "Biofísica",
        "Bioquímica",
        "Biologia dos Protoctistas ",
        "Biologia Vegetal I ",
        "Lab. de Leitura e Produção de Imagens ",
        "Prática Pedagógica II",
        "Genética",
        "Seminário Temático II",
      ],
      "Terceiro Semestre": [
        "Genética",
        "Biologia dos Invertebrados I",
        "Biologia do Desenvolvimento",
        "Anatomia e Organografia Vegetal",
        "Prática Pedagógica III",
        "Seminário Temático III",
      ],
      "Quarto Semestre": [
        "Biologia dos Invertebrados II",
        "Sistemática Vegetal",
        "Genética e Evolução",
        "Bioestatística",
        "Biologia dos Fungos",
        "Prática Pedagógica IV",
        "Seminário Temático IV",
      ],
      "Quinto Semestre": [
        "Biologia de Cordados",
        "Microbiologia",
        "Fisiologia Vegetal",
        "Ecologia Geral",
        "Prática Pedagógica e Estágio Supervisionado I",
      ],
      "Sexto Semestre": [
        "Fisiologia Animal Comparada",
        "Anatomia dos Vertebrados",
        "Bioética",
        "Projeto de Pesquisa I",
        "Prática Pedagógica e Estágio Supervisionado II",
      ],
      "Sétimo Semestre": [
        "Paleontologia",
        "Ecologia e Meio Ambiente",
        "Projeto de Pesquisa II",
        "Estágio Supervisionado I",
      ],
      "Oitavo Semestre": ["Monografia", "Estágio Supervisionado II"],
    },
  },
  Matemática: {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Optativas",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "LPT I",
        "Matemática I",
        "Psicologia",
        "Prática Des. Geométrico",
        "Lógica",
        "Pol. Educacionais",
        "T. S. F.",
      ],
      "Segundo Semestre": [
        "Matemática II",
        "Geometria Analítica",
        "Geometria Plana",
        "História e Cultura Afro-Bra. e Indígena",
        "Didática",
        "Leitura e Produção de Texto II",
        "Geometria Descritiva",
      ],
      "Terceiro Semestre": [
        "Geometria Espacial",
        "Prática Geo. Plana",
        "Prát. Ens. Funções",
        "Cálculo I",
        "Matemática III",
        "Educação Especial",
        "Tend. Ed. Matemática",
      ],
      "Quarto Semestre": [
        "Cálculo II",
        "Estatística I",
        "Álgebra I",
        "Prática em Geometria Espacial",
        "Didática da Matemática",
        "Software Matemático",
      ],
      "Quinto Semestre": [
        "Cálculo III",
        "Prat. Teo. Num. Álgebra",
        "Álgebra Linear II",
        "Est. Algébricas II",
        "Física I",
        "Estágio I",
      ],
      "Sexto Semestre": [
        "Cálculo IV",
        "Física II",
        "Metodologia da Pesquisa",
        "Álgebra II",
        "Prática em Matemática Financeira",
        "Estágio II",
      ],
      "Sétimo Semestre": [
        "Prática em EJA",
        "Física III",
        "Análise Real",
        "Estágio III",
        "TCC I",
      ],
      "Oitavo Semestre": [
        "História da Matemática",
        "Libras",
        "Estágio IV",
        "TCC II",
      ],
      Optativas: [
        "LPT III",
        "Met. Pesq. III",
        "Cálculo IV",
        "Geometria Descritiva II",
        "TCC II",
      ],
    },
  },
  "Sistemas de Informação": {
    semesters: [
      "Primeiro Semestre",
      "Segundo Semestre",
      "Terceiro Semestre",
      "Quarto Semestre",
      "Quinto Semestre",
      "Sexto Semestre",
      "Sétimo Semestre",
      "Oitavo Semestre",
      "Optativas",
    ],
    disciplines: {
      "Primeiro Semestre": [
        "Estudos Sócio Filosóficos",
        "Comunicação e Expressão",
        "Lógica e Matemática Discreta",
        "Teoria Geral da Administração",
        "Algoritmos",
        "Fundamentos da Informática",
      ],
      "Segundo Semestre": [
        "Metodologia da Pesquisa",
        "Sistemas de Informação",
        "Cálculo I",
        "Aplicações da Informática",
        "Linguagem de Programação I",
        "Arquitetura de Computadores",
      ],
      "Terceiro Semestre": [
        "OSM",
        "Ética e Direito em Informática",
        "Cálculo II",
        "Introdução a Estrutura de Dados",
        "Linguagem de Programação II",
        "Sistemas Operacionais",
      ],
      "Quarto Semestre": [
        "Probabilidade e Estatística",
        "Contabilidade",
        "Metodologia de Desenvolvimento de Sistemas I",
        "Estrutura de Dados",
        "Linguagem de Programação III",
        "Introdução a Redes de Computadores",
        "Tópicos Especiais em Sistemas de Informação",
      ],
      "Quinto Semestre": [
        "Teoria dos Grafos",
        "Psicologia Aplicada as Organizações",
        "Metodologia de Desenvolvimento de Sistemas II",
        "Introdução a Banco de Dados",
        "Interface Homem-Máquina",
        "Redes de Computadores",
      ],
      "Sexto Semestre": [
        "Economia",
        "Auditoria e Segurança de Sistemas",
        "Engenharia de Software",
        "Banco de Dados",
        "Laboratório de Aplicações Web",
        "Sistemas Distribuídos",
        "Estágio Supervisionado I",
      ],
      "Sétimo Semestre": [
        "Inteligência Artificial",
        "Sistemas Multimídia",
        "Planejamento Estratégico em TI",
        "Gerência de Projeto de Sistemas",
        "Projeto de Pesquisa em Informática",
        "Estágio Supervisionado I",
      ],
      "Oitavo Semestre": [
        "Trabalho de Conclusão de Curso",
        "Empreendedorismo",
        "Tópicos Especiais em Engenharia de Software",
        "Gestão de Pessoas",
        "Gestão do Conhecimento",
        "Estágio Supervisionado III",
      ],
      Optativas: [
        "Cálculo III",
        "Álgebra Linear",
        "Administração de RH",
        "Compiladores",
        "Pesquisa Operacional",
        "Administração de CPD",
        "Ambiente de Negócios e Marketing",
        "Cálculo Numérico",
        "Elementos de Análise de Custos",
      ],
    },
  },
};

const SemestersScreen = ({ navigation, route }) => {
  const { course } = route.params;
  const { semesters, disciplines } = coursesData[course];
  const [modalVisible, setModalVisible] = useState(false);
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPeriod, setStudentPeriod] = useState("");
  const [studentInit, setStudentInit] = useState("");
  const [studentCurrent, setStudentCurrent] = useState("");
  const [studentTime, setStudentTime] = useState("");
  const [studentDepartament, setStudentDepartament] = useState("");

  const renderItem = ({ item }) => {
    const semesterDisciplines = disciplines[item];
    const numberOfDisciplines = semesterDisciplines
      ? semesterDisciplines.length
      : 0;

    return (
      <TouchableOpacity
        style={styles.semesterButton}
        onPress={() =>
          navigation.navigate("Disciplinas", {
            course,
            semester: item,
            disciplines: semesterDisciplines,
          })
        }
      >
        <Text style={styles.semesterButtonText}>
          {item} - {numberOfDisciplines} disciplinas
        </Text>
      </TouchableOpacity>
    );
  };

  const getCurrentSemester = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Os meses em JavaScript são baseados em zero

    // Determinar o semestre com base no mês atual
    let semester = currentMonth >= 6 ? `${currentYear}.2` : `${currentYear}.1`;

    return semester;
  };

  const currentSemester = getCurrentSemester();

  const generatePDF = async () => {
    console.log("Número de matrícula do estudante:", studentID);
    const orientation = "landscape"; // ou "portrait"
    const htmlContent = `
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt" lang="pt"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>Relatorio SAGRES</title><meta name="author" content="servicosSagres"/><style type="text/css"> * {margin:0; padding:0; text-indent:0; }
    .s1 { color: black; font-family:Tahoma, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 8pt; }
    .s2 { color: black; font-family:Tahoma, sans-serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt; }
    .s3 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt; }
    .s4 { color: black; font-family:Tahoma, sans-serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt; }
    .s5 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt; }
    p { color: black; font-family:Tahoma, sans-serif; font-style: normal; font-weight: bold; text-decoration: none; font-size: 8pt; margin:0pt; }
    .s6 { color: black; font-family:Tahoma, sans-serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 7pt; }
    .s7 { color: black; font-family:"Times New Roman", serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 7pt; }
    table, tbody {vertical-align: top; overflow: visible; }
   </style>
   </head>
   
   <body>
       <p style="text-indent: 0pt;text-align: left;"><br /></p>
       <table style="border-collapse:collapse;margin-left:13.885pt" cellspacing="0">
           <tr style="height:26pt">
               <td
                   style="width:69pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s1" style="padding-left: 4pt;text-indent: 0pt;line-height: 10pt;text-align: left;">Matrícula
                   </p>
                   <p class="s2" style="padding-top: 4pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">${studentID}
                   </p>
               </td>
               <td
                   style="width:270pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s1" style="padding-left: 5pt;text-indent: 0pt;line-height: 10pt;text-align: left;">Nome</p>
                   <p class="s2" style="padding-top: 4pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">${studentName}<span
                           class="s3"></p>
               </td>
               <td
                   style="width:50pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s1" style="padding-left: 5pt;text-indent: 0pt;line-height: 10pt;text-align: left;">Período</p>
                   <p class="s2" style="padding-top: 3pt;padding-left: 14pt;text-indent: 0pt;text-align: left;">${studentPeriod}º</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s1" style="padding-left: 5pt;text-indent: 0pt;line-height: 10pt;text-align: left;">Ingresso
                   </p>
                   <p class="s2" style="padding-top: 3pt;padding-left: 6pt;text-indent: 0pt;text-align: left;">${studentInit}</p>
               </td>
               <td
                   style="width:84pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s1" style="padding-left: 5pt;text-indent: 0pt;line-height: 10pt;text-align: left;">
                       Período<span class="s3"> </span>Letivo</p>
                   <p class="s2" style="padding-top: 3pt;padding-left: 4pt;text-indent: 0pt;text-align: left;">${currentSemester}</p>
               </td>
           </tr>
           <tr style="height:26pt">
               <td style="width:288pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                   colspan="2">
                   <p class="s1" style="padding-left: 4pt;text-indent: 0pt;text-align: left;">Curso</p>
                   <p class="s2" style="padding-top: 3pt;padding-left: 3pt;text-indent: 0pt;text-align: left;">
                       ${course}</p>
               </td>
               <td
                   style="width:70pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s1" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Turno</p>
                   <p class="s2"
                       style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;line-height: 9pt;text-align: left;">
                       ${studentTime}</p>
               </td>
               <td style="width:170pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"
                   colspan="2">
                   <p class="s1" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Depto/Campus</p>
                   <p class="s2"
                       style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;line-height: 9pt;text-align: left;">
                       DCET<span class="s3"> </span>-<span class="s3"> </span>CAMPUS<span class="s3"> </span>II</p>
               </td>
           </tr>
       </table>
       <p style="text-indent: 0pt;text-align: left;"><br /></p>
       <table style="border-collapse:collapse;margin-left:13.88pt" cellspacing="0">
           <tr style="height:12pt">
               <td style="width:40pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s1" style="text-indent: 0pt;text-align: left;">Código</p>
               </td>
               <td style="width:182pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s1" style="padding-left: 12pt;text-indent: 0pt;text-align: left;">Nome<span class="s3">
                       </span>da<span class="s3"> </span>Disciplina</p>
               </td>
               <td style="width:47pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s1" style="padding-left: 3pt;text-indent: 0pt;text-align: center;">Classe</p>
               </td>
               <td style="width:43pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s1" style="padding-left: 4pt;text-indent: 0pt;text-align: center;">Crédito</p>
               </td>
               <td style="width:65pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s1" style="padding-left: 1pt;padding-right: 2pt;text-indent: 0pt;text-align: center;">
                       Carga<span class="s3"> </span>Horária</p>
               </td>
               <td style="width:152pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s1" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Sala/Depto</p>
               </td>
           </tr>
           <tr style="height:18pt">
               <td
                   style="width:40pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 4pt;text-indent: 0pt;text-align: left;">SIN016</p>
               </td>
               <td
                   style="width:182pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 4pt;padding-left: 13pt;text-indent: 0pt;text-align: left;">
                       INTRODUÇÃO<span class="s3"> </span>À<span class="s3"> </span>ESTRUTURA<span class="s3">
                       </span>DE<span class="s3"> </span>DADOS</p>
               </td>
               <td
                   style="width:47pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 4pt;padding-left: 3pt;text-indent: 0pt;text-align: center;">T01</p>
               </td>
               <td
                   style="width:43pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 4pt;padding-left: 4pt;text-indent: 0pt;text-align: center;">0</p>
               </td>
               <td
                   style="width:65pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 4pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">60</p>
               </td>
               <td
                   style="width:152pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 4pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">004<span
                           class="s3"> </span>/<span class="s3"> </span>DCET-II</p>
               </td>
           </tr>
           <tr style="height:20pt">
               <td
                   style="width:40pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;text-indent: 0pt;text-align: left;">SIN026</p>
               </td>
               <td
                   style="width:182pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 13pt;text-indent: 0pt;text-align: left;">TEORIA<span
                           class="s3"> </span>DOS<span class="s3"> </span>GRAFOS</p>
               </td>
               <td
                   style="width:47pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 3pt;text-indent: 0pt;text-align: center;">T01</p>
               </td>
               <td
                   style="width:43pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 4pt;text-indent: 0pt;text-align: center;">0</p>
               </td>
               <td
                   style="width:65pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">60</p>
               </td>
               <td
                   style="width:152pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">008<span
                           class="s3"> </span>/<span class="s3"> </span>DCET-II</p>
               </td>
           </tr>
           <tr style="height:20pt">
               <td
                   style="width:40pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;text-indent: 0pt;text-align: left;">SIN027</p>
               </td>
               <td
                   style="width:182pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 13pt;text-indent: 0pt;text-align: left;">
                       PSICOLOGIA<span class="s3"> </span>APLICADA<span class="s3"> </span>AS<span class="s3">
                       </span>ORGANIZAÇÕES</p>
               </td>
               <td
                   style="width:47pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 3pt;text-indent: 0pt;text-align: center;">T01</p>
               </td>
               <td
                   style="width:43pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 4pt;text-indent: 0pt;text-align: center;">0</p>
               </td>
               <td
                   style="width:65pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">60</p>
               </td>
               <td
                   style="width:152pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">LINF3<span
                           class="s3"> </span>/<span class="s3"> </span>DCET-II</p>
               </td>
           </tr>
           <tr style="height:20pt">
               <td
                   style="width:40pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;text-indent: 0pt;text-align: left;">SIN029</p>
               </td>
               <td
                   style="width:182pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 13pt;text-indent: 0pt;text-align: left;">
                       INTRODUÇÃO<span class="s3"> </span>A<span class="s3"> </span>BANCO<span class="s3"> </span>DE<span
                           class="s3"> </span>DADOS</p>
               </td>
               <td
                   style="width:47pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 3pt;text-indent: 0pt;text-align: center;">T01</p>
               </td>
               <td
                   style="width:43pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 4pt;text-indent: 0pt;text-align: center;">0</p>
               </td>
               <td
                   style="width:65pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">60</p>
               </td>
               <td
                   style="width:152pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">008<span
                           class="s3"> </span>/<span class="s3"> </span>DCET-II</p>
               </td>
           </tr>
           <tr style="height:20pt">
               <td
                   style="width:40pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;text-indent: 0pt;text-align: left;">SIN031</p>
               </td>
               <td
                   style="width:182pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 13pt;text-indent: 0pt;text-align: left;">REDES<span
                           class="s3"> </span>DE<span class="s3"> </span>COMPUTADORES</p>
               </td>
               <td
                   style="width:47pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 3pt;text-indent: 0pt;text-align: center;">T01</p>
               </td>
               <td
                   style="width:43pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 4pt;text-indent: 0pt;text-align: center;">0</p>
               </td>
               <td
                   style="width:65pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">60</p>
               </td>
               <td
                   style="width:152pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">008<span
                           class="s3"> </span>/<span class="s3"> </span>DCET-II</p>
               </td>
           </tr>
           <tr style="height:20pt">
               <td
                   style="width:40pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;text-indent: 0pt;text-align: left;">SIN040</p>
               </td>
               <td
                   style="width:182pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 13pt;text-indent: 0pt;text-align: left;">
                       INTELIGÊNCIA<span class="s3"> </span>ARTIFICIAL</p>
               </td>
               <td
                   style="width:47pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 3pt;text-indent: 0pt;text-align: center;">T01</p>
               </td>
               <td
                   style="width:43pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 4pt;text-indent: 0pt;text-align: center;">0</p>
               </td>
               <td
                   style="width:65pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 2pt;text-indent: 0pt;text-align: center;">60</p>
               </td>
               <td
                   style="width:152pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:1pt">
                   <p class="s2" style="padding-top: 6pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">010<span
                           class="s3"> </span>/<span class="s3"> </span>DCET-II</p>
               </td>
           </tr>
       </table>
       <p class="s4" style="padding-top: 7pt;padding-left: 262pt;text-indent: 0pt;text-align: left;">Total:<span
               class="s5"> </span>0<span class="s5"> </span>360</p>
       <p style="text-indent: 0pt;text-align: left;"><br /></p>
       <table style="border-collapse:collapse;margin-left:5.785pt" cellspacing="0">
           <tr style="height:15pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="text-indent: 0pt;line-height: 10pt;text-align: center;">Horário</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="text-indent: 0pt;line-height: 10pt;text-align: center;">SEG</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: center;">TER</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="text-indent: 0pt;line-height: 10pt;text-align: center;">QUA</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="text-indent: 0pt;line-height: 10pt;text-align: center;">QUI</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-left: 1pt;text-indent: 0pt;line-height: 10pt;text-align: center;">SEX</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="text-indent: 0pt;line-height: 10pt;text-align: center;">SAB</p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">07:30<span class="s3">
                       </span>-<span class="s3"> </span>08:20</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN016</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN029</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN040</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">08:20<span class="s3">
                       </span>-<span class="s3"> </span>09:10</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN016</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN029</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN040</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">09:10<span class="s3">
                       </span>-<span class="s3"> </span>10:00</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN016</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN029</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN040</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">10:00<span class="s3">
                       </span>-<span class="s3"> </span>10:50</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN016</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN029</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN040</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">10:50<span class="s3">
                       </span>-<span class="s3"> </span>11:40</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN031</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN031</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN026</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">11:40<span class="s3">
                       </span>-<span class="s3"> </span>12:30</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN031</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">SIN031</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN026</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">13:30<span class="s3">
                       </span>-<span class="s3"> </span>14:20</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN026</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">14:20<span class="s3">
                       </span>-<span class="s3"> </span>15:10</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN026</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">15:10<span class="s3">
                       </span>-<span class="s3"> </span>16:00</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN027</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">16:00<span class="s3">
                       </span>-<span class="s3"> </span>16:50</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN027</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">16:50<span class="s3">
                       </span>-<span class="s3"> </span>17:40</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN027</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">17:40<span class="s3">
                       </span>-<span class="s3"> </span>18:30</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;">SIN027</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">18:30<span class="s3">
                       </span>-<span class="s3"> </span>19:20</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;"></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">20:10<span class="s3">
                       </span>-<span class="s3"> </span>21:00</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;"></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">21:00<span class="s3">
                       </span>-<span class="s3"> </span>21:50</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;"></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
           <tr style="height:14pt">
               <td
                   style="width:98pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;text-indent: 0pt;text-align: center;">19:20<span class="s3">
                       </span>-<span class="s3"> </span>20:10</p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p class="s2" style="padding-top: 1pt;padding-left: 1pt;text-indent: 0pt;text-align: center;"></p>
               </td>
               <td
                   style="width:55pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt">
                   <p style="text-indent: 0pt;text-align: left;"><br /></p>
               </td>
           </tr>
       </table>
       <p style="padding-top: 9pt;padding-left: 5pt;text-indent: 0pt;text-align: left;">Este<span class="s5">
           </span>documento<span class="s5"> </span>só<span class="s5"> </span>é<span class="s5"> </span>válido<span
               class="s5"> </span>com<span class="s5"> </span>carimbo<span class="s5"> </span>e<span class="s5">
           </span>assinatura<span class="s5"> </span>do(a)<span class="s5"> </span>Coordenador(a)<span class="s5">
           </span>do<span class="s5"> </span>Colegiado<span class="s5"> </span>do<span class="s5"> </span>Curso<span
               class="s5"> </span>(Inst.<span class="s5"> </span>Nomartiva<span class="s5"> </span>Nº<span class="s5">
           </span>02/07<span class="s5"> </span>–<span class="s5"> </span>Artigo<span class="s5"> </span>5º)</p>
       <p style="text-indent: 0pt;text-align: left;"><br /></p>
       <p class="s6" style="padding-top: 4pt;padding-left: 8pt;text-indent: 0pt;text-align: left;">Alagoinhas,<span
               class="s7"> </span>12<span class="s7"> </span>de<span class="s7"> </span>abril<span class="s7">
           </span>de<span class="s7"> </span>2024</p>
       <p style="text-indent: 0pt;text-align: left;"><br /></p>
       <p style="text-indent: 0pt;line-height: 1pt;text-align: left;" />
       <p class="s6" style="padding-top: 3pt;padding-left: 8pt;text-indent: 0pt;line-height: 148%;text-align: left;">
           Ricardo<span class="s7"> </span>Luis<span class="s7"> </span>Rodrigues<span class="s7"> </span>Peres<span
               class="s7"> </span>Coordenador(a)<span class="s7"> </span>de<span class="s7"> </span>Colegiado</p>
       <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
       <p style="text-indent: 0pt;text-align: left;" />
       <p class="s6" style="padding-left: 8pt;text-indent: 0pt;text-align: left;">Assinatura<span class="s7">
           </span>do<span class="s7"> </span>aluno</p>
       <p style="padding-top: 6pt;text-indent: 0pt;text-align: left;"><br /></p>
       <p style="padding-left: 8pt;text-indent: 0pt;text-align: left;">Mensagem:</p>
       <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
       <p class="s4" style="padding-left: 8pt;text-indent: 0pt;text-align: left;">Início<span class="s5"> </span>das<span
               class="s5"> </span>aulas<span class="s5"> </span>do<span class="s5"> </span>período<span class="s5">
           </span>letivo<span class="s5"> </span>2020.1:</p>
       <p style="padding-top: 6pt;padding-left: 8pt;text-indent: 0pt;text-align: left;">Assinatura<span class="s5">
           </span>Eletrônica:</p>
       <p class="s4" style="padding-top: 4pt;padding-left: 8pt;text-indent: 0pt;text-align: left;">
           f0a9ba0ff1fb181dae2b611519bfd950</p>
   </body>
   
   </html>
   
    `;

    // Gere o PDF
    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    // Abra o PDF
    await Print.printAsync({ uri });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#121b22",
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: width * 0.03, // Use proporções relativas para o padding
      borderRadius: width * 0.02, // Use proporções relativas para o borderRadius
    },
    semesterButton: {
      backgroundColor: "white",
      padding: width * 0.04, // Use proporções relativas para o padding
      marginVertical: height * 0.003, // Use proporções relativas para a margem vertical
      borderRadius: width * 0.01, // Use proporções relativas para o borderRadius
      width: width * 0.9, // Use proporções relativas para a largura
      borderColor: "#1f2c34",
      borderWidth: 1,
      elevation: 1,
      backgroundColor: "#1f2c34",
    },
    semesterButtonText: {
      fontSize: width * 0.035, // Use proporções relativas para o tamanho da fonte
      textAlign: "center",
      color: "#dbe3e5",
      fontWeight: "bold",
    },
    floatingButtonContainer: {
      position: "absolute",
      bottom: height * 0.03,
      left: width * 0.78,
      zIndex: 999,
    },
    pdfButton: {
      backgroundColor: "#21F078", // Cor do botão
      borderRadius: 40, // Metade da largura/altura para torná-lo circular
      width: 80,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
      elevation: 3, // Sombra para dar uma aparência de flutuação
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
      width: 200,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          data={semesters}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </View>
      <View style={styles.floatingButtonContainer}>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.pdfButton}
        >
          <FontAwesome name="print" size={40} color="white" />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Digite seu número de matrícula:
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setStudentID(text)}
              value={studentID}
              placeholder="Número de matrícula"
            />
            <Text style={styles.modalTitle}>Digite seu Nome:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setStudentName(text)}
              value={studentName}
              placeholder="Nome"
            />
            <Text style={styles.modalTitle}>Qual o seu semestre atual?</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setStudentPeriod(text)}
              value={studentPeriod}
              placeholder="1, 2, 3..."
            />
            <Text style={styles.modalTitle}>
              Digite seu Semestre de Ingresso:
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setStudentInit(text)}
              value={studentInit}
              placeholder="2022.1, 2022.2 ..."
            />
            <Text style={styles.modalTitle}>Digite seu Turno:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setStudentTime(text)}
              value={studentTime}
              placeholder="Matutino, Vespertino ..."
            />
            <Text style={styles.modalTitle}>Digite seu Departamento:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setStudentTime(text)}
              value={studentTime}
              placeholder="Matutino, Vespertino ..."
            />
            <Button
              title="Imprimir"
              onPress={() => {
                generatePDF();
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SemestersScreen;
