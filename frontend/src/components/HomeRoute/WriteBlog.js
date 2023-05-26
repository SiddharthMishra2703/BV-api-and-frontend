import React, { useState } from 'react'
import "../css/WriteBlog.css"
import { useNavigate } from 'react-router-dom'

export default function WriteBlog() {

  const navigate = useNavigate();

  // let optionsButtons = document.querySelectorAll(".option-button");
  // let advancedOptionButton = document.querySelectorAll(".adv-option-button");
  // let fontName = document.getElementById("fontName");
  // let fontSizeRef = document.getElementById("fontSize");
  // let writingArea = document.getElementById("text-input");
  // let linkButton = document.getElementById("createLink");
  // let alignButtons = document.querySelectorAll(".align");
  // let spacingButtons = document.querySelectorAll(".spacing");
  // let formatButtons = document.querySelectorAll(".format");
  // let scriptButtons = document.querySelectorAll(".script");

  // //List of fontlist
  // let fontList = [
  //   "Arial",
  //   "Verdana",
  //   "Times New Roman",
  //   "Garamond",
  //   "Georgia",
  //   "Courier New",
  //   "cursive",
  // ];

  // //Initial Settings
  // const initializer = () => {
  //   //function calls for highlighting buttons
  //   //No highlights for link, unlink,lists, undo,redo since they are one time operations
  //   highlighter(alignButtons, true);
  //   highlighter(spacingButtons, true);
  //   highlighter(formatButtons, false);
  //   highlighter(scriptButtons, true);

  //   //create options for font names
  //   fontList.map((value) => {
  //     let option = document.createElement("option");
  //     option.value = value;
  //     option.innerHTML = value;
  //     fontName.appendChild(option);
  //   });

  //   //fontSize allows only till 7
  //   for (let i = 1; i <= 7; i++) {
  //     let option = document.createElement("option");
  //     option.value = i;
  //     option.innerHTML = i;
  //     fontSizeRef.appendChild(option);
  //   }

  //   //default size
  //   fontSizeRef.value = 3;
  // };

  // //main logic
  // const modifyText = (command, defaultUi, value) => {
  //   //execCommand executes command on selected text
  //   document.execCommand(command, defaultUi, value);
  // };

  // //For basic operations which don't need value parameter
  // optionsButtons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     modifyText(button.id, false, null);
  //   });
  // });

  // //options that require value parameter (e.g colors, fonts)
  // advancedOptionButton.forEach((button) => {
  //   button.addEventListener("change", () => {
  //     modifyText(button.id, false, button.value);
  //   });
  // });

  // //link
  // linkButton.addEventListener("click", () => {
  //   let userLink = prompt("Enter a URL");
  //   //if link has http then pass directly else add https
  //   if (/http/i.test(userLink)) {
  //     modifyText(linkButton.id, false, userLink);
  //   } else {
  //     userLink = "http://" + userLink;
  //     modifyText(linkButton.id, false, userLink);
  //   }
  // });

  // //Highlight clicked button
  // const highlighter = (className, needsRemoval) => {
  //   className.forEach((button) => {
  //     button.addEventListener("click", () => {
  //       //needsRemoval = true means only one button should be highlight and other would be normal
  //       if (needsRemoval) {
  //         let alreadyActive = false;

  //         //If currently clicked button is already active
  //         if (button.classList.contains("active")) {
  //           alreadyActive = true;
  //         }

  //         //Remove highlight from other buttons
  //         highlighterRemover(className);
  //         if (!alreadyActive) {
  //           //highlight clicked button
  //           button.classList.add("active");
  //         }
  //       } else {
  //         //if other buttons can be highlighted
  //         button.classList.toggle("active");
  //       }
  //     });
  //   });
  // };

  // const highlighterRemover = (className) => {
  //   className.forEach((button) => {
  //     button.classList.remove("active");
  //   });
  // };

  // window.onload = initializer();

  const handleClearClick = () => {
    let newtext = "";
    setText(newtext);
  }

  const [text, setText] = useState({
    title: "",
    topic: "",
    content: "",
  });

  let name, value;
  const handleOnChange = (e) => {
    // console.log("Clicked");
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setText({ ...text, [name]: value });
  }

  // Fetch Api
  const PostData = async (e) => {
    e.preventDefault();

    const { title, topic, content } = text;

    try {

      const res = await fetch('/writeblog', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          topic,
          content
        })
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        window.alert("Invalid Blog");
        console.log("Invalid Blog");
      } else {
        window.alert("Blog saved successfuly");
        console.log("Blog saved successfuly");

        navigate('/dashboard');
      }

    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  return (
    <>
      <div className="containerr">
        <h1 className='text-center fw-bolder my-4'> Create Your Own Blog</h1>
        <form method="POST">
          <div className="options">

            <button id="bold" className="option-button buttonW format">
              <i className="fa-solid fa-bold"></i>
            </button>
            <button id="italic" className="option-button buttonW format">
              <i className="fa-solid fa-italic"></i>
            </button>
            <button id="underline" className="option-button buttonW format">
              <i className="fa-solid fa-underline"></i>
            </button>
            <button id="strikethrough" className="option-button buttonW format">
              <i className="fa-solid fa-strikethrough"></i>
            </button>
            <button id="superscript" className="option-button buttonW script">
              <i className="fa-solid fa-superscript"></i>
            </button>
            <button id="subscript" className="option-button buttonW script">
              <i className="fa-solid fa-subscript"></i>
            </button>

            <button id="insertOrderedList" className="option-button buttonW">
              <div className="fa-solid fa-list-ol"></div>
            </button>
            <button id="insertUnorderedList" className="option-button buttonW">
              <i className="fa-solid fa-list"></i>
            </button>

            <button id="undo" className="option-button buttonW">
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            <button id="redo" className="option-button buttonW">
              <i className="fa-solid fa-rotate-right"></i>
            </button>

            <button id="createLink" className="adv-option-button buttonW">
              <i className="fa fa-link"></i>
            </button>
            <button id="unlink" className="option-button buttonW">
              <i className="fa fa-unlink"></i>
            </button>

            <button id="justifyLeft" className="option-button buttonW align">
              <i className="fa-solid fa-align-left"></i>
            </button>
            <button id="justifyCenter" className="option-button buttonW align">
              <i className="fa-solid fa-align-center"></i>
            </button>
            <button id="justifyRight" className="option-button buttonW align">
              <i className="fa-solid fa-align-right"></i>
            </button>
            <button id="justifyFull" className="option-button buttonW align">
              <i className="fa-solid fa-align-justify"></i>
            </button>
            <button id="indent" className="option-button buttonW spacing">
              <i className="fa-solid fa-indent"></i>
            </button>
            <button id="outdent" className="option-button buttonW spacing">
              <i className="fa-solid fa-outdent"></i>
            </button>

            <select id="formatBlock" className="adv-option-button">
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="H3">H3</option>
              <option value="H4">H4</option>
              <option value="H5">H5</option>
              <option value="H6">H6</option>
            </select>

            <select id="fontName" className="adv-option-button"></select>
            <select id="fontSize" className="adv-option-button"></select>

            <div className="input-wrapper">
              <input type="color" id="foreColor" className="adv-option-button" />
              <label htmlfor="foreColor">Font Color</label>
            </div>
            <div className="input-wrapper">
              <input type="color" id="backColor" className="adv-option-button" />
              <label htmlfor="backColor">Highlight Color</label>
            </div>
          </div>
          {/* <div id="text-input" value={text.content} name='content' onChange={handleOnChange} contentEditable="true"></div> */}

          <div className="row my-4">
            <div className="col-6">
              <div className="input-group flex-nowrap">
                <input type="text" className="form-control" placeholder="Enter Title" value={text.title} name='title' onChange={handleOnChange} aria-label="Username" aria-describedby="addon-wrapping" />
              </div>
            </div>
            <div className="col-6">
              <select className="form-select" value={text.topic} name='topic' onChange={handleOnChange} aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="Fashion">Fashion</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
                <option value="Science And Devlopment">Science And Devlopment</option>
                <option value="Politices">Politices</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <textarea id="text-input" className="form-control" value={text.content} name='content' onChange={handleOnChange} rows="10"></textarea>
          </div>
          
          <button className="btn btn-primary mx-2 my-1" onClick={handleClearClick}>Clear</button>
          <button className="btn btn-primary mx-2 my-1" onClick={PostData}>Save</button>
        </form>
      </div>
    </>
  )
}

