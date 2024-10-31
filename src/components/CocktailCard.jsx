import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailCard.js";

const CocktailCard = ({
  idDrink,
  strDrink,
  strDrinkThumb,
  strAlcoholic,
  strGlass,
}) => {
  return (
    <Wrapper>
      <div className="img-container">
        <img src={strDrinkThumb} alt={strDrink} className="img" />
      </div>
      <div className="footer">
        <h4>{strDrink}</h4>
        <h5>{strGlass}</h5>
        <p>{strAlcoholic}</p>
        <Link to={`/cocktail/${idDrink}`} className="btn">
          details
        </Link>
      </div>
    </Wrapper>
  );
};
export default CocktailCard;
