class SalesApp extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <section class="card">
        <h2>Calculadora de Ventas</h2>
        <p>Ingresa los datos y obtén el total sin recargar la página.</p>

        <form id="formVentas">
          <div>
            <label for="producto">Producto</label>
            <input id="producto" type="text" placeholder="Ej: Camisa" />
          </div>

          <div>
            <label for="precio">Precio ($)</label>
            <input id="precio" type="number" step="0.01" placeholder="Ej: 10.50" />
          </div>

          <div>
            <label for="cantidad">Cantidad</label>
            <input id="cantidad" type="number" step="1" placeholder="Ej: 3" />
          </div>

          <div>
            <label for="impuesto">Impuesto</label>
            <select id="impuesto">
              <option value="">Seleccione...</option>
              <option value="0">0%</option>
              <option value="0.13">13%</option>
            </select>
          </div>

          <button type="submit">Calcular</button>

          <div id="msg" class="msg"></div>
        </form>
      </section>
    `;
  }

  connectedCallback() {
    const form = this.querySelector("#formVentas");
    form.addEventListener("submit", (e) => this.calcular(e));
  }

  calcular(e) {
    e.preventDefault(); // clave: NO recargar

    const producto = this.querySelector("#producto").value.trim();
    const precio = Number(this.querySelector("#precio").value);
    const cantidad = Number(this.querySelector("#cantidad").value);
    const impuestoStr = this.querySelector("#impuesto").value;

    const msg = this.querySelector("#msg");

    // Validación: vacíos / incorrectos
    if (!producto) return this.error(msg, "El nombre del producto es obligatorio.");
    if (!Number.isFinite(precio) || precio <= 0) return this.error(msg, "El precio debe ser un número mayor que 0.");
    if (!Number.isFinite(cantidad) || cantidad <= 0 || !Number.isInteger(cantidad)) {
      return this.error(msg, "La cantidad debe ser un entero mayor que 0.");
    }
    if (impuestoStr === "") return this.error(msg, "Seleccione un impuesto.");

    const impuesto = Number(impuestoStr);
    const subtotal = precio * cantidad;
    const total = subtotal + (subtotal * impuesto);

    msg.className = "msg ok";
    msg.textContent = `Producto: ${producto} | Subtotal: $${subtotal.toFixed(2)} | Total: $${total.toFixed(2)}`;
  }

  error(el, texto) {
    el.className = "msg error";
    el.textContent = texto;
  }
}

customElements.define("sales-app", SalesApp);