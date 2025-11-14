document.addEventListener('DOMContentLoaded', () => {

	// Garante que exista um container para listar produtos; cria se necessário
	function ensureListContainer() {
		let container = document.getElementById('lista-produtos');
		const form = document.getElementById('form-produto');

		// se não existir, cria totalmente novo container
		if (!container) {
			container = document.createElement('div');
			container.id = 'lista-produtos';
		}

		// garante título
		let titulo = container.querySelector('h3');
		if (!titulo) {
			titulo = document.createElement('h3');
			titulo.textContent = 'Produtos salvos:';
			container.appendChild(titulo);
		}

		// garante UL onde serão listados os produtos
		let ul = container.querySelector('#lista-produtos-ul');
		if (!ul) {
			ul = document.createElement('ul');
			ul.id = 'lista-produtos-ul';
			container.appendChild(ul);
		}

		// assegura que o container esteja posicionado após o form (ou no body)
		if (!container.parentNode) {
			if (form && form.parentNode) form.parentNode.insertBefore(container, form.nextSibling);
			else document.body.appendChild(container);
		} else if (form && form.parentNode && form.nextSibling !== container) {
			form.parentNode.insertBefore(container, form.nextSibling);
		}

		container.style.marginTop = '1em';
		return container;
	}

	// Renderiza a lista a partir do localStorage (sem data)
	function renderProdutos() {
		ensureListContainer();
		const ul = document.getElementById('lista-produtos-ul');
		if (!ul) return;
		ul.innerHTML = '';
		const key = 'produtos';
		let produtos = [];
		try {
			produtos = JSON.parse(localStorage.getItem(key) || '[]');
		} catch (e) {
			console.error('Erro ao ler localStorage:', e);
		}
		if (!produtos.length) {
			const li = document.createElement('li');
			li.textContent = 'Nenhum produto salvo.';
			ul.appendChild(li);
			return;
		}
		produtos.forEach((p) => {
			const li = document.createElement('li');
			const precoFmt = typeof p.preco === 'number' ? p.preco.toFixed(2) : p.preco;
			li.textContent = `${p.nome} — R$ ${precoFmt}`;
			ul.appendChild(li);
		});
	}

	// Inicializa UI e listeners existentes
	const form = document.getElementById('form-produto');
	const nomeInput = document.getElementById('nome');
	const precoInput = document.getElementById('preco');
	const mensagemDiv = document.getElementById('mensagem');

	// Render inicial
	renderProdutos();

	// Se o form existir, adiciona listener (mantendo lógica de salvamento local)
	if (form) {
		form.addEventListener('submit', function(event) {
			event.preventDefault();
			if (!nomeInput || !precoInput || !mensagemDiv) {
				console.error('Elementos do formulário não encontrados.');
				return;
			}
			const nome = nomeInput.value.trim();
			const precoRaw = precoInput.value.trim();
			const precoFloat = parseFloat(precoRaw.replace(',', '.'));

			// Validação simples
			if (!nome || isNaN(precoFloat) || precoFloat <= 0) {
				mensagemDiv.textContent = 'Por favor, preencha o nome e um preço válido.';
				mensagemDiv.className = 'erro';
				return;
			}

			try {
				const key = 'produtos';
				const atuais = JSON.parse(localStorage.getItem(key) || '[]');
				// sem criadoEm agora
				atuais.push({ nome, preco: precoFloat });
				localStorage.setItem(key, JSON.stringify(atuais));

				// Atualiza a view e a lista embaixo
				mensagemDiv.textContent = `Produto '${nome}' salvo localmente.`;
				mensagemDiv.className = 'sucesso';
				form.reset();
				renderProdutos();
			} catch (e) {
				mensagemDiv.textContent = 'Erro ao salvar localmente: ' + (e.message || e);
				mensagemDiv.className = 'erro';
				console.error(e);
			}
		});
	}
});