export function onDeleteConfirm(message, object, onDelete) {
  return () => {
    if (window.confirm(message)) {
      onDelete(object);
    }
  };
}
