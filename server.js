const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Seu token da Pushin Pay
const PUSHINPAY_TOKEN = '36539|loe6HF1qlPYAQtM3nRCO7ApFbH2y3PmNk4G2ld9La4aa7117';

// Endpoint para gerar PIX
app.post('/api/gerar-pix', async (req, res) => {
  const { valor } = req.body; // valor em centavos
  try {
    const response = await axios.post(
      'https://api.pushinpay.com.br/api/pix/cashIn',
      {
        value: valor,
        webhook_url: "",
        split_rules: []
      },
      {
        headers: {
          Authorization: `Bearer ${PUSHINPAY_TOKEN}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 
