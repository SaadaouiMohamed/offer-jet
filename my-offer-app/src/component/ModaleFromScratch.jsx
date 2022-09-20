import React, { Fragment, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function ModaleFromScratch({ open, setOpen, item }) {
  const handleClose = () => setOpen((open) => !open);

  const modal = useRef(null);

  const btn = document.querySelector("#showBtn");

  useEffect(() => {
    function handler(e) {
      const el = modal.current;

      if (!el.contains(e.target)) {
        handleClose();
      }
    }

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [modal]);

  if (!open) return null;

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className="modal" ref={modal}>
          <h1>{item.title}</h1>
          <p>
            {item.city} | {item.employment_type_code}
          </p>
          <p>{item.translations.en.sharing_description}</p>
          <button className="closeModale" onClick={() => handleClose()}>
            <i className="fa-regular fa-xmark xmark"></i>
          </button>
        </div>,
        document.body
      )}
    </Fragment>
  );
}
