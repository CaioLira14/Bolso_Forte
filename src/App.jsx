// src/App.jsx
import React, { useEffect, useState } from "react";

/* ================= CONFIGURAÇÃO ================= */
const DEFAULT_PIX = "78#34tm12"; // código inicial de liberação
const PIX_KEY_FALLBACK = "5511bd4d-80b5-4b33-9342-a2cdef8eb8ea"; // chave Pix para copiar (apresente aos clientes)
const QR_IMAGE_URL = "https://i.imgur.com/your_qr_code.png"; // troque se quiser um QR real

/* ================= PREÇOS ================= */
const PRICE_SINGLE = 7.9;
const PRICE_BULK_3PLUS = 6.5;
const PRICE_GROUP = 14.9;
const PRICE_COLLECTION = 34.9;

/* ================= PRODUTOS ================= */
/* Todos os produtos têm img, desc, pdf e summary */
const PRODUCTS = [
  // Finanças
  {
    id: "f1",
    title: "Guia de Finanças Pessoais",
    price: PRICE_SINGLE,
    desc: "Organize suas finanças com um plano prático e metas simples.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EZTN69JneK1Eg1o6jEsb23EBXdsWrLkqaiP4H_A3yyPKxw",
    img: "https://images.unsplash.com/photo-1542223616-1f4d8f0b90b4?auto=format&fit=crop&w=1400&q=60",
    group: "Finanças",
    summary: [
      "Mapeamento do fluxo de caixa",
      "Técnicas práticas para economizar",
      "Checklist mensal e metas"
    ]
  },
  {
    id: "f2",
    title: "Mini Curso Investindo do Zero",
    price: PRICE_SINGLE,
    desc: "Passos claros para começar a investir, mesmo com pouco capital.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EbVe_ZysjpVErM_CbpVKayYBOPUl5ubBox31S1dsUxQR5w",
    img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1400&q=60",
    group: "Finanças",
    summary: [
      "Conceitos de risco e retorno explicados",
      "Como abrir conta e escolher investimentos",
      "Plano simples para começar"
    ]
  },

  // Saúde / Corpo
  {
    id: "s1",
    title: "Guia de Hábitos Saudáveis",
    price: PRICE_SINGLE,
    desc: "Rotinas diárias para sono, hidratação e energia.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EexORZt2619BugV9yEEuccoBPa4-Y7c5ebUfBcb31ipemQ",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=60",
    group: "Saúde",
    summary: [
      "Rotina noturna para sono de qualidade",
      "Hidratação e hábitos alimentares simples",
      "Mini-hábitos para consistência"
    ]
  },
  {
    id: "s2",
    title: "Treino Rápido em Casa",
    price: PRICE_SINGLE,
    desc: "Treinos de 10–20 minutos sem equipamentos para manter o corpo ativo.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EUmucel_DkRFksD4eFxp7UEBooLAEEFL8YmCpwvyQ7SqlA",
    img: "https://images.unsplash.com/photo-1558611848-73f7eb4001d4?auto=format&fit=crop&w=1400&q=60",
    group: "Saúde",
    summary: [
      "Aquecimento rápido e seguro",
      "Circuitos para corpo inteiro",
      "Modelo semanal de treino"
    ]
  },
  {
    id: "s3",
    title: "Alimentação Inteligente",
    price: PRICE_SINGLE,
    desc: "Planejamento de refeições e lanches práticos para ter energia o dia todo.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EcQO-VqiP4BEmyrr-Us_4s8B5LjeTyQ5emBrrGl2sgkESQ",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1400&q=60",
    group: "Saúde",
    summary: [
      "Modelos de refeição fáceis",
      "Lanches rápidos e nutritivos",
      "Como reduzir ultraprocessados"
    ]
  },

  // Hábitos / Mente
  {
    id: "m1",
    title: "Hábitos que Mudam a Vida",
    price: PRICE_SINGLE,
    desc: "Estruturas práticas para criar e manter hábitos que geram resultados.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EQ__fFN6g4pAgXlUA34xxVcBm1Yi4JgLjs_qjkMedhfUIg",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=60",
    group: "Mente",
    summary: [
      "Framework para formar hábitos",
      "Táticas para manter motivação",
      "Exercícios práticos para 30 dias"
    ]
  },
  {
    id: "m2",
    title: "Inteligência Emocional para Todos",
    price: PRICE_SINGLE,
    desc: "Técnicas para reconhecer emoções e melhorar relacionamentos.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EUH6Gz9Bos1GovsZPBSqm0UBU3F-CVth2RkXZ_orMZwEgw",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=60",
    group: "Mente",
    summary: [
      "Passos para autoconsciência",
      "Técnicas de autorregulação",
      "Práticas diárias de empatia"
    ]
  }
];

