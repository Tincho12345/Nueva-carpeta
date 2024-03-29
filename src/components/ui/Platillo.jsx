/* eslint-disable react/prop-types */
import { useRef } from "react";

import appFirebase from "../../firebase/credenciales";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(appFirebase);

const Platillo = ({ platillo }) => {
  const { id, nombre, imagen, existencia, categoria, precio, descripcion } = platillo;
  // existencia ref para acceder al valor
  const existenciaRef = useRef(platillo.existencia);

  // modificar el estado del platillo en firebase
  const actualizarDisponibilidad = async () => {
    try {
      const existencia = existenciaRef.current.value === "true";
      // Add a new document in collection "cities"
      // const documento = {id}
      await updateDoc(doc(db, "productos", id), {
        existencia
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={imagen} alt="Imagen Platillo" />
            <div className="sm:flex sm:-mx-2 pl-2">
              <label className="block mt-5 sm:w-x2/4">
                <span className="block text-gray-800 mb-2">Existencia: </span>
                <select
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  "
                  value={existencia}
                  ref={existenciaRef}
                  onChange={() => actualizarDisponibilidad()}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5 mt-3">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{nombre}</p>
            <p className="text-gray-600 mb-4">
              Categoría:{" "}
              <span className="text-gray-700 font-bold">
                {categoria.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{descripcion}</p>
            <p className="text-gray-600 mb-4">
              PRECIO: <span className="text-gray-700 font-bold">{precio}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platillo;
