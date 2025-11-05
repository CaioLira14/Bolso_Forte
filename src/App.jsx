// src/App.jsx
import React, { useEffect, useState } from "react";

/*
  App final - Tubarões do Sucesso
  - Layout com seções: Hero, Sobre, Grupos, E-books, Como funciona, Footer
  - Imagens livres do Unsplash já configuradas
  - Carrinho, descontos, pacotes, coleção completa
  - Modal Pix com campo de código de liberação
  - Painel secreto: clique 10x no primeiro "A" do título para editar o código Pix (salvo em localStorage)
*/

/* ============ CONFIGURAÇÃO ============ */
const DEFAULT_PIX = "78#34tm12"; // código inicial de liberação
const PIX_KEY_FALLBACK = "5511bd4d-80b5-4b33-9342-a2cdef8eb8ea"; // chave Pix para copiar
const QR_IMAGE_URL = "https://i.imgur.com/your_qr_code.png"; // opcional: troque pelo QR real

/* ============ PREÇOS ============ */
const PRICE_SINGLE = 7.9;      // por e-book
const PRICE_BULK_3PLUS = 6.5;  // por e-book quando 3+ comprados
const PRICE_GROUP = 14.9;      // pacote por grupo
const PRICE_COLLECTION = 34.9; // coleção completa

/* ============ PRODUTOS E GRUPOS ============ */
/* Cada e-book tem resumo curto (o que a pessoa vai encontrar) */
const PRODUCTS = [
  // Finanças (existentes)
  {
    id: "f1",
    title: "Guia de Finanças Pessoais",
    price: PRICE_SINGLE,
    desc: "Organize suas finanças e crie um plano prático para economizar e investir.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EZTN69JneK1Eg1o6jEsb23EBXdsWrLkqaiP4H_A3yyPKxw",
    img: "https://images.unsplash.com/photo-1542223616-1f4d8f0b90b4?auto=format&fit=crop&w=1400&q=60",
    group: "Finanças",
    summary: [
      "Entenda seu fluxo de caixa em passos simples",
      "Métodos para economizar sem sofrimento",
      "Checklist mensal e metas financeiras"
    ]
  },
  {
    id: "f2",
    title: "Mini Curso Investindo do Zero",
    price: PRICE_SINGLE,
    desc: "Comece a investir com segurança: conceitos, produtos e primeiros passos.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EbVe_ZysjpVErM_CbpVKayYBOPUl5ubBox31S1dsUxQR5w",
    img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1400&q=60",
    group: "Finanças",
    summary: [
      "O que é risco e retorno com exemplos claros",
      "Como abrir conta e escolher primeiro investimento",
      "Plano simples para começar com pouco"
    ]
  },

  // Saúde / Corpo
  {
    id: "s1",
    title: "Guia de Hábitos Saudáveis",
    price: PRICE_SINGLE,
    desc: "Rotinas pequenas com grande impacto: sono, hidratação e hábitos diários.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EexORZt2619BugV9yEEuccoBPa4-Y7c5ebUfBcb31ipemQ",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=60",
    group: "Saúde",
    summary: [
      "Como montar uma rotina noturna para dormir melhor",
      "Alimentação prática e hidratação",
      "Mini-hábitos para consistência"
    ]
  },
  {
    id: "s2",
    title: "Treino Rápido em Casa",
    price: PRICE_SINGLE,
    desc: "Sequências de 10–20 minutos para força e condicionamento sem equipamentos.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EUmucel_DkRFksD4eFxp7UEBooLAEEFL8YmCpwvyQ7SqlA",
    img: "https://images.unsplash.com/photo-1558611848-73f7eb4001d4?auto=format&fit=crop&w=1400&q=60",
    group: "Saúde",
    summary: [
      "Aquecimento curto e seguro",
      "Circuitos rápidos para corpo inteiro",
      "Plano semanal de 3–4 treinos"
    ]
  },
  {
    id: "s3",
    title: "Alimentação Inteligente",
    price: PRICE_SINGLE,
    desc: "Planejamento prático: refeições, lanches e escolhas conscientes para energia.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EcQO-VqiP4BEmyrr-Us_4s8B5LjeTyQ5emBrrGl2sgkESQ",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1400&q=60",
    group: "Saúde",
    summary: [
      "Modelos de refeições fáceis",
      "Lanches inteligentes e receitas rápidas",
      "Como evitar ultraprocessados sem sofrimento"
    ]
  },

  // Hábitos / Mente
  {
    id: "m1",
    title: "Hábitos que Mudam a Vida",
    price: PRICE_SINGLE,
    desc: "Métodos práticos para formar hábitos e manter a disciplina a longo prazo.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EQ__fFN6g4pAgXlUA34xxVcBm1Yi4JgLjs_qjkMedhfUIg",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=60",
    group: "Mente",
    summary: [
      "Estrutura para criar novos hábitos",
      "Táticas para evitar queda de motivação",
      "Exercícios práticos para 30 dias"
    ]
  },
  {
    id: "m2",
    title: "Inteligência Emocional para Todos",
    price: PRICE_SINGLE,
    desc: "Reconheça e gerencie emoções — melhore comunicação e relacionamentos.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EUH6Gz9Bos1GovsZPBSqm0UBU3F-CVth2RkXZ_orMZwEgw",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=60",
    group: "Mente",
    summary: [
      "Passos para autoconsciência emocional",
      "Técnicas simples de autorregulação",
      "Como praticar empatia no dia a dia"
    ]
  }
];

