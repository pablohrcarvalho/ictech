const {useState,useEffect,useCallback} = React;

const Logo = ({size=120}) => (
<svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
<rect width="100" height="100" fill="#24504F" rx="16"/>
<circle cx="50" cy="50" r="22" fill="none" stroke="#F4F2EC" strokeWidth="5"/>
<circle cx="50" cy="50" r="7" fill="#4E8C80"/>
</svg>
);

const products = [
{name:"NeoPix",cat:"PAGAMENTOS & FINANCEIRO",pitch:"Cobranças PIX que se cobram, se confirmam e se concluem sozinhas.",features:[{icon:"💳",title:"QR Code instantâneo",desc:"Gera cobrança em segundos"},{icon:"✅",title:"Confirmação automática",desc:"Baixa ao receber pagamento"},{icon:"🏦",title:"Multi-banco",desc:"Itaú, Sicoob, Mercado Pago com load balancing"}],highlight:"Quando o cliente paga, o pedido se completa sozinho: fatura, fecha, baixa e concilia automaticamente.",media:[{type:"img",src:"neopix1.jpeg"},{type:"img",src:"neopix2.jpeg"}]},
{name:"NeoFatura",cat:"PAGAMENTOS & FINANCEIRO",pitch:"Um robô que fatura, baixa e concilia 24 horas por dia — sem ninguém precisar tocar.",features:[{icon:"🤖",title:"Automação 24/7",desc:"Funciona sem parar"},{icon:"🎯",title:"Zero erro manual",desc:"Elimina retrabalho"},{icon:"⚙️",title:"Regras personalizáveis",desc:"Configure conforme seu fluxo"}],highlight:"Sua equipe livre do operacional — focada em vender e atender, não em digitar nota fiscal.",media:[{type:"img",src:"neofatura-dashboard.jpeg"}]},
{name:"NeoLeads",cat:"VENDAS & CRESCIMENTO",pitch:"Transforma dados públicos em uma carteira de clientes pronta para prospecção.",features:[{icon:"🔍",title:"Receita Federal + Google Maps",desc:"Dados cruzados"},{icon:"📊",title:"Pontuação inteligente",desc:"Score de potencial"},{icon:"📱",title:"Contatos completos",desc:"Telefone, e-mail, endereço"},{icon:"🤖",title:"Mensagem com IA",desc:"Abordagem personalizada"}],highlight:"Menos tempo procurando cliente, mais tempo vendendo para quem tem chance real de fechar.",media:[{type:"img",src:"leadscraper-dashboard.jpeg"},{type:"img",src:"leadscraper-leads.jpeg"}]},
{name:"NeoIntegra",cat:"VENDAS & CRESCIMENTO",pitch:"Seu Winthor regendo Mercado Livre, Shopee, TikTok Shop e loja própria — como uma orquestra.",features:[{icon:"📦",title:"Estoque unificado",desc:"Todos os canais sincronizados"},{icon:"📋",title:"Regras por canal",desc:"Preço e estoque específicos"},{icon:"⚡",title:"Sincronização rápida",desc:"5min estoque, 3min pedidos"}],highlight:"Vende em todo lugar, controla de um lugar só — e nunca vende o que não tem.",media:[{type:"img",src:"neointegra-connector.jpeg"}]},
{name:"NeoAsk",cat:"INTELIGÊNCIA & DADOS",pitch:"A IA que conhece o Winthor por dentro — e explica de forma que qualquer um entende.",features:[{icon:"📚",title:"Lê toda a documentação",desc:"Base completa indexada"},{icon:"🔄",title:"Sempre atualizada",desc:"Novos docs automaticamente"},{icon:"💬",title:"Resposta simples",desc:"Linguagem clara e direta"}],highlight:"Sua equipe deixa de abrir 30 abas de fórum para descobrir uma rotina. Pergunta, recebe a resposta certa.",media:[{type:"video",src:"neoask-demo.mp4"}]},
{name:"NeoTax",cat:"INTELIGÊNCIA & DADOS",pitch:"Cadastro tributário automático, lendo XMLs que sua empresa já emitiu.",features:[{icon:"📄",title:"Leitura de XML",desc:"Importa notas emitidas"},{icon:"🧮",title:"Figuras tributárias automáticas",desc:"ICMS, PIS, COFINS"},{icon:"⏱️",title:"Economiza dias",desc:"De dias para minutos"}],highlight:"Tributação errada custa caro. NeoTax usa o que você já emitiu corretamente como fonte de verdade.",media:[]},
{name:"NeoPrice",cat:"PAGAMENTOS & FINANCEIRO",pitch:"Precificação automática que protege sua margem em cada entrada de mercadoria.",features:[{icon:"📈",title:"Margem garantida",desc:"Nunca vende abaixo do custo"},{icon:"🔢",title:"Custo flexível",desc:"Médio, última ou maior entrada"},{icon:"🔒",title:"Exceções com alçada",desc:"Controle de quem aprova"},{icon:"📋",title:"Histórico e rastreio",desc:"Auditoria completa"}],highlight:"Você nunca mais perde margem por esquecimento — o sistema reprecifica antes do produto chegar à prateleira.",media:[{type:"img",src:"neoprice.jpeg"}]},
{name:"DifferPrice",cat:"INTELIGÊNCIA & DADOS",pitch:"Preços diferenciados por cliente, com inteligência de mercado e perfil de compra.",features:[{icon:"👤",title:"Perfil de compra",desc:"Histórico e comportamento"},{icon:"🌦️",title:"Sazonalidade e clima",desc:"Ajuste dinâmico"},{icon:"🎯",title:"Granular",desc:"SKU, marca, categoria"}],highlight:"Cada cliente recebe o preço que tem maior chance de fazê-lo fechar — sem queimar margem desnecessária.",media:[]},
{name:"NeoZap",cat:"VENDAS & CRESCIMENTO",pitch:"Seu WhatsApp como canal completo: vende, atende, notifica e entrega documentos.",features:[{icon:"💬",title:"Vendas pelo WhatsApp",desc:"Catálogo e pedido no webchat"},{icon:"📢",title:"Promoções e lembretes",desc:"Campanhas automatizadas"},{icon:"📑",title:"2ª via DANFE e Boleto",desc:"Autoatendimento"},{icon:"📊",title:"Relatórios com IA",desc:"Insights de atendimento"}],highlight:"Funciona com API oficial Meta ou não-oficial, conforme a necessidade do seu negócio.",media:[{type:"video",src:"neozap-compressed.mp4"}]},
{name:"NeoSuggest",cat:"VENDAS & CRESCIMENTO",pitch:"IA que sugere o próximo produto certo para cada cliente — mesmo que ele nunca tenha comprado.",features:[{icon:"🧠",title:"Identifica perfis",desc:"Clusters de comportamento"},{icon:"🔀",title:"Sugestões cruzadas",desc:"Cross-sell inteligente"},{icon:"💰",title:"Aumento de ticket",desc:"Mais itens por pedido"}],highlight:"Mostre ao cliente o que ele provavelmente compraria — e ainda não comprou.",media:[]},
{name:"NeoPick",cat:"OPERAÇÕES & LOGÍSTICA",pitch:"Separação de pedidos no coletor Zebra, com painel de gestão moderno e simples.",features:[{icon:"📱",title:"App para coletor Zebra",desc:"Interface otimizada"},{icon:"🖥️",title:"Painel de gestão",desc:"Acompanhe em tempo real"},{icon:"✔️",title:"Conferência integrada",desc:"Valida na separação"}],highlight:"Pedidos saem mais rápido, com menos erro de separação e visibilidade total para o gestor.",media:[]},
{name:"NeoRota",cat:"OPERAÇÕES & LOGÍSTICA",pitch:"Roteirização inteligente para entregas próprias, com visualização no mapa.",features:[{icon:"🗺️",title:"Melhor rota traçada",desc:"Algoritmo otimizado"},{icon:"⏱️",title:"Estimativas de tempo",desc:"Previsão de entrega"},{icon:"📍",title:"Visualização no mapa",desc:"Acompanhamento visual"}],highlight:"Mais entregas por dia, menos combustível gasto, cliente recebendo na janela combinada.",media:[{type:"video",src:"neorota-demo.mp4"}]},
{name:"NeoClean",cat:"OPERAÇÕES & LOGÍSTICA",pitch:"Saneamento de cadastros de clientes — dados sempre limpos, atualizados e confiáveis.",features:[{icon:"🧹",title:"Atualização cadastral",desc:"Dados sempre frescos"},{icon:"✅",title:"Validação na Receita",desc:"CNPJ/CPF verificados"},{icon:"📍",title:"Geolocalização precisa",desc:"Lat/lng corretos"}],highlight:"Dado limpo é a base de tudo: roteirização, faturamento, entrega e cobrança dependem disso.",media:[]},
{name:"NeoMap",cat:"OPERAÇÕES & LOGÍSTICA",pitch:"Visualize a carteira do RCA no mapa e descubra se ele dá lucro ou prejuízo.",features:[{icon:"🗺️",title:"Carteira no mapa",desc:"Visualização geográfica"},{icon:"🛣️",title:"Otimização de rota",desc:"Menos km por cliente"},{icon:"💰",title:"Lucro vs. prejuízo",desc:"ROI por vendedor"}],highlight:"Pare de gerenciar carteira no 'achismo'. Saiba exatamente quanto cada RCA representa no resultado.",media:[{type:"img",src:"neomap-geomarketing.jpeg"}]},
{name:"NeoDash",cat:"INTELIGÊNCIA & DADOS",pitch:"Dashboards e KPIs estratégicos para tomada de decisão em tempo real.",features:[{icon:"📊",title:"KPIs em tempo real",desc:"Dados atualizados do ERP"},{icon:"🏆",title:"Ranking de filiais",desc:"Ouro, Prata e Bronze por performance"},{icon:"📈",title:"Evolução diária/mensal",desc:"Acompanhe tendências"},{icon:"🔗",title:"Integração multi-filial",desc:"Visão consolidada do grupo"}],highlight:"Transforme dados do Winthor em inteligência visual — sem planilha, sem atraso, sem achismo.",media:[{type:"img",src:"dashboard-ecommerce.jpeg"}]},
];

