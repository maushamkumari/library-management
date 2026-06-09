const storedTheme = localStorage.getItem("library-theme");
if (storedTheme === "dark") {
    document.body.classList.add("dark");
}

document.getElementById("themeToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("library-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

const chart = document.getElementById("circulationChart");
if (chart && window.Chart) {
    new Chart(chart, {
        type: "doughnut",
        data: {
            labels: ["Issued", "Returned", "Pending"],
            datasets: [{
                data: [chart.dataset.issued || 0, chart.dataset.returned || 0, chart.dataset.pending || 0],
                backgroundColor: ["#1f6feb", "#0f766e", "#f59e0b"]
            }]
        },
        options: {plugins: {legend: {position: "bottom"}}, maintainAspectRatio: false}
    });
}

const globalSearch = document.getElementById("globalSearch");
globalSearch?.addEventListener("input", async (event) => {
    const q = event.target.value.trim();
    if (q.length < 2) {
        return;
    }
    const response = await fetch(`/search?q=${encodeURIComponent(q)}`);
    if (response.ok) {
        console.debug("Search suggestions", await response.json());
    }
});
