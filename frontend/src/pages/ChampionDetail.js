import React from "react";

export default function ChampionDetail({ version, champDetail }) {
  return (
    <div>
      <div>{version}</div>
      <pre>{champDetail}</pre>
    </div>
  );
}
