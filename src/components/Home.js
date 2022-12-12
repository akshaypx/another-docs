import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ db }) {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [docsData, setDocsData] = useState([]);
  let dbCollection = collection(db, "docs-data");
  let auth = getAuth();
  let navigate = useNavigate();
  let userEmail = localStorage.getItem("email");

  const logOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  const addDocument = () => {
    addDoc(dbCollection, {
      title: title,
      author: userEmail,
      body: ""
    })
      .then((res) => {
        toast.success("Doc Created!", {
          autoClose: 2000
        });
        setIsAdd(false);
        setTitle("");
      })
      .catch((err) => {
        toast.error("Cannot add data", {
          autoClose: 2000
        });
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, [auth]);

  useEffect(() => {
    onSnapshot(dbCollection, (res) => {
      console.log(res);
      setDocsData(
        res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  const openEditor = (id) => {
    console.log(id);
    navigate("/editor/" + id);
  };

  return (
    <>
      <ToastContainer />
      <h2>Home Page</h2>
      <div className="logout-container">
        <button className="logout-btn" onClick={logOut}>
          Log out
        </button>
      </div>

      <button className="add-doc-btn" onClick={() => setIsAdd(!isAdd)}>
        Add Document +
      </button>
      {isAdd && (
        <div className="title-input">
          <input
            className="add-title"
            placeholder="Add title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button className="add-btn" onClick={addDocument}>
            Add
          </button>
        </div>
      )}

      {docsData && (
        <div className="grid-main">
          {docsData
            .filter((doc) => doc.author === userEmail)
            .map((doc) => {
              return (
                <div
                  className="grid-child"
                  key={doc.id}
                  onClick={() => openEditor(doc.id)}
                >
                  <h3>{doc.title}</h3>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
