import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { type TaskCardProps } from "../libs/Todolist";

type props = {
  onAdd: (todo: TaskCardProps) => void;
};

export default function Modal({ onAdd }: props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if(title.trim()){
      const newtodo:TaskCardProps = {
        id: uuidv4(),
        title,
        description,
        isDone: false,
      };
      onAdd(newtodo);
      setTitle("");
      setDescription("");
    }
  };

  const titleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const descriptionOnchang = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div className="modal fade" id="todoModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Todo List</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title Todo"
              value={title}
              onChange={titleOnchange}
            />
            <textarea
              className="form-control"
              placeholder="description..."
              value={description}
              onChange={descriptionOnchang}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              id="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              // onClick={() => {}}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
