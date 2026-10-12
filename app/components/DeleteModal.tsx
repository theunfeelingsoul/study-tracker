type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-900 p-6 text-gray-100 shadow-xl">
        <h2 className="mb-2 text-xl font-semibold text-white">Delete Kanji</h2>

        <p className="mb-6 text-gray-300">
          Are you sure you want to delete this kanji?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border border-gray-600 px-4 py-2 text-gray-200 transition-colors hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
