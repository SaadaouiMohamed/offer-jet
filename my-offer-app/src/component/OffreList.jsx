import axios from "axios";
import React, { useEffect, useState, useMemo} from "react";
import OfferItems from "./OfferItems";
import Search from "./Search";
import OfferContextProvider,{ OfferContext } from "../context/OfferContext";
import SearchWithHook from "./SearchWithHook";
import { Alert, Box, Fade, FormControlLabel, Switch } from "@mui/material";


export default function OffreList() {
  const [offerList, setOfferList] = useState(null);

  const [allOffers,setAllOffers] = useState(null)


 


  useEffect(() => {
    async function getOfferList() {
      axios
        .get("https://globaljetluxembourg.recruitee.com/api/offers")
        .then((res) => {
          // console.log(res)
          setOfferList(res.data.offers);
          setAllOffers(res.data.offers)
        });
    }
    getOfferList();
  }, []);

 
  if (!offerList || !allOffers) return null;

  const reset = () => {
    setOfferList(allOffers);
  };

  return (
    <OfferContextProvider value={{offerList,setOfferList}}>
    <div className="bg-[#323438] p-4 grid lg:grid-cols-2 lg:gap-2 sm:grid sm:grid-cols-1 sm:grid-flow-dense">
     <div className="lg:order-first order-last">

     <ul>
     <h2>JOBS</h2>
     {offerList.map((elem, i) => 
        (
         <li
           key={i}
           className="border-t-[1px] border-b-[1px] border-[#47484e] p-4"
         >
           <OfferItems item={elem} />
         </li>
       )
     )}
     {
         offerList.length ===0 && <Box>
         <Alert severity="info">No Results — check it out!</Alert>
         <button onClick={() => reset()} className="bg-red-700 px-3 py-2 mt-4 mx-auto table">
         Reset
       </button>
       </Box>
     }
   </ul>
     
     </div>
   {/*    <Search/> */}
     <SearchWithHook />
   
    </div>
    </OfferContextProvider>
  );
}
