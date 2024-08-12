import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import axios from "axios";

export default function tags() {
  const [newTags, setNewTags] = useState("");
  const { alldata, loading } = useFetchData("/api/tagsapi");
  const handleAddTag = async () => {
    try {
      await axios.post("/api/tagsapi", {
        name: "test first tags",
        slug: "test",
      });
    } catch (error) {}
  };
  return (
    <ProtectedRoute>
      <div className="tags">
        <button onClick={handleAddTag}> Add tag</button>
        {alldata.map((tag) => (
          <h3>{tag.name}</h3>
        ))}
      </div>
    </ProtectedRoute>
  );
}
