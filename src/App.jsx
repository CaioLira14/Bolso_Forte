import React, { useState, useEffect } from "react";

const PIX_KEY = "5511bd4d-80b5-4b33-9342-a2cdef8eb8ea";
const QR_IMAGE_URL = "https://i.imgur.com/your_qr_code.png";

const PRODUCTS = [
  {
    id: 1,
    title: "Guia de Finanças Pessoais",
    price: 0.1,
    desc: "Transforme sua vida financeira! Comece hoje por apenas R$0,10!",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EZTN69JneK1Eg1o6jEsb23EBXdsWrLkqaiP4H_A3yyPKxw",
    img: "https://i.imgur.com/your_image.png"
  },
  {
    id: 2,
    title: "Mini Curso Investindo do Zero",
    price: 0.1,
    desc: "Aprenda estratégias simples para investir com segurança por apenas R$0,10.",
    pdf: "https://1drv.ms/b/c/207e2c90b21cb1e7/EbVe_ZysjpVErM_CbpVKayYBOPUl5ubBox31S1dsUxQR5w",
    img: "https://i.imgur.com/your_image.png"
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showPixModal, setShowPixModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const BACKEND_URL = "http://localhost:3001"; // altere para seu backend

  function addToCart(prod) {
    if (!cart.find((p) => p.id === prod.id)) setCart([...cart, prod]);
    setSelected(prod);
    setPaymentConfirmed(false);
  }

  function removeFromCart(id) {
    setCart(cart.filter((p) => p.id !== id));
    setPaymentConfirmed(false);
  }

  async function openPix() {
    if (!userEmail) return alert("Digite seu e-mail para continuar.");

    try {
      const res = await fetch(`${BACKEND_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cart, userEmail })
      });
      const data = await res.json();
      setOrderId(data.orderId);
      setShowPixModal(true);
    } catch (err) {
      alert("Erro ao criar pedido.");
    }
  }

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      alert("Não foi possível copiar automaticamente.");
    }
  }

  useEffect(() => {
    if (!orderId) return;
    const interval = setInterval(async () => {
      const res = await fetch(`${BACKEND_URL}/check-payment/${orderId}`);
      const data = await res.json();
      if (data.paid) setPaymentConfirmed(true);
    }, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  const total = cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center p-6">
      <header className="w-full max-w-5xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold">Bolso Forte</h1>
      </header>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Seu e-mail"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
          className="p-2 rounded-md text-black"
        />
      </div>

      {!selected && (
        <section className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mb-8">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="bg-gray-800 p-4 rounded-xl shadow flex flex-col">
              <img src={p.img} alt={p.title} className="rounded-md mb-3 h-48 object-cover" />
              <div className="font-bold text-lg">{p.title}</div>
              <div className="text-sm text-gray-300 mt-1">{p.desc}</div>
              <div className="flex justify-between mt-4 items-center">
                <div className="text-amber-400 font-bold">R${p.price.toFixed(2)}</div>
                <button
                  className="bg-amber-400 text-black px-4 py-2 rounded-md font-semibold"
                  onClick={() => addToCart(p)}
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {cart.length > 0 && (
        <section className="bg-gray-900 p-4 rounded-xl shadow w-full max-w-4xl mb-8">
          <div className="font-bold text-lg mb-2">Carrinho</div>
          {cart.map(p => (
            <div key={p.id} className="flex justify-between py-2 border-b border-gray-700">
              <div>{p.title}</div>
              <div className="text-amber-400 font-bold">R${p.price.toFixed(2)}</div>
            </div>
          ))}
          <div className="font-bold text-amber-400 mt-2">Total: R${total}</div>
          <button
            className="mt-4 bg-green-500 px-4 py-2 rounded-lg font-bold"
            onClick={openPix}
          >
            Pagar com Pix
          </button>
        </section>
      )}

      {/* Modal Pix */}
      {showPixModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full text-center">
            <h2 className="font-bold text-lg mb-2">Pagamento via Pix</h2>
            <p className="text-gray-300 mb-2">Escaneie o QR Code ou copie a chave Pix</p>
            <img src={QR_IMAGE_URL} alt="QR Code" className="mx-auto w-56 h-56 mb-4" />
            <div className="flex gap-2 justify-center mb-2">
              <div className="bg-gray-800 px-4 py-2 rounded-md select-all">{PIX_KEY}</div>
              <button onClick={copyPixKey} className="bg-amber-400 px-3 py-2 rounded-md">
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>

            {!paymentConfirmed && (
              <p className="text-gray-400 mt-2">
                Enviaremos um e-mail para confirmação do pagamento. Após confirmado, os downloads serão liberados.
              </p>
            )}

            {paymentConfirmed && (
              <div className="mt-4 flex flex-col gap-2">
                {cart.map(p => (
                  <a
                    key={p.id}
                    href={p.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 px-5 py-3 rounded-lg font-bold"
                  >
                    Baixar {p.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
