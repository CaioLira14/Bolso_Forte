// src/App.jsx
import React, { useEffect, useState } from "react";

/* ================== CONFIGURAÇÃO ================== */
const DEFAULT_PIX = "78#34tm12"; // código inicial (secreto)
const QR_IMAGE_URL = "https://i.imgur.com/your_qr_code.png"; // substitua pelo QR real se quiser
const PIX_KEY_FALLBACK = "5511bd4d-80b5-4b33-9342-a2cdef8eb8ea"; // chave Pix para copiar

/* ================ PREÇOS E DESCONTOS ================ */
const PRICE_SINGLE = 7.9;      // e-book individual
const PRICE_BULK_3PLUS = 6.5;  // por e-book se comprar 3+ ebooks individuais
const PRICE_GROUP = 14.9;      // pacote por grupo
const PRICE_COLLECTION = 34.9; // todos os grupos (coleção completa)

/* ================== PRODUTOS E GRUPOS ================== */
/* Produtos individuais (cada e-book) */
const PRODUCTS = [
  // Finanças (já existentes)
  {
    id: "f1",
    title: "Guia de Finanças Pessoais",
    price: PRICE_SINGLE,
    desc: "Organize suas finanças, gaste melhor e comece a investir com segurança.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EZTN69JneK1Eg1o6jEsb23EBXdsWrLkqaiP4H_A3yyPKxw",
    img: "https://images.unsplash.com/photo-1542223616-1f4d8f0b90b4?auto=format&fit=crop&w=1200&q=60",
    group: "Finanças"
  },
  {
    id: "f2",
    title: "Mini Curso Investindo do Zero",
    price: PRICE_SINGLE,
    desc: "Primeiros passos para investir com segurança e inteligência.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EbVe_ZysjpVErM_CbpVKayYBOPUl5ubBox31S1dsUxQR5w",
    img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=60",
    group: "Finanças"
  },

  // Saúde / Corpo (PDFs enviados)
  {
    id: "s1",
    title: "Guia de Hábitos Saudáveis",
    price: PRICE_SINGLE,
    desc: "Pequenas mudanças de rotina para grande impacto na sua saúde.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EexORZt2619BugV9yEEuccoBPa4-Y7c5ebUfBcb31ipemQ",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=60",
    group: "Saúde"
  },
  {
    id: "s2",
    title: "Treino Rápido em Casa",
    price: PRICE_SINGLE,
    desc: "Treinos eficientes de 10–20 minutos para manter o corpo em forma.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EUmucel_DkRFksD4eFxp7UEBooLAEEFL8YmCpwvyQ7SqlA",
    img: "https://images.unsplash.com/photo-1558611848-73f7eb4001d4?auto=format&fit=crop&w=1200&q=60",
    group: "Saúde"
  },
  {
    id: "s3",
    title: "Alimentação Inteligente",
    price: PRICE_SINGLE,
    desc: "Como comer bem sem complicação — planejamento, lanches e escolhas inteligentes.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EcQO-VqiP4BEmyrr-Us_4s8B5LjeTyQ5emBrrGl2sgkESQ",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=60",
    group: "Saúde"
  },

  // Hábitos / Mente (PDFs enviados)
  {
    id: "m1",
    title: "Hábitos que Mudam a Vida",
    price: PRICE_SINGLE,
    desc: "Forme hábitos poderosos que transformam sua rotina e resultados.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EQ__fFN6g4pAgXlUA34xxVcBm1Yi4JgLjs_qjkMedhfUIg",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60",
    group: "Mente"
  },
  {
    id: "m2",
    title: "Inteligência Emocional para Todos",
    price: PRICE_SINGLE,
    desc: "Reconheça e gerencie emoções para melhores relacionamentos e decisões.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EUH6Gz9Bos1GovsZPBSqm0UBU3F-CVth2RkXZ_orMZwEgw",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=60",
    group: "Mente"
  }
];

