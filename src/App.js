import React, { useEffect, useState } from "react";
import "./App.css";
const CalSumatoria = (productos) => {
  return productos.reduce((acc, el) => {
    // sumatoria de precios
    return acc + el.precio;
  }, 0);
};

const CalPromedio = (sumatoria, cantProductos) => sumatoria / cantProductos;

const CalTipo = (product) => {
  return product.reduce(
    (acc, el) => {
      // tipo 1
      switch (el.tipo) {
        case 1:
          acc.tipo1++;
          break;
        // tipo 2
        case 2:
          acc.tipo2++;
          break;
        // tipo 3
        case 3:
          acc.tipo3++;
          break;
        default:
          break;
      }
      return acc;
    },

    {
      tipo1: 0,
      tipo2: 0,
      tipo3: 0,
    }
  );
};

const CalVentaMayor = (product) => {
  return product.reduce((acc, el) => {
    //precio mayor
    return acc > el.precio ? acc : el.precio;
  }, 0);
};

const CalVentaMenor = (product) => {
  // precio menor de arrelgo

  return product.reduce((acc, el) => {
    return acc < el.precio ? acc : el.precio;
  }, product[0]?.precio);
};

const CalRangoPrecio = (productos) => {
  return productos.reduce(
    (acc, el) => {
      // precio menor a 1000000
      if (el.precio < 1000000) {
        acc.menorA1M++;
      }
      // precio mayor a 1000000 y menor a 5000000

      if (el.precio > 1000000 && el.precio < 5000000) {
        acc.entre1M5M++;
      }

      // precio mayor a 5000000
      if (el.precio > 5000000) {
        acc.mayorA5M++;
      }
      return acc;
    },
    {
      menorA1M: 0,
      entre1M5M: 0,
      mayorA5M: 0,
    }
  );
};

const CalDescuento = (sumatoria) => {
  // descuento de 10%
  if (sumatoria <= 1000000) {
    return sumatoria * 0.1;
  }
  // descuento de 15%
  if (sumatoria > 1000000 && sumatoria <= 5000000) {
    return sumatoria * 0.15;
  }
  // descuento de 20%
  if (sumatoria > 5000000) {
    return sumatoria * 0.2;
  }

  return 0;
};

function CalPorTipo(cantTipo) {
  // extraigo los calores de cada tipo
  let { tipo1, tipo2, tipo3 } = cantTipo;

  // calculo el porcentaje de cada tipo
  return {
    tipo1: (tipo1 * 100) / (tipo1 + tipo2 + tipo3),
    tipo2: (tipo2 * 100) / (tipo1 + tipo2 + tipo3),
    tipo3: (tipo3 * 100) / (tipo1 + tipo2 + tipo3),
  };
}

function CalDesviacion(productos, sumatoria, cantProductos) {
  if (cantProductos >= 2) {
    let promedio = CalPromedio(sumatoria, cantProductos);
    let sumatoriaDesviacion = 0;
    productos.forEach((producto) => {
      sumatoriaDesviacion += Math.pow(producto.precio - promedio, 2);
    });
    return Math.sqrt(sumatoriaDesviacion / (cantProductos - 1));
  }
}

const App = () => {
  const [promedio, setPromedio] = useState(0);
  const [ventaMayor, setVentaMayor] = useState(0);
  const [ventaMenor, setVentaMenor] = useState(0);
  const [rangoPrecio, setRangoPrecio] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [Porcentaje, setPorcentaje] = useState(0);
  const [Desviacion, setDesviacion] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    function ejercicio() {
      let productos = [];

      const cantProductos = parseInt(
        prompt("Ingrese la cantidad de productos")
      );

      for (let i = 1; i <= cantProductos; i++) {
        const precio = prompt(`Ingrese el precio del producto ${i}:`);
        const tipo = prompt("Ingrese el tipo de producto (1,2,3)");
        productos = [
          ...productos,
          { precio: parseInt(precio), tipo: parseInt(tipo) },
        ];
      }
      const sumatoria = CalSumatoria(productos);

      const promedio = CalPromedio(sumatoria, cantProductos);
      setPromedio(promedio);
      const cantTipo = CalTipo(productos);
      const ventaMayor = CalVentaMayor(productos);
      setVentaMayor(ventaMayor);
      const ventaMenor = CalVentaMenor(productos);
      setVentaMenor(ventaMenor);
      const rangoPrecio = CalRangoPrecio(productos);
      setRangoPrecio(rangoPrecio);
      const descuento = CalDescuento(sumatoria);
      setDescuento(descuento);
      const porcentajeProductoTipo = CalPorTipo(cantTipo);
      setPorcentaje(porcentajeProductoTipo);

      const desViacionEstandar = CalDesviacion(
        productos,
        sumatoria,
        cantProductos
      );
      setDesviacion(desViacionEstandar);

      let totalPagaras = sumatoria - descuento;
      setTotal(totalPagaras);
    }

    ejercicio();
  }, []);

  return (
    <div>
      <h1>Proyecto Final</h1>

      <h2>Promedio: {promedio}</h2>
      <h2>Venta Mayor: {ventaMayor}</h2>
      <h2>Venta Menor: {ventaMenor}</h2>
      <h2>Rango Precio:</h2>
      {Object.keys(rangoPrecio).map((key) => {
        return (
          <p key={key}>
            {key}: {rangoPrecio[key]}
          </p>
        );
      })}
      <h2>Descuento:{descuento} % </h2>
      <h2>Porcentaje de productos por tipo:</h2>
      {Object.keys(Porcentaje).map((key) => {
        return (
          <p key={key}>
            {key}: {Porcentaje[key]}
          </p>
        );
      })}
      <h2>Desviacion Estandar: {Desviacion}</h2>
      <h2>total a pagar: {total}</h2>
    </div>
  );
};

export default App;
