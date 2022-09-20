import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DiscreptionModal from "./DiscreptionModal";
import ModaleFromScratch from "./ModaleFromScratch";
export default function OfferItems(props) {
  dayjs.extend(relativeTime);

  const [open, setOpen] = useState(false);

  const handleShow = () => setOpen(true);

  return (
    <div id="offerItem">
      <p id="title">{props.item.title}</p>
      <div className="lg:grid lg:grid-cols-4 lg:gap-3 sm:grid-cols-1 sm:gap-4">
        <div>
          <p>{props.item.company_name}</p>
        </div>
        <div>
          <i className="fa-sharp fa-solid fa-location-dot"></i>
          <p>{props.item.city}</p>
        </div>
        <div>
          <i className="fa-sharp fa-solid fa-clock"></i>
          <p>{props.item.employment_type_code}</p>
        </div>
        <div>
          <i className="fa-sharp fa-solid fa-calendar"></i>
          <p>{dayjs(props.item.published_at).fromNow()}</p>
        </div>
      </div>
      <i className="fa-solid fa-circle-arrow-right"></i>
      <button onClick={() =>handleShow()} className="text-[#b7906a]" id="showBtn">
        MORE DTAILS
      </button>
      {/*<DiscreptionModal open={open} setOpen={setOpen} item={props.item} />*/}
  <ModaleFromScratch open = {open} setOpen ={setOpen} item = {props.item}/>
    </div>
  );
}
