// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

// Substitua com suas credenciais de e-mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "seuemail@gmail.com", // coloque seu e-mail
    pass: "suasenha" // app password do Gmail
  }
});

// Armazenamento de pedidos
let orders = {}; // { orderId: { paid: false, products: [], email: "" } }

// Criar pedido
app.post("/create-order", async (req, res) => {
  const { products, userEmail } = req.body;
  const orderId = Date.now().toString(36);

  orders[orderId] = {
    paid: false,
    products,
    userEmail
  };

  // Enviar e-mail para você
  try {
    await transporter.sendMail({
      from: `"Bolso Forte" <seuemail@gmail.com>`,
      to: "caiofelipe14jaa2009@gmail.com",
      subject: `Novo pedido Pix: ${orderId}`,
      html: `
        <h2>Novo pedido Pix</h2>
        <p><strong>Código do pedido:</strong> ${orderId}</p>
        <p><strong>E-mail do usuário:</strong> ${userEmail}</p>
        <p><strong>Produtos:</strong></p>
        <ul>
          ${products.map(p => `<li>${p.title} - R$${p.price.toFixed(2)}</li>`).join("")}
        </ul>
        <p>Confirme manualmente o pagamento para liberar o download.</p>
      `
    });
  } catch (err) {
    console.log(err);
  }

  res.json({ orderId });
});

// Confirmar pagamento (você faz manualmente)
app.post("/confirm-payment", (req, res) => {
  const { orderId } = req.body;
  if (orders[orderId]) {
    orders[orderId].paid = true;
    return res.json({ success: true });
  }
  res.json({ success: false, message: "Pedido não encontrado" });
});

// Checar pagamento (frontend consulta)
app.get("/check-payment/:orderId", (req, res) => {
  const order = orders[req.params.orderId];
  res.json({ paid: order ? order.paid : false });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
