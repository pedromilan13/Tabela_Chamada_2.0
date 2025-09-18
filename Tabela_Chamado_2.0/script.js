/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background-color: #121212;
  color: #f0f0f0;
  font-family: Arial, sans-serif;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  flex: 1;
  max-width: 450px;
  margin: 20px auto;
  background-color: #1e1e1e;
  padding: 30px 25px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  overflow-y: auto;
}

h1 {
  margin-bottom: 30px;
  color: #4fc3f7;
  font-size: 28px;
  text-align: center;
}

h2 {
  margin-bottom: 15px;
  color: #4fc3f7;
  font-size: 20px;
}

.template-selector {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.template-selector label {
  font-weight: bold;
}

.template-selector select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #333;
  background-color: #2a2a2a;
  color: #fff;
}

/* Resto do CSS mantém o seu estilo original */
.grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 25px; }
.input-group { display: flex; align-items: center; background-color: #2a2a2a; padding: 12px 16px; border-radius: 4px; transition: background 0.2s; }
.input-group:hover { background-color: #333; }
.input-group i { font-size: 22px; color: #aaa; margin-right: 14px; }
.input-group input, .input-group textarea { flex: 1; background: transparent; border: none; color: #fff; font-size: 16px; outline: none; padding: 6px 0; }
.input-group.wide { grid-column: span 1; }
textarea { resize: vertical; height: 90px; }

.btn { padding: 14px 20px; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 16px; }
.btn i { font-size: 20px; }
.btn.azul { background-color: #2196f3; color: white; } .btn.azul:hover { background-color: #1976d2; }
.btn.vermelho { background-color: #f44336; color: white; } .btn.vermelho:hover { background-color: #c62828; }
.btn.cinza { background-color: #888; color: white; } .btn.cinza:hover { background-color: #555; }

.actions { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 15px; margin-bottom: 30px; }

#template { width: 100%; height: 400px; padding: 16px; background-color: #2a2a2a; color: #fff; border: 1px solid #333; border-radius: 6px; font-family: monospace; font-size: 16px; line-height: 1.6; white-space: pre-wrap; resize: vertical; margin-bottom: 25px; }
#copiarTemplateGerado { margin-top: -10px; margin-bottom: 30px; width: 100%; }

.saved-section .input-group.wide { margin-bottom: 15px; }
.accordion-header { display: flex; justify-content: space-between; align-items: center; cursor: pointer; background-color: #2a2a2a; padding: 15px 20px; border-radius: 8px; margin-bottom: 15px; transition: background-color 0.2s ease; border: 1px solid #333; }
.accordion-header:hover { background-color: #333; }
.accordion-header h2 { margin: 0; color: #4fc3f7; font-size: 20px; }
.accordion-header i { font-size: 24px; color: #aaa; transition: transform 0.3s ease; }
.accordion-header.collapsed i { transform: rotate(0deg); }
.accordion-header.expanded i { transform: rotate(180deg); }

.accordion-content { overflow: hidden; max-height: 0; transition: max-height 0.4s ease-out, opacity 0.4s ease-out; opacity: 0; padding: 0 20px; }
.accordion-content.expanded { max-height: 500px; opacity: 1; padding-top: 0; padding-bottom: 20px; }

.saved-controls { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-bottom: 25px; }
#templateSelecionado { flex: 1; background-color: #2a2a2a; color: white; border: 1px solid #333; border-radius: 6px; font-family: monospace; font-size: 16px; padding: 10px; height: 180px; overflow-y: auto; overflow-x: auto; min-width: 280px; }
.buttons-vertical { display: flex; flex-direction: column; gap: 14px; min-width: 60px; }

@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr !important; }
  .actions { flex-direction: column; align-items: stretch; }
  .btn { justify-content: center; width: 100%; }
  .saved-controls { flex-direction: column; gap: 15px; }
  #templateSelecionado { width: 100%; height: auto; min-height: 150px; }
  .buttons-vertical { flex-direction: row; justify-content: space-around; width: 100%; min-width: 0; gap: 10px; }
  .buttons-vertical .btn { width: auto; flex-grow: 1; }
  textarea#template { height: 300px; font-size: 15px; }
  h1 { font-size: 1.8rem; }
  .container { padding: 25px 20px; margin: 10px auto; max-width: none; width: auto; }
  .form-section { display: flex; flex-direction: column; gap: 20px; }
}

.footer { margin-top: auto; text-align: center; font-size: 14px; color: #aaa; border-top: 1px solid #333; padding: 15px 10px; background-color: #1e1e1e; }
.footer strong { color: #4fc3f7; }
