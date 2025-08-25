const { db } = require('../db');
const { cpf: cpfValidator } = require('cpf-cnpj-validator');
const bcrypt = require('bcrypt');

// isso aqui garante que so pode cadastrar CPF valido
function isValidCPF(cpf) {
  return cpfValidator.isValid(cpf);
}

module.exports = {
  async cadastrarPolicial(req, res) {
    try {
      const { rg_civil, rg_militar, cpf, data_nascimento, matricula } = req.body;

      if (!rg_civil || !rg_militar || !cpf || !data_nascimento || !matricula) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

    // descomentar aqui pra usar com o CPF VALIDATOR, apensar comentado para testar. 

    //   if (!isValidCPF(rg_militar)) {
    //     return res.status(400).json({ error: 'RG Militar deve ser válido.' });
    //   }



      const [rows] = await db.query(
        'SELECT id FROM policiais WHERE rg_civil = ? OR rg_militar = ?',
        [rg_civil, rg_militar]
      );
      if (rows.length > 0) {
        return res.status(400).json({ error: 'RG já cadastrado.' });
      }

      const matriculaHash = await bcrypt.hash(matricula, 10);

      await db.query(
        'INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?, ?, ?, ?, ?)',
        [rg_civil, rg_militar, cpf, data_nascimento, matriculaHash]
      );

      res.status(201).json({ message: 'Policial cadastrado com sucesso.' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao cadastrar policial.' });
    }
  },

  async listarPoliciais(req, res) {
    try {
      const { cpf, rg } = req.query;
  let query = 'SELECT id, rg_civil, rg_militar, cpf, DATE_FORMAT(data_nascimento, "%Y-%m-%d") as data_nascimento, matricula FROM policiais';
      let params = [];

      if (cpf) {
        query += ' WHERE cpf = ?';
        params.push(cpf);
      } else if (rg) {
        query += ' WHERE rg_civil = ? OR rg_militar = ?';
        params.push(rg, rg);
      }

      const [rows] = await db.query(query, params);

      res.json(
        rows.map((row) => ({
          ...row,
          matricula: 'Matricula Protegida',
        }))
      );
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar policiais.' });
    }
  },
};
