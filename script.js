"use strict";

const levelConfigurations = {
  "TC": [
    { subject: "Education islamique", coefficient: 2 },
    { subject: "Arabe", coefficient: 2 },
    { subject: "Philosophie", coefficient: 2 },
    { subject: "Histoire et geographie", coefficient: 2 },
    { subject: "Francais", coefficient: 3 },
    { subject: "Anglais", coefficient: 3 },
    { subject: "Informatique", coefficient: 2 },
    { subject: "Mathematiques", coefficient: 5 },
    { subject: "SVT", coefficient: 4 },
    { subject: "Physique et Chimie", coefficient: 4 },
    { subject: "Education physique", coefficient: 2 },
    { subject: "Assiduite et conduite", coefficient: 1 }
  ],
  "1BAC SM": [
    { subject: "Education islamique", coefficient: 2 },
    { subject: "Arabe", coefficient: 2 },
    { subject: "Philosophie", coefficient: 2 },
    { subject: "Histoire et geographie", coefficient: 2 },
    { subject: "Francais", coefficient: 4 },
    { subject: "Anglais", coefficient: 2 },
    { subject: "Mathematiques", coefficient: 9 },
    { subject: "SVT", coefficient: 3 },
    { subject: "Physique et Chimie", coefficient: 7 },
    { subject: "Education physique", coefficient: 1 },
    { subject: "Assiduite et conduite", coefficient: 1 }
  ],
  "1BAC S EX": [
    { subject: "Education islamique", coefficient: 2 },
    { subject: "Arabe", coefficient: 2 },
    { subject: "Philosophie", coefficient: 2 },
    { subject: "Histoire et geographie", coefficient: 2 },
    { subject: "Francais", coefficient: 4 },
    { subject: "Anglais", coefficient: 2 },
    { subject: "Mathematiques", coefficient: 7 },
    { subject: "SVT", coefficient: 7 },
    { subject: "Physique et Chimie", coefficient: 7 },
    { subject: "Education physique", coefficient: 1 },
    { subject: "Assiduite et conduite", coefficient: 1 }
  ],
  "2BAC SM": [
    { subject: "Education islamique", coefficient: 2 },
    { subject: "Arabe", coefficient: 2 },
    { subject: "Philosophie", coefficient: 2 },
    { subject: "Francais", coefficient: 4 },
    { subject: "Anglais", coefficient: 2 },
    { subject: "Mathematiques", coefficient: 9 },
    { subject: "SVT", coefficient: 3 },
    { subject: "Physique et Chimie", coefficient: 7 },
    { subject: "Education physique", coefficient: 4 },
    { subject: "Assiduite et conduite", coefficient: 1 }
  ],
  "2BAC SC PC": [
    { subject: "Education islamique", coefficient: 2 },
    { subject: "Arabe", coefficient: 2 },
    { subject: "Philosophie", coefficient: 2 },
    { subject: "Francais", coefficient: 4 },
    { subject: "Anglais", coefficient: 2 },
    { subject: "Mathematiques", coefficient: 7 },
    { subject: "SVT", coefficient: 5 },
    { subject: "Physique et Chimie", coefficient: 7 },
    { subject: "Education physique", coefficient: 4 },
    { subject: "Assiduite et conduite", coefficient: 1 }
  ],
  "Après BAC": []
};

const nationalTracks = {
  SM: [
    { subject: "Mathematiques", coefficient: 9 },
    { subject: "Physique et Chimie", coefficient: 7 },
    { subject: "SVT", coefficient: 3 },
    { subject: "Philosophie", coefficient: 2 },
    { subject: "Anglais", coefficient: 2 }
  ],
  PC: [
    { subject: "Mathematiques", coefficient: 7 },
    { subject: "Physique et Chimie", coefficient: 7 },
    { subject: "SVT", coefficient: 5 },
    { subject: "Philosophie", coefficient: 2 },
    { subject: "Anglais", coefficient: 2 }
  ]
};