const TOTAL = 19;

const catalogCols = [
{name:'NeoPix',bg:'#0B261E',light:false,hex:'#0B261E'},
{name:'NeoFatura',bg:'#0B4935',light:false,hex:'#0B4935'},
{name:'NeoPrice',bg:'#137051',light:false,hex:'#137051'},
{name:'NeoLeads',bg:'#1B9A6A',light:false,hex:'#1B9A6A'},
{name:'NeoIntegra',bg:'#66E26F',light:true,hex:'#66E26F'},
{name:'NeoZap',bg:'#7AEEA0',light:true,hex:'#7AEEA0'},
{name:'NeoSuggest',bg:'#A0F4B8',light:true,hex:'#A0F4B8'},
{name:'DifferPrice',bg:'#C1F7C2',light:true,hex:'#C1F7C2'},
{name:'NeoAsk',bg:'#D4FAD8',light:true,hex:'#D4FAD8'},
{name:'NeoTax',bg:'#DCFFDE',light:true,hex:'#DCFFDE'},
{name:'NeoPick',bg:'#E8FFE9',light:true,hex:'#E8FFE9'},
{name:'NeoRota',bg:'#F0FFF0',light:true,hex:'#F0FFF0'},
{name:'NeoClean',bg:'#F8FFF8',light:true,hex:'#F8FFF8'},
{name:'NeoMap',bg:'#FFFFFF',light:true,hex:'#FFFFFF'},
];

