import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useOfferList } from "../context/OfferContext";

export default function SearchWithHook() {
  const { offerList, setOfferList } = useOfferList();

  const initialOfferList = useMemo(() => offerList, []);

  const { handleSubmit, register, watch } = useForm();

  
console.log(watch())


  const createFilter = (name) => {
    return [...new Set(initialOfferList.map((offer) => offer[name]))];
  };

  const cities = createFilter("city");
  const experience = createFilter("experience_code");

  //const onSubmit = (data) => {
    // const filtredData = Object.entries(data).filter(([,v]) => Boolean(v))
    
    // const newData = initialOfferList.filter((offer) => 
    // filtredData.every(([k,v]) => {
    //     console.log([k,v])
    //    return k === "title"
    //    ? offer[k].toLowerCase().includes(v.toLowerCase())
    //    : offer[k] === v
    //   })
    // );
    // console.log('new',newData)
    // setOfferList(newData)
   
 // };


  /**************** real time search ****************/

  const filtredInputs = Object.entries(watch()).filter(([,v]) => v === null 
  ? !!(v)
  : !!(v.trim())
  )
  console.log(filtredInputs)
useEffect(() => {
  const newData = initialOfferList.filter((offer) => 
  filtredInputs.every(([k,v]) => {
    return k === 'title'
    ? offer[k].toLowerCase().includes(v.toLowerCase())
    : offer[k] === v
  })
  )
  return setOfferList(newData)
},[watch])

  
  return (
    <div className="bg-[#36383d] shadow-xl w-[60%]">
      <h2>Search</h2>
      <Box className="w-[70%] mx-auto mt-7 text-center">
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-password-input"
            label="type and press enter"
            type="text"
            autoComplete="current-password"
            {...register("title")}
          />
          <Box className="border-t-[1px] mt-4 p-4">
            <FormLabel id="demo-radio-buttons-group-label">Location</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              className="text-[#e69743]"
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
                    {...register("city")}
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
                    key={i}
                    {...register("experience_code")}
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
