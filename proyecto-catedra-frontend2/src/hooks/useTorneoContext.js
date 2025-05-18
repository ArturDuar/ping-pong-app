import { useContext } from "react";
import { TorneoContext } from "../contexts/TorneoContext";

export const useTorneoContext = () => useContext(TorneoContext);
