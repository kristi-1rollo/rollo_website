import { useState, useEffect, useRef, useCallback } from "react";

const DEBOUNCE_MS = 1200;

/**
 * Generic auto-draft hook that persists form data to localStorage
 * with debounced saving and restore-on-mount support.
 *
 * @param draftKey  Unique localStorage key for this draft
 * @param getData   Callback returning the current draft-worthy data
 */
export function useAutoDraft<T extends Record<string, unknown>>(
  draftKey: string,
  getData: () => T
) {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<(T & { savedAt?: string }) | null>(null);

  const dataRef = useRef<T | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restoredRef = useRef(false);

  // Flush current data to localStorage immediately
  const saveNow = useCallback(() => {
    if (!dataRef.current) return;
    try {
      localStorage.setItem(
        draftKey,
        JSON.stringify({ ...dataRef.current, savedAt: new Date().toISOString() })
      );
      setLastSavedAt(new Date());
    } catch {
      // localStorage full or unavailable — silently ignore
    }
  }, [draftKey]);

  // Keep dataRef in sync
  const syncData = useCallback(() => {
    dataRef.current = getData();
  }, [getData]);

  // Debounced save on every syncData call (after initial restore)
  const scheduleSave = useCallback(() => {
    if (!restoredRef.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(saveNow, DEBOUNCE_MS);
  }, [saveNow]);

  // Flush on beforeunload, visibilitychange, and unmount
  useEffect(() => {
    const flush = () => saveNow();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("beforeunload", flush);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      flush();
      window.removeEventListener("beforeunload", flush);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [saveNow]);

  // Restore draft on mount — show banner if one exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const draft = JSON.parse(saved) as T & { savedAt?: string };
        setPendingDraft(draft);
        setShowBanner(true);
      } else {
        restoredRef.current = true;
      }
    } catch {
      restoredRef.current = true;
    }
  }, [draftKey]);

  /** Call from "Restore" button — returns the draft data to apply */
  const restoreDraft = (): (T & { savedAt?: string }) | null => {
    if (!pendingDraft) return null;
    setShowBanner(false);
    setPendingDraft(null);
    restoredRef.current = true;
    return pendingDraft;
  };

  /** Call from "Discard" button */
  const discardDraft = () => {
    localStorage.removeItem(draftKey);
    setShowBanner(false);
    setPendingDraft(null);
    restoredRef.current = true;
  };

  /** Call after successful save to clear draft */
  const clearDraft = useCallback(() => {
    localStorage.removeItem(draftKey);
  }, [draftKey]);

  return {
    lastSavedAt,
    showBanner,
    pendingDraft,
    saveNow,
    syncData,
    scheduleSave,
    restoreDraft,
    discardDraft,
    clearDraft,
    /** Whether the initial restore check has completed */
    isRestored: restoredRef.current,
  };
}
