# Snake API - Deploy na Vercel

## ✅ Checklist de Deploy

### 1. Configuração do Projeto
- [x] `vercel.json` configurado
- [x] `api/index.js` usando `export default`
- [x] Conexão MongoDB com cache para serverless
- [x] Tratamento de erros adequado
- [x] CORS configurado

### 2. Variáveis de Ambiente
Configure no Dashboard da Vercel (**Settings** → **Environment Variables**):

| Key | Value | Environments |
|-----|-------|--------------|
| `MONGODB_URI` | `mongodb+srv://joaosports19_db_user:k8qnAoyD2xDOBLLj@cluster0.xp29en9.mongodb.net/snake-game` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `CORS_ORIGIN` | `*` ou sua URL frontend | Todos |

⚠️ **IMPORTANTE**: Adicione `/snake-game` no final da `MONGODB_URI`!

### 3. Passos para Deploy

#### Via CLI (Recomendado):
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy preview
vercel

# 4. Configure as variáveis de ambiente no dashboard

# 5. Deploy em produção
vercel --prod
```

#### Via Dashboard (Interface Web):
1. Acesse https://vercel.com
2. Clique em **Add New** → **Project**
3. Importe o repositório do GitHub
4. Configure:
   - **Root Directory**: `./` (raiz do projeto)
   - **Framework Preset**: Other
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)
5. Adicione as variáveis de ambiente
6. Clique em **Deploy**

### 4. Estrutura do Projeto
```
Snake-API/
├── api/
│   └── index.js          # Entry point para Vercel (serverless function)
├── src/
│   ├── app.js            # Aplicação Express
│   ├── config/
│   │   └── DbConnect.js  # Conexão MongoDB com cache
│   ├── models/
│   │   └── jogador.js
│   └── routes/
│       └── scoreRoutes.js
├── vercel.json           # Configuração da Vercel
├── package.json
├── .env                  # Local (NÃO commitar)
└── .env.example          # Exemplo de variáveis
```

### 5. Verificação Pós-Deploy

Teste os endpoints:
```bash
# Rota principal
curl https://seu-projeto.vercel.app/

# Listar jogadores
curl https://seu-projeto.vercel.app/jogadores

# Ranking
curl https://seu-projeto.vercel.app/ranking
```

### 6. Troubleshooting

#### Erro: FUNCTION_INVOCATION_FAILED
- ✅ Verifique se `MONGODB_URI` está configurada no dashboard
- ✅ Certifique-se que a URI termina com `/snake-game` (nome do banco)
- ✅ Verifique os logs: `vercel logs` ou no dashboard

#### Erro: Cannot find module
- ✅ Certifique-se que todas as dependências estão em `dependencies` (não em `devDependencies`)
- ✅ Rode `npm install` localmente

#### Timeout
- ✅ Conexão MongoDB com cache está implementada
- ✅ Verifique se o MongoDB Atlas permite conexões da Vercel (IP 0.0.0.0/0)

### 7. Otimizações Implementadas

✅ **Cache de Conexão MongoDB**: Reutiliza conexões entre invocações serverless
✅ **Tratamento de Erros**: Error handlers para respostas adequadas
✅ **CORS Configurável**: Permite requisições do frontend
✅ **Swagger Opcional**: Não quebra se o arquivo não existir
✅ **Logs Estruturados**: Para debug em produção

### 8. Próximos Passos

1. Configure domínio customizado (opcional)
2. Configure CI/CD automático via GitHub
3. Monitore uso e performance no dashboard
4. Configure alertas de erro

## 🚀 Deployment

O projeto está pronto para deploy! Execute `vercel --prod` após configurar as variáveis de ambiente.
