import { useState } from "react";

export default function AddSkillForm({ onAddSkill }) {
  const [newSkill, setNewSkill] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    onAddSkill(newSkill.trim());
    setNewSkill("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Add Skill</button>
      </div>
    </form>
  );
}