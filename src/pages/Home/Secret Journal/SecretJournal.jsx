import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addJournal,
  deleteJournal,
  fetchJournals,
} from "../../../features/home/secret journal/secretjournalSlice";
import { FaTrash, FaMicrophone } from "react-icons/fa6";

const formatDate = (iso) => {
  const d = new Date(iso);

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const EMPTY_FORM = {
  title: "",
  description: "",
};

export default function SecretJournal() {
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState(false);

  const { entries, loading } = useSelector((state) => state.secretJournal);

  const [showAddModal, setShowAddModal] = useState(false);
  const [viewEntry, setViewEntry] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchJournals());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validate = () => {
    const errs = {};

    if (!form.title.trim()) {
      errs.title = "Title is required";
    }

    if (!form.description.trim()) {
      errs.description = "Description is required";
    }

    return errs;
  };

  const handleSave = async () => {
    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const payload = {
      title: form.title,
      content: form.description,
    };

    const res = await dispatch(addJournal(payload));

    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(fetchJournals());

      setForm(EMPTY_FORM);
      setErrors({});
      setShowAddModal(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await dispatch(deleteJournal(id));

    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(fetchJournals());

      setDeleteConfirm(null);

      if (viewEntry?._id === id) {
        setViewEntry(null);
      }
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setForm((prev) => ({
        ...prev,
        description: prev.description
          ? `${prev.description} ${transcript}`
          : transcript,
      }));
    };

    recognition.onerror = (event) => {
      console.log("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const css = `
.sj-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.sj-modal {
  background: #fff;
  width: 100%;
  max-width: 500px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}

.sj-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #eee;
}

.sj-modal-body {
  padding: 20px;
}

.sj-modal-footer {
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-close {
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

.field {
  margin-bottom: 18px;
}

.field label {
  display: block;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 600;
}

.field input,
.field textarea {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 12px;
  outline: none;
}

.field textarea {
  min-height: 120px;
  resize: none;
}

.field-error {
  color: red;
  font-size: 13px;
  margin-top: 5px;
}

.btn-save {
  background: #f26522;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-cancel {
  background: #eee;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-delete {
  border: none;
  background: red;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}

.sj-view-title {
  margin-bottom: 12px;
}

.sj-view-body {
  line-height: 1.7;
}

.sj-view-date {
  margin-top: 20px;
  color: gray;
  font-size: 14px;
}
`;

  return (
    <>
      <style>{css}</style>
      <div className="main-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div className="sj-header-left">
            <h2>Your Secret Journal</h2>

            <p style={{ marginBottom: "0" }}>
              Write without judgment — your thoughts are safe here.
            </p>
          </div>

          <button className="btn-save" onClick={() => setShowAddModal(true)}>
            + Add Journal
          </button>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(30,40,90,0.07)",
            border: "1px solid #edf0f7",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f7f8fc",
                    borderBottom: "1px solid #edf0f7",
                  }}
                >
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Description</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyleCenter}>Action</th>
                </tr>
              </thead>

              <tbody>
                {entries?.length > 0 ? (
                  entries.map((entry) => (
                    <tr
                      key={entry._id}
                      style={{
                        borderBottom: "1px solid #f1f3f8",
                      }}
                    >
                      <td
                        style={{
                          padding: "16px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                        onClick={() => setViewEntry(entry)}
                      >
                        {entry.title}
                      </td>

                      <td
                        style={{
                          padding: "16px",
                          maxWidth: "350px",
                        }}
                      >
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {entry.content}
                        </div>
                      </td>

                      <td style={{ padding: "16px" }}>
                        {formatDate(entry.createdAt)}
                      </td>

                      <td
                        style={{
                          padding: "16px",
                          textAlign: "center",
                        }}
                      >
                        <button
                          className="btn-delete"
                          onClick={() => setDeleteConfirm(entry)}
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "red",
                            cursor: "pointer",
                            fontSize: "18px",
                          }}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "60px 20px",
                      }}
                    >
                      {loading ? "Loading..." : "No Data Found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="sj-overlay">
          <div className="sj-modal">
            <div className="sj-modal-header">
              <h3>Add Journal</h3>

              <button
                className="btn-close"
                onClick={() => {
                  setShowAddModal(false);
                  setForm(EMPTY_FORM);
                  setErrors({});
                }}
              >
                ✕
              </button>
            </div>

            <div className="sj-modal-body">
              <div className="field">
                <label>Title</label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                />

                {errors.title && (
                  <div className="field-error">{errors.title}</div>
                )}
              </div>

              <div className="field">
                <label>Description</label>

                <div className="textarea-wrapper">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Write here..."
                  />

                  <button
                    type="button"
                    className={`mic-btn1 ${isListening ? "listening" : ""}`}
                    onClick={handleVoiceInput}
                  >
                    <FaMicrophone />
                  </button>
                </div>

                {errors.description && (
                  <div className="field-error">{errors.description}</div>
                )}
              </div>

              {/* <div className="field">
                <label>Description</label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write here..."
                />

                {errors.description && (
                  <div className="field-error">{errors.description}</div>
                )}
              </div> */}
            </div>

            <div className="sj-modal-footer">
              <button
                className="btn-cancel"
                onClick={() => {
                  setShowAddModal(false);
                  setForm(EMPTY_FORM);
                  setErrors({});
                }}
              >
                Cancel
              </button>
              {/* <button
                className="btn-cancel"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button> */}

              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {viewEntry && (
        <div className="sj-overlay">
          <div className="sj-modal sj-view-modal">
            <div className="sj-modal-header">
              <h3>Journal Details</h3>

              <button className="btn-close" onClick={() => setViewEntry(null)}>
                ✕
              </button>
            </div>

            <div className="sj-modal-body">
              <h2 className="sj-view-title">{viewEntry.title}</h2>

              <div className="sj-view-body">{viewEntry.content}</div>

              <div className="sj-view-date">
                {formatDate(viewEntry.createdAt)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────── */}
      {/* DELETE MODAL */}
      {/* ───────────────────────────────────────── */}
      {deleteConfirm && (
        <div className="sj-overlay">
          <div className="sj-modal sj-delete-modal">
            <div className="sj-modal-body">
              <h4>Delete Journal?</h4>

              <p>
                Are you sure you want to delete
                <b> {deleteConfirm.title}</b> ?
              </p>
            </div>

            <div
              className="sj-modal-footer"
              style={{
                justifyContent: "center",
              }}
            >
              <button
                className="btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>

              <button
                className="btn-save"
                onClick={() => handleDelete(deleteConfirm._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const thStyle = {
  padding: "16px",
  textAlign: "left",
  fontSize: "14px",
  color: "#5a6282",
  fontWeight: "600",
};

const thStyleCenter = {
  padding: "16px",
  textAlign: "center",
  fontSize: "14px",
  color: "#5a6282",
  fontWeight: "600",
};