const postBacSchools = [
  { name: "ENSA (Reseau National)", trackThresholds: { SM: [12.0, 12.0], PC: [14.5, 14.5] } },
  { name: "ENSAM (Meknes, Casa, Rabat)", trackThresholds: { SM: [12.25, 12.25], PC: [16.15, 16.15] } },
  { name: "FST (Facultes des Sciences et Techniques)", trackThresholds: { SM: [12.5, 13.5], PC: [14.5, 15.5] } },
  { name: "APESA (IAV Hassan II - Agriculture/Veto)", trackThresholds: { SM: [13.5, 13.5], PC: [16.0, 16.0] } },
  { name: "ENAM (Agriculture Meknes)", trackThresholds: { SM: [12.5, 12.5], PC: [14.5, 14.5] } },
  { name: "EST (Ecoles Superieures de Technologie)", trackThresholds: { SM: [12.0, 13.0], PC: [14.0, 15.0] } },
  { name: "FMP / FMD (Medecine, Dentaire, Pharmacie)", sharedThresholds: [13.0, 13.0], note: "Seuil unifie nationalement." },
  { name: "ISPITS (Infirmiers - Anesthesie)", sharedThresholds: [15.5, 17.5], note: "Tres selectif pour cette option." },
  { name: "ISPITS (Infirmiers - Sante mentale)", sharedThresholds: [12.0, 13.0], note: "Plus accessible." },
  { name: "ISPITS (Polyvalent)", sharedThresholds: [13.5, 15.0], note: "Varie selon la ville." },
  { name: "ENCG (Reseau National)", trackThresholds: { SM: [12.0, 12.0], PC: [14.0, 14.0] } },
  { name: "ISCAE (Casablanca / Rabat)", trackThresholds: { SM: [17.25, 17.25], PC: [18.05, 18.05] } },
  { name: "ISITT (Tourisme Tanger)", trackThresholds: { SM: [13.0, 13.0], PC: [14.0, 14.0] } },
  { name: "ENA (Architecture - Rabat)", sharedThresholds: [16.0, 16.0] },
  { name: "ENA (Architecture - Fes/Marrakech)", sharedThresholds: [15.2, 15.2] },
  { name: "ENA (Architecture - Oujda/Tetouan)", sharedThresholds: [14.6, 15.0] }
];

const storageKey = "grade-calculator-state-v1";

const form = document.getElementById("grade-form");
const studentNameInput = document.getElementById("student-name");
const levelSelect = document.getElementById("level-select");
const afterBacCard = document.getElementById("after-bac-card");
const bacTrackSelect = document.getElementById("bac-track-select");
const regionalGradeInput = document.getElementById("regional-grade");
const subjectsContainer = document.getElementById("subjects-container");
const coefficientPill = document.getElementById("coefficient-pill");
const averageOutput = document.getElementById("average-output");
const bacAverageOutput = document.getElementById("bac-average-output");
const finalResultText = document.getElementById("final-result-text");
const resultLevel = document.getElementById("result-level");
const subjectCount = document.getElementById("subject-count");
const messageBox = document.getElementById("message-box");
const resetButton = document.getElementById("reset-btn");
const downloadPdfButton = document.getElementById("download-pdf");
const adviceList = document.getElementById("advice-list");
const schoolsList = document.getElementById("schools-list");

let gradesChart = null;
let latestReport = null;
let messageTimeoutId = null;

initializeApp();

function initializeApp() {
  populateLevelOptions();
  bindEvents();
  initializeChart();
  syncAfterBacUI();
  restoreSavedState();
}

function populateLevelOptions() {
  Object.keys(levelConfigurations).forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    levelSelect.appendChild(option);
  });
}

function bindEvents() {
  levelSelect.addEventListener("change", handleLevelChange);
  studentNameInput.addEventListener("input", persistState);
  bacTrackSelect.addEventListener("change", handleAfterBacChange);
  regionalGradeInput.addEventListener("input", persistState);
  form.addEventListener("submit", handleFormSubmit);
  resetButton.addEventListener("click", handleReset);
  downloadPdfButton.addEventListener("click", handlePdfDownload);
}

