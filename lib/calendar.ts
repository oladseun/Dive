export function generateGoogleCalendarUrl({
  title,
  description,
  date,
}: {
  title: string;
  description?: string;
  date: Date;
}) {
  const startDate = date.toISOString().replace(/-|:|\.\d+/g, "");
  // Default to 1-hour duration for the deadline
  const endDateObj = new Date(date.getTime() + 60 * 60 * 1000);
  const endDate = endDateObj.toISOString().replace(/-|:|\.\d+/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description || "Added from Dive Workspace",
    dates: `${startDate}/${endDate}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateIcsString({
  title,
  description,
  date,
}: {
  title: string;
  description?: string;
  date: Date;
}) {
  const startDate = date.toISOString().replace(/-|:|\.\d+/g, "");
  const endDateObj = new Date(date.getTime() + 60 * 60 * 1000);
  const endDate = endDateObj.toISOString().replace(/-|:|\.\d+/g, "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dive Workspace//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@dive.so`,
    `DTSTAMP:${startDate}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description ? description.replace(/\n/g, "\\n") : "Added from Dive Workspace"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcsFile({
  title,
  description,
  date,
}: {
  title: string;
  description?: string;
  date: Date;
}) {
  const icsContent = generateIcsString({ title, description, date });

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
