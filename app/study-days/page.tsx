"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  createStudyDay,
  deleteStudyDay,
  getStudyDays,
  renameStudyDay,
  type StudyDay,
} from "@/app/services/studyDays";
import Navigation from "@/app/components/Navigation";

export default function StudyDaysPage() {
  const [studyDays, setStudyDays] = useState<StudyDay[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loadError, setLoadError] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function loadStudyDays() {
    setLoading(true);
    setLoadError(false);

    try {
      const days = await getStudyDays();
      setStudyDays(days);
    } catch (error) {
      console.error("Failed to load study days:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudyDays();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    const cleanName = name.trim();

    if (!cleanName) {
      setMessage("Please enter a study day name.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await createStudyDay(
        cleanName,
        description.trim() || null,
      );

      if (error) {
        console.error("Failed to create study day:", error);

        if (error.code === "23505") {
          setMessage("A study day with that name already exists.");
        } else {
          setMessage("Could not create the study day. Please try again.");
        }

        return;
      }

      setName("");
      setDescription("");
      setMessage("Study day created successfully!");

      await loadStudyDays();
    } catch (error) {
      console.error("Failed to create study day:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRename(id: number) {
    const cleanName = editName.trim();
    const cleanDescription = editDescription.trim() || null;

    if (!cleanName) {
      setMessage("Study day name cannot be empty.");
      return;
    }

    setUpdating(true);
    setMessage("");

    try {
      const { error } = await renameStudyDay(id, cleanName, cleanDescription);

      if (error) {
        if (error.code === "23505") {
          setMessage("A study day with that name already exists.");
        } else {
          console.error("Failed to update study day:", error);
          setMessage("Could not update the study day.");
        }
        return;
      }

      setEditingId(null);
      setEditName("");
      setEditDescription("");
      setMessage("Study day updated successfully!");

      await loadStudyDays();
    } catch (error) {
      console.error("Failed to update study day:", error);
      setMessage("Something went wrong while updating.");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete(day: StudyDay) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${day.name}"?\n\nAny kanji assigned to this study day will remain in the database but become unassigned.`,
    );

    if (!confirmed) return;

    setMessage("");
    setDeletingId(day.id);

    try {
      const { error } = await deleteStudyDay(day.id);

      if (error) {
        console.error("Failed to delete study day:", error);
        setMessage("Could not delete the study day. Please try again.");
        return;
      }

      setMessage(`"${day.name}" was deleted successfully.`);
      await loadStudyDays();
    } catch (error) {
      console.error("Failed to delete study day:", error);
      setMessage("Something went wrong while deleting the study day.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-4">
      <Navigation />

      <h1 className="mt-6 mb-2 text-3xl font-bold">Study Days</h1>

      <p className="mb-6 text-gray-600">
        Create and organise your kanji study groups.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-4 rounded-lg border p-4"
      >
        <h2 className="text-xl font-semibold">Add a Study Day</h2>

        <div>
          <label htmlFor="study-day-name" className="mb-1 block font-medium">
            Study Day Name
          </label>

          <input
            id="study-day-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Day 4 — Movement and Change"
            maxLength={100}
            required
            className="w-full rounded border border-gray-400 p-3"
          />
        </div>

        <div>
          <label
            htmlFor="study-day-description"
            className="mb-1 block font-medium"
          >
            Description (optional)
          </label>

          <textarea
            id="study-day-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What will you study in this group?"
            className="w-full rounded border border-gray-400 p-3"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create Study Day"}
        </button>

        {message && (
          <p role="status" aria-live="polite" className="text-sm">
            {message}
          </p>
        )}
      </form>

      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Your Study Days ({studyDays.length})
        </h2>

        {loading ? (
          <p>Loading study days...</p>
        ) : loadError ? (
          <p role="alert" className="text-red-600">
            Could not load study days. Please try again.
          </p>
        ) : studyDays.length === 0 ? (
          <p className="text-gray-600">No study days found yet.</p>
        ) : (
          <ul className="space-y-3">
            {studyDays.map((day) => (
              <li key={day.id} className="rounded-lg border p-4">
                {editingId === day.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleRename(day.id);
                    }}
                    className="space-y-3"
                  >
                    <label
                      htmlFor={`edit-study-day-${day.id}`}
                      className="block font-medium"
                    >
                      Study Day Name
                    </label>

                    <input
                      id={`edit-study-day-${day.id}`}
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      maxLength={100}
                      required
                      autoFocus
                      className="w-full rounded border border-gray-400 p-2"
                    />
                    <div>
                      <label
                        htmlFor={`edit-description-${day.id}`}
                        className="mb-1 block font-medium"
                      >
                        Description (optional)
                      </label>

                      <textarea
                        id={`edit-description-${day.id}`}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="What will you study in this group?"
                        rows={3}
                        className="w-full rounded border border-gray-400 p-2"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={updating}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {updating ? "Saving..." : "Save"}
                      </button>

                      <button
                        type="button"
                        disabled={updating}
                        onClick={() => {
                          setEditingId(null);
                          setEditName("");
                          setMessage("");
                        }}
                        className="rounded border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{day.name}</h3>

                        {day.description && (
                          <p className="mt-1 text-sm text-gray-600">
                            {day.description}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-gray-500">
                          Study Day ID: {day.id}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(day.id);
                            setEditName(day.name);
                            setEditDescription(day.description ?? "");
                            setMessage("");
                          }}
                          className="rounded border px-3 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={deletingId !== null}
                          onClick={() => handleDelete(day)}
                          className="rounded border border-red-300 px-3 py-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === day.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
