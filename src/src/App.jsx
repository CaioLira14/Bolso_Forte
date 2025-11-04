import React, { useState } from "react";

/*
  Bolso Forte - App.jsx
  - Modal de PIX com imagem do QR Code e botão copiar chave Pix
  - Tema escuro, responsivo e simples para deploy rápido
*/

/* === CONFIGURAÇÃO: substitua a QR_IMAGE_URL se já tiver o link da imagem QR === */
const PIX_KEY = "5511bd4d-80b5-4b33-9342-a2cdef8eb8ea"; // sua chave Pix (aleatória)
const QR_IMAGE_URL = "COLE_AQUI_LINK_DA_IMAGEM_QR"; // <--- troque por link da imagem do QR Code gerado pelo seu banco (ex: Imgur)

// Produtos de exemplo — altere títulos, descrições e preços se quiser
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
    price: "R$89,90",
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
  const [selected, setSelected] = useState(null); // produto selecionado
  const [showPixModal, setShowPixModal] = useState(false);
  const [copied, setCopied] = useState(false);

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
      alert("Não foi possível copiar automaticamente. Selecione e copie manualmente:\n\n" + PIX_KEY);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6">
      <header className="w-full max-w-4xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold">BF</div>
          <div>
            <h1 className="text-2xl font-extrabold">Bolso Forte</h1>
            <p className="text-sm text-gray-300">Educação financeira prática — resultados reais</p>
          </div>
        </div>
        <div>
          <a className="px-4 py-2 bg-amber-400 text-black rounded-lg font-semibold" href="#produtos">Produtos</a>
        </div>
      </header>

      <main className="w-full max-w-4xl">
        <section className="grid md:grid-cols-2 gap-6 items-center mb-8">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Aprenda a fazer sobrar dinheiro no fim do mês — <span className="text-amber-400">mesmo ganhando pouco</span>.</h2>
            <p className="mt-4 text-gray-300">Microcursos, e-books e planilhas simples pra transformar sua vida financeira. Aulas diretas, linguagem popular e entrega imediata via Pix.</p>
            <div className="mt-6 flex gap-3">
              <button className="bg-amber-400 text-black px-5 py-3 rounded-lg font-bold" onClick={() => document.getElementById("produtos").scrollIntoView({ behavior: "smooth" })}>Ver produtos</button>
              <button className="px-5 py-3 border border-gray-700 rounded-lg text-sm" onClick={() => alert("Suporte via WhatsApp: +55 11 9XXXX-XXXX")}>Suporte</button>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold">Oferta do dia</h3>
            <p className="mt-2 text-gray-300">Pacote iniciantes: Planilha + E-book + Mini curso — por tempo limitado.</p>
            <div className="mt-4">
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-md">
                <div>
                  <div className="font-bold">Pacote Iniciante</div>
                  <div className="text-xs text-gray-400">Economize tempo e dinheiro</div>
                </div>
                <div className="text-right">
                  <div className="text-sm line-through text-gray-500">R$127</div>
                  <div className="text-2xl font-extrabold text-amber-400">R$49</div>
                </div>
              </div>

              <button className="w-full mt-4 bg-amber-400 text-black py-3 rounded-lg font-bold" onClick={() => openPix({ id: 0, title: "Pacote Iniciante", price: "R$49" })}>Comprar Pacote — R$49 (Pix)</button>
              <div className="text-xs text-gray-400 mt-2">Pagamento via Pix • Garantia de 7 dias • Entrega imediata</div>
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
                    <button className="bg-amber-400 text-black px-4 py-2 rounded-md font-semibold" onClick={() => openPix(p)}>Pagar com Pix</button>
                    <button className="border border-gray-700 px-3 py-2 rounded-md text-sm" onClick={() => alert('Adicionado ao carrinho (simulação)')}>Adicionar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-8 text-gray-500 text-center w-full">© {new Date().getFullYear()} Bolso Forte — Educação Financeira para Todos.</footer>

      {/* PIX Modal */}
      {showPixModal && selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-400">Você escolheu</div>
                <div className="font-bold text-lg">{selected.title} • <span className="text-amber-400">{selected.price}</span></div>
              </div>
              <button className="text-gray-400" onClick={() => setShowPixModal(false)}>Fechar ✕</button>
            </div>

            <div className="text-center">
              <div className="mb-3 text-gray-300">Escaneie o QR Code com o app do seu banco ou copie a chave Pix.</div>

              {/* QR IMAGE */}
              {QR_IMAGE_URL === "COLE_AQUI_LINK_DA_IMAGEM_QR" ? (
                <div className="bg-gray-800 border border-dashed border-gray-700 rounded-lg p-6">
                  <div className="text-sm text-gray-400 mb-2">Imagem do QR não definida — substitua a variável <code>QR_IMAGE_URL</code> no código pelo link da sua imagem.</div>
                  <div className="text-xs text-gray-500">Enquanto isso, você pode copiar a chave Pix abaixo e pagar manualmente.</div>
                </div>
              ) : (
                <img src={QR_IMAGE_URL} alt="QR Code Pix" className="mx-auto w-56 h-56 object-contain rounded-md border border-gray-700 bg-white p-2" />
              )}

              <div className="mt-4">
                <div className="text-sm text-gray-300">Chave Pix:</div>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <div className="bg-gray-800 px-4 py-2 rounded-md text-sm select-all">{PIX_KEY}</div>
                  <button className="bg-amber-400 text-black px-4 py-2 rounded-md font-semibold" onClick={copyPixKey}>{copied ? "Copiado!" : "Copiar chave"}</button>
                </div>
                <div className="mt-3 text-xs text-gray-400">Depois de aprovado o pagamento, envie o comprovante no WhatsApp para liberar o acesso (suporte).</div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
