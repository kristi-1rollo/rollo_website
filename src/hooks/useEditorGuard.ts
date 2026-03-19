import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Manages the editor lifecycle in admin tabs:
 * - Tracks dirty state and shows a leave confirmation dialog
 * - Pushes browser history state to intercept Back button
 * - Provides unsaved-changes warning via beforeunload
 */
export function useEditorGuard<T>(options?: {
  onSaveDraft?: () => Promise<void>;
}) {
  const [editing, setEditing] = useState<T | null | "new">(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const pendingCloseRef = useRef(false);

  // Push history state when entering editor; intercept popstate
  useEffect(() => {
    if (!editing) return;
    window.history.pushState({ adminEditor: true }, "");
    const onPopState = () => {
      if (isDirty) {
        setShowLeaveDialog(true);
        window.history.pushState({ adminEditor: true }, "");
      } else {
        setEditing(null);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [editing, isDirty]);

  // beforeunload warning when dirty
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const requestClose = useCallback(() => {
    if (isDirty) {
      setShowLeaveDialog(true);
    } else {
      setEditing(null);
    }
  }, [isDirty]);

  const confirmDiscard = useCallback(() => {
    setShowLeaveDialog(false);
    setIsDirty(false);
    setEditing(null);
  }, []);

  const confirmSaveDraft = useCallback(async () => {
    await options?.onSaveDraft?.();
    setShowLeaveDialog(false);
    setIsDirty(false);
    setEditing(null);
  }, [options?.onSaveDraft]);

  const closeClean = useCallback(() => {
    setIsDirty(false);
    setEditing(null);
  }, []);

  return {
    editing,
    setEditing,
    isDirty,
    setIsDirty,
    showLeaveDialog,
    setShowLeaveDialog,
    requestClose,
    confirmDiscard,
    confirmSaveDraft,
    closeClean,
  };
}
