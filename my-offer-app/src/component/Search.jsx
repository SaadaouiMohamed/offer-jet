import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {  useOfferList } from "../context/OfferContext";

import {
  TextField,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@mui/material";

export default function Search() {


  const {offerList, setOfferList} = useOfferList();

  const [inputs, setInputs] = useState({})


  const initialOfferList = useMemo(() => offerList, []);

  const createFilter = useCallback((name) => {
    return [...new Set(initialOfferList.map((offer) => offer[name]))];
  });

  const cities = createFilter("city");

  const experience = createFilter("experience_code");

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);

  //   const filledFilters = Object.fromEntries(
  //     [...formData.entries()].filter(([, v]) => !!v.trim())
  //   );


  //   const newData = initialOfferList.filter((offer) =>
  //     Object.entries(filledFilters).every(([k, v]) => {
  //       console.log([k,v])
  //       return k === "title"
  //         ? offer[k].toLowerCase().includes(v.toLowerCase())
  //         : offer[k] === v;
  //     })
   
  //   );
  //   setOfferList(newData);
  // };



  /******** real time search *********/

console.log('inputs',inputs)
const filtredInputs = Object.entries(inputs)

console.log(filtredInputs)

useEffect(() => {
  const newData = initialOfferList.filter((offer) =>
     filtredInputs.every(([k,v]) => {
      return k ==='title'
      ? offer[k].toLowerCase().includes(v.toLowerCase()) 
      : offer[k] === v
    })
    )
  return setOfferList(newData)
},[inputs])


  return (
    <div className="bg-[#36383d] shadow-xl w-[60%]">
      <h2>Search</h2>
      <Box className="w-[70%] mx-auto mt-7 text-center">
        <form >
          <TextField
            id="outlined-password-input"
            label="type and press enter"
            type="text"
            name="title"
            autoComplete="current-password"
            onChange={(e) => {setInputs({...inputs,title:e.target.value})}}
          />
          <Box className="border-t-[1px] mt-4 p-4">
            <FormLabel id="demo-radio-buttons-group-label">Location</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="city"
              className="text-[#e69743]"
              onChange={(e) => {setInputs({...inputs,city:e.target.value})}}
            >
              <FormControlLabel
                value=""
                control={<Radio />}
                label="All"
                className="text-[#a2a1a0]"
              />

              {cities.map((elem, i) => {
                return (
                  <FormControlLabel
                    value={elem}
                    control={<Radio />}
                    label={elem}
                    className="text-[#a2a1a0]"
                    key={i}
                  />
                );
              })}
            </RadioGroup>
          </Box>
          <Box className="border-t-[1px] mt-4 p-4">
            <FormLabel id="demo-radio-buttons-group-label">
              Experience Code
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              className="text-[#e69743]"
            >
              {experience.map((elem, i) => {
                return (
                  <FormControlLabel
                    value={elem}
                    control={<Radio />}
                    label={elem}
                    className="text-[#a2a1a0]"
                    name="experience_code"
                    key={i}
                    onChange={(e) => {setInputs({...inputs,experience_code:e.target.value})}}
                  />
                );
              })}
            </RadioGroup>
          </Box>
          <Box>
            <button type="submit" className="bg-[#db872d] px-3 py-2 mt-5">
              submit
            </button>
          </Box>
        </form>
        
      </Box>
    </div>
  );
}
