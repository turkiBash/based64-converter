import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
// import { Textarea } from "@chakra-ui/textarea";
import { useClipboard } from "@chakra-ui/react";
import FileInfo from "./components/FileInfo";
import axios from "axios";

const App = () => {
  const [files, setFiles] = useState([]);
  const [txnId, setTxnId] = useState("");
  const [sessionId, setSessionId] = useState("");
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

  useEffect(() => {
    const postData = async () => {
      const response = await axios.post(
        "http://10.0.73.37/vksession/rest/session",
        {
          username: "vk_user",
          domain_id: "201",
          password: "123",
        }
      );

      const result = response.data;
      const SESSION_ID = result.session_id;

      console.log("session " + SESSION_ID);
      setSessionId(SESSION_ID);
      // console.log(sessionId + " hhhhhhhhhhhhhhh")

      const response2 = await axios.get(
        `http://10.0.73.80/backend-adapter-speech-pro/api/voice/sample/txn/v1?session-id=${SESSION_ID}&voice-ops=E`
      );
      // console.log(response2.data);
      const txn = response2.data;
      console.log("txn " + txn);
      setTxnId(txn);
    };
    postData();
  }, []);

  const sendVoiceHandler = () => {
    let data = {
      data: files
    }
    let myHeaders = {
      headers: {
        "X-Session-Id": sessionId,
        "X-Transaction-Id": txnId,
      }
    };
    axios
      .put("http://10.0.73.37/vkagent/rest/v2/transaction/sample",data, myHeaders)
      .then((response) => {
        console.log("ffffffff" + response);
      });
    // console.log(response3)
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

      <Button mt={2} onClick={sendVoiceHandler}>
        Send Voice
      </Button>
    </Flex>
  );
};

export default App;
