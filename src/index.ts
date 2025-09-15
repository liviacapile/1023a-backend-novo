import 'dotenv/config';
import mysql from 'mysql2/promise';
console.log(process.env.DBUSER);

import express, {Request, Response} from 'express';
const app = express();

app.get('/', async (req: Request, res: Response) => {
  if (!process.env.DBUSER){ //Negação da variável
    res.status(500).send("Variável de ambiente DBUSER não está definida") 
    return;
  }
  if (process.env.DBPASSWORD==undefined){ //Negação da variável
    res.status(500).send("Variável de ambiente DBPASSWORD não está definida")
    return;
  }
  if (!process.env.DBHOST){ //Negação da variável
    res.status(500).send("Variável de ambiente DBHOST não está definida")
    return;
  }
  if (!process.env.DBNAME){ //Negação da variável
    res.status(500).send("Variável de ambiente DBNAME não está definida")
    return;
  }
  if (!process.env.DBPORT){ //Negação da variável
    res.status(500).send("Variável de ambiente DBPORT não está definida")
    return;
  }
  
  try {
  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    port: Number(process.env.DBPORT)
  })

  res.send("Conectado ao banco de dados com sucesso!");
  await connection.end();
}

catch (error) {
  console.error("Erro ao conectar ao banco de dados:" + error);
}

});
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