function App(){
const [current,setCurrent] = useState(0);
const [lightbox,setLightbox] = useState(null);
const go = useCallback((dir)=>{
setCurrent(c=>Math.max(0,Math.min(TOTAL-1,c+dir)));
},[]);
useEffect(()=>{
const h=e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)};
window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h);
},[go]);

return (<div style={{position:'relative',width:'100%',height:'100%'}}>
{lightbox && <div className="media-overlay" onClick={()=>setLightbox(null)}><img src={lightbox} alt="zoom"/></div>}
<div className="nav-zone left" onClick={()=>go(-1)}/>
<div className="nav-zone right" onClick={()=>go(1)}/>
<div className="dots">{Array.from({length:TOTAL},(_,i)=><span key={i} className={i===current?'active':''}/>)}</div>

{current===0 && <SlideCover/>}
{current===1 && <SlideCatalog/>}
{current===2 && <SlideOverview/>}
{current>=3 && current<=17 && <SlideProduct p={products[current-3]} idx={current} onZoom={setLightbox}/>}
{current===18 && <SlideCTA/>}
</div>);
}

function SlideCover(){return(
<div className="slide dark" key="cover">
<Logo size={120}/>
<h1 style={{fontFamily:'Inter Tight',fontWeight:700,fontSize:54,color:'#24504F',letterSpacing:'-0.03em',marginTop:24}}>ic_tech</h1>
<p style={{fontFamily:'JetBrains Mono',fontSize:11,letterSpacing:'0.18em',color:'var(--ink-400)',marginTop:12}}>VEMOS O QUE OUTROS NÃO VEEM</p>
<p style={{fontSize:16,color:'var(--cream)',marginTop:20,opacity:.8}}>Soluções inteligentes que potencializam seu Winthor</p>
<span className="chip">14 produtos · Automação · IA · Integração</span>
</div>
)}

