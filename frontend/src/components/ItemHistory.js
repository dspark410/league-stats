import React, { useState, useEffect } from "react";
import style from "./itemhistory.module.css";
import Tooltip from "./Tooltip";
import axios from "axios";
import Loader from "./Loader";

export default function ItemHistory({ details, version }) {
  const [items, setItems] = useState();
  const [versionState, setVersionState] = useState();
  const [stateDetails, setStateDetails] = useState();

  useEffect(() => {
    // Retrieve item list from Riot API
    setVersionState(version);
    if (versionState) {
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${versionState}.1/data/en_US/item.json`
        )
        .then((res) => {
          console.log("version", versionState);

          //setItems(Object.values(res.data.data))
          setItems(res.data.data);
          setStateDetails(details);
        });
    }
  }, [version]);

  return (
    <>
      {!stateDetails ? (
        <Loader />
      ) : (
        <>
          <div className={style.itemRow1}>
            {stateDetails.item0 ? (
              <Tooltip
                name={items[stateDetails.item0].name}
                info={items[stateDetails.item0].description}
                moreInfo={`Cost: ${items[stateDetails.item0].gold.total} (${
                  items[stateDetails.item0].gold.base
                })`}
                // name={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item0 &&
                //       item.name
                //   )
                //   .map((item) => item.name)}
                // info={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item0 &&
                //       item.name
                //   )
                //   .map((item) => item.description)}
                // moreInfo={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item0 &&
                //       item.name
                //   )
                //   .map(
                //     (item) => `Cost: ${item.gold.total} (${item.gold.base})`
                //   )}
              >
                <img
                  alt="item"
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item0}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}

            {stateDetails.item1 ? (
              <Tooltip
                name={items[stateDetails.item1].name}
                info={items[stateDetails.item1].description}
                moreInfo={`Cost: ${items[stateDetails.item1].gold.total} (${
                  items[stateDetails.item1].gold.base
                })`}
                // name={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item1 &&
                //       item.name
                //   )
                //   .map((item) => item.name)}
                // info={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item1 &&
                //       item.name
                //   )
                //   .map((item) => item.description)}
                // moreInfo={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item1 &&
                //       item.name
                //   )
                //   .map(
                //     (item) => `Cost: ${item.gold.total} (${item.gold.base})`
                //   )}
              >
                <img
                  alt="item"
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item1}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}

            {stateDetails.item2 ? (
              <Tooltip
                name={items[stateDetails.item2].name}
                info={items[stateDetails.item2].description}
                moreInfo={`Cost: ${items[stateDetails.item2].gold.total} (${
                  items[stateDetails.item2].gold.base
                })`}
                // name={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item2 &&
                //       item.name
                //   )
                //   .map((item) => item.name)}
                // info={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item2 &&
                //       item.name
                //   )
                //   .map((item) => item.description)}
                // moreInfo={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item2 &&
                //       item.name
                //   )
                //   .map(
                //     (item) => `Cost: ${item.gold.total} (${item.gold.base})`
                //   )}
              >
                <img
                  alt="item"
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item2}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}

            {stateDetails.item6 ? (
              <Tooltip
                name={items[stateDetails.item6].name}
                info={items[stateDetails.item6].description}
                // name={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item6 &&
                //       item.name
                //   )
                //   .map((item) => item.name)}
                // info={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item6 &&
                //       item.name
                //   )
                //   .map((item) => item.description)}
              >
                <img
                  alt="item"
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item6}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
          </div>
          <div className={style.itemRow2}>
            {stateDetails.item3 ? (
              <Tooltip
                name={items[stateDetails.item3].name}
                info={items[stateDetails.item3].description}
                moreInfo={`Cost: ${items[stateDetails.item3].gold.total} (${
                  items[stateDetails.item3].gold.base
                })`}
                // name={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item3 &&
                //       item.name
                //   )
                //   .map((item) => item.name)}
                // info={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item3 &&
                //       item.name
                //   )
                //   .map((item) => item.description)}
                // moreInfo={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item3 &&
                //       item.name
                //   )
                //   .map(
                //     (item) => `Cost: ${item.gold.total} (${item.gold.base})`
                //   )}
              >
                <img
                  alt="item"
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item3}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
            {stateDetails.item4 ? (
              <Tooltip
                name={items[stateDetails.item4].name}
                info={items[stateDetails.item4].description}
                moreInfo={`Cost: ${items[stateDetails.item4].gold.total} (${
                  items[stateDetails.item4].gold.base
                })`}
                // name={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item4 &&
                //       item.name
                //   )
                //   .map((item) => item.name)}
                // info={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item4 &&
                //       item.name
                //   )
                //   .map((item) => item.description)}
                // moreInfo={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item4 &&
                //       item.name
                //   )
                //   .map(
                //     (item) => `Cost: ${item.gold.total} (${item.gold.base})`
                //   )}
              >
                <img
                  alt="item"
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item4}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
            {stateDetails.item5 ? (
              <Tooltip
                name={items[stateDetails.item5].name}
                info={items[stateDetails.item5].description}
                moreInfo={`Cost: ${items[stateDetails.item5].gold.total} (${
                  items[stateDetails.item5].gold.base
                })`}
                // name={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item5 &&
                //       item.name
                //   )
                //   .map((item) => item.name)}
                // info={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item5 &&
                //       item.name
                //   )
                //   .map((item) => item.description)}
                // moreInfo={items
                //   .filter(
                //     (item) =>
                //       +item.image.full.split('.')[0] === details.item5 &&
                //       item.name
                //   )
                //   .map(
                //     (item) => `Cost: ${item.gold.total} (${item.gold.base})`
                //   )}
              >
                <img
                  alt="item"
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${stateDetails.item5}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
