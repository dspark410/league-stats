import React, { useState, useEffect } from "react";
import style from "./itemhistory.module.css";
import Tooltip from "./Tooltip";
import axios from "axios";
import Loader from "./Loader";

export default function ItemHistory({ details, version }) {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve item list from Riot API
    if (version !== "") {
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${version}.1/data/en_US/item.json`
        )
        .then((res) => {
          setItems(res.data.data);
          setLoading(false);
        });
    }
  }, [version]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item0}.png`}
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
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item1}.png`}
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
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item2}.png`}
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
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item6}.png`}
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
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item3}.png`}
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
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item4}.png`}
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
                  src={`http://ddragon.leagueoflegends.com/cdn/${version}.1/img/item/${details.item5}.png`}
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