function SlideOverview(){return(
<div style={{height:'100%',display:'flex',flexDirection:'column',background:'var(--ink-900)',position:'relative',overflow:'hidden',padding:'48px clamp(40px,6vw,80px)'}} key="overview">
<div className="grid-bg"/>
<div style={{position:'relative',zIndex:1,textAlign:'center',marginBottom:32}}>
<p style={{fontFamily:'JetBrains Mono',fontSize:15,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--green-400)',marginBottom:12,animation:'fadeUp .5s ease both'}}>VISÃO GERAL</p>
<h2 style={{fontFamily:'Inter Tight',fontWeight:700,fontSize:'clamp(36px,4.5vw,52px)',color:'#fff',letterSpacing:'-0.03em',marginBottom:8,animation:'fadeUp .6s ease .1s both'}}>Conheça a Família Neo</h2>
<p style={{fontSize:18,color:'var(--ink-400)',animation:'fadeUp .6s ease .15s both'}}>15 soluções pensadas para automatizar, integrar e potencializar cada operação do seu Winthor.</p>
</div>
<div style={{position:'relative',zIndex:1,flex:1,display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,alignContent:'center',animation:'fadeUp .6s ease .2s both'}}>
<div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:16,padding:28}}>
<h4 style={{fontFamily:'Inter Tight',fontWeight:600,fontSize:18,color:'var(--green-400)',marginBottom:14}}>💳 Pagamentos & Financeiro</h4>
{[['NeoPix','Cobranças PIX automáticas'],['NeoFatura','Faturamento 24/7 sem erro'],['NeoPrice','Precificação automática']].map(([n,d])=>(<div key={n} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}><span style={{fontFamily:'Inter Tight',fontWeight:600,fontSize:15,color:'#fff'}}>{n}</span><span style={{fontSize:13,color:'var(--ink-400)'}}>{d}</span></div>))}
</div>
<div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:16,padding:28}}>
<h4 style={{fontFamily:'Inter Tight',fontWeight:600,fontSize:18,color:'var(--green-400)',marginBottom:14}}>📈 Vendas & Crescimento</h4>
{[['NeoLeads','Prospecção qualificada com IA'],['NeoIntegra','Mercado Livre, Shopee, TikTok'],['NeoZap','Vendas e bot via WhatsApp'],['NeoSuggest','Sugestão de SKU por perfil']].map(([n,d])=>(<div key={n} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}><span style={{fontFamily:'Inter Tight',fontWeight:600,fontSize:15,color:'#fff'}}>{n}</span><span style={{fontSize:13,color:'var(--ink-400)'}}>{d}</span></div>))}
</div>
<div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:16,padding:28}}>
<h4 style={{fontFamily:'Inter Tight',fontWeight:600,fontSize:18,color:'var(--green-400)',marginBottom:14}}>🧠 Inteligência & Dados</h4>
{[['NeoAsk','IA que entende o Winthor'],['NeoTax','Tributação automática via XML'],['DifferPrice','Preço diferenciado por cliente'],['NeoDash','Dashboards e KPIs estratégicos']].map(([n,d])=>(<div key={n} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}><span style={{fontFamily:'Inter Tight',fontWeight:600,fontSize:15,color:'#fff'}}>{n}</span><span style={{fontSize:13,color:'var(--ink-400)'}}>{d}</span></div>))}
</div>
<div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:16,padding:28}}>
<h4 style={{fontFamily:'Inter Tight',fontWeight:600,fontSize:18,color:'var(--green-400)',marginBottom:14}}>🚚 Operações & Logística</h4>
{[['NeoPick','Separação por coletor Zebra'],['NeoRota','Roteirização inteligente'],['NeoClean','Saneamento de cadastros'],['NeoMap','Otimização de carteira RCA']].map(([n,d])=>(<div key={n} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}><span style={{fontFamily:'Inter Tight',fontWeight:600,fontSize:15,color:'#fff'}}>{n}</span><span style={{fontSize:13,color:'var(--ink-400)'}}>{d}</span></div>))}
</div>
</div>
<div style={{position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',fontFamily:'JetBrains Mono',fontSize:10,color:'rgba(255,255,255,.3)',letterSpacing:'.08em'}}>Família Neo · Soluções para Winthor</div>
</div>
)}

