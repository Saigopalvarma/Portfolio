import { useState } from "react";

export default function AddProjectForm({ onAddProject }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    onAddProject({ ...formData });
    setFormData({ title: "", description: "", link: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <input type="text" name="title" className="form-control" placeholder="Project Title" value={formData.title} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="text" name="description" className="form-control" placeholder="Description" value={formData.description} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="text" name="link" className="form-control" placeholder="GitHub or Demo Link" value={formData.link} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="file" name="imageFile" className="form-control" accept="image/*" onChange={handleFileChange} />
      </div>
      <button type="submit" className="btn btn-success w-100">Add Project</button>
    </form>
  );
}