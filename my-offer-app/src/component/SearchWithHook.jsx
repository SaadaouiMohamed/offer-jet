import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Slide,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect, useMemo, startTransition } from "react";
import { useForm } from "react-hook-form";
import { useOfferList } from "../context/OfferContext";

export default function SearchWithHook() {
  const { offerList, setOfferList } = useOfferList();

  const isMd = useMediaQuery("(min-width:1024px)");

  const [show, setShow] = useState(true);

  const handleChange = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    if (!isMd) {
      setShow(false);
    }
  }, [isMd]);

  const initialOfferList = useMemo(() => offerList, []);

  const { handleSubmit, register, watch } = useForm();

  const createFilter = (name) => {
    return [...new Set(initialOfferList.map((offer) => offer[name]))];
  };

  const cities = createFilter("city");
  const experience = createFilter("experience_code");

  /**************** real time search ****************/

  useEffect(() => {
    const subscription = watch((data) => {
      const filtredData = Object.entries(data).filter(([, v]) => Boolean(v));
      const newData = initialOfferList.filter((offer) =>
        filtredData.every(([k, v]) => {
          return k === "title"
            ? offer[k].toLowerCase().includes(v.toLowerCase())
            : offer[k] === v;
        })
      );
      startTransition(() => {
        setOfferList(newData);
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <div className="bg-[#36383d] shadow-xl lg:w-[60%] sm:w-full order-first lg:order-last ">
      <h2>Search</h2>

      {!isMd && <Button onClick={handleChange}>Handle</Button>}

      <Slide direction="up" in={show} unmountOnExit>
        <Box className="w-[70%] mx-auto mt-7 ">
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{
                "& input, & label": {
                  color: "#a2a1a0",
                },
                "& fieldset": {
                  borderColor: "#bd9973",
                },
              }}
              id="outlined-password-input"
              label="type and press enter"
              type="text"
              autoComplete="current-password"
              {...register("title")}
            />
            <Box className="border-t-[1px] mt-4 p-4">
              <FormLabel
                id="demo-radio-buttons-group-label"
                className="text-[#bd9973]"
              >
                Location
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                className="text-[#e69743]"
              >
                <FormControlLabel
                  value=""
                  control={<Radio />}
                  label="All"
                  className="text-[#a2a1a0]"
                  {...register("city")}
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
          </form>
        </Box>
      </Slide>
    </div>
  );
}
