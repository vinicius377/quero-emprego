# Quero Emprego - Mucambo

Site para busca de empregos, na cidade de Mucambo 💼🤝🏽. 
Notei que a busca por empregos na minha cidade era desorganizada, as empresas postavam que estavam em busca de novos colaboradores em grupos de WhatsAp e perfis no Instagram ou Facebook, isso trazia uma grande desvantagem tanto aos interessados, pois as oportunidades então espalhadas em diversas plataformas, quanto para as empresas, pois os seus informativos não chegam ao candidato ideal.
Outras plataformas de emprego também não seriam muito úteis, pois não são muito populares na minha região. Por isso criei essa plataforma, para centralizar empregos especificamente para a minha cidade.

<table>
    <tr>
        <td>
            <img src="./screenshots/Home.png" alt"Tela inicial"/>
            <span>Tela inicial</span>
        </td>
        <td>
            <img src="./screenshots/Profile.png" alt="Tela de perfil"/>
            <span>Tela de perfil</span>
        </td>
    </tr>
    <tr>
        <td>
            <img src="./screenshots/Job.png" alt="Tela de detalhes do emprego"/>
            <span>Tela de detalhes do emprego</span>
        </td>
        <td>
            <img alt="Tela do Candidato" src="./screenshots/Candidate.png"/>
            <span>Tela do Candidato</span>
        </td>
    </tr>
</table>

## Features
Geral
- [x] Fazer o login, para empresas e candidatos
- [x] Fazer o cadastro, de empresas e candidatos

Empresas
- [x] Empresas podem criar novos posts de vagas de emprego
- [x] Empresas tem acesso a todos os posts, podendo alterar suas informações
- [x] Empresas podem mudar o status da vaga de emprego
- [x] Empresas tem acesso aos candidatos e suas informações

Candidatos
- [x] Candidatos podem aplicar as vagas abertas
- [x] Candidatos podem alterar as suas informações

## Tecnologias
Utilizando monorepo, com yarn

### Front-end
- React 
- Rspack
- Jotai
- tRPC
- shadcn

### Back-end
- tRPC 
- Mongoose