import { Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";

const FileInfo = ({ files }) => {
  return (
    <Flex direction="row" justifyContent="center">
      <Flex direction="column" justifyContent="center">
            {files ? <Textarea value={files} mt={3} height="lg" width="xl">
            </Textarea> : ""}
      </Flex>
    </Flex>
  );
};

export default FileInfo;
