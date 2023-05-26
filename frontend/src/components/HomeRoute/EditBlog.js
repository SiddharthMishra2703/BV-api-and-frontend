import React, {useState, useEffect} from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/WriteBlog.css"
import { useNavigate } from 'react-router-dom'

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default function WriteBlogE() {

    const url = window.location.href;
  const blogId = url.slice(-24);
  const [userData, setUserData] = useState({});
  const getData = async () => {
    try {
      const res = await fetch('/blog/' + blogId, {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const blog = userData;
//   let html = "<p>sfwe<strong>gg </strong>gfhgvjbkn gfcghb fgghvbjn&nbsp;</p>";

    function Editorr() {
        if(blog.content){
            const html = blog.content;
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                var contentState = ContentState.createFromBlockArray(
                    contentBlock.contentBlocks
                );
            }
            const [editorState, setEditorState] = React.useState(() =>
                EditorState.createWithContent(contentState)
            );
            return <div className="editor mb-3 shadow border border-secondary border-opacity-50 rounded">
            <div className="hide">
            {text.content = draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            </div>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
            />
        </div>
        }
    }
  
    
    const navigate = useNavigate();

    const [text, setText] = useState({
        title: "",
        topic: "",
        content: "",
    });
    if(blog.title && blog.topic && text.title === ""){
        text.title = blog.title;
        text.topic = blog.topic;
    }

    let name, value;
    const handleOnChange = (e) => {
        name = e.target.name;
        value = e.target.value;

        setText({ ...text, [name]: value });
    }

    // Fetch Api
    const PostData = async (e) => {
        e.preventDefault();

        const { title, topic, content } = text;

        try {

            const res = await fetch('/editBlog', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    topic,
                    content,
                    blogId
                })
            });

            const data = res.body;

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
            <div className='container'>
                <h1 className='text-center fw-bolder my-4'> Edit Your Blog</h1>
                <form method="POST">
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
                    <Editorr />
                </form>
                <button className="btn btn-primary me-2 my-1" onClick={PostData}>Save</button>
            </div>


        </>
    );
}