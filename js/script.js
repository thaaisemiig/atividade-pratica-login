const id = '3592f325-189c-4929-b557-f5bc2e3e5d49';
const containerRecados = document.getElementById('recados');

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

async function atualizarRecado(id) {
  const accessToken = localStorage.getItem('access_token');
  try {
    const response = await instance.put(`/usuario/recados/${id}`, {
      accessToken,
      titulo: 'Novo titulo',
      descricao: 'Nova descrição',
    });
    console.log(response);
    carregarRecados();
  } catch (error) {
    console.log(error);
  }
} 

async function apagarRecado(id) {
  const accessToken = localStorage.getItem('access_token');
  try {
    const response = await instance.delete(`/usuario/recados/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    alert('Recado apagado')
    console.log(response);
    carregarRecados();
  } catch (error) {
    console.log(error);
  }
}

async function carregarRecados() {
  const accessToken = localStorage.getItem('access_token');
  try {
    const response = await instance.get(`/recados/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const recados = response.data.recados;
    containerRecados.innerHTML = '';

    recados.forEach((recado) => {
      const recadoDivEl = document.createElement('div');
      const recadoPEl = document.createElement('p');
      recadoPEl.innerHTML = `${recado.titulo} | ${recado.descricao}`;

      const recadoAtualizarEl = document.createElement('button');
      recadoAtualizarEl.innerHTML = 'Atualizar';
      recadoAtualizarEl.classList.add('button');
      recadoAtualizarEl.addEventListener('click', () => { atualizarRecado(recado.id); });

      const recadoApagarEl = document.createElement('button');
      recadoApagarEl.innerHTML = 'Apagar';
      recadoApagarEl.classList.add('button');
      recadoApagarEl.addEventListener('click', () => { apagarRecado(recado.id); });

      recadoDivEl.appendChild(recadoPEl);
      recadoDivEl.appendChild(recadoAtualizarEl);
      recadoDivEl.appendChild(recadoApagarEl);

      containerRecados.appendChild(recadoDivEl);
    });
  } catch (error) {
    console.log(error);
    location.href = 'http://127.0.0.1:5500/login.html';
  }
}

async function cadastrar(event) {
  event.preventDefault();
  const accessToken = localStorage.getItem('access_token');
  const titulo = event.target.titulo.value;
  const descricao = event.target.descricao.value;

  try {
    const response = await instance.post('/usuario/recados/', {
      accessToken,
      titulo,
      descricao,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    alert('Cadastrado com sucesso')
    carregarRecados();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

carregarRecados();
