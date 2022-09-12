import React, { createContext, ReactNode, useContext } from "react";


type Offer = {
  experience_code: string;
  city: string;
  title: string
}

type ContextType = {
  offerList: Offer[];
  setOfferList: () => void;
  allOffers: Offer[];
  setAllOffers: () => void;
};

export const OfferContext = createContext<ContextType | null>(null);

const OfferContextProvider = ({
  value,
  children,
}: {
  value: ContextType;
  children: ReactNode;
}) => <OfferContext.Provider value={value}>{children}</OfferContext.Provider>;

export const useOfferList = () => {
  const value = useContext(OfferContext);

  if (value === null)
    throw new Error(
      "You must wrape your component inside <OfferContextProvider>"
    );

  return value;
};

export default OfferContextProvider;