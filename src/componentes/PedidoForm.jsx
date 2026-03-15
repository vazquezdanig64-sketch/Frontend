import { useState } from "react";
import API from "../servicios/api";

function PedidoForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "", // ✅ Corregido: Agregado al estado inicial
    fecha_solicitud: "",
    fecha_envio: "",
    total: "",
    pagado: [],
    comentario: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePagadoChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm({
        ...form,
        pagado: [...form.pagado, value],
      });
    } else {
      setForm({
        ...form,
        pagado: form.pagado.filter((metodo) => metodo !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/pedidos", form);
      alert("Pedido guardado correctamente");

      // ✅ Corregido: Limpieza completa incluyendo dirección
      setForm({
        nombre: "",
        telefono: "",
        direccion: "",
        fecha_solicitud: "",
        fecha_envio: "",
        total: "",
        pagado: [],
        comentario: "",
      });
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar el pedido. Revisa la terminal del backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📦 Registro de Pedido
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Teléfono */}
            <div>
              <label className="block font-medium mb-1">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                maxLength="10"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Total */}
            <div>
              <label className="block font-medium mb-1">Total ($)</label>
              <input
                type="number"
                name="total"
                value={form.total}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* ✅ Corregido: Nuevo campo de Dirección agregado al Formulario */}
          <div>
            <label className="block font-medium mb-1">
              Dirección de Entrega
            </label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Calle, número y colonia"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Métodos de Pago */}
          <div>
            <label className="block font-medium mb-2">Métodos de Pago</label>
            <div className="grid grid-cols-2 gap-3">
              {["Efectivo", "Transferencia", "Tarjeta", "Depósito"].map(
                (metodo) => (
                  <label
                    key={metodo}
                    className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition"
                  >
                    <input
                      type="checkbox"
                      value={metodo}
                      checked={form.pagado.includes(metodo)}
                      onChange={handlePagadoChange}
                      className="accent-indigo-600"
                    />
                    <span>{metodo}</span>
                  </label>
                ),
              )}
            </div>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Fecha Solicitud
              </label>
              <input
                type="date"
                name="fecha_solicitud"
                value={form.fecha_solicitud}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Fecha Envío
              </label>
              <input
                type="date"
                name="fecha_envio"
                value={form.fecha_envio}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          {/* Comentario */}
          <div>
            <label className="block font-medium mb-1">Comentario</label>
            <textarea
              name="comentario"
              value={form.comentario}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            {loading ? "Guardando..." : "Guardar Pedido"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PedidoForm;