function SlideProduct({p,idx,onZoom}){const hasMedia=p.media.length>0;return(
<div className="slide-product" key={p.name+idx}>
<div className="grid-bg"/>
<span className="slide-product-counter">{idx} / {TOTAL}</span>
<div className="slide-product-header" style={{animation:'fadeUp .5s ease both'}}>
<p className="ep">{p.cat}</p>
<h2>{p.name}</h2>
<p className="sub">{p.pitch}</p>
</div>
{hasMedia ? (<div className="slide-product-body">
<div className={'slide-product-left'+(p.media.length<=1?' single':'')+(p.media.length>=2?' has2':'')} style={{animation:'scaleIn .6s ease .2s both'}}>
{p.media.map((m,i)=>m.type==='img'
?<img key={i} src={m.src} alt={p.name} onClick={()=>onZoom&&onZoom(m.src)}/>
:<video key={i} src={m.src} controls style={{background:'#000'}}/>
)}
</div>
<div className="slide-product-right" style={{animation:'fadeUp .5s ease .15s both'}}>
{p.features.map((f,i)=>(
<div className="feature-item" key={i}>
<span className="fi-icon">{f.icon}</span>
<div className="fi-text"><h4>{f.title}</h4><p>{f.desc}</p></div>
</div>
))}
<div className="highlight-box-dark"><strong>DIFERENCIAL</strong>{p.highlight}</div>
</div>
</div>) : (<div className="slide-product-full" style={{animation:'fadeUp .5s ease .15s both'}}>
<div className="features-grid">
{p.features.map((f,i)=>(
<div className="feature-card-full" key={i}>
<div className="fc-icon">{f.icon}</div>
<h4>{f.title}</h4>
<p>{f.desc}</p>
</div>
))}
</div>
<div className="highlight-box-dark highlight-full"><strong>DIFERENCIAL</strong>{p.highlight}</div>
</div>)}
<span className="slide-product-footer">Família Neo · Soluções para Winthor</span>
</div>
)}

function SlideCatalog(){return(
<div className="catalog" key="catalog">
{catalogCols.map((c,i)=>(
<div key={c.name} className={'catalog-col'+(c.light?' light-col':'')} style={{background:c.bg,animation:'fadeIn .5s ease both',animationDelay:i*60+'ms'}}>
<span className="cat-label">{c.name}</span>
</div>
))}
</div>
)}

function SlideCTA(){return(
<div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center',padding:60,background:'var(--ink-900)',position:'relative',overflow:'hidden'}} key="cta">
<div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle, #24504F 0%, transparent 65%)',opacity:.08,filter:'blur(20px)',pointerEvents:'none'}}/>
<div style={{position:'relative',zIndex:1}}>
<p style={{fontFamily:'JetBrains Mono',fontSize:15,letterSpacing:'4px',color:'var(--green-400)',marginBottom:32,animation:'fadeUp .5s ease both'}}>PRÓXIMO PASSO</p>
<h2 style={{fontFamily:'Inter Tight',fontSize:'clamp(52px,8vw,86px)',fontWeight:700,letterSpacing:'-0.03em',color:'var(--ink-50)',marginBottom:24,lineHeight:1.05,animation:'fadeUp .6s ease .1s both'}}>Vamos conversar?</h2>
<p style={{fontSize:22,color:'rgba(255,255,255,.55)',lineHeight:1.65,maxWidth:600,margin:'0 auto 48px',animation:'fadeUp .6s ease .2s both'}}>Cada negócio tem um potencial diferente com IA.<br/>Queremos entender o seu.</p>
<button style={{background:'var(--green-500)',color:'white',border:'none',padding:'18px 48px',borderRadius:999,fontSize:20,fontWeight:600,cursor:'pointer',fontFamily:'Inter Tight',animation:'fadeUp .6s ease .3s both'}}>Fale com a ic_tech →</button>
</div>
<div style={{position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',fontFamily:'JetBrains Mono',fontSize:11,letterSpacing:'.12em',color:'rgba(255,255,255,.25)',textTransform:'uppercase'}}>
<span style={{color:'var(--green-400)',fontWeight:500}}>ic</span>_tech<span style={{color:'var(--green-400)'}}>.</span>
<span style={{display:'inline-block',width:20,height:1,background:'rgba(255,255,255,.15)',verticalAlign:'middle',margin:'0 10px'}}/>
2026
</div>
</div>
)}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
