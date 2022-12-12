import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Editor({ db }) {
  const [title, setTitle] = useState("");
  let params = useParams(); //id of doc
  //console.log(params);

  let navigate = useNavigate();

  let dbCollection = collection(db, "docs-data");

  const [value, setValue] = useState(""); //the doc being edited
  //console.log(value);

  useEffect(() => {
    const updateDocument = setTimeout(() => {
      //console.log(value);
      let docToUpdate = doc(dbCollection, params.id);

      updateDoc(docToUpdate, {
        body: value
      })
        .then(() => {
          toast.success("Data Saved!", {
            autoClose: 1000
          });
        })
        .catch(() => {
          toast.error("Could Not Save Changes!");
        });
    }, 1000);

    return () => clearTimeout(updateDocument);
  }, [value]);

  useEffect(() => {
    const document = doc(dbCollection, params.id);
    onSnapshot(document, (docs) => {
      setTitle(docs.data().title);
      setValue(docs.data().body);
    });
  }, []);

  return (
    <div>
      <button
        className="go-back-btn"
        onClick={() => {
          navigate("/home");
        }}
      >
        {"<"} Back
      </button>
      <ToastContainer />
      <h3>{title}</h3>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </div>
  );
}
