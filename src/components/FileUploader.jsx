import { useState, useRef } from "react";
import "./styles/FileUploaderStyles.css";

const FileUploader = () => {
    const displayText = useRef("");
    const searchedText = useRef("");
    const [totalOccurences, setTotalOccurences] = useState(0);
    const [totalWords, setTotalWords] = useState(0);

    // reading from the selected file
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            displayText.current.textContent = content;
            // setting up the count of total words
            setTotalWords(content.split(" ").length);
        };
        reader.readAsText(file);
    };

    const handleSearch = () => {
        const string_to_search = searchedText.current.value;
        let regExp = new RegExp(string_to_search, "gi");
        if (displayText.current.textContent.length > 0) {
            // if file text is not empty
            if (string_to_search == "") {
                // if the searched text is empty

                // removing the previous highlighted words & updating the innerHTML
                displayText.current.innerHTML = displayText.current.textContent.replace(
                    regExp,
                    "$&"
                );
                setTotalOccurences(0);
            } else {
                // replacing the searched text with the highlighted text
                displayText.current.innerHTML = displayText.current.textContent.replace(
                    regExp,
                    "<mark>$&</mark>"
                );
                const highlightedText = displayText.current.querySelectorAll("mark");
                setTotalOccurences(highlightedText.length);
            }
        } else {
            alert("Either your file is empty or you are trying to search without a file");
            searchedText.current.value = "";
        }
    };

    return (
        <div className="container">
            <div className="file-container">
                <input type="file" onChange={handleFileChange} />
                <div className="text-space">
                    <p ref={displayText}></p>
                </div>
            </div>

            <div className="searchInputs">
                <input
                    className="searchInputBox"
                    type="text"
                    placeholder=" Type the text to search"
                    ref={searchedText}
                    onChange={handleSearch}
                />
                <p>Total Occurrences: {totalOccurences}</p>
                <p>Total Word Count: {totalWords}</p>
            </div>
        </div>
    );
};

export default FileUploader;
