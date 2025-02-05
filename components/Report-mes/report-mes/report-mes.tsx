"use client";
import { useState } from "react";
import ReporMes from "../Tabla-mes-report/tabla-mes-report"; // Importa el componente que recibe los datos

export default function ComponentePrincipal() {
  const meses = [
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
  ];

  const [mesInicio, setMesInicio] = useState<number>(1); // Mes de inicio
  const [mesFin, setMesFin] = useState<number>(12); // Mes de fin
  const [año, setAño] = useState<number>(new Date().getFullYear()); // Año inicial es el año actual

  const handleMesInicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMesInicio(Number(e.target.value));
  };

  const handleMesFinChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMesFin(Number(e.target.value));
  };

  const incrementarAño = () => {
    setAño(año + 1);
  };

  const decrementarAño = () => {
    setAño(año - 1);
  };

  return (
    <div className="p-6 rounded-lg shadow-lg space-y-8">
      <h1 className="text-center text-xl font-light font-sans">CONTROL DIARIO DE INGRESO EN EL CAMPO DEPORTIVO PHAQCHAS</h1>
      
      <div className="flex space-x-4 justify-center">
        <div>
          <label htmlFor="mesInicio" className="block">Mes de inicio</label>
          <select
            id="mesInicio"
            value={mesInicio}
            onChange={handleMesInicioChange}
            className="p-2 border border-gray-300 rounded"
          >
            {meses.map((mes) => (
              <option key={mes.value} value={mes.value}>
                {mes.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="mesFin" className="block">Mes de fin</label>
          <select
            id="mesFin"
            value={mesFin}
            onChange={handleMesFinChange}
            className="p-2 border border-gray-300 rounded"
          >
            {meses.map((mes) => (
              <option key={mes.value} value={mes.value}>
                {mes.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="año" className="block">Año</label>
          <div className="flex items-center space-x-4">
            <button
              onClick={decrementarAño}
              className="p-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl">{año}</span>
            <button
              onClick={incrementarAño}
              className="p-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {Array.from({ length: mesFin - mesInicio + 1 }, (_, index) => mesInicio + index).map((mes) => (
        <div key={mes} className="mb-6">
          <ReporMes meses={[mes]} año={año} />
        </div>
      ))}
    </div>
  );
}