function handleLevelChange() {
  syncAfterBacUI();
  renderSubjectsForCurrentSelection();
  persistState();

  if (levelSelect.value) {
    showMessage("Niveau charge avec succes. Vous pouvez maintenant saisir les notes.", "success");
  }
}

function handleAfterBacChange() {
  renderSubjectsForCurrentSelection();
  persistState();
}

function syncAfterBacUI() {
  const isAfterBac = levelSelect.value === "Après BAC";
  afterBacCard.classList.toggle("is-hidden", !isAfterBac);
}

function renderSubjectsForCurrentSelection(restoredGrades = {}) {
  const level = levelSelect.value;

  if (level === "Après BAC") {
    renderAfterBacSubjects(bacTrackSelect.value, restoredGrades);
    return;
  }

  renderSubjects(level, restoredGrades);
}

function renderSubjects(level, restoredGrades = {}) {
  subjectsContainer.innerHTML = "";

  if (!level || !levelConfigurations[level]) {
    coefficientPill.textContent = "Aucun niveau selectionne";
    subjectsContainer.innerHTML = `
      <div class="empty-state">
        <p>Choisissez un niveau pour afficher la liste des matieres.</p>
      </div>
    `;
    subjectCount.textContent = "0";
    return;
  }

  const subjects = levelConfigurations[level];
  const coefficientTotal = subjects.reduce((sum, item) => sum + item.coefficient, 0);
  coefficientPill.textContent = `Total des coefficients : ${coefficientTotal}`;
  subjectCount.textContent = String(subjects.length);
  createSubjectInputs(subjects, restoredGrades);
}

function renderAfterBacSubjects(track, restoredGrades = {}) {
  subjectsContainer.innerHTML = "";

  if (!track || !nationalTracks[track]) {
    coefficientPill.textContent = "Choisissez une filiere BAC";
    subjectsContainer.innerHTML = `
      <div class="empty-state">
        <p>Choisissez d'abord la filiere Sciences Math ou Sciences Physiques pour saisir les notes du national.</p>
      </div>
    `;
    subjectCount.textContent = "0";
    return;
  }

  const subjects = nationalTracks[track];
  const coefficientTotal = subjects.reduce((sum, item) => sum + item.coefficient, 0);
  coefficientPill.textContent = `National ${track} • Total des coefficients : ${coefficientTotal}`;
  subjectCount.textContent = String(subjects.length);
  createSubjectInputs(subjects, restoredGrades);
}

