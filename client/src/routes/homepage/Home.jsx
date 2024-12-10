import "./home.scss";
import SearchBar from "../../components/searchbar/SearchBar";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="Home">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find your way around campus, Bravehearts!</h1>
          <p>
            {" "}
            The home of the bravehearts might be bigger than it looks, but don't
            worry — We've got you covered. With ASTRACK, finding your way around
            campus has never been easier or more convenient. Your journey to
            greatness starts here.
            <br />
            <br />
            Use the search bar below to find a facility you might need!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>24</h1>
              <h2>Years of Excellence</h2>
            </div>
            <div className="box">
              <h1>18+</h1>
              <h2>Facilities available</h2>
            </div>
            <div className="box">
              <h1>5</h1>
              <h2>Events planned</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="bg" />
      </div>
    </div>
  );
}

export default Home;
