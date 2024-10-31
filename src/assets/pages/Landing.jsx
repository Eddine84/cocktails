import React from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../../components/CocktailList";
import SearchForm from "../../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = axios(`${SEARCH_URL}${searchTerm}`);
      const data = await response;
      const drinks = data?.data?.drinks;
      return drinks;
    },
  };
};
// funOuter() =  funInner()
//1 loader est executé en premier avec premier affiche du component landing
//2 loader nest pas a lintieur de la fonction Landing donc je dois l'exporter vers la page app.jsx
//3 je linprte comme loader landing loader et je met comme valeur de la clé loader
//04 du coup useloader pourra etre utilis a linterieru de loader pour avoir la valeur

const SEARCH_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
//un loader peux avoir acceser a l'url du broser  avec request
// transofrmer url en objet clss url pour pourvoir utiliser quelque methodes
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search") || "all";
    //donc ici va verifier si c'est dans le cas si oui : contnuer et rien faire,
    //si non : behide the scene fetcher la data et la cacher
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    // const response = axios(`${SEARCH_URL}${searchTerm}`);
    // const data = await response;

    // automatiquement loader va retourner data si aucune erreir et render Lander si erreur behide the scene il va render error page et dans error page useErroe
    // const drinks = data?.data?.drinks;
    return { searchTerm };
  };

const Landing = () => {
  //ici a pres l'etape 3 la valeur de la fonction loader est diponile grace au hook useloaderdata donc avant le first render
  //du component
  const { searchTerm } = useLoaderData();
  //vu  ue ici elle exisre dans le cash il va juste recuperer et non faire unn fetch
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <div>
      <h1>lading</h1>

      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </div>
  );
};

export default Landing;
