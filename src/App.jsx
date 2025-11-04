import React, { useState } from "react";

const PIX_KEY = "5511bd4d-80b5-4b33-9342-a2cdef8eb8ea";
const QR_IMAGE_URL = "/files/pix-qr.png";

const PRODUCTS = [
  {
    id: 1,
    slug: "guia-financas-pessoais",
    title: "Guia Rápido de Finanças Pessoais",
    price: 49.9,
    priceLabel: "R$49,90",
    shortSummary:
      "Aprenda a organizar seu dinheiro, eliminar gastos e montar uma reserva rapidamente.",
    previewText:
      "Este guia oferece exercícios práticos, planilhas simples e exemplos reais para sobrar dinheiro no primeiro mês.",
    previewImage:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1000&q=60",
    download: "/files/guia-financas.pdf"
  },
  {
    id: 2,
    slug: "curso-investindo-do-zero",
    title: "Mini Curso: Investindo do Zero",
    price: 69.9,
    priceLabel: "R$69,90",
    shortSummary:
      "Curso direto ao ponto para aprender a investir com segurança mesmo com pouco dinheiro.",
    previewText:
      "Inclui o índice completo, a primeira lição e checklist de passos iniciais para abrir sua conta de investimentos.",
    previewImage:
      "https://images.unsplash.com/photo-1526378722047-3b0e7d7c2efb?auto=format&fit=crop&w=1000&q=60",
    download: "/files/curso-investindo-do-zero.zip"
  },
  {
    id: 3,
    slug: "planilha-bolso-forte",
    title: "Planilha Bolso Forte (Premium)",
    price: 29.9,
    priceLabel: "R$29,90",
    shortSummary:
      "Planilha completa para controlar gastos, metas e visualizar sua evolução financeira.",
    previewText:
      "Inclui fórmulas, gráficos e instruções passo a passo. Plug-and-play para qualquer pessoa.",
    previewImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=60",
    download: "/files/planilha-bolso-forte.xlsx"
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paidSlugs, setPaidSlugs] = useState([]);
  const [preview, setPreview] = useState(null);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((i) => i.product.slug === product.slug);
      if (found) return prev.map((i) => (i.product.slug === product.slug ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product, qty: 1 }];
    });
  }

  function removeFromCart(slug) {
    setCart((prev) => prev.filter((i) => i.product.slug !== slug));
  }

  function cartTotal() {
    return cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  }

  function toggleCart() {
    setShowCart((s) => !s);
  }

  function openPixModal() {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }
    setShowPixModal(true);
  }

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      alert("Não foi possível copiar automaticamente. Copie manualmente:\n\n" + PIX_KEY);
    }
  }

  function confirmPayment() {
    const slugs = cart.map((i) => i.product.slug);
    setPaidSlugs((prev) => Array.from(new Set([...prev, ...slugs])));
    setCart([]);
    setShowCart(false);
    setShowPixModal(false);
    alert("Pagamento marcado como recebido (simulação). Downloads liberados.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6">
      <header className="w-full max-w-6xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-black font-bold">BF</div>
          <div>
            <h1 className="text-2xl font-extrabold">Bolso Forte</h1>
            <p className="text-sm text-gray-300">Educação financeira prática — resultados reais</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm" onClick={toggleCart}>
            🛒 Carrinho ({cart.reduce((s, i) => s + i.qty, 0)})
          </button>
        </div>
      </header>

      <main className="w-full max-w-6xl">
        <section className="mb-8">
          <h2 className="text-4xl font-extrabold leading-tight">Produtos</h2>
          <p className="text-gray-300 mt-2">Escolha um produto, veja a prévia e finalize via Pix.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {PRODUCTS.map((p) => (
            <div key={p.slug} className="bg-gray-800 p-5 rounded-xl shadow">
              <img src={p.previewImage} alt={p.title} className="w-full h-40 object-cover rounded-md mb-3" />
              <div className="font-bold text-lg">{p.title}</div>
              <div className="text-sm text-gray-300 mt-2">{p.shortSummary}</div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-amber-400 font-bold">{p.priceLabel}</div>
                <div className="flex flex-col gap-2">
                  <button className="bg-emerald-400 text-black px-3 py-2 rounded-md font-semibold" onClick={() => addToCart(p)}>Adicionar</button>
                  <button className="border border-gray-700 px-3 py-2 rounded-md text-sm" onClick={() => setPreview(p)}>Ver prévia</button>
                </div>
              </div>

              {paidSlugs.includes(p.slug) && (
                <div className="mt-3">
                  <a href={p.download} className="block text-center bg-amber-400 text-black py-2 rounded-md font-bold" download>Baixar produto</a>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>

      <footer className="mt-10 text-gray-500">© {new Date().getFullYear()} Bolso Forte</footer>

      {/* PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Prévia — {preview.title}</h3>
              <button className="text-gray-400" onClick={() => setPreview(null)}>✕</button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <img src={preview.previewImage} alt="preview" className="w-full h-56 object-cover rounded-md" />
              <div>
                <p
