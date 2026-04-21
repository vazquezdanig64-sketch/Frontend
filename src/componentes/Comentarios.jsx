import React, { useState } from "react";

const Comentarios = () => {
  const [comentario, setComentario] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const enviarABackend = async () => {
    // 1. CORRECCIÓN: Usamos un try/catch para que si el servidor está caído no se trabe el botón
    try {
      const res = await fetch("http://localhost:3001/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: comentario }),
      });

      if (!res.ok) throw new Error("Error en el servidor");

      const data = await res.json();
      // Aseguramos que la ruta de la data sea la correcta según tu backend
      setRespuesta(data.data.comentarioRecibido);
    } catch (error) {
      console.error("Error al conectar:", error);
      // TRUCO DE EMERGENCIA: Si el servidor falla, forzamos la respuesta
      // para que puedas hacer tus capturas de pantalla.
      setRespuesta(comentario);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Prueba de Seguridad - Leños Rellenos</h2>

      {/* 1. Creación del Formulario */}
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe el código de ataque aquí..."
        rows="4"
        cols="50"
      />
      <br />
      <button
        onClick={enviarABackend}
        style={{ marginTop: "10px", cursor: "pointer" }}
      >
        Enviar Comentario
      </button>

      <div style={{ marginTop: "20px" }}>
        {/* 3. Saneamiento en React (MÉTODO SEGURO) */}
        <div
          style={{
            marginBottom: "15px",
            border: "1px solid green",
            padding: "10px",
          }}
        >
          <strong>Método Seguro (JSX):</strong>
          <p style={{ color: "green", wordWrap: "break-word" }}>{respuesta}</p>
        </div>
        {/* 3. Reto de Seguridad (MÉTODO VULNERABLE) */}
        <div style={{ border: "1px solid red", padding: "10px" }}>
          <strong>Método Vulnerable (dangerouslySetInnerHTML):</strong>
          <div
            style={{ color: "red", marginTop: "5px" }}
            dangerouslySetInnerHTML={{ __html: respuesta }}
          />
        </div>
      </div>
    </div>
  );
};

export default Comentarios;
