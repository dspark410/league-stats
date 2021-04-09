import React, { useState, useEffect } from "react";
import style from "./itemhistory.module.css";
import Tooltip from "./Tooltip";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
export default function ItemHistory({ details, version }) {
  const [items, setItems] = useState();
  const [versionState, setVersionState] = useState();
  const [loading, setLoading] = useState(true);

  let source = axios.CancelToken.source();
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
          `http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json`,
          { cancelToken: source.token }
        )
        .then((res) => {
          setItems(res.data);
          // When everything is ready set loading to false to render screen
          setLoading(false);
        });
    }

    return () => {
      source.cancel("itemhistory component got unmounted");
    };
    // With dependency, this call should only be made if new version
    // is different from previous version

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versionState]);

  return (
    <SkeletonTheme duration={3} color="#7a6b83" highlightColor="#e2c0f7">
      {!loading && versionState === version && items ? (
        <>
          <div className={style.itemRow1}>
            {details.item0 ? (
              items
                .filter((i) => i.id === details.item0)
                .map((item) => (
                  <Tooltip
                    name={item.id > 7000 ? item.name.split("%")[2] : item.name}
                    info={item.description}
                    moreInfo={`Cost: ${item.priceTotal} (${item.price})`}
                  >
                    <img
                      alt={item.id > 7000 ? item.name.split("%")[2] : item.name}
                      src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                        .split("/")[6]
                        .toLowerCase()}`}
                    />
                  </Tooltip>
                ))
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}

            {details.item1 ? (
              items
                .filter((i) => i.id === details.item1)
                .map((item) => (
                  <Tooltip
                    name={item.id > 7000 ? item.name.split("%")[2] : item.name}
                    info={item.description}
                    moreInfo={`Cost: ${item.priceTotal} (${item.price})`}
                  >
                    <img
                      alt={item.id > 7000 ? item.name.split("%")[2] : item.name}
                      src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                        .split("/")[6]
                        .toLowerCase()}`}
                    />
                  </Tooltip>
                ))
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}

            {details.item2 ? (
              items
                .filter((i) => i.id === details.item2)
                .map((item) => (
                  <Tooltip
                    name={item.id > 7000 ? item.name.split("%")[2] : item.name}
                    info={item.description}
                    moreInfo={`Cost: ${item.priceTotal} (${item.price})`}
                  >
                    <img
                      alt={item.id > 7000 ? item.name.split("%")[2] : item.name}
                      src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                        .split("/")[6]
                        .toLowerCase()}`}
                    />
                  </Tooltip>
                ))
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}

            {details.item6 ? (
              items
                .filter((i) => i.id === details.item6)
                .map((item) => (
                  <Tooltip name={item.name} info={item.description}>
                    <img
                      alt={item.id > 7000 ? item.name.split("%")[2] : item.name}
                      src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                        .split("/")[6]
                        .toLowerCase()}`}
                    />
                  </Tooltip>
                ))
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
          </div>
          <div className={style.itemRow2}>
            {details.item3 ? (
              items
                .filter((i) => i.id === details.item3)
                .map((item) => (
                  <Tooltip
                    name={item.id > 7000 ? item.name.split("%")[2] : item.name}
                    info={item.description}
                    moreInfo={`Cost: ${item.priceTotal} (${item.price})`}
                  >
                    <img
                      alt={item.id > 7000 ? item.name.split("%")[2] : item.name}
                      src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                        .split("/")[6]
                        .toLowerCase()}`}
                    />
                  </Tooltip>
                ))
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
            {details.item4 ? (
              items
                .filter((i) => i.id === details.item4)
                .map((item) => (
                  <Tooltip
                    name={item.id > 7000 ? item.name.split("%")[2] : item.name}
                    info={item.description}
                    moreInfo={`Cost: ${item.priceTotal} (${item.price})`}
                  >
                    <img
                      alt={item.id > 7000 ? item.name.split("%")[2] : item.name}
                      src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                        .split("/")[6]
                        .toLowerCase()}`}
                    />
                  </Tooltip>
                ))
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
            {details.item5 ? (
              items
                .filter((i) => i.id === details.item5)
                .map((item) => (
                  <Tooltip
                    name={item.id > 7000 ? item.name.split("%")[2] : item.name}
                    info={item.description}
                    moreInfo={`Cost: ${item.priceTotal} (${item.price})`}
                  >
                    <img
                      alt={item.id > 7000 ? item.name.split("%")[2] : item.name}
                      src={`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${item.iconPath
                        .split("/")[6]
                        .toLowerCase()}`}
                    />
                  </Tooltip>
                ))
            ) : (
              <img
                alt="item"
                src={process.env.PUBLIC_URL + "/images/emptyitem.png"}
              />
            )}
          </div>
        </>
      ) : (
        <div>
          <div>
            <Skeleton
              style={{ margin: "2px" }}
              count={4}
              width={30}
              height={30}
            />
          </div>
          <div>
            <Skeleton
              style={{ margin: "2px" }}
              count={3}
              width={30}
              height={30}
            />
          </div>
        </div>
      )}
    </SkeletonTheme>
  );
}
