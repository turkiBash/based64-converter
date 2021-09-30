import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import SelectedFiles from './SelectedFiles';

const FileInput = () => {

    let file = {
        "file-name": "",
        "file-type": ""
    }

  const [files, setFiles] = useState([]);

  const uploadHandler = (e) => {
    setFiles(e.target.value);
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      height="80vh"
      alignItems="center"
    >
      <Flex direction="row" justifyContent="center">
        <Input type="file" multiple={true} onChange={files} />
        <Button ml={2} type="submit" onClick={uploadHandler}>
          Upload
        </Button>
        <Button ml={2} type="reset" onClick={() => setFiles([''])}>
          Clear
        </Button>
      </Flex>
        <SelectedFiles/>
    </Flex>
  );
};

export default FileInput;
