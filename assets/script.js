document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded and ready!");

    const orcidId = "0000-0003-2494-2951";  // 
    const apiUrl = `https://pub.orcid.org/v3.0/${orcidId}/works`;

    fetch(apiUrl, { headers: { "Accept": "application/json" } })
        .then(response => response.json())
        .then(data => {
            const publicationsList = document.getElementById("publications-list");
            publicationsList.innerHTML = ""; // Vacía la lista previa

            if (!data.group || data.group.length === 0) {
                publicationsList.innerHTML = "<li>No publications found.</li>";
                return;
            }

            data.group.forEach(group => {
                const summary = group["work-summary"][0];
                const title = summary["title"]["title"]["value"];
                const year = summary["publication-date"] ? summary["publication-date"]["year"]["value"] : "N/A";
                const link = summary["url"] ? summary["url"]["value"] : "#";

                let li = document.createElement("li");
                li.innerHTML = `<a href="${link}" target="_blank">${title}</a> - ${year}`;
                publicationsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching ORCID data:", error);
            document.getElementById("publications-list").innerHTML = "<li>Error loading publications.</li>";
        });
});

