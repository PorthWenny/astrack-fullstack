import Card from "../card/Card";
import "./favorites.scss";
import { facilData } from "../../lib/demodata";

function Favorites() {
  const data = facilData;
  return (
    <div className=" Favorites">
      {data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Favorites;
