import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaginationTabla from "../../componentes/PaginationTabla";

const ColCategory = ({ categorias, categoria, subCategoria, detalle }) => {
  const navigate = useNavigate();

  const { nombre, imageurl = "NoImage" } = categorias;

  const viewPage = () => {
    if (subCategoria)
      navigate(`/categoria-producto/${categoria}/${nombre.replace(/ /g, "_")}`);
    else if (detalle) navigate(`/producto/${nombre.replace(/ /g, "_")}`);
    else navigate(`/categoria-producto/${nombre}`);
  };

  return (
    <div className="relative w-96 h-72 border my-3 overflow-hidden " onClick={viewPage}>
      <div className="h-full w-full bg-gray-200 flex items-center justify-center" style={{ cursor: "pointer" }}>
        <img
          className="object-cover h-full w-full transform transition-transform duration-300 hover:scale-105"
          src={`/images/${imageurl}`}
          alt={nombre}
        />
      </div>
      <div className="absolute bottom-4 left-0 right-0">
          <div className="flex justify-center w-50 m-auto">
            <button className="shadow-md bg-white text-pink-300 py-2 rounded-md px-10">
              {nombre}
            </button>
          </div>
        </div>
    </div>
  );
};

const Servicios = ({
  item,
  categoria = "",
  subCategoria = false,
  detalle = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = item?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="flex align-middle flex-wrap justify-around">
        {item &&
          currentItems.map((item, index) => {
            return (
              <ColCategory
                key={index}
                categorias={item}
                categoria={categoria}
                subCategoria={subCategoria}
                detalle={detalle}
              />
            );
          })}
      </div>
      {item && detalle && (
        <PaginationTabla
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={item.length}
          handlePageChange={handlePageChange}
          centrado={true}
        />
      )}
    </>
  );
};

export default Servicios;
