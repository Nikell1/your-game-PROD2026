export function createEnterListener(
  onSubmit: () => void,
  options: {
    enabled?: boolean;
    preventDefault?: boolean;
    ignoreInputFields?: boolean;
  } = {},
): () => void {
  const {
    enabled = true,
    preventDefault = true,
    ignoreInputFields = false,
  } = options;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!enabled) return;

    if (
      ignoreInputFields &&
      (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement)
    ) {
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      if (preventDefault) {
        event.preventDefault();
      }
      onSubmit();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => window.removeEventListener("keydown", handleKeyDown);
}
