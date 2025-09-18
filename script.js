document.addEventListener("DOMContentLoaded", () => {
    const formFields = document.getElementById("formFields");
    const gerarBtn = document.getElementById("gerar");
    const limparBtn = document.getElementById("limpar");
    const salvarBtn = document.getElementById("salvarNomeado");
    const excluirBtn = document.getElementById("excluirTemplate");
    const carregarBtn = document.getElementById("carregarTemplate");
    const limparListaBtn = document.getElementById("limparLista");
    const editarNomeTemplateBtn = document.getElementById("editarNomeTemplate");
    const copiarTemplateGeradoBtn = document.getElementById("copiarTemplateGerado");
    const templateArea = document.getElementById("template");
    const nomeInput = document.getElementById("nomeTemplate");
    const seletorTemplates = document.getElementById("templateSelecionado");
    const empresaSelect = document.getElementById("empresa");

    const gerenciarTemplatesHeader = document.getElementById("gerenciarTemplatesHeader");
    const gerenciarTemplatesContent = document.getElementById("gerenciarTemplatesContent");

    const campoIcones = {
        nome: "mdi-account",
        usuário: "mdi-account-circle",
        telefone: "mdi-phone",
        email: "mdi-email",
        cpf: "mdi-card-account-details",
        localizacao: "mdi-map-marker",
        investida: "mdi-office-building",
        horario: "mdi-clock",
        hostname: "mdi-desktop-classic",
        ldap: "mdi-account",
        disponibilidade: "mdi-calendar-clock",
        localidade: "mdi-map-marker",
        chamado: "mdi-file-document",
        funcional: "mdi-account-key"
    };

    const templatesCampos = {
        votorantim: ["nome","telefone","email","investida","horario","localizacao","hostname"],
        allianz: ["usuário","nome","email","telefone","cpf","localizacao"],
        leroy: ["nome","ldap","telefone","disponibilidade","localidade"],
        unimed: ["nome","chamado","funcional","email","telefone","localidade","horario","hostname"]
    };

    const criarCampos = (empresa) => {
        formFields.innerHTML = "";
        templatesCampos[empresa].forEach(id => {
            const div = document.createElement("div");
            div.className = "input-group";
            const icon = document.createElement("i");
            icon.className = `mdi ${campoIcones[id] || "mdi-account"}`;
            const input = document.createElement("input");
            input.id = id;
            input.type = "text";
            input.placeholder = id.charAt(0).toUpperCase() + id.slice(1);
            div.appendChild(icon);
            div.appendChild(input);
            formFields.appendChild(div);
        });
        const divNotas = document.createElement("div");
        divNotas.className = "input-group wide";
        const iconNotas = document.createElement("i");
        iconNotas.className = "mdi mdi-clipboard-text-outline";
        const textareaNotas = document.createElement("textarea");
        textareaNotas.id = "notasPessoais";
        textareaNotas.rows = 4;
        textareaNotas.placeholder = "Notas pessoais sobre o chamado (para seu uso, não gerado em templates)";
        divNotas.appendChild(iconNotas);
        divNotas.appendChild(textareaNotas);
        formFields.appendChild(divNotas);
    };

    empresaSelect.value = "votorantim";
    criarCampos("votorantim");

    empresaSelect.addEventListener("change", () => {
        criarCampos(empresaSelect.value);
        templateArea.value = "";
    });

    gerarBtn.addEventListener("click", () => {
        const inputs = Array.from(formFields.querySelectorAll("input, textarea"));
        let templateText = "==============\nDados do usuário\n==============\n\n";
        inputs.forEach(input => {
            if(input.id !== "notasPessoais") {
                templateText += `${input.placeholder}: ${input.value || "Não informado"}\n`;
            }
        });
        templateArea.value = templateText.trim();
    });

    limparBtn.addEventListener("click", () => {
        const inputs = Array.from(formFields.querySelectorAll("input, textarea"));
        inputs.forEach(i => i.value = "");
        templateArea.value = "";
        nomeInput.value = "";
        seletorTemplates.selectedIndex = 0;
    });

    gerenciarTemplatesHeader.addEventListener("click", () => {
        gerenciarTemplatesContent.classList.toggle("expanded");
        gerenciarTemplatesHeader.classList.toggle("expanded");
        gerenciarTemplatesHeader.classList.toggle("collapsed");
    });
    gerenciarTemplatesHeader.classList.add("collapsed");

    const carregarTemplates = () => JSON.parse(localStorage.getItem("templatesNomeados")) || {};
    const salvarTemplate = (nome, conteudo) => {
        const templates = carregarTemplates();
        if (templates[nome] && !confirm(`Já existe um template chamado "${nome}". Sobrescrever?`)) return;
        templates[nome] = conteudo;
        localStorage.setItem("templatesNomeados", JSON.stringify(templates));
        popularSeletor();
    };
    const excluirTemplate = (nome) => {
        const templates = carregarTemplates();
        if (templates[nome] && confirm(`Tem certeza que deseja excluir "${nome}"?`)) {
            delete templates[nome];
            localStorage.setItem("templatesNomeados", JSON.stringify(templates));
            popularSeletor();
            templateArea.value = "";
            nomeInput.value = "";
        }
    };
    const renomearTemplate = (nomeAntigo, novoNome) => {
        const templates = carregarTemplates();
        if (!templates[nomeAntigo]) return alert("Template não encontrado.");
        if (novoNome === nomeAntigo) return alert("O novo nome é igual ao antigo.");
        if (templates[novoNome] && !confirm(`Já existe "${novoNome}". Sobrescrever?`)) return;
        templates[novoNome] = templates[nomeAntigo];
        delete templates[nomeAntigo];
        localStorage.setItem("templatesNomeados", JSON.stringify(templates));
        popularSeletor();
        nomeInput.value = novoNome;
        alert(`Template renomeado para "${novoNome}"`);
    };

    const popularSeletor = () => {
        const templates = carregarTemplates();
        seletorTemplates.innerHTML = "<option value=''>-- Selecionar template salvo --</option>";
        Object.keys(templates).reverse().forEach(nome => {
            const option = document.createElement("option");
            option.value = nome;
            option.textContent = nome;
            seletorTemplates.appendChild(option);
        });
    };

    salvarBtn.addEventListener("click", () => {
        const nome = nomeInput.value.trim();
        const conteudo = templateArea.value.trim();
        if (!nome) return alert("Digite um nome para o template.");
        if (!conteudo) return alert("Gere um template antes de salvar.");
        salvarTemplate(nome, conteudo);
        alert("Template salvo com sucesso!");
    });

    seletorTemplates.addEventListener("change", () => nomeInput.value = seletorTemplates.value || "");
    carregarBtn.addEventListener("click", () => {
        const nome = seletorTemplates.value;
        const templates = carregarTemplates();
        if (!nome || !templates[nome]) return alert("Selecione um template válido.");
        templateArea.value = templates[nome];
        nomeInput.value = nome;
    });
    excluirBtn.addEventListener("click", () => {
        const nome = seletorTemplates.value;
        if (!nome) return alert("Selecione um template.");
        excluirTemplate(nome);
    });
    editarNomeTemplateBtn.addEventListener("click", () => {
        const nomeAntigo = seletorTemplates.value;
        if (!nomeAntigo) return alert("Selecione um template.");
        const novoNome = prompt(`Digite novo nome para "${nomeAntigo}":`);
        if (novoNome && novoNome.trim() !== "") renomearTemplate(nomeAntigo, novoNome.trim());
        else if(novoNome !== null) alert("O nome do template não pode ser vazio.");
    });
    limparListaBtn.addEventListener("click", () => {
        seletorTemplates.selectedIndex = 0;
        nomeInput.value = "";
    });
    copiarTemplateGeradoBtn.addEventListener("click", async () => {
        const contentToCopy = templateArea.value.trim();
        if (!contentToCopy) return alert("Não há conteúdo para copiar.");
        try { await navigator.clipboard.writeText(contentToCopy); alert("Conteúdo copiado!"); }
        catch { alert("Não foi possível copiar automaticamente."); }
    });

    popularSeletor();
});
