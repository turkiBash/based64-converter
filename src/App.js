import { useState } from "react";
import { Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
// import { Textarea } from "@chakra-ui/textarea";
import { useClipboard } from "@chakra-ui/react";
import FileInfo from "./components/FileInfo";

const App = () => {
  const [files, setFiles] = useState([]);
  const { hasCopied, onCopy } = useClipboard(files);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    // console.log(e.target.files)
    const base64 = await convertToBase64(file);
    setFiles(base64);
  

    // console.log(base64)
  };

  const convertToBase64 = (files) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.onload = () => {
        // console.log("helooooooo " + fileReader.result)
        resolve(fileReader.result.substr(fileReader.result.indexOf(",") + 1));
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="90vh"
    >
      <Flex direction="row" justifyContent="center">
        <Input
          mr={2}
          type="file"
          multiple={true}
          onChange={(e) => {
            uploadFile(e);
          }}
        />
        {/* <Button mr={2} type="button" onClick={uploadFile}>
          Upload
        </Button>
        <Button mr={2} type="button">
          Convert
        </Button>
        <Button mr={2} type="reset">
          Clear
        </Button> */}
      </Flex>

      <FileInfo files={files} />

      <Button mt={2} onClick={onCopy}>
        {hasCopied ? "Copied" : "Copy"}
      </Button>
      <Button mt={2} type="reset" onClick={() => setFiles([])}>
        Reset
      </Button>
    </Flex>
  );
};

export default App;
