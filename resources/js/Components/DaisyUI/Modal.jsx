import React from "react";

export default function Modal(props) {


  return (
    <>
      <dialog id={props.id} className="modal" >
        <div className={`modal-box ${props.className}`}>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 closeBtn"
              onClick={props.closeModal}>✕</button>
          </form>
          <h3 className="font-bold text-lg">{props.title}</h3>
          {/* <p className={ `py-4 ${ props.descColor }` } >{ props.description }</p> */}
          {props.children}
        </div>
      </dialog>
    </>
  )
}
