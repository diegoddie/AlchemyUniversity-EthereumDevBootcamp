import React from "react";
import { CurrentBlock } from "./CurrentBlock";
import { LatestBlocks } from "./LatestBlocks";

function Home({ alchemy }) {
    return (
      <div>
        <CurrentBlock alchemy={alchemy} />
        <LatestBlocks alchemy={alchemy} />
      </div>
    );
}

export default Home;