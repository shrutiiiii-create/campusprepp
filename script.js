// =====================================
// CampusPrep - Main JavaScript
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. RESOURCE SEARCH
    // =====================================

    const searchInput = document.getElementById("searchInput");
    const clearSearch = document.getElementById("clearSearch");
    const searchStatus = document.getElementById("searchStatus");

    const searchableCards = document.querySelectorAll(".searchable-card");

    function searchResources() {

        if (!searchInput) {
            return;
        }

        const searchText = searchInput.value
            .toLowerCase()
            .trim();

        let visibleCount = 0;

        searchableCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();

            const matches = cardText.includes(searchText);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        if (clearSearch) {
            clearSearch.hidden = searchText.length === 0;
        }

        if (searchStatus) {

            if (searchText === "") {
                searchStatus.textContent =
                    "Explore all available resources below.";

            } else if (visibleCount === 0) {
                searchStatus.textContent =
                    'No resources found for "' + searchText +
                    '". Try Python, DBMS, DSA or Java.';

            } else {
                searchStatus.textContent =
                    visibleCount + " matching resource" +
                    (visibleCount === 1 ? "" : "s") +
                    " found.";
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", searchResources);
    }

    if (clearSearch) {
        clearSearch.addEventListener("click", function () {

            searchInput.value = "";

            searchResources();

            searchInput.focus();
        });
    }


    // =====================================
    // 2. QUESTION PAPER DATA
    // =====================================

    const papers = [
        {
            semester: "1",
            subject: "Mathematics",
            title: "Mathematics - Semester 1"
        },
        {
            semester: "2",
            subject: "Mathematics",
            title: "Mathematics - Semester 2"
        },
        {
            semester: "3",
            subject: "DBMS",
            title: "DBMS - Semester 3"
        },
        {
            semester: "3",
            subject: "DSA",
            title: "DSA - Semester 3"
        },
        {
            semester: "3",
            subject: "OOP",
            title: "OOP - Semester 3"
        },
        {
            semester: "4",
            subject: "DBMS",
            title: "DBMS - Semester 4"
        }
    ];


    // =====================================
    // 3. GET PAPER FILTER ELEMENTS
    // =====================================

    const semesterFilter = document.getElementById("semesterFilter");
    const subjectFilter = document.getElementById("subjectFilter");
    const paperResults = document.getElementById("paperResults");


    // =====================================
    // 4. DISPLAY QUESTION PAPERS
    // =====================================

    function filterPapers() {

        if (!semesterFilter || !subjectFilter || !paperResults) {
            return;
        }

        const selectedSemester = semesterFilter.value;
        const selectedSubject = subjectFilter.value;

        const filteredPapers = papers.filter(function (paper) {

            const semesterMatches =
                selectedSemester === "" ||
                paper.semester === selectedSemester;

            const subjectMatches =
                selectedSubject === "" ||
                paper.subject === selectedSubject;

            return semesterMatches && subjectMatches;
        });

        if (filteredPapers.length === 0) {

            paperResults.innerHTML = `
                <div class="empty-state">
                    <p>No question papers found for this selection.</p>
                    <p>Try selecting another semester or subject.</p>
                </div>
            `;

            return;
        }

        paperResults.innerHTML = filteredPapers.map(function (paper) {

            return `
                <article class="paper-card">

                    <h3>${paper.title}</h3>

                    <p>
                        <strong>Subject:</strong>
                        ${paper.subject}
                    </p>

                    <p>
                        <strong>Semester:</strong>
                        ${paper.semester}
                    </p>

                    <span class="paper-status">
                        PDF coming soon
                    </span>

                </article>
            `;

        }).join("");
    }


    // =====================================
    // 5. UPDATE SUBJECT DROPDOWN
    // =====================================

    function updateSubjects() {

        if (!semesterFilter || !subjectFilter) {
            return;
        }

        const selectedSemester = semesterFilter.value;
        const previousSubject = subjectFilter.value;

        const availableSubjects = [
            ...new Set(
                papers
                    .filter(function (paper) {

                        return (
                            selectedSemester === "" ||
                            paper.semester === selectedSemester
                        );

                    })
                    .map(function (paper) {
                        return paper.subject;
                    })
            )
        ];

        subjectFilter.innerHTML =
            '<option value="">All Subjects</option>';

        availableSubjects.sort().forEach(function (subject) {

            const option = document.createElement("option");

            option.value = subject;
            option.textContent = subject;

            subjectFilter.appendChild(option);
        });

        if (availableSubjects.includes(previousSubject)) {
            subjectFilter.value = previousSubject;
        }

        filterPapers();
    }


    // =====================================
    // 6. CONNECT PAPER FILTERS
    // =====================================

    if (semesterFilter) {

        semesterFilter.addEventListener("change", function () {

            updateSubjects();

        });
    }

    if (subjectFilter) {

        subjectFilter.addEventListener("change", function () {

            filterPapers();

        });
    }


    // =====================================
    // 7. SMOOTH NAVIGATION
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // =====================================
    // 8. INITIALIZE WEBSITE
    // =====================================

    updateSubjects();

    searchResources();

});