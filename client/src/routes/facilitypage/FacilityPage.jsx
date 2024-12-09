import "./facilitypage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function FacilityPage() {
  const data = useLoaderData();

  return (
    <div className="FacilityPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<div>Loading...</div>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading data!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((data) => (
                  <Card key={data.id} item={data} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading data!</p>}
          >
            {(postResponse) => (
              <Map items={postResponse.data} center={[14.078175, 121.150709]} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default FacilityPage;