const GROUPS = [
  {
    id: "g-fin",
    title: "Finanças / Investimentos",
    description: "Domine seu dinheiro, gere economia e comece a investir com segurança.",
    productIds: ["f1", "f2"],
    price: PRICE_GROUP,
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "g-saud",
    title: "Saúde / Corpo",
    description: "Hábitos práticos para transformar energia, sono e performance física.",
    productIds: ["s1", "s2", "s3"],
    price: PRICE_GROUP,
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "g-mente",
    title: "Hábitos / Mente",
    description: "Rotinas e inteligência emocional para foco, produtividade e bem-estar.",
    productIds: ["m1", "m2"],
    price: PRICE_GROUP,
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=60"
  }
];

/* ============ COMPONENTE APP ============ */
export default function App() {
  /* --- estado --- */
  const [cart, setCart] = useState([]); // items: {type:'product'|'group'|'collection', ...}
  const [showPixModal, setShowPixModal] = useState(false);
  const [userCodeInput, setUserCodeInput] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);

  // admin secret
  const [adminVisible, setAdminVisible] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [clickCountA, setClickCountA] = useState(0);

  // pixCode saved in localStorage so only your browser remembers it
  const [pixCode, setPixCode] = useState(() => {
    try {
      return localStorage.getItem("tubaroes_pix_code") || DEFAULT_PIX;
    } catch {
      return DEFAULT_PIX;
    }
  });

  // preload fonts via google
  useEffect(() => {
    const link1 = document.createElement("link");
    link1.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@600;700&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);
    return () => {
      try { document.head.removeChild(link1); } catch {}
    };
  }, []);

  useEffect(() => {
    if (adminVisible) setAdminInput(pixCode);
  }, [adminVisible, pixCode]);

  /* --- helpers --- */
  function findProduct(id) { return PRODUCTS.find((p) => p.id === id); }

  /* Cart operations */
  function addProductToCart(productId) {
    if (cart.find((c) => c.type === "product" && c.id === productId)) return;
    // remove group that contains this product (to avoid duplication)
    const filtered = cart.filter((c) => !(c.type === "group" && c.productIds.includes(productId)));
    setCart([...filtered, { type: "product", id: productId }]);
    setCodeVerified(false);
  }

  function addGroupToCart(groupId) {
    const g = GROUPS.find((x) => x.id === groupId);
    if (!g) return;
    const filtered = cart.filter((c) => {
      if (c.type === "product" && g.productIds.includes(c.id)) return false;
      if (c.type === "group" && c.id === g.id) return false;
      return true;
    });
    setCart([...filtered, { type: "group", id: g.id, title: g.title, price: g.price, productIds: g.productIds }]);
    setCodeVerified(false);
  }

  function addCollectionToCart() {
    setCart([{ type: "collection", id: "collection_all", title: "Coleção Completa Tubarões", price: PRICE_COLLECTION }]);
    setCodeVerified(false);
  }

  function removeCartItem(index) {
    const copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
    setCodeVerified(false);
  }

  /* Pricing logic with discounts */
  function calculateTotals() {
    const hasCollection = cart.find((c) => c.type === "collection");
    if (hasCollection) return { total: PRICE_COLLECTION, breakdown: [{ label: "Coleção completa", price: PRICE_COLLECTION }] };

    let total = 0;
    const breakdown = [];
    const productIdsFromGroups = new Set();

    cart.forEach((c) => {
      if (c.type === "group") {
        total += Number(c.price);
        breakdown.push({ label: `${c.title} (pacote)`, price: Number(c.price) });
        c.productIds.forEach((id) => productIdsFromGroups.add(id));
      }
    });

    const individualIds = cart.filter(c => c.type === "product").map(c => c.id);
    const uniqueIndividualIds = Array.from(new Set(individualIds));

    const combinedUnique = new Set([...productIdsFromGroups, ...uniqueIndividualIds]);
    if (combinedUnique.size === PRODUCTS.length) {
      return { total: PRICE_COLLECTION, breakdown: [{ label: "Coleção completa", price: PRICE_COLLECTION }] };
    }

    const individualCount = uniqueIndividualIds.length;
    const perItemPrice = individualCount >= 3 ? PRICE_BULK_3PLUS : PRICE_SINGLE;
    if (individualCount > 0) {
      const priceForIndividuals = perItemPrice * individualCount;
      total += priceForIndividuals;
      breakdown.push({ label: `${individualCount} ebooks (individual)`, price: priceForIndividuals, unit: perItemPrice });
    }

    total = Math.round(total * 100) / 100;
    return { total, breakdown };
  }

  const { total, breakdown } = calculateTotals();

  /* PIX + verify code */
  function handleOpenPix() {
    if (cart.length === 0) return alert("Adicione pelo menos 1 e-book ao carrinho.");
    setShowPixModal(true);
    setUserCodeInput("");
    setCodeVerified(false);
  }

  async function handleCopyPixKey() {
    try {
      await navigator.clipboard.writeText(PIX_KEY_FALLBACK);
      alert("Chave Pix copiada!");
    } catch {
      alert("Não foi possível copiar automaticamente. Copie manualmente:\n\n" + PIX_KEY_FALLBACK);
    }
  }

  function verifyUserCode() {
    if (!userCodeInput) return alert("Cole o código recebido por WhatsApp.");
    if (userCodeInput === pixCode) {
      setCodeVerified(true);
      alert("Código verificado — downloads liberados.");
    } else {
      alert("Código incorreto. Verifique e tente novamente.");
    }
  }

  /* Secret admin: click 10x on first 'A' */
  function handleClickA() {
    const next = clickCountA + 1;
    setClickCountA(next);
    if (next >= 10) {
      setAdminVisible(true);
      setClickCountA(0);
    }
  }

  function handleAdminSave() {
    if (!adminInput || !adminInput.trim()) return alert("Digite um código válido.");
    const v = adminInput.trim();
    setPixCode(v);
    try { localStorage.setItem("tubaroes_pix_code", v); } catch {}
    setAdminVisible(false);
    alert("Código Pix atualizado e salvo no seu navegador.");
  }

  function handleAdminCancel() {
    setAdminVisible(false);
    setClickCountA(0);
  }

  /* Render helpers */
  function renderGroupCard(g) {
    return (
      <div key={g.id} style={styles.groupCard}>
        <div style={{ ...styles.groupImage, backgroundImage: `url(${g.img})` }} />
        <div style={styles.groupContent}>
          <h3 style={styles.groupTitle}>{g.title}</h3>
          <p style={styles.groupDesc}>{g.description}</p>
          <div style={styles.groupFooter}>
            <div style={{ fontWeight: 700, color: "#B97716" }}>Pacote: R${g.price.toFixed(2)}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={styles.btnPrimary} onClick={() => addGroupToCart(g.id)}>Adicionar grupo</button>
              <button style={styles.btnGhost} onClick={() => window.scrollTo({ top: document.body.scrollHeight/3, behavior: "smooth" })}>Ver e-books</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderProductCard(p) {
    const inCart = cart.find((c) => c.type === "product" && c.id === p.id);
    return (
      <div key={p.id} style={styles.productCard}>
        <img src={p.img} alt={p.title} style={styles.productImg} />
        <div style={{ flex: 1 }}>
          <h4 style={styles.productTitle}>{p.title}</h4>
          <p style={styles.productDesc}>{p.desc}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <div style={{ fontWeight: 700, color: "#B97716" }}>R${PRICE_SINGLE.toFixed(2)}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={inCart ? styles.btnDisabled : styles.btnSmall} onClick={() => addProductToCart(p.id)} disabled={!!inCart}>
                {inCart ? "Adicionado" : "Adicionar"}
              </button>
              <button style={styles.btnLink} onClick={() => alert(p.summary.join("\n- "))}>Resumo</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============ JSX ============ */
  return (
    <div style={styles.page}>
      {/* Inline CSS fonts fallback */}
      <style>{`
        body { margin:0; font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
        h1,h2,h3,h4 { font-family: 'Poppins', Inter, system-ui; margin:0; }
        a { color: inherit; text-decoration: none; }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>
            <span style={{ color: "#0B2545", fontWeight: 700 }}>Tub</span>
            <span onClick={handleClickA} style={{ color: "#0B2545", cursor: "pointer", userSelect: "none" }} title="Clique 10x no A para abrir painel admin">A</span>
            <span style={{ color: "#0B2545", marginLeft: 4 }}>rões do Sucesso</span>
          </div>
          <nav style={styles.nav}>
            <a href="#sobre" style={styles.navLink}>Sobre</a>
            <a href="#grupos" style={styles.navLink}>E-books</a>
            <a href="#como-funciona" style={styles.navLink}>Como funciona</a>
          </nav>
        </div>

        <div style={styles.headerRight}>
          <div style={{ marginRight: 12, color: "#374151" }}>Carrinho: <strong>{cart.length}</strong></div>
          <button style={styles.btnPrimary} onClick={handleOpenPix}>Pagar (Pix)</button>
        </div>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>Tubarões do Sucesso</h1>
          <p style={styles.heroSubtitle}>Transforme sua mente, corpo e finanças com e-books diretos e aplicáveis — 10 páginas cada, conteúdo prático.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <a href="#grupos" style={styles.btnPrimary}>Explorar e-books</a>
            <button style={styles.btnGhost} onClick={addCollectionToCart}>Comprar coleção R${PRICE_COLLECTION.toFixed(2)}</button>
          </div>
        </div>
        <div style={styles.heroRight}>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60" alt="Hero" style={styles.heroImage} />
        </div>
      </section>

      {/* About */}
      <section id="sobre" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.aboutMedia}>
            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=60" alt="Sobre" style={styles.aboutImg} />
          </div>
          <div style={styles.aboutContent}>
            <h2 style={styles.sectionTitle}>Sobre o projeto</h2>
            <p style={styles.lead}>Tubarões do Sucesso reúne guias práticos e diretos para você dominar finanças, melhorar a saúde e fortalecer hábitos. Conteúdo objetivo: cada e-book tem ~10 páginas — ideal pra aprender e aplicar rápido.</p>
            <ul style={styles.bullets}>
              <li>Conteúdo prático, sem enrolação</li>
              <li>Preços acessíveis e pacotes com desconto</li>
              <li>Entrega em PDF instantânea após confirmação</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section id="grupos" style={{ ...styles.section, background: "#F8FAFF" }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Nossos grupos</h2>
          <p style={styles.sectionSubtitle}>Escolha um grupo completo ou selecione e-books individuais — nossos pacotes têm desconto.</p>
        </div>

        <div style={styles.groupsGrid}>
          {GROUPS.map((g) => renderGroupCard(g))}
        </div>
      </section>

      {/* E-books list */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>E-books</h2>
          <p style={styles.sectionSubtitle}>Clique em "Resumo" para ver o que encontrará em cada e-book.</p>
        </div>

        <div style={styles.productsGrid}>
          {PRODUCTS.map((p) => renderProductCard(p))}
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" style={{ ...styles.section, background: "#F3F7FF" }}>
        <div style={styles.sectionInnerColumn}>
          <h2 style={styles.sectionTitle}>Como funciona</h2>
          <div style={styles.steps}>
            <div style={styles.step}>
              <div style={styles.stepNum}>1</div>
              <div>
                <div style={{ fontWeight: 700 }}>Escolha</div>
                <div style={styles.small}>Adicione e-books individuais ou um pacote inteiro.</div>
              </div>
            </div>

            <div style={styles.step}>
              <div style={styles.stepNum}>2</div>
              <div>
                <div style={{ fontWeight: 700 }}>Pague via Pix</div>
                <div style={styles.small}>Copie a chave Pix no modal e realize o pagamento.</div>
              </div>
            </div>

            <div style={styles.step}>
              <div style={styles.stepNum}>3</div>
              <div>
                <div style={{ fontWeight: 700 }}>Envie comprovante</div>
                <div style={styles.small}>Envie o comprovante para: <strong>11 99522-5088</strong></div>
              </div>
            </div>

            <div style={styles.step}>
              <div style={styles.stepNum}>4</div>
              <div>
                <div style={{ fontWeight: 700 }}>Cole o código</div>
                <div style={styles.small}>Cole o código que você recebeu por WhatsApp no campo do modal e libere os downloads.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart summary (bottom) */}
      <section style={{ ...styles.section, paddingBottom: 36 }}>
        <div style={styles.sectionInner}>
          <div style={{ flex: 1 }}>
            <h3 style={styles.sectionTitle}>Resumo do carrinho</h3>
            <div style={{ marginTop: 12 }}>
              {cart.length === 0 && <div style={{ color: "#6B7280" }}>Seu carrinho está vazio.</div>}
              {cart.map((c, idx) => {
                if (c.type === "product") {
                  const p = findProduct(c.id);
                  return (
                    <div key={idx} style={styles.cartRow}>
                      <div>{p.title}</div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div style={{ color: "#B97716", fontWeight: 700 }}>R${PRICE_SINGLE.toFixed(2)}</div>
                        <button style={styles.btnDanger} onClick={() => removeCartItem(idx)}>✕</button>
                      </div>
                    </div>
                  );
                } else if (c.type === "group") {
                  return (
                    <div key={idx} style={styles.cartRow}>
                      <div>{c.title} (pacote)</div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div style={{ color: "#B97716", fontWeight: 700 }}>R${Number(c.price).toFixed(2)}</div>
                        <button style={styles.btnDanger} onClick={() => removeCartItem(idx)}>✕</button>
                      </div>
                    </div>
                  );
                } else if (c.type === "collection") {
                  return (
                    <div key={idx} style={styles.cartRow}>
                      <div>Coleção completa</div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div style={{ color: "#B97716", fontWeight: 700 }}>R${Number(c.price).toFixed(2)}</div>
                        <button style={styles.btnDanger} onClick={() => removeCartItem(idx)}>✕</button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div style={{ width: 260, paddingLeft: 20 }}>
            <div style={{ fontSize: 14, color: "#374151" }}>
              {breakdown && breakdown.map((b, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 13, color: "#6B7280" }}>{b.label}</div>
                  <div style={{ fontWeight: 700, color: "#B97716" }}>R${b.price.toFixed(2)} {b.unit ? ` — R$${b.unit.toFixed(2)} cada` : ""}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 20, color: "#0B2545" }}>Total:</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: "#B97716" }}>R${(total || 0).toFixed(2)}</div>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button style={styles.btnPrimary} onClick={handleOpenPix}>Pagar (Pix)</button>
              <button style={styles.btnGhost} onClick={addCollectionToCart}>Coleção</button>
            </div>
          </div>
        </div>
      </section>

      {/* PIX Modal */}
      {showPixModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 800 }}>Pagamento via Pix</div>
                <div style={{ color: "#6B7280", marginTop: 4 }}>Total: <strong>R${(total || 0).toFixed(2)}</strong></div>
              </div>
              <button style={styles.btnClose} onClick={() => setShowPixModal(false)}>✕</button>
            </div>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <img src={QR_IMAGE_URL} alt="QR" style={{ width: 160, height: 160, objectFit: "contain", borderRadius: 8 }} />
              <div style={{ marginTop: 12, color: "#374151" }}>Chave Pix (copiar):</div>
              <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 8 }}>
                <div style={{ background: "#F3F4F6", padding: 8, borderRadius: 8 }}>{PIX_KEY_FALLBACK}</div>
                <button style={styles.btnSmallPrimary} onClick={handleCopyPixKey}>Copiar</button>
              </div>

              <p style={{ marginTop: 12, color: "#6B7280" }}>
                Após o pagamento, envie o comprovante para o WhatsApp: <strong>11 99522-5088</strong> e receba o código de liberação.
              </p>

              <div style={{ marginTop: 12 }}>
                <input placeholder="Cole aqui o código que recebeu" value={userCodeInput} onChange={(e) => setUserCodeInput(e.target.value)} style={styles.input} />
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button style={styles.btnPrimary} onClick={verifyUserCode}>Verificar código</button>
                  <button style={styles.btnGhost} onClick={() => { setUserCodeInput(""); setCodeVerified(false); }}>Limpar</button>
                </div>
              </div>

              {codeVerified && (
                <div style={{ marginTop: 14, textAlign: "left" }}>
                  <div style={{ fontWeight: 800, color: "#16A34A", marginBottom: 8 }}>Downloads liberados — obrigado!</div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {(() => {
                      const ids = new Set();
                      cart.forEach((c) => {
                        if (c.type === "product") ids.add(c.id);
                        else if (c.type === "group") c.productIds.forEach((id) => ids.add(id));
                        else if (c.type === "collection") PRODUCTS.forEach(p => ids.add(p.id));
                      });
                      return Array.from(ids).map((pid) => {
                        const p = findProduct(pid);
                        return (
                          <a key={pid} href={p.pdf} target="_blank" rel="noreferrer" style={styles.downloadBtn}>
                            Baixar {p.title}
                          </a>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Admin modal (secreto) */}
      {adminVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 800 }}>Painel Secreto — Alterar código Pix</div>
              <button style={styles.btnClose} onClick={handleAdminCancel}>✕</button>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ color: "#374151" }}>Código atual: <strong>{pixCode}</strong></div>
              <input value={adminInput} onChange={(e) => setAdminInput(e.target.value)} style={styles.input} placeholder="Digite o novo código Pix" />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button style={styles.btnPrimary} onClick={handleAdminSave}>Salvar</button>
                <button style={styles.btnGhost} onClick={handleAdminCancel}>Cancelar</button>
              </div>
              <div style={{ marginTop: 8, color: "#6B7280", fontSize: 12 }}>Dica: clique 10x no 'A' do título para abrir este painel (só no seu navegador).</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{ maxWidth: 1100, width: "100%", padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 800 }}>Tubarões do Sucesso</div>
              <div style={{ color: "#6B7280", marginTop: 6 }}>Conhecimento prático e acessível. © {new Date().getFullYear()}</div>
            </div>
            <div style={{ textAlign: "right", color: "#6B7280" }}>
              <div>Contato: caiofelipe14jaa2009@gmail.com</div>
              <div style={{ marginTop: 6 }}>WhatsApp: 11 99522-5088</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============ STYLES ============ */
const styles = {
  page: {
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
    color: "#0F172A",
    background: "#FFFFFF",
    minHeight: "100vh"
  },
  header: {
    maxWidth: 1200,
    margin: "18px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px"
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 24 },
  logo: { fontSize: 20, display: "flex", alignItems: "center", gap: 6, fontFamily: "'Poppins', Inter" },
  nav: { display: "flex", gap: 12 },
  navLink: { color: "#374151", fontSize: 14, textDecoration: "none" },

  headerRight: { display: "flex", alignItems: "center" },

  hero: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    gap: 24,
    alignItems: "center",
    padding: "18px 20px"
  },
  heroLeft: { flex: 1, padding: 8 },
  heroRight: { flex: 1, display: "flex", justifyContent: "center" },
  heroTitle: { fontSize: 36, marginBottom: 10, color: "#022B5B", fontFamily: "'Poppins', Inter" },
  heroSubtitle: { color: "#475569", fontSize: 16, lineHeight: 1.6 },
  heroImage: { width: "100%", borderRadius: 12, boxShadow: "0 8px 30px rgba(2,43,91,0.08)" },

  section: { maxWidth: 1200, margin: "36px auto", padding: "20px" },
  sectionInner: { display: "flex", gap: 18, alignItems: "center" },
  sectionInnerColumn: { display: "flex", flexDirection: "column", gap: 12 },

  aboutMedia: { flex: 1 },
  aboutImg: { width: "100%", borderRadius: 12 },
  aboutContent: { flex: 1 },

  sectionTitle: { fontSize: 22, color: "#022B5B", marginBottom: 8 },
  sectionSubtitle: { color: "#64748B" },
  lead: { color: "#334155", fontSize: 15, lineHeight: 1.6 },
  bullets: { marginTop: 12, listStyle: "disc", paddingLeft: 18, color: "#475569" },

  groupsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 },
  groupCard: { background: "#fff", borderRadius: 12, boxShadow: "0 6px 20px rgba(2,43,91,0.06)", overflow: "hidden", display: "flex", flexDirection: "column" },
  groupImage: { height: 140, backgroundSize: "cover", backgroundPosition: "center" },
  groupContent: { padding: 16 },
  groupTitle: { fontSize: 18, marginBottom: 6 },
  groupDesc: { color: "#64748B", marginBottom: 12 },
  groupFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },

  productsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 },
  productCard: { background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 6px 18px rgba(2,43,91,0.04)", display: "flex", gap: 12, alignItems: "flex-start" },
  productImg: { width: 120, height: 90, objectFit: "cover", borderRadius: 8 },
  productTitle: { fontSize: 16, marginBottom: 6 },
  productDesc: { color: "#6B7280", fontSize: 13 },

  btnPrimary: { background: "#F6B93B", border: "none", padding: "10px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 700 },
  btnSmallPrimary: { background: "#F6B93B", border: "none", padding: "6px 10px", borderRadius: 8, cursor: "pointer", fontWeight: 700 },
  btnGhost: { background: "transparent", border: "1px solid #E6E9EE", padding: "10px 12px", borderRadius: 8, cursor: "pointer" },
  btnSmall: { background: "#F6B93B", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 700 },
  btnDisabled: { background: "#E6E9EE", border: "none", padding: "6px 10px", borderRadius: 6, color: "#94A3B8" },
  btnLink: { background: "transparent", border: "none", color: "#0B2545", cursor: "pointer", textDecoration: "underline" },
  btnDanger: { background: "transparent", border: "none", color: "#DC2626", cursor: "pointer" },
  btnClose: { background: "transparent", border: "none", fontSize: 18, cursor: "pointer" },

  input: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E6E9EE", marginTop: 8 },
  downloadBtn: { background: "#0F172A", color: "#fff", padding: 10, borderRadius: 8, textAlign: "center", display: "block" },

  steps: { display: "grid", gap: 12 },
  step: { display: "flex", gap: 12, alignItems: "center", background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 4px 14px rgba(2,43,91,0.04)" },
  stepNum: { background: "#EAF3FF", color: "#0B2545", width: 44, height: 44, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", fontWeight: 700 },

  cartRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed #F1F5F9", alignItems: "center" },

  modalOverlay: { position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,6,23,0.4)" },
  modal: { width: 520, background: "#fff", borderRadius: 12, padding: 18, boxShadow: "0 24px 60px rgba(2,6,23,0.35)" },

  footer: { borderTop: "1px solid #EEF2FF", marginTop: 36, background: "#FFFFFF", color: "#6B7280" },

  groupGridOld: {},

  // small responsive tweaks could be added in a real stylesheet
};
