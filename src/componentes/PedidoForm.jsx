import { useState } from "react";
import API from "../servicios/api";

function PedidoForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
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

      // Enviamos 'form' al endpoint /pedidos.
      // Si tu api.js tiene baseURL: ".../api/v1", axios llamará a ".../api/v1/pedidos"
      await API.post("/pedidos", form);

      alert("¡Pedido de Leños Rellenos guardado con éxito! 🎉");

      // Limpieza del formulario tras éxito
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
      // Mostramos un mensaje más descriptivo si es un error 404
      if (error.response && error.response.status === 404) {
        alert(
          "Error 404: No se encontró la ruta en el servidor. Revisa el api.js",
        );
      } else {
        alert(
          "Error al guardar el pedido. Revisa la consola o los logs de Railway.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📦 Registro de Pedido - Leños Rellenos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre del Cliente */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nombre del Cliente
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej. Juan Pérez"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Teléfono */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                placeholder="10 dígitos"
                value={form.telefono}
                onChange={handleChange}
                maxLength="10"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Total */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Total ($)
              </label>
              <input
                type="number"
                name="total"
                placeholder="0.00"
                value={form.total}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Dirección de Entrega
            </label>
            <input
              type="text"
              name="direccion"
              placeholder="Calle, número y colonia"
              value={form.direccion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Métodos de Pago */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Métodos de Pago
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Efectivo", "Transferencia", "Tarjeta", "Depósito"].map(
                (metodo) => (
                  <label
                    key={metodo}
                    className={`flex items-center justify-center space-x-2 p-2 rounded-lg border cursor-pointer transition ${
                      form.pagado.includes(metodo)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-indigo-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={metodo}
                      checked={form.pagado.includes(metodo)}
                      onChange={handlePagadoChange}
                      className="hidden"
                    />
                    <span className="text-sm font-medium">{metodo}</span>
                  </label>
                ),
              )}
            </div>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Fecha de Solicitud
              </label>
              <input
                type="date"
                name="fecha_solicitud"
                value={form.fecha_solicitud}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Fecha de Envío
              </label>
              <input
                type="date"
                name="fecha_envio"
                value={form.fecha_envio}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Comentario */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Comentarios adicionales
            </label>
            <textarea
              name="comentario"
              placeholder="Ej. Sin cebolla, dejar en recepción..."
              value={form.comentario}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Guardando...
              </span>
            ) : (
              "Confirmar Pedido"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PedidoForm;
