import React, { useState } from "react";

/* === CONFIGURAÇÃO === */
const PIX_KEY = "5511bd4d-80b5-4b33-9342-a2cdef8eb8ea"; // sua chave Pix
const QR_IMAGE_URL = "https://i.imgur.com/your_qr_code.png"; // troque pelo link do QR Code

// Produtos
const PRODUCTS = [
  {
    id: 1,
    title: "Guia de Finanças Pessoais",
    price: "R$23,90",
    desc: "Aprenda a organizar suas finanças, economizar e investir de forma prática.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EZTN69JneK1Eg1o6jEsb23EBXdsWrLkqaiP4H_A3yyPKxw"
  },
  {
    id: 2,
    title: "Mini Curso Investindo do Zero",
    price: "R$11,90",
    desc: "Curso para iniciantes que desejam investir com segurança e estratégias simples.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EbVe_ZysjpVErM_CbpVKayYBOPUl5ubBox31S1dsUxQR5w"
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
      alert("Não foi possível copiar automaticamente. Copie manualmente:\n\n" + PIX_KEY);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold">BF</div>
          <div>
            <h1 className="text-2xl font-extrabold">Bolso Forte</h1>
            <p className="text-sm text-gray-300">Educação financeira prática — resultados reais</p>
          </div>
        </div>
      </header>

      {/* Produtos */}
      <main className="w-full max-w-4xl">
        <section id="produtos" className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Produtos Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-gray-500 text-center w-full">
        © {new Date().getFullYear()} Bolso Forte — Educação Financeira para Todos.
      </footer>

      {/* PIX Modal */}
      {showPixModal && selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-400">Você escolheu</div>
                <div className="font-bold text-lg">
                  {selected.title} • <span className="text-amber-400">{selected.price}</span>
                </div>
              </div>
              <button className="text-gray-400" onClick={() => setShowPixModal(false)}>Fechar ✕</button>
            </div>

            <div className="text-center">
              <div className="mb-3 text-gray-300">Escaneie o QR Code com o app do seu banco ou copie a chave Pix.</div>

              {/* QR IMAGE */}
              {QR_IMAGE_URL === "COLE_AQUI_LINK_DA_IMAGEM_QR" ? (
                <div className="bg-gray-800 border border-dashed border-gray-700 rounded-lg p-6">
                  <div className="text-sm text-gray-400 mb-2">
                    Imagem do QR não definida — substitua a variável QR_IMAGE_URL no código.
                  </div>
                </div>
              ) : (
                <img
                  src={QR_IMAGE_URL}
                  alt="QR Code Pix"
                  className="mx-auto w-56 h-56 object-contain rounded-md border border-gray-700 bg-white p-2"
                />
              )}

              <div className="mt-4">
                <div className="text-sm text-gray-300">Chave Pix:</div>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <div className="bg-gray-800 px-4 py-2 rounded-md text-sm select-all">{PIX_KEY}</div>
                  <button className="bg-amber-400 text-black px-4 py-2 rounded-md font-semibold" onClick={copyPixKey}>
                    {copied ? "Copiado!" : "Copiar chave"}
                  </button>
                </div>

                {/* Link para download */}
                <div className="mt-4">
                  <a
                    href={selected.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-black px-5 py-3 rounded-lg font-bold inline-block mt-2"
                  >
                    Baixar PDF
                  </a>
                  <div className="mt-2 text-xs text-gray-400">
                    Após a confirmação do pagamento, clique para baixar o curso.
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