function createSubjectInputs(subjects, restoredGrades) {
  subjects.forEach((item, index) => {
    const wrapper = document.createElement("label");
    wrapper.className = "subject-input";
    wrapper.style.animationDelay = `${index * 60}ms`;
    wrapper.innerHTML = `
      <div class="subject-input__head">
        <strong>${item.subject}</strong>
        <span>Coef ${item.coefficient}</span>
      </div>
      <input
        type="number"
        name="subject-${sanitizeKey(item.subject)}"
        min="0"
        max="20"
        step="0.01"
        placeholder="Saisir la note / 20"
        value="${restoredGrades[item.subject] ?? ""}"
        data-subject="${item.subject}"
      />
    `;

    const input = wrapper.querySelector("input");
    input.addEventListener("input", persistState);
    subjectsContainer.appendChild(wrapper);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const report = collectAndCalculate();
  if (!report) {
    return;
  }

  latestReport = report;
  updateResultUI(report);
  updateChart(report);
  updateAdvice(report);
  updateSchoolSuggestions(report);
  persistState(report);
  showMessage("Calcul termine avec succes.", "success");
}

function collectAndCalculate() {
  const level = levelSelect.value;

  if (!level) {
    showMessage("Veuillez choisir un niveau scolaire avant de calculer.", "error");
    return null;
  }

  if (level === "Après BAC") {
    return collectAfterBacReport();
  }

  return collectStandardReport(level);
}

function collectStandardReport(level) {
  const subjects = levelConfigurations[level];
  const grades = collectGradesFromSubjects(subjects);
  if (!grades) {
    return null;
  }

  return {
    studentName: studentNameInput.value.trim(),
    level,
    track: null,
    grades: grades.entries,
    average: grades.average,
    regionalGrade: null,
    bacAverage: null,
    mention: getMention(grades.average),
    generatedAt: new Date().toLocaleString()
  };
}

function collectAfterBacReport() {
  const track = bacTrackSelect.value;

  if (!track || !nationalTracks[track]) {
    showMessage("Veuillez choisir la filiere BAC avant de calculer.", "error");
    bacTrackSelect.focus();
    return null;
  }

  const grades = collectGradesFromSubjects(nationalTracks[track]);
  if (!grades) {
    return null;
  }

  const regionalRawValue = regionalGradeInput.value.trim();
  if (!regionalRawValue) {
    showMessage("Veuillez saisir la note regionale pour calculer la note generale du bac.", "error");
    regionalGradeInput.focus();
    return null;
  }

  const regionalGrade = Number(regionalRawValue);
  if (Number.isNaN(regionalGrade) || regionalGrade < 0 || regionalGrade > 20) {
    showMessage("La note regionale doit etre comprise entre 0 et 20.", "error");
    regionalGradeInput.focus();
    return null;
  }

  const bacAverage = roundToTwo((grades.average * 0.75) + (regionalGrade * 0.25));

  return {
    studentName: studentNameInput.value.trim(),
    level: "Après BAC",
    track,
    grades: grades.entries,
    average: grades.average,
    regionalGrade,
    bacAverage,
    mention: getMention(bacAverage),
    generatedAt: new Date().toLocaleString()
  };
}

function collectGradesFromSubjects(subjects) {
  const gradeInputs = [...subjectsContainer.querySelectorAll("input[data-subject]")];
  const gradeEntries = [];
  let weightedSum = 0;
  let totalCoefficients = 0;

  for (const subjectConfig of subjects) {
    const input = gradeInputs.find((entry) => entry.dataset.subject === subjectConfig.subject);
    const rawValue = input?.value.trim() ?? "";

    if (!rawValue) {
      showMessage(`Veuillez saisir une note pour ${subjectConfig.subject}.`, "error");
      input?.focus();
      return null;
    }

    const grade = Number(rawValue);
    if (Number.isNaN(grade) || grade < 0 || grade > 20) {
      showMessage(`La note de ${subjectConfig.subject} doit etre comprise entre 0 et 20.`, "error");
      input?.focus();
      return null;
    }

    weightedSum += grade * subjectConfig.coefficient;
    totalCoefficients += subjectConfig.coefficient;
    gradeEntries.push({
      subject: subjectConfig.subject,
      coefficient: subjectConfig.coefficient,
      grade
    });
  }

  return {
    entries: gradeEntries,
    average: roundToTwo(weightedSum / totalCoefficients)
  };
}

function updateResultUI(report) {
  resultLevel.textContent = report.track ? `Après BAC - ${report.track}` : report.level;
  averageOutput.textContent = `${report.average.toFixed(2)} / 20`;
  bacAverageOutput.textContent = report.bacAverage !== null ? `${report.bacAverage.toFixed(2)} / 20` : "-";

  if (report.level === "Après BAC") {
    finalResultText.textContent = `${report.studentName || "Cet eleve"} a obtenu ${report.average.toFixed(2)} / 20 au national et ${report.regionalGrade.toFixed(2)} / 20 au regional. La note generale du bac est ${report.bacAverage.toFixed(2)} / 20. Resultat : ${report.mention}.`;
    return;
  }

  finalResultText.textContent = `${report.studentName || "Cet eleve"} a obtenu une moyenne generale de ${report.average.toFixed(2)} / 20. Resultat : ${report.mention}.`;
}

function updateAdvice(report) {
  adviceList.innerHTML = "";

  report.grades.forEach((item) => {
    const advice = getSubjectAdvice(item.subject, item.grade);
    const card = document.createElement("article");
    card.className = "advice-item";
    card.innerHTML = `
      <div class="advice-item__head">
        <strong>${item.subject}</strong>
        <span class="advice-badge advice-badge--${advice.tone}">${item.grade.toFixed(2)} / 20</span>
      </div>
      <p>${advice.message}</p>
    `;
    adviceList.appendChild(card);
  });
}

function updateSchoolSuggestions(report) {
  schoolsList.innerHTML = "";

  if (report.level !== "Après BAC" || !report.track || report.bacAverage === null) {
    schoolsList.innerHTML = `
      <div class="empty-state">
        <p>Choisissez le niveau Après BAC pour calculer la note generale du bac et voir les ecoles recommandees.</p>
      </div>
    `;
    return;
  }

  const schools = postBacSchools
    .map((school) => {
      const thresholds = school.sharedThresholds || school.trackThresholds?.[report.track];
      if (!thresholds) {
        return null;
      }

      return {
        ...school,
        thresholds,
        chance: estimateAdmissionChance(report.bacAverage, thresholds)
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.chance - a.chance);

  schools.forEach((school) => {
    const tone = school.chance >= 75 ? "high" : school.chance >= 45 ? "medium" : "low";
    const [minThreshold, maxThreshold] = school.thresholds;
    const thresholdText = minThreshold === maxThreshold
      ? `${minThreshold.toFixed(2)}`
      : `${minThreshold.toFixed(2)} - ${maxThreshold.toFixed(2)}`;

    const card = document.createElement("article");
    card.className = `school-card school-card--${tone}`;
    card.innerHTML = `
      <div class="school-gauge" style="--progress: ${school.chance * 3.6}deg;">
        <span>${school.chance}%</span>
      </div>
      <div>
        <h4>${school.name}</h4>
        <p>${getChanceMessage(school.chance)}</p>
        <div class="school-meta">Seuil de reference (${report.track}) : ${thresholdText}${school.note ? ` • ${school.note}` : ""}</div>
      </div>
    `;
    schoolsList.appendChild(card);
  });
}

function estimateAdmissionChance(average, thresholds) {
  const [minThreshold, maxThreshold] = thresholds;
  const target = (minThreshold + maxThreshold) / 2;
  const range = Math.max(0.5, maxThreshold - minThreshold);
  const delta = average - target;

  if (average >= maxThreshold + 2) {
    return 95;
  }

  if (average >= maxThreshold + 1) {
    return 88;
  }

  if (average >= maxThreshold) {
    return 78;
  }

  if (average >= minThreshold) {
    return clamp(Math.round(60 + ((average - minThreshold) / range) * 15), 60, 75);
  }

  if (delta >= -1) {
    return clamp(Math.round(42 + (delta + 1) * 16), 42, 58);
  }

  if (delta >= -2.5) {
    return clamp(Math.round(16 + (delta + 2.5) * 10), 16, 40);
  }

  return 5;
}

function getChanceMessage(chance) {
  if (chance >= 75) {
    return "Bonne chance estimee d'acces si les autres conditions du concours sont remplies.";
  }

  if (chance >= 45) {
    return "Chance moyenne : un bon dossier et une bonne preparation peuvent faire la difference.";
  }

  return "Chance plus faible pour le moment : il faut viser une meilleure moyenne ou des options plus accessibles.";
}

function getSubjectAdvice(subject, grade) {
  const subjectKey = subject.toLowerCase();
  const subjectTips = {
    mathematiques: "Entrainez-vous chaque jour avec de petits exercices varies et revoyez bien les etapes de correction, pas seulement la reponse finale.",
    "physique et chimie": "Concentrez-vous sur les formules, les unites et la methode de resolution. Refaites les exercices jusqu'a rendre le raisonnement naturel.",
    svt: "Revisez les schemas, les definitions et les processus essentiels. Les resumes et dessins annotes sont tres utiles.",
    francais: "Travaillez la comprehension, l'expression ecrite et le vocabulaire avec une pratique reguliere.",
    arabe: "Renforcez la grammaire, l'expression et l'analyse de texte avec des exercices reguliers et des corrections detaillees.",
    "education islamique": "Revisez les lecons par petites parties et retenez clairement les idees principales et leurs explications.",
    "histoire et geographie": "Construisez des frises, des cartes et de petits resumes pour mieux memoriser et organiser vos reponses.",
    anglais: "Travaillez le vocabulaire, la lecture et la structure des phrases de maniere continue. L'ecoute et la redaction courte aideront aussi.",
    informatique: "Travaillez regulierement les bases, la logique et les exercices pratiques pour gagner en aisance.",
    "education physique": "Gardez un rythme regulier et soyez constant dans la participation, la technique et la preparation.",
    philosophie: "Ameliorez la structure de vos redactions, les definitions de notions et la clarte de l'argumentation.",
    "assiduite et conduite": "Continuez a faire preuve de serieux, de ponctualite et de bon comportement chaque jour."
  };

  const tip = subjectTips[subjectKey] || "Revisez regulierement cette matiere, identifiez vos difficultes et entrainez-vous avec des exercices corriges.";

  if (grade >= 16) {
    return {
      tone: "strong",
      message: `Excellent resultat en ${subject}. Continuez sur cette lancee et gardez un bon niveau d'exigence. ${tip}`
    };
  }

  if (grade >= 10) {
    return {
      tone: "medium",
      message: `${subject} est sur la bonne voie, mais il reste une marge de progression. Concentrez-vous sur les points ou vous perdez le plus de notes. ${tip}`
    };
  }

  return {
    tone: "focus",
    message: `${subject} demande plus d'attention pour le moment. Revenez aux bases, demandez de l'aide si besoin et travaillez par petites seances regulieres. ${tip}`
  };
}

function getMention(average) {
  if (average >= 16) {
    return "Excellent";
  }

  if (average >= 14) {
    return "Tres bien";
  }

  if (average >= 12) {
    return "Bien";
  }

  if (average >= 10) {
    return "Admis";
  }

  return "A renforcer";
}

function initializeChart() {
  const context = document.getElementById("grades-chart");
  gradesChart = new Chart(context, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Note / 20",
          data: [],
          borderRadius: 12,
          backgroundColor: [
            "#56e0c6",
            "#62d7d8",
            "#6ba8ff",
            "#8ab9ff",
            "#73e1b2",
            "#79a7ff",
            "#5ccfd9",
            "#8bd6ff",
            "#7ce7c6",
            "#7ff0d3",
            "#74a8ff",
            "#f0c46a"
          ]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#eef4ff"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#94a6c4"
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          }
        },
        y: {
          min: 0,
          max: 20,
          ticks: {
            color: "#94a6c4",
            stepSize: 2
          },
          grid: {
            color: "rgba(255,255,255,0.08)"
          }
        }
      }
    }
  });
}

