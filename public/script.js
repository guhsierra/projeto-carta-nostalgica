document.addEventListener('DOMContentLoaded', function() {
    // A configuração do Particles.js continua a mesma
    particlesJS('particles-js', {
        // ... (cole aqui a configuração completa do particles.js do seu arquivo original)
        "particles": {"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#c0392b"},"shape":{"type":"circle",},"opacity":{"value":0.5,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,}},"line_linked":{"enable":false,},"move":{"enable":true,"speed":0.4,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,},"onclick":{"enable":false,},"resize":true}},"retina_detect":true
    });

    const discoverButton = document.querySelector('.discover-button');
    const nameInput = document.querySelector('#name');
    const hintsContainer = document.querySelector('.hints-container'); // Usaremos para mostrar erros

    discoverButton.addEventListener('click', async () => {
        const name = nameInput.value;
        if (name.trim() === '') {
            nameInput.focus();
            return;
        }

        // Limpa mensagens de erro anteriores
        hintsContainer.innerHTML = ''; 

        try {
            // Fazendo a requisição POST para o nosso backend
            const response = await fetch('/verificar-nome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name })
            });

            const data = await response.json();

            if (data.success) {
                // Se a resposta for sucesso, redireciona o usuário
                window.location.href = data.redirectUrl;
            } else {
                // Se não, mostra a mensagem de erro de forma sutil
                const errorHint = document.createElement('p');
                errorHint.textContent = data.message;
                errorHint.className = 'hint visible';
                hintsContainer.appendChild(errorHint);
            }
        } catch (error) {
            // Em caso de erro de rede ou do servidor
            console.error('Erro ao contatar o servidor:', error);
            const errorHint = document.createElement('p');
            errorHint.textContent = 'A conexão com o passado foi perdida...';
            errorHint.className = 'hint visible';
            hintsContainer.appendChild(errorHint);
        }
    });

    // A lógica da música de fundo pode permanecer a mesma
});