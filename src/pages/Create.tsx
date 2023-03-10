import { TextField, Button } from "@mui/material";
import axios from "axios";
import React, { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { IProductForm } from "../IProduct";

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState<IProductForm>({
    name: "",
    count: null,
    short_description: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formFiltered = Object.values(form).filter((v) => v);
    if (Object.keys(form).length === formFiltered.length) {
      axios.post("http://localhost:3500/products", form);
      navigate("/");
    } else {
      alert("All fields must be filled in!");
    }
  };

  return (
    <>
      <div className="m-4 p-4">
        <form onSubmit={handleSubmit} className="flex justify-center w-full">
          <div className="flex flex-col gap-4 ">
            <span className="text-center text-4xl mb-4">Create</span>
            <TextField
              name="name"
              placeholder="Name"
              value={form.name || null}
              onChange={({ target }) =>
                setForm({ ...form, name: target.value })
              }
            />
            <TextField
              name="count"
              placeholder="Count"
              value={form.count}
              type="number"
              onChange={({ target }) => {
                setForm({ ...form, count: Number(target.value) || null });
              }}
            />
            <TextField
              label="Short Description"
              multiline
              minRows={3}
              value={form.short_description}
              onChange={({ target }) =>
                setForm({ ...form, short_description: target.value })
              }
            />
            <Button variant="contained" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