function updateChart(report) {
  if (!gradesChart) {
    return;
  }

  gradesChart.data.labels = report.grades.map((item) => item.subject);
  gradesChart.data.datasets[0].data = report.grades.map((item) => item.grade);
  gradesChart.update();
}

function handlePdfDownload() {
  const report = latestReport ?? collectAndCalculate();

  if (!report) {
    return;
  }

  latestReport = report;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(7, 17, 31);
  doc.rect(0, 0, 210, 36, "F");
  doc.setTextColor(238, 244, 255);
  doc.setFontSize(20);
  doc.text("Rapport de notes", 14, 22);

  doc.setTextColor(33, 37, 41);
  doc.setFontSize(11);
  doc.text(`Nom : ${report.studentName || "N/A"}`, 14, 50);
  doc.text(`Niveau : ${report.track ? `Après BAC - ${report.track}` : report.level}`, 14, 58);
  doc.text(`Genere le : ${report.generatedAt}`, 14, 66);
  doc.text(`Moyenne nationale : ${report.average.toFixed(2)} / 20`, 14, 74);

  if (report.bacAverage !== null) {
    doc.text(`Note regionale : ${report.regionalGrade.toFixed(2)} / 20`, 14, 82);
    doc.text(`Note generale du bac : ${report.bacAverage.toFixed(2)} / 20`, 14, 90);
    doc.text(`Resultat : ${report.mention}`, 14, 98);
  } else {
    doc.text(`Resultat : ${report.mention}`, 14, 82);
  }

  doc.autoTable({
    startY: report.bacAverage !== null ? 108 : 100,
    head: [["Matiere", "Coefficient", "Note"]],
    body: report.grades.map((item) => [
      item.subject,
      item.coefficient,
      item.grade.toFixed(2)
    ]),
    theme: "grid",
    headStyles: {
      fillColor: [11, 22, 41]
    }
  });

  const chartCanvas = document.getElementById("grades-chart");
  const chartImage = chartCanvas.toDataURL("image/png", 1.0);
  const tableEndY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 100;
  const chartStartY = tableEndY + 12;

  if (chartStartY > 180) {
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Graphique des notes", 14, 18);
    doc.addImage(chartImage, "PNG", 14, 26, 182, 90);
  } else {
    doc.setFontSize(14);
    doc.text("Graphique des notes", 14, chartStartY);
    doc.addImage(chartImage, "PNG", 14, chartStartY + 8, 182, 90);
  }

  const safeName = report.studentName ? sanitizeKey(report.studentName) : "student";
  doc.save(`${safeName}-${sanitizeKey(report.track || report.level)}-report.pdf`);
  showMessage("Le rapport PDF a ete telecharge avec succes.", "success");
}

