import axios from "axios";
import { Link, Navigate, redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../wrappers/CocktailPage.js";
import { useQuery } from "@tanstack/react-query";

const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const searchCocktailsQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const response = axios.get(`${singleCocktailUrl}${id}`);
      const data = await response;
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const id = params.id;
    await queryClient.ensureQueryData(searchCocktailsQuery(id));
    // if (!data.data.drinks) {
    //   return redirect("/");
    // }
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(searchCocktailsQuery(id));

  if (!data.data.drinks) {
    return <Navigate to="/" />;
  }
  const singleDrink = data?.data?.drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients = Object.keys(singleDrink).filter(
    (key) => key.startsWith("strIngredient") && singleDrink[key] !== null
  );

  // const engrediens = Object.key(singleDrink).filter(([key, value]) =>
  //   key.startsWith("strIngredient")
  // );

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>

          <p>
            <span className="drink-data">ingredients:</span>
            {validIngredients.map((ingredient, index) => {
              return (
                <span className="ing" key={index}>
                  {singleDrink[ingredient]}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">Instructions:</span>
            {instructions}
          </p>
        </div>
        {/* {engrediens.map((element) => {
          if (element[1] !== null) {
            return <p>{element[1]}</p>;
          }
        })} */}
      </div>
    </Wrapper>
  );
};
export default Cocktail;