const GROUPS = [
  {
    id: "g-fin",
    title: "Finanças / Investimentos",
    description: "Aprenda a dominar seu dinheiro, investir com inteligência e criar fontes de renda sólidas.",
    productIds: ["f1", "f2"],
    price: PRICE_GROUP,
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=60"
  },
  {
    id: "g-saud",
    title: "Saúde / Corpo",
    description: "Transforme seu corpo e sua energia com hábitos simples e práticos.",
    productIds: ["s1", "s2", "s3"],
    price: PRICE_GROUP,
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=60"
  },
  {
    id: "g-mente",
    title: "Hábitos / Mente",
    description: "Fortaleça sua mente, melhore seu foco e desenvolva uma mentalidade vencedora.",
    productIds: ["m1", "m2"],
    price: PRICE_GROUP,
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60"
  }
];

const TOTAL_EBOOK_COUNT = PRODUCTS.length;

/* ==================== COMPONENTE APP ==================== */
export default function App() {
  const [cart, setCart] = useState([]); // items: {type:'product'|'group'|'collection', ...}
  const [showPixModal, setShowPixModal] = useState(false);
  const [userCodeInput, setUserCodeInput] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);

  // Admin secret
  const [adminVisible, setAdminVisible] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [clickCountA, setClickCountA] = useState(0);

  const [pixCode, setPixCode] = useState(() => {
    try {
      return localStorage.getItem("tubaroes_pix_code") || DEFAULT_PIX;
    } catch {
      return DEFAULT_PIX;
    }
  });

  useEffect(() => {
    if (adminVisible) setAdminInput(pixCode);
  }, [adminVisible, pixCode]);

  /* ---------- Helpers ---------- */
  function findProduct(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  /* ---------- Cart operations ---------- */
  function addProductToCart(productId) {
    const exists = cart.find((c) => c.type === "product" && c.id === productId);
    if (exists) return;
    // remove groups that include this product to avoid duplicates
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

  /* ---------- Pricing / Discounts ---------- */
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

  /* ---------- PIX & CODE logic ---------- */
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
    if (!userCodeInput) return alert("Cole o código que recebeu por WhatsApp.");
    if (userCodeInput === pixCode) {
      setCodeVerified(true);
      alert("Código verificado — downloads liberados.");
    } else {
      alert("Código incorreto. Verifique e tente novamente.");
    }
  }

  /* ---------- Secret admin: clicking first A 10x ---------- */
  function handleClickA() {
    const next = clickCountA + 1;
    setClickCountA(next);
    if (next >= 10) {
      setAdminVisible(true);
      setClickCountA(0);
    }
  }

  function handleAdminSave() {
    if (!adminInput || adminInput.trim().length === 0) return alert("Coloque um código válido.");
    const val = adminInput.trim();
    setPixCode(val);
    try {
      localStorage.setItem("tubaroes_pix_code", val);
    } catch {}
    setAdminVisible(false);
    alert("Código Pix atualizado.");
  }

  function handleAdminCancel() {
    setAdminVisible(false);
    setClickCountA(0);
  }

  /* ---------- Render helpers ---------- */
  function renderProductCard(p) {
    const inCart = cart.find((c) => c.type === "product" && c.id === p.id);
    return (
      <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm flex flex-col">
        <img src={p.img} alt={p.title} className="rounded-md mb-3 h-44 w-full object-cover" />
        <div className="font-bold text-lg text-gray-900">{p.title}</div>
        <div className="text-sm text-gray-700 mt-1">{p.desc}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-amber-600 font-bold">R${PRICE_SINGLE.toFixed(2)}</div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-2 rounded-md font-semibold ${inCart ? "bg-gray-300 text-gray-700" : "bg-amber-500 text-black hover:bg-amber-600"}`}
              onClick={() => addProductToCart(p.id)}
              disabled={!!inCart}
            >
              {inCart ? "Adicionado" : "Adicionar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderGroupCard(g) {
    return (
      <div key={g.id} className="bg-white rounded-2xl overflow-hidden shadow-md">
        <img src={g.img} alt={g.title} className="w-full h-44 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-extrabold text-xl text-gray-900">{g.title}</div>
              <div className="text-sm text-gray-700 mt-1">{g.description}</div>
            </div>
            <div className="text-right">
              <div className="text-amber-600 font-bold">Pacote: R${g.price.toFixed(2)}</div>
              <button
                className="mt-2 bg-amber-500 text-black px-3 py-2 rounded-md font-bold"
                onClick={() => addGroupToCart(g.id)}
              >
                Adicionar grupo
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2">
            {g.productIds.map((pid) => {
              const prod = findProduct(pid);
              return (
                <div key={pid} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="text-sm text-gray-800">{prod.title}</div>
                  <div className="flex gap-2 items-center">
                    <div className="text-amber-500 font-bold">R${PRICE_SINGLE.toFixed(2)}</div>
                    <button
                      className="bg-emerald-500 text-black px-2 py-1 rounded-md"
                      onClick={() => addProductToCart(pid)}
                    >
                      + adicionar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-8">
        <h1 className="text-4xl font-black tracking-tight flex items-center gap-2">
          <span className="text-gray-800">Tub</span>
          <span
            onClick={handleClickA}
            className="cursor-pointer select-none text-amber-600"
            title="Clique 10x no A para abrir o painel secreto"
            style={{ userSelect: "none" }}
          >
            A
          </span>
          <span className="text-gray-800">rões do Sucesso</span>
        </h1>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">Carrinho: <strong>{cart.length}</strong></div>
          <button
            onClick={handleOpenPix}
            className="bg-amber-600 text-black px-4 py-2 rounded-lg font-bold"
          >
            Pagar com Pix
          </button>
        </div>
      </header>

      {/* Groups */}
      <main className="w-full max-w-6xl mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {GROUPS.map((g) => renderGroupCard(g))}
      </main>

      {/* Products */}
      <section className="w-full max-w-6xl mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => renderProductCard(p))}
        </div>
      </section>

      {/* Cart Summary */}
      <aside className="w-full max-w-6xl bg-white rounded-xl p-4 shadow mt-6">
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-lg">Resumo do pedido</div>
          <div className="text-sm text-gray-600">Total atual</div>
        </div>

        <div className="space-y-2">
          {cart.length === 0 && <div className="text-gray-600">Seu carrinho está vazio.</div>}
          {cart.map((c, idx) => {
            if (c.type === "product") {
              const p = findProduct(c.id);
              return (
                <div key={idx} className="flex justify-between items-center">
                  <div className="text-sm">{p.title}</div>
                  <div className="flex gap-3 items-center">
                    <div className="text-amber-500 font-bold">R${PRICE_SINGLE.toFixed(2)}</div>
                    <button className="text-red-500" onClick={() => removeCartItem(idx)}>✕</button>
                  </div>
                </div>
              );
            } else if (c.type === "group") {
              return (
                <div key={idx} className="flex justify-between items-center">
                  <div className="text-sm">{c.title} (pacote)</div>
                  <div className="flex gap-3 items-center">
                    <div className="text-amber-500 font-bold">R${Number(c.price).toFixed(2)}</div>
                    <button className="text-red-500" onClick={() => removeCartItem(idx)}>✕</button>
                  </div>
                </div>
              );
            } else if (c.type === "collection") {
              return (
                <div key={idx} className="flex justify-between items-center">
                  <div className="text-sm">Coleção Completa</div>
                  <div className="flex gap-3 items-center">
                    <div className="text-amber-500 font-bold">R${Number(c.price).toFixed(2)}</div>
                    <button className="text-red-500" onClick={() => removeCartItem(idx)}>✕</button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="mt-4 border-t pt-3 flex justify-between items-center">
          <div>
            {breakdown && breakdown.map((b, i) => (
              <div key={i} className="text-sm text-gray-700">
                {b.label} {b.unit ? ` — R$${b.unit.toFixed(2)} cada` : ""} <strong className="text-amber-600">R${b.price.toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <div className="text-2xl font-extrabold text-amber-600">R${(total || 0).toFixed(2)}</div>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold" onClick={addCollectionToCart}>
            Comprar coleção completa R${PRICE_COLLECTION.toFixed(2)}
          </button>
          <button className="bg-amber-600 text-black px-4 py-2 rounded-md font-bold" onClick={handleOpenPix}>
            Pagar com Pix
          </button>
        </div>
      </aside>

      {/* PIX Modal */}
      {showPixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-xl">Pagamento via Pix</div>
                <div className="text-sm text-gray-600">Total: <strong>R${(total || 0).toFixed(2)}</strong></div>
              </div>
              <button className="text-gray-500" onClick={() => setShowPixModal(false)}>Fechar ✕</button>
            </div>

            <div className="mt-4 text-center">
              <img src={QR_IMAGE_URL} alt="QR Code Pix" className="mx-auto w-44 h-44 object-contain rounded-md border" />
              <div className="mt-3 text-sm text-gray-700">Chave Pix (para copiar):</div>
              <div className="mt-2 flex items-center justify-center gap-2">
                <div className="bg-gray-100 p-2 rounded text-sm select-all">{PIX_KEY_FALLBACK}</div>
                <button className="bg-amber-500 text-black px-3 py-2 rounded" onClick={handleCopyPixKey}>Copiar</button>
              </div>

              <p className="mt-4 text-gray-600">
                Mande o comprovante para o WhatsApp: <strong>11 99522-5088</strong> para receber o código de liberação.
              </p>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Cole aqui o código que recebeu"
                  value={userCodeInput}
                  onChange={(e) => setUserCodeInput(e.target.value)}
                  className="w-full p-2 border rounded text-center"
                />
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 bg-emerald-600 text-white p-2 rounded" onClick={verifyUserCode}>
                    Verificar código
                  </button>
                  <button className="flex-1 bg-gray-300 text-black p-2 rounded" onClick={() => { setUserCodeInput(""); setCodeVerified(false); }}>
                    Limpar
                  </button>
                </div>

                {codeVerified && (
                  <div className="mt-4">
                    <div className="font-bold text-green-700 mb-2">Downloads liberados — obrigado!</div>
                    <div className="flex flex-col gap-2">
                      {(() => {
                        const ids = new Set();
                        cart.forEach((c) => {
                          if (c.type === "product") ids.add(c.id);
                          else if (c.type === "group") c.productIds.forEach((id) => ids.add(id));
                          else if (c.type === "collection") PRODUCTS.forEach(p => ids.add(p.id));
                        });
                        const arr = Array.from(ids);
                        return arr.map((pid) => {
                          const p = findProduct(pid);
                          return (
                            <a key={pid} href={p.pdf} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white p-3 rounded text-center">
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
        </div>
      )}

      {/* Admin modal (secreto) */}
      {adminVisible && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold">Painel Secreto — Alterar código Pix</div>
              <button className="text-gray-500" onClick={handleAdminCancel}>✕</button>
            </div>

            <div>
              <label className="text-sm text-gray-600">Código atual: <strong>{pixCode}</strong></label>
              <input
                className="mt-2 w-full p-2 border rounded"
                value={adminInput}
                onChange={(e) => setAdminInput(e.target.value)}
                placeholder="Digite o novo código Pix"
              />
              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-emerald-600 text-white p-2 rounded" onClick={handleAdminSave}>Salvar</button>
                <button className="flex-1 bg-gray-300 p-2 rounded" onClick={handleAdminCancel}>Cancelar</button>
              </div>
              <div className="text-xs text-gray-500 mt-2">Dica: clique 10x no "A" do título para abrir este painel.</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 mb-6 text-sm text-gray-600">
        © {new Date().getFullYear()} Tubarões do Sucesso — Conhecimento acessível para todos.
      </footer>
    </div>
  );
}