function handleReset() {
  form.reset();
  localStorage.removeItem(storageKey);
  latestReport = null;
  renderSubjectsForCurrentSelection();
  syncAfterBacUI();
  resultLevel.textContent = "-";
  averageOutput.textContent = "0.00 / 20";
  bacAverageOutput.textContent = "-";
  subjectCount.textContent = "0";
  finalResultText.textContent = "Choisissez un niveau et saisissez les notes pour voir le resultat final.";
  adviceList.innerHTML = `
    <div class="empty-state">
      <p>Calculez le resultat pour obtenir des conseils personnalises pour chaque matiere.</p>
    </div>
  `;
  schoolsList.innerHTML = `
    <div class="empty-state">
      <p>Choisissez le niveau Après BAC pour calculer la note generale du bac et voir les ecoles recommandees.</p>
    </div>
  `;
  updateChart({ grades: [] });
  showMessage("Le calculateur a ete reinitialise avec succes.", "success");
}

function persistState(calculatedReport = latestReport) {
  const selectedLevel = levelSelect.value;
  const grades = {};

  subjectsContainer.querySelectorAll("input[data-subject]").forEach((input) => {
    grades[input.dataset.subject] = input.value;
  });

  const state = {
    studentName: studentNameInput.value,
    level: selectedLevel,
    bacTrack: bacTrackSelect.value,
    regionalGrade: regionalGradeInput.value,
    grades,
    latestReport: calculatedReport
  };

  localStorage.setItem(storageKey, JSON.stringify(state));
}

