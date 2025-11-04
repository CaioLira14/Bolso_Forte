import React, { useState } from "react";

const PIX_KEY = "5511bd4d-80b5-4b33-9342-a2cdef8eb8ea";
const QR_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/QR_Code_Example.png";

const PRODUCTS = [
  {
    id: 1,
    title: "Guia Rápido de Finanças Pessoais",
    price: "R$49,90",
    desc: "Aprenda os princípios básicos para controlar seu dinheiro e multiplicar sua renda."
  },
  {
    id: 2,
    title: "Mini Curso: Investindo do Zero",
    price: "R$69,90",
    desc: "Descubra como começar a investir com pouco dinheiro e alcançar liberdade financeira."
  },
  {
    id: 3,
    title: "Planilha Bolso Forte (Premium)",
    price: "R$29,90",
    desc: "Organize seus gastos, defina metas e visualize sua evolução financeira."
  }
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [showPixModal, setShowPixModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  function openPix(prod) {
    setSelected(prod);
    setCopied(false);
    setShowPixModal(true);
  }

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      alert(
        "Não foi possível copiar automaticamente. Copie manualmente:\n\n" + PIX_KEY
      );
    }
  }

  function addToCart(prod) {
    setCart((prev) => [...prev, prod]);
    alert(`${prod.title} foi adicionado ao carrinho!`);
  }

  function toggleCart() {
    setShowCart((prev) => !prev);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6">
      <header className="w-full max-w-4xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold">
            BF
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Bolso Forte</h1>
            <p className="text-sm text-gray-300">
              Educação financeira prática — resultados reais
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 bg-gray-800 rounded-lg text-sm"
            onClick={toggleCart}
          >
            🛒 Carrinho ({cart.length})
          </button>
          <a
            className="px-4 py-2 bg-amber-400 text-black rounded-lg font-semibold"
            href="#produtos"
          >
            Produtos
          </a>
        </div>
      </header>

      <main className="w-full max-w-4xl">
        <section className="grid md:grid-cols-2 gap-6 items-center mb-8">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">
              Aprenda a fazer sobrar dinheiro —{" "}
              <span className="text-amber-400">mesmo ganhando pouco</span>.
            </h2>
            <p className="mt-4 text-gray-300">
              Microcursos, e-books e planilhas simples pra transformar sua vida
              financeira. Aulas diretas, linguagem popular e entrega imediata
              via Pix.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                className="bg-amber-400 text-black px-5 py-3 rounded-lg font-bold"
                onClick={() =>
                  document
                    .getElementById("produtos")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver produtos
              </button>
              <button
                className="px-5 py-3 border border-gray-700 rounded-lg text-sm"
                onClick={() =>
                  alert("Suporte via WhatsApp: +55 11 9XXXX-XXXX")
                }
              >
                Suporte
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold">Oferta do dia</h3>
            <p className="mt-2 text-gray-300">
              Pacote iniciantes: Planilha + E-book + Mini curso — por tempo
              limitado.
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-md">
                <div>
                  <div className="font-bold">Pacote Iniciante</div>
                  <div className="text-xs text-gray-400">
                    Economize tempo e dinheiro
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm line-through text-gray-500">R$127</div>
                  <div className="text-2xl font-extrabold text-amber-400">
                    R$49
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-4 bg-amber-400 text-black py-3 rounded-lg font-bold"
                onClick={() =>
                  openPix({ id: 0, title: "Pacote Iniciante", price: "R$49" })
                }
              >
                Comprar Pacote — R$49 (Pix)
              </button>
            </div>
          </div>
        </section>

        <section id="produtos" className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Produtos populares</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="bg-gray-800 p-4 rounded-xl shadow">
                <div className="font-bold text-lg">{p.title}</div>
                <div className="text-sm text-gray-400 mt-2">{p.desc}</div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-amber-400 font-bold">{p.price}</div>
                  <div className="flex flex-col gap-2">
                    <button
                      className="bg-amber-400 text-black px-4 py-2 rounded-md font-semibold"
                      onClick={() => openPix(p)}
                    >
                      Pagar com Pix
                    </button>
                    <button
                      className="border border-gray-700 px-3 py-2 rounded-md text-sm"
                      onClick={() => addToCart(p)}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-8 text-gray-500 text-center w-full">
        © {new Date().getFullYear()} Bolso Forte — Educação Financeira para
        Todos.
      </footer>

      {/* Modal PIX */}
      {showPixModal && selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-400">Você escolheu</div>
                <div className="font-bold text-lg">
                  {selected.title} •{" "}
                  <span className="text-amber-400">{selected.price}</span>
                </div>
              </div>
              <button
                className="text-gray-400"
                onClick={() => setShowPixModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="text-center">
              <div className="mb-3 text-gray-300">
                Escaneie o QR Code com o app do seu banco ou copie a chave Pix.
              </div>

              <img
                src={QR_IMAGE_URL}
                alt="QR Code Pix"
                className="mx-auto w-56 h-56 object-contain rounded-md border border-gray-700 bg-white p-2"
              />

              <div className="mt-4">
                <div className="text-sm text-gray-300">Chave Pix:</div>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <div className="bg-gray-800 px-4 py-2 rounded-md text-sm select-all">
                    {PIX_KEY}
                  </div>
                  <button
                    className="bg-amber-400 text-black px-4 py-2 rounded-md font-semibold"
                    onClick={copyPixKey}
                  >
                    {copied ? "Copiado!" : "Copiar chave"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Carrinho */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg">Seu Carrinho</h3>
              <button className="text-gray-400" onClick={toggleCart}>
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-400 text-center">
                Nenhum item adicionado ainda.
              </p>
            ) : (
              <ul className="divide-y divide-gray-800">
                {cart.map((item, i) => (
                  <li key={i} className="py-2 flex justify-between">
                    <span>{item.title}</span>
                    <span className="text-amber-400">{item.price}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
