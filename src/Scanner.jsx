import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { scan } from "./functions";
import Tree from "./tree/Tree";
import program from "./ParserChecker/program";
import { Link, useNavigate } from "react-router-dom";

function Scanner() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [useText, setUseText] = useState(false);
  const [output, setOutput] = useState([]);
  const [errors, setErrors] = useState([]);
  const [tree, setTree] = useState("tree");
  const [errorParsing, setErrorParsing] = useState("");
  const [inputError, setInputError] = useState(null);

  const handleSelectText = () => {
    setUseText((useText) => !useText);
    setTextInput("");
  };

  const parseHandle = () => {
    if (useText) {
      // Step 1: Split the input text into lines and process each line
      let inputLines = textInput.trim().split("\n");

      let inputOutput = inputLines.map((line) => {
        // Step 2: Split each line by the comma delimiter
        let [token, type] = line.split(",").map((str) => str.trim());

        // Step 3: Check if the token exists in the preserved object and create the output object
        return {
          value: token,
          type: type,
        };
      });

      const parsingValid = program(inputOutput, { index: 0 });
      setErrorParsing(parsingValid);

      if (parsingValid == "success") {
        setOutput(inputOutput);
        navigate("/parser", { state: { output: inputOutput } });
        return;
      }
      setOutput([]);
    } else {
      window.api.send("toMain", file.path);
      let code = "";
      window.api.receive("fromMain", (code) => {
        let inputLines = code.trim().split("\n");

        let inputOutput = inputLines.map((line) => {
          let [token, type] = line.split(",").map((str) => str.trim());

          return {
            value: token,
            type: type,
          };
        });

        const parsingValid = program(inputOutput, { index: 0 });

        setErrorParsing(parsingValid);

        if (parsingValid == "success") {
          setOutput(inputOutput);
          navigate("/parser", { state: { output: inputOutput } });
          return;
        }
        setOutput([]);
      });
    }
  };

  const handleTextInput = (e) => {
    setTextInput(e.target.value);
  };

  const fileSelectHandle = (e) => {
    setFile(e.target.files[0]);
  };
  const scanHandle = (e) => {
    if (useText) {
      let code = textInput;
      if(textInput.length === 0){
        setInputError("text");
        return;
      }
      const { errors, tokens, parsingAvailable } = scan(code);
      setErrorParsing(parsingAvailable);

      if (errors.length !== 0) {
        setErrors(errors);
        return;
      }
      setErrors([]);
      setOutput((prevTokens) => {
        let newTokens = tokens;
        return newTokens;
      });
    } else {
      if(!file){
        setInputError("file");
        return;
      }
      window.api.send("toMain", file.path);
      let code = "";
      window.api.receive("fromMain", (code) => {
        // code = data;
        const { errors, tokens, parsingAvailable } = scan(code);
        setErrorParsing(parsingAvailable);
        if (errors.length !== 0) {
          setErrors(errors);
          return;
        }
        setErrors([]);
        setOutput((prevTokens) => {
          let newTokens = tokens;
          return newTokens;
        });
      });
    }
  };

  return (
    <>
      <div className="w-full m-auto py-12 flex flex-col items-center gap-8">
        <div className="addFile w-2/3 m-auto flex flex-col">
          <label
            htmlFor="file"
            className={`w-1/3 m-auto  text-white text-xl font-semibold rounded-lg text-center cursor-pointer py-2 ${
              useText ? "bg-green-200" : "bg-green-500"
            }`}
          >
            Choose File
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden "
            onChange={fileSelectHandle}
            disabled={useText}
          />
          <span
            className={`text-center ${file === null ? "hidden" : "visible"}`}
          >
            Selected file: <span className="text-green-600">{file?.name}</span>
          </span>
          <label
            htmlFor="text"
            className="bg-green-500 text-white text-xl font-semibold rounded-lg text-center cursor-pointer py-2 mt-5 w-1/3 m-auto"
            onClick={handleSelectText}
          >
            {`Text Input ${useText ? "\u2193" : "\u2191"}`}
          </label>
          {useText && (
            <textarea
              id="text"
              name="text"
              rows="10"
              cols="60"
              placeholder="Enter your code here"
              className=" focus-visible:outline-green-500
            w-full border-2 p-5 rounded resize-none focus:animation-typewriter "
              value={textInput}
              onChange={handleTextInput}
            ></textarea>
          )}
        </div>
        <div className="flex gap-56">
          <button
            className={`font-bold bg-gray-200 w-fit ${
              !textInput && !file ? "text-stone-500" : "text-green-700"
            } hover:bg-gray-100 duration-500 text-xl px-4 py-2 rounded-md`}
            onClick={scanHandle}
            // disabled={!textInput && !file}
          >
            Scan
          </button>

          {output.length == 0 && (
            <button
              className={`font-bold bg-gray-200 w-fit ${
                !textInput && !file ? "text-stone-500" : "text-green-700"
              } hover:bg-gray-100 duration-500 text-xl px-4 py-2 rounded-md`}
              onClick={parseHandle}
              disabled={!textInput && !file}
            >
              Parse
            </button>
          )}
        </div>

        <div className={`input-error ${!inputError?"hidden":"visible"}`}>
          <p className="text-red-400">{inputError === "file"?"Choose a valid file":"Enter valid input"}</p>
        </div>

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
            file === null && !textInput ? "hidden" : "visible"
          } bg-green-400 px-4 py-2 text-2xl font-semibold text-white rounded-lg`}
        >
          &#10227;
        </button>
        {errorParsing == "" || errorParsing == "success" ? (
          <Link
            className={`${
              output.length === 0 ? "hidden" : ""
            } bg-slate-300 p-2 rounded-md font-semibold text-xl`}
            to={"/parser"}
            state={{ output: output }}
          >
            Parse
          </Link>
        ) : (
          <span
            className={`error ${
              errorParsing != "success" ? "visible" : "hidden"
            } bg-red-400 w-1/3 rounded-lg p-2 text-white`}
          >
            {`"Syntax Error" ${errorParsing}`}
          </span>
        )}
      </div>
    </>
  );
}

export default Scanner;