function restoreSavedState() {
  const rawState = localStorage.getItem(storageKey);
  if (!rawState) {
    return;
  }

  try {
    const savedState = JSON.parse(rawState);
    const restoredLevel = levelConfigurations[savedState.level] ? savedState.level : "";
    studentNameInput.value = savedState.studentName ?? "";
    levelSelect.value = restoredLevel;
    bacTrackSelect.value = savedState.bacTrack ?? "";
    regionalGradeInput.value = savedState.regionalGrade ?? "";
    syncAfterBacUI();
    renderSubjectsForCurrentSelection(savedState.grades ?? {});

    if (savedState.latestReport) {
      latestReport = savedState.latestReport;
      updateResultUI(savedState.latestReport);
      updateChart(savedState.latestReport);
      updateAdvice(savedState.latestReport);
      updateSchoolSuggestions(savedState.latestReport);
    }
  } catch (error) {
    localStorage.removeItem(storageKey);
    showMessage("Les donnees sauvegardees etaient invalides et ont ete effacees.", "error");
  }
}

function showMessage(text, type) {
  window.clearTimeout(messageTimeoutId);
  messageBox.textContent = text;
  messageBox.className = `message is-visible ${type === "success" ? "is-success" : "is-error"}`;

  messageTimeoutId = window.setTimeout(() => {
    messageBox.className = "message";
    messageBox.textContent = "";
  }, 3200);
}

function sanitizeKey(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function roundToTwo(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