const GROUPS = [
  {
    id: "g-fin",
    title: "Finanças / Investimentos",
    description: "Domine seu dinheiro e comece a investir com segurança.",
    productIds: ["f1", "f2"],
    price: PRICE_GROUP,
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "g-saud",
    title: "Saúde / Corpo",
    description: "Hábitos práticos para energia, sono e performance física.",
    productIds: ["s1", "s2", "s3"],
    price: PRICE_GROUP,
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "g-mente",
    title: "Hábitos / Mente",
    description: "Rotinas e inteligência emocional para foco e bem-estar.",
    productIds: ["m1", "m2"],
    price: PRICE_GROUP,
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=60"
  }
];

const TOTAL_EBOOK_COUNT = PRODUCTS.length;

/* ================= COMPONENTE APP ================= */
export default function App() {
  // estados
  const [cart, setCart] = useState([]); // items: {type:'product'|'group'|'collection', ...}
  const [showPixModal, setShowPixModal] = useState(false);
  const [userCodeInput, setUserCodeInput] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);

  // admin secreto
  const [adminVisible, setAdminVisible] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [clickCount, setClickCount] = useState(0);

  // pixCode persistido no localStorage (apenas no seu navegador)
  const [pixCode, setPixCode] = useState(() => {
    try {
      return localStorage.getItem("tubaroes_pix_code") || DEFAULT_PIX;
    } catch {
      return DEFAULT_PIX;
    }
  });

  // pre-carrega fontes Google
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@300;400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch {} };
  }, []);

  useEffect(() => {
    if (adminVisible) setAdminInput(pixCode);
  }, [adminVisible, pixCode]);

  // helpers
  function findProduct(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  // adicionar produto individual
  function addProductToCart(productId) {
    if (cart.find((c) => c.type === "product" && c.id === productId)) return;
    // remove grupos que incluam esse produto para evitar duplicidade
    const filtered = cart.filter((c) => !(c.type === "group" && c.productIds.includes(productId)));
    setCart([...filtered, { type: "product", id: productId }]);
    setCodeVerified(false);
  }

  // adicionar pacote de grupo
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

  // adicionar coleção completa
  function addCollectionToCart() {
    setCart([{ type: "collection", id: "collection_all", title: "Coleção Completa Tubarões", price: PRICE_COLLECTION }]);
    setCodeVerified(false);
  }

  // remover item do carrinho
  function removeCartItem(idx) {
    const copy = [...cart];
    copy.splice(idx, 1);
    setCart(copy);
    setCodeVerified(false);
  }

  // cálculo de total com regras de desconto
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
    if (combinedUnique.size === TOTAL_EBOOK_COUNT) {
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

  // abrir modal pix
  function handleOpenPix() {
    if (cart.length === 0) return alert("Adicione pelo menos 1 e-book ao carrinho.");
    setShowPixModal(true);
    setUserCodeInput("");
    setCodeVerified(false);
  }

  // copiar chave pix
  async function handleCopyPixKey() {
    try {
      await navigator.clipboard.writeText(PIX_KEY_FALLBACK);
      alert("Chave Pix copiada!");
    } catch {
      alert("Não foi possível copiar automaticamente. Copie manualmente:\n\n" + PIX_KEY_FALLBACK);
    }
  }

  // verificar código que o cliente colou
  function verifyUserCode() {
    if (!userCodeInput) return alert("Cole o código recebido por WhatsApp.");
    if (userCodeInput === pixCode) {
      setCodeVerified(true);
      alert("Código verificado — downloads liberados.");
    } else {
      alert("Código incorreto. Verifique e tente novamente.");
    }
  }

  // clique secreto em "Tubarões" 10x
  function handleSecretClick() {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 10) {
      setAdminVisible(true);
      setClickCount(0);
    }
  }

  function handleAdminSave() {
    if (!adminInput || !adminInput.trim()) return alert("Digite um código válido.");
    const v = adminInput.trim();
    setPixCode(v);
    try { localStorage.setItem("tubaroes_pix_code", v); } catch {}
    setAdminVisible(false);
    alert("Código Pix atualizado no seu navegador.");
  }

  function handleAdminCancel() {
    setAdminVisible(false);
    setClickCount(0);
  }

  /* ========== Render Helpers ========== */

  function GroupCard({ g }) {
    return (
      <div style={styles.groupCard}>
        <div style={{ ...styles.groupImage, backgroundImage: `url(${g.img})` }} />
        <div style={styles.groupBody}>
          <h3 style={styles.groupTitle}>{g.title}</h3>
          <p style={styles.groupDesc}>{g.description}</p>

          <div style={styles.groupFooter}>
            <div style={{ fontWeight: 700, color: "#B97716" }}>Pacote: R${g.price.toFixed(2)}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={styles.btnPrimary} onClick={() => addGroupToCart(g.id)}>Adicionar grupo</button>
              <button style={styles.btnGhost} onClick={() => window.scrollTo({ top: document.body.scrollHeight/2, behavior: "smooth" })}>Ver e-books</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ProductCard({ p }) {
    const inCart = cart.find((c) => c.type === "product" && c.id === p.id);
    return (
      <div style={styles.productCard}>
        <img src={p.img} alt={p.title} style={styles.productImg} />
        <div style={{ flex: 1 }}>
          <div style={styles.productTitle}>{p.title}</div>
          <div style={styles.productDesc}>{p.desc}</div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <div style={{ fontWeight: 700, color: "#B97716" }}>R${PRICE_SINGLE.toFixed(2)}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={inCart ? styles.btnDisabled : styles.btnSmall} onClick={() => addProductToCart(p.id)} disabled={!!inCart}>
                {inCart ? "Adicionado" : "Adicionar"}
              </button>
              <button style={styles.btnLink} onClick={() => alert("Resumo:\n\n" + p.summary.map(s => "• " + s).join("\n"))}>Resumo</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ========== JSX ========== */
  return (
    <div style={styles.page}>
      <style>{`
        body { margin: 0; font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto; background: #FFFFFF; color: #0F172A; }
        h1,h2,h3,h4 { font-family: 'Poppins', Inter, system-ui; }
        a { color: inherit; text-decoration: none; }
        @media (max-width: 800px) {
          .desktop-only { display: none; }
        }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoBox}>
          {/* O clique secreto está no texto "Tubarões" */}
          <div style={styles.logoText}>
            <span onClick={handleSecretClick} style={{ cursor: "pointer" }}>Tubarões</span>
            <span style={{ marginLeft: 8 }}>do Sucesso</span>
          </div>
          <nav style={styles.topNav}>
            <a href="#sobre" style={styles.navLink}>Sobre</a>
            <a href="#grupos" style={styles.navLink}>Grupos</a>
            <a href="#ebooks" style={styles.navLink}>E-books</a>
            <a href="#como-funciona" style={styles.navLink}>Como funciona</a>
          </nav>
        </div>

        <div style={styles.headerActions}>
          <div style={{ marginRight: 12, color: "#475569" }}>Carrinho: <strong>{cart.length}</strong></div>
          <button style={styles.btnPrimary} onClick={handleOpenPix}>Pagar (Pix)</button>
        </div>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>Tubarões do Sucesso</h1>
            <p style={styles.heroLead}>Transforme sua mente, corpo e finanças com e-books práticos — cada um com ~10 páginas e foco total no que funciona.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <a href="#grupos" style={styles.btnPrimary}>Explorar e-books</a>
              <button style={styles.btnGhost} onClick={addCollectionToCart}>Comprar coleção R${PRICE_COLLECTION.toFixed(2)}</button>
            </div>
          </div>

          <div style={styles.heroMedia}>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60" alt="Hero" style={styles.heroImage} />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={styles.divider} />

      {/* About */}
      <section id="sobre" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.aboutImageWrap}>
            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=60" alt="Sobre" style={styles.aboutImg} />
          </div>
          <div style={styles.aboutContent}>
            <h2 style={styles.sectionTitle}>Sobre o projeto</h2>
            <p style={styles.lead}>Tubarões do Sucesso nasceu para democratizar conhecimento prático: e-books curtos, diretos e aplicáveis para quem quer resultados rápidos em finanças, saúde e hábitos. Conteúdo pensado para aplicar no dia a dia.</p>
            <ul style={styles.bullets}>
              <li>Conteúdo objetivo e aplicável</li>
              <li>Preços acessíveis e pacotes com desconto</li>
              <li>Entrega em PDF após confirmação</li>
            </ul>
          </div>
        </div>
      </section>

      <div style={styles.dividerGold} />

      {/* Groups */}
      <section id="grupos" style={{ ...styles.section, paddingTop: 24 }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Nossos grupos</h2>
          <p style={styles.sectionSubtitle}>Escolha um grupo completo ou selecione e-books individuais — descontos automáticos aplicados no carrinho.</p>
        </div>

        <div style={styles.groupsGrid}>
          {GROUPS.map((g) => <GroupCard key={g.id} g={g} />)}
        </div>
      </section>

      <div style={styles.divider} />

      {/* Ebooks */}
      <section id="ebooks" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>E-books</h2>
          <p style={styles.sectionSubtitle}>Cada e-book tem resumo do que você encontrará — clique em "Resumo".</p>
        </div>

        <div style={styles.productsGrid}>
          {PRODUCTS.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <div style={styles.dividerGold} />

      {/* How it works */}
      <section id="como-funciona" style={{ ...styles.section, paddingBottom: 12 }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Como funciona</h2>
        </div>

        <div style={styles.howGrid}>
          <div style={styles.howStep}>
            <div style={styles.howNum}>1</div>
            <div>
              <div style={{ fontWeight: 700 }}>Escolha</div>
              <div style={styles.small}>Adicione e-books individuais ou um pacote.</div>
            </div>
          </div>

          <div style={styles.howStep}>
            <div style={styles.howNum}>2</div>
            <div>
              <div style={{ fontWeight: 700 }}>Pague via Pix</div>
              <div style={styles.small}>Copie a chave Pix no modal e realize o pagamento.</div>
            </div>
          </div>

          <div style={styles.howStep}>
            <div style={styles.howNum}>3</div>
            <div>
              <div style={{ fontWeight: 700 }}>Envie comprovante</div>
              <div style={styles.small}>Envie o comprovante para o WhatsApp: <strong>11 99522-5088</strong></div>
            </div>
          </div>

          <div style={styles.howStep}>
            <div style={styles.howNum}>4</div>
            <div>
              <div style={{ fontWeight: 700 }}>Cole o código</div>
              <div style={styles.small}>Cole o código recebido e libere os downloads.</div>
            </div>
          </div>
        </div>
      </section>

      <div style={styles.divider} />

      {/* Cart summary */}
      <section style={{ ...styles.section, paddingTop: 12 }}>
        <div style={styles.cartWrap}>
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
        <div style={styles.modalBackdrop}>
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
        <div style={styles.modalBackdrop}>
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
              <div style={{ marginTop: 8, color: "#6B7280", fontSize: 12 }}>Dica: clique 10x no texto "Tubarões" para abrir este painel (funciona apenas no navegador onde você fez isso).</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 800 }}>Tubarões do Sucesso</div>
            <div style={{ color: "#6B7280", marginTop: 6 }}>Conhecimento prático e acessível. © {new Date().getFullYear()}</div>
          </div>
          <div style={{ textAlign: "right", color: "#6B7280" }}>
            <div>Contato: caiofelipe14jaa2009@gmail.com</div>
            <div style={{ marginTop: 6 }}>WhatsApp: 11 99522-5088</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: { minHeight: "100vh", background: "#ffffff", color: "#0F172A", fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto" },

  header: { maxWidth: 1200, margin: "18px auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logoBox: { display: "flex", alignItems: "center", gap: 24 },
  logoText: { fontSize: 18, fontWeight: 700, color: "#022B5B", cursor: "default", display: "flex", alignItems: "center", gap: 6 },
  topNav: { display: "flex", gap: 12 },
  navLink: { color: "#475569", fontSize: 14 },

  headerActions: { display: "flex", alignItems: "center" },

  hero: { background: "#F8FAFF", padding: "28px 0" },
  heroInner: { maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" },
  heroText: { flex: "1 1 420px", minWidth: 280 },
  heroTitle: { fontSize: 34, color: "#022B5B", margin: 0, fontFamily: "Poppins, Inter" },
  heroLead: { color: "#475569", marginTop: 8 },
  heroMedia: { flex: "1 1 360px", minWidth: 260, display: "flex", justifyContent: "center" },
  heroImage: { width: "100%", height: "100%", maxHeight: 320, objectFit: "cover", borderRadius: 12, boxShadow: "0 12px 36px rgba(2,43,91,0.08)" },

  divider: { height: 1, background: "#EFF6FF", width: "100%" },
  dividerGold: { height: 6, background: "linear-gradient(90deg,#fff2e0,#F6B93B40,#fff2e0)", width: "100%" },

  section: { maxWidth: 1200, margin: "36px auto", padding: "20px" },
  sectionInner: { display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" },
  sectionTitle: { fontSize: 20, color: "#022B5B", marginBottom: 8 },
  sectionSubtitle: { color: "#64748B", marginTop: 4 },
  lead: { color: "#334155", lineHeight: 1.6 },
  bullets: { marginTop: 12, listStyle: "disc", paddingLeft: 18, color: "#475569" },

  aboutImageWrap: { flex: "1 1 320px", minWidth: 260 },
  aboutImg: { width: "100%", borderRadius: 12, boxShadow: "0 8px 30px rgba(2,43,91,0.06)" },
  aboutContent: { flex: "1 1 420px", minWidth: 240 },

  groupsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 },
  groupCard: { borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 8px 30px rgba(2,43,91,0.04)", display: "flex", flexDirection: "column" },
  groupImage: { height: 140, backgroundSize: "cover", backgroundPosition: "center" },
  groupBody: { padding: 14 },
  groupTitle: { fontSize: 16, marginBottom: 6, color: "#022B5B", fontWeight: 700 },
  groupDesc: { color: "#64748B", marginBottom: 12 },
  groupFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },

  productsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 },

  productCard: { display: "flex", gap: 12, alignItems: "flex-start", background: "#fff", padding: 12, borderRadius: 12, boxShadow: "0 6px 20px rgba(2,43,91,0.04)" },
  productImg: { width: 120, height: 90, objectFit: "cover", borderRadius: 8 },
  productTitle: { fontSize: 16, fontWeight: 700, color: "#022B5B" },
  productDesc: { fontSize: 13, color: "#64748B", marginTop: 6 },

  howGrid: { display: "grid", gap: 12 },
  howStep: { display: "flex", gap: 12, alignItems: "center", background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 6px 20px rgba(2,43,91,0.04)" },
  howNum: { width: 44, height: 44, borderRadius: 10, background: "#EAF3FF", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: 700, color: "#022B5B" },
  small: { color: "#6B7280", fontSize: 13 },

  cartWrap: { maxWidth: 1200, margin: "0 auto", display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" },
  cartRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed #F1F5F9", alignItems: "center" },

  modalBackdrop: { position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,6,23,0.4)" },
  modal: { width: "92%", maxWidth: 560, background: "#fff", borderRadius: 12, padding: 18, boxShadow: "0 24px 60px rgba(2,6,23,0.35)" },

  btnPrimary: { background: "#F6B93B", border: "none", padding: "10px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 700, color: "#0F172A" },
  btnSmallPrimary: { background: "#F6B93B", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontWeight: 700 },
  btnGhost: { background: "transparent", border: "1px solid #E6E9EE", padding: "10px 12px", borderRadius: 8, cursor: "pointer", fontWeight: 600 },
  btnSmall: { background: "#F6B93B", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 700 },
  btnDisabled: { background: "#E6E9EE", border: "none", padding: "6px 10px", borderRadius: 6, color: "#94A3B8" },
  btnLink: { background: "transparent", border: "none", color: "#0B2545", cursor: "pointer", textDecoration: "underline" },
  btnDanger: { background: "transparent", border: "none", color: "#DC2626", cursor: "pointer" },
  btnClose: { background: "transparent", border: "none", fontSize: 18, cursor: "pointer" },

  input: { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #E6E9EE", marginTop: 8 },

  downloadBtn: { background: "#0F172A", color: "#fff", padding: 10, borderRadius: 8, textAlign: "center", display: "block", textDecoration: "none" },

  footer: { borderTop: "1px solid #EEF2FF", marginTop: 36, background: "#fff", color: "#6B7280", padding: "20px 0" }
};
