export function logActivity(action: string, contentTitle: string, contentId: string) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("adminActivityLog");
  let logs: any[] = stored ? JSON.parse(stored) : [];

  logs.push({
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    action,
    contentTitle,
    contentId,
    timestamp: Date.now(),
  });

  if (logs.length > 100) {
    logs = logs.slice(-100);
  }

  localStorage.setItem("adminActivityLog", JSON.stringify(logs));
}
