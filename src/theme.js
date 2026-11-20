(() => {
  const root = document.documentElement;
  const openDays = root.dataset.openDays.split(",");
  const start = root.dataset.openStart.split(":").map(Number);
  const end = root.dataset.openEnd.split(":").map(Number);

  function updateTheme() {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone: root.dataset.timeZone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      })
        .formatToParts(new Date())
        .map(({ type, value }) => [type, value])
    );
    const minutes = Number(parts.hour) * 60 + Number(parts.minute);
    const openingTime = start[0] * 60 + start[1];
    const closingTime = end[0] * 60 + end[1];
    const isOpen =
      openDays.includes(parts.weekday.toLowerCase()) &&
      minutes >= openingTime &&
      minutes < closingTime;

    root.dataset.theme = isOpen ? "day" : "night";
    root.dataset.businessStatus = isOpen ? "open" : "closed";
    document.querySelector('meta[name="theme-color"]').content = isOpen
      ? "#fffaff"
      : "#17131e";
  }

  updateTheme();
  window.setInterval(updateTheme, 60_000);
  document.addEventListener("visibilitychange", updateTheme);
})();
