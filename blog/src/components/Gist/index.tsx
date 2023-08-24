import React from "react";
import Gist from "react-gist";

type GhGistProps = {
  id: string;
  file: string;
};

const GhGist = ({ id, file }: GhGistProps) => {
  return (
    <div>
      <Gist id={id} file={file} />
    </div>
  );
};

export default GhGist;
