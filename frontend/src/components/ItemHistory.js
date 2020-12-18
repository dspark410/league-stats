import React, { useState, useEffect } from "react";
import style from "./itemhistory.module.css";
import Tooltip from "./Tooltip";
import axios from "axios";
import Loader from "./Loader";

export default function ItemHistory({ details, version }) {
  const [items, setItems] = useState();
  const [versionState, setVersionState] = useState();
  const [loading, setLoading] = useState(true);

  // Store version into state and stop loading until new version of the item JSON is ready
  useEffect(() => {
    setLoading(true);
    // Performance improvement maybe?
    // Checks if version is different, if so make the call with the new version
    // If version is the same, prevents a call for the same information
    if (version !== versionState) {
      setVersionState(version);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  useEffect(() => {
    // Retrieve item list from Riot API
    if (versionState) {
      axios
        .get(
          `https://ddragon.leagueoflegends.com/cdn/${versionState}.1/data/en_US/item.json`
        )
        .then((res) => {
          setItems(res.data.data);
          // When everything is ready set loading to false to render screen
          setLoading(false);
        });
    }
    // With dependency, this call should only be made if new version
    // is different from previous version
  }, [versionState]);

  return (
    <>
      {!loading && versionState === version && items ? (
        <>
          <div className={style.itemRow1}>
            {details.item0 ? (
              <Tooltip
                name={items[details.item0].name}
                info={items[details.item0].description}
                moreInfo={`Cost: ${items[details.item0].gold.total} (${
                  items[details.item0].gold.base
                })`}
              >
                <img
                  alt="item"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item0}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}

            {details.item1 ? (
              <Tooltip
                name={items[details.item1].name}
                info={items[details.item1].description}
                moreInfo={`Cost: ${items[details.item1].gold.total} (${
                  items[details.item1].gold.base
                })`}
              >
                <img
                  alt="item"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item1}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}

            {details.item2 ? (
              <Tooltip
                name={items[details.item2].name}
                info={items[details.item2].description}
                moreInfo={`Cost: ${items[details.item2].gold.total} (${
                  items[details.item2].gold.base
                })`}
              >
                <img
                  alt="item"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item2}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}

            {details.item6 ? (
              <Tooltip
                name={items[details.item6].name}
                info={items[details.item6].description}
              >
                <img
                  alt="item"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item6}.png`}
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
            {details.item3 ? (
              <Tooltip
                name={items[details.item3].name}
                info={items[details.item3].description}
                moreInfo={`Cost: ${items[details.item3].gold.total} (${
                  items[details.item3].gold.base
                })`}
              >
                <img
                  alt="item"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item3}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
            {details.item4 ? (
              <Tooltip
                name={items[details.item4].name}
                info={items[details.item4].description}
                moreInfo={`Cost: ${items[details.item4].gold.total} (${
                  items[details.item4].gold.base
                })`}
              >
                <img
                  alt="item"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item4}.png`}
                />
              </Tooltip>
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
            {details.item5 ? (
              <Tooltip
                name={items[details.item5].name}
                info={items[details.item5].description}
                moreInfo={`Cost: ${items[details.item5].gold.total} (${
                  items[details.item5].gold.base
                })`}
              >
                <img
                  alt="item"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item5}.png`}
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
      ) : (
        <Loader />
      )}
    </>
  );
}
