export default function CheckBox() {
  return (
    <div class="block">
      <div class="mt-2">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            className="w-6 h-6 appearance-none checked:bg-cock-purple border-4 border-brand-header bg-brand-header rounded-full"
            disabled={true}
            checked={true}
          />
          <span class="ml-4 text-white text-sm font-Inter font-medium">
            Upload code
          </span>
        </label>
      </div>
    </div>
  );
}
