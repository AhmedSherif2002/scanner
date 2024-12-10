import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { scan } from "./functions";

function App() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState([]);
  const [errors, setErrors] = useState([]);

  const fileSelectHandle = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const scanHandle = (e) => {
    // console.log(file);
    // console.log("scanning");
    window.api.send("toMain", file.path);
    let code = "";
    window.api.receive("fromMain", (code) => {
      // console.log(`Received ${code} from main process`);
      // code = data;
      // console.log("c", code);
      const { errors, tokens } = scan(code);
      // console.log(errors, tokens);
      if (errors.length !== 0) {
        setErrors(errors);
        return;
      }
      setErrors([]);
      setOutput((prevTokens) => {
        let newTokens = tokens;
        return newTokens;
      });

      // console.log(tokens);
    });
  };

  useEffect(() => {
    // Called when message received from main process
    window.api.receive("fromMain", (data) => {
      // console.log(`Received ${data} from main process`);
    });

    // Send a message to the main process
    // window.api.send("toMain", 1);
    // console.log(window.api);
  }, []);

  return (
    <>
      <div className="w-full m-auto py-12 flex flex-col items-center gap-8">
        <div className="addFile w-1/3 m-auto flex flex-col">
          <label
            htmlFor="file"
            className="bg-green-500 text-white text-2xl font-semibold rounded-lg text-center cursor-pointer py-10"
          >
            Choose File
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={fileSelectHandle}
          />
          <span
            className={`text-center ${file === null ? "hidden" : "visible"}`}
          >
            Selected file: <span className="text-green-600">{file?.name}</span>
          </span>
        </div>
        <button
          className="font-bold bg-gray-200 w-fit text-green-700 hover:bg-gray-100 duration-500 text-xl px-4 py-2 rounded-md"
          onClick={scanHandle}
        >
          Submit
        </button>
        <div
          className={`tokens-result w-1/3 ${
            errors.length !== 0 || output.length === 0 ? "hidden" : "visible"
          }`}
        >
          <div className="flex flex-row font-semibold bg-green-700 text-white">
            <div className="w-1/2 p-2 ">Value</div>
            <div className="w-1/2 p-2 ">Type</div>
          </div>
          <div className="overflow-auto" style={{ maxHeight: "400px" }}>
            {output.map((output, index) => (
              <div
                key={index}
                className="flex flex-row font-semibold bg-gray-100 border-b-2"
              >
                <div className="w-1/2 p-2 ">{output.value}</div>
                <div className="w-1/2 p-2 ">{output.type}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`error ${
            errors.length === 0 ? "hidden" : "visible"
          } bg-red-400 w-1/3 rounded-lg p-2 text-white`}
        >
          <div className="font-semibold">Error:</div>
          {errors.map((error, index) => (
            <p key={index} className="">
              {error.type}
              <span className="font-semibold">{error.string}</span>
            </p>
          ))}
        </div>
        <button
          onClick={() => window.location.reload()}
          className={`${
            file === null ? "hidden" : "visible"
          } bg-green-400 px-4 py-2 text-2xl font-semibold text-white rounded-lg`}
        >
          &#10227;
        </button>
      </div>
    </>
  );
}

export default App;
