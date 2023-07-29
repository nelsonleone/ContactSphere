import { countryDataObj } from "../../vite-env";

export default async function fetchCountriesNameListData(){
   const res = await fetch("https://restcountries.com/v3.1/all?fields=name")
   const resData: countryDataObj[] = await res.json()
   const sortedData = resData.sort((a,b) => (
      a.name.common.localeCompare(b.name.common)
   ))

   return sortedData;
}