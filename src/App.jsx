import React, { useState } from "react";

/* === CONFIGURAÇÃO === */
const PIX_KEY = "5511bd4d-80b5-4b33-9342-a2cdef8eb8ea";
const QR_IMAGE_URL = "https://i.imgur.com/your_qr_code.png";

// Produtos
const PRODUCTS = [
  {
    id: 1,
    title: "Guia de Finanças Pessoais",
    price: 0.1,
    desc: "Transforme sua vida financeira! Aprenda a economizar, investir e organizar seu dinheiro de forma prática e eficiente. Comece hoje por apenas R$0,10!",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EZTN69JneK1Eg1o6jEsb23EBXdsWrLkqaiP4H_A3yyPKxw",
    img: "https://i.imgur.com/your_image.png"
  },
  {
    id: 2,
    title: "Mini Curso Investindo do Zero",
    price: 0.1,
    desc: "Dê o primeiro passo para investir com segurança! Aprenda estratégias simples e práticas para iniciar no mundo dos investimentos por apenas R$0,10.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EbVe_ZysjpVErM_CbpVKayYBOPUl5ubBox31S1dsUxQR5w",
    img: "https://i.imgur.com/your_image.png"
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showPixModal, setShowPixModal] = useState(false);
  const [copied, setCopied] = useState(false);

  function addToCart(prod) {
    if (!cart.find((p) => p.id === prod.id)) setCart([...cart, prod]);
    setSelected(prod);
  }

  function removeFromCart(id) {
    setCart(cart.filter((p) => p.id !== id));
  }

  function openPix() {
    setCopied(false);
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

  const total = cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-5xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Bolso Forte</h1>
        <div className="flex gap-4">
          <button
            className="bg-amber-400 hover:bg-amber-500 transition px-4 py-2 rounded-lg font-bold"
            onClick={() => setSelected(null)}
          >
            Produtos
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-lg font-bold"
            onClick={openPix}
          >
            Pix ({cart.length})
          </button>
        </div>
      </header>

      {/* Lista de produtos */}
      {!selected && (
        <section className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mb-8">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="bg-gray-800 p-4 rounded-xl shadow flex flex-col transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <img src={p.img} alt={p.title} className="rounded-md mb-3 h-48 object-cover" />
              <div className="font-bold text-lg">{p.title}</div>
              <div className="text-sm text-gray-300 mt-1">{p.desc}</div>
              <div className="flex justify-between mt-4 items-center">
                <div className="text-amber-400 font-extrabold text-xl animate-pulse">R${p.price.toFixed(2)}</div>
                <button
                  className="bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-yellow-300 hover:to-amber-400 text-black px-4 py-2 rounded-md font-semibold transition"
                  onClick={() => addToCart(p)}
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Pré-visualização do produto */}
      {selected && (
        <section className="bg-gray-800 p-6 rounded-xl shadow max-w-4xl w-full mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={selected.img} alt={selected.title} className="rounded-md md:w-1/3 h-48 object-cover" />
            <div className="flex-1">
              <div className="font-bold text-2xl">{selected.title}</div>
              <div className="text-gray-300 mt-2">{selected.desc}</div>
              <div className="text-amber-400 font-extrabold mt-2 text-2xl animate-pulse">R${selected.price.toFixed(2)}</div>
              <div className="mt-4 flex gap-3">
                <button
                  className="bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-yellow-300 hover:to-amber-400 text-black px-4 py-2 rounded-lg font-bold transition"
                  onClick={openPix}
                >
                  Pagar com Pix
                </button>
                <button
                  className="border border-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
                  onClick={() => setSelected(null)}
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Carrinho */}
      {cart.length > 0 && (
        <section className="bg-gray-900 p-4 rounded-xl shadow w-full max-w-4xl mb-8">
          <div className="font-bold text-lg mb-2">Carrinho</div>
          {cart.map((p) => (
            <div key={p.id} className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>{p.title}</div>
              <div className="flex gap-2 items-center">
                <div className="text-amber-400 font-bold">R${p.price.toFixed(2)}</div>
                <button
                  className="text-red-500 font-bold hover:text-red-400 transition"
                  onClick={() => removeFromCart(p.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-3 font-bold text-amber-400 text-xl">
            Total: R${total}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-8 text-gray-500 text-center w-full">
        © {new Date().getFullYear()} Bolso Forte — Educação Financeira para Todos.
      </footer>

      {/* PIX Modal */}
      {showPixModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <div className="font-bold text-lg">Pagamento via Pix</div>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowPixModal(false)}>Fechar ✕</button>
            </div>

            <div className="text-center">
              <div className="mb-3 text-gray-300">
                Escaneie o QR Code ou copie a chave Pix
              </div>

              <img
                src={QR_IMAGE_URL}
                alt="QR Code Pix"
                className="mx-auto w-56 h-56 object-contain rounded-md border border-gray-700 bg-white p-2"
              />

              <div className="mt-4">
                <div className="text-sm text-gray-300">Chave Pix:</div>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <div className="bg-gray-800 px-4 py-2 rounded-md text-sm select-all">{PIX_KEY}</div>
                  <button className="bg-amber-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-amber-500 transition" onClick={copyPixKey}>
                    {copied ? "Copiado!" : "Copiar chave"}
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {cart.map((p) => (
                    <a
                      key={p.id}
                      href={p.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-black px-5 py-3 rounded-lg font-bold inline-block transition"
                    >
                      Baixar {p.title}
                    </a>
                  ))}
                  <div className="mt-2 text-xs text-gray-400">
                    Após a confirmação do pagamento, clique para baixar os cursos.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
