import { useState } from "react";

export default function ModifyForm({ onAddSkill, onAddProject }) {
  const [pin, setPin] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const [skill, setSkill] = useState("");
  const [project, setProject] = useState({
    title: "",
    description: "",
    link: "",
    image: ""
  });

  const handleAccess = () => {
    if (pin === "2000") setAuthorized(true);
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (skill.trim()) onAddSkill(skill.trim());
    setSkill("");
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProject((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (project.title && project.description) {
      onAddProject(project);
      setProject({ title: "", description: "", link: "", image: "" });
    }
  };

  if (!authorized) {
    return (
      <div className="container py-4">
        <h4>Enter PIN to access modification:</h4>
        <input type="password" className="form-control mb-2" value={pin} onChange={(e) => setPin(e.target.value)} />
        <button className="btn btn-primary" onClick={handleAccess}>Enter</button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3>Modify Portfolio</h3>

      <form onSubmit={handleSkillSubmit} className="mb-4">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="New Skill" value={skill} onChange={(e) => setSkill(e.target.value)} />
          <button className="btn btn-secondary" type="submit">Add Skill</button>
        </div>
      </form>

      <form onSubmit={handleProjectSubmit}>
        <div className="mb-2">
          <input type="text" name="title" className="form-control" placeholder="Project Title" value={project.title} onChange={handleProjectChange} />
        </div>
        <div className="mb-2">
          <input type="text" name="description" className="form-control" placeholder="Description" value={project.description} onChange={handleProjectChange} />
        </div>
        <div className="mb-2">
          <input type="text" name="link" className="form-control" placeholder="GitHub or Demo Link" value={project.link} onChange={handleProjectChange} />
        </div>
        <div className="mb-2">
          <input type="file" className="form-control" accept="image/*" onChange={handleProjectImage} />
        </div>
        <button type="submit" className="btn btn-success">Add Project</button>
      </form>
    </div>
  );
}