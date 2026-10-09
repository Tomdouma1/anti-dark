// Anti-Dark - Ewan en Tom V2
// Geen framework, alles wordt in localStorage opgeslagen (demo zonder backend)

// --- DATA: PAGINA'S ---
// [bestand, titel, omschrijving]
const PAGINAS = [
    ["index.html", "Home", "Trap niet in online trucjes. Start hier."],
    ["wat-zijn-dark-patterns.html", "Wat zijn dark patterns?", "Uitleg over dark patterns en ontwerpregels voor eerlijke websites."],
    ["voorbeelden.html", "Voorbeelden", "Vergelijk misleidende en eerlijke ontwerpen: cookies, afmelden, schaarste, kosten."],
    ["quiz.html", "Quiz", "Test of jij dark patterns herkent."],
    ["deel-je-tips.html", "Deel je tips", "Lees en deel tips en meningen over dark patterns."],
    ["zoek.html", "Zoek", "Zoek in voorbeelden, tips en pagina's."]
];

// --- DATA: VOORBEELDEN ---
// slecht = misleidend, goed = eerlijk
// Alles zelf gemaakt, dus geen echte bedrijven
const VOORBEELDEN = [
    {
        id: "cookies",
        naam: "Misleidende cookiebanner",
        uitleg: "Accepteren is groot en kleurrijk, weigeren is bijna onzichtbaar. Zo klik je snel 'ja'.",
        slechtReden: "Weigeren zit verstopt in een klein grijs linkje.",
        goedReden: "Accepteren en weigeren zijn even groot en even duidelijk.",
        slecht: `<div class="mock"><p>Wij gebruiken cookies om je ervaring te verbeteren.</p><div class="m-row"><span class="m-btn big">Alles accepteren</span><span class="m-faint">instellingen</span></div></div>`,
        goed: `<div class="mock"><p>Wij gebruiken cookies. Jij kiest.</p><div class="m-row"><span class="m-btn">Accepteren</span><span class="m-btn plain">Weigeren</span></div></div>`
    },
    {
        id: "afmelden",
        naam: "Verstopte afmeldknop",
        uitleg: "Aanmelden ging met één klik, maar afmelden is lastig te vinden.",
        slechtReden: "De afmeldlink is bijna onzichtbaar (lichtgrijs, piepklein).",
        goedReden: "Eén duidelijke knop: afmelden is net zo makkelijk als aanmelden.",
        slecht: `<div class="mock"><p>Bedankt voor het lezen van onze nieuwsbrief!</p><p class="m-faint">afmelden</p></div>`,
        goed: `<div class="mock"><p>Bedankt voor het lezen van onze nieuwsbrief!</p><div class="m-row"><span class="m-btn plain">Afmelden</span></div></div>`
    },
    {
        id: "schaarste",
        naam: "Nep-schaarste",
        uitleg: "Er lijkt haast bij te zijn, waardoor je sneller koopt dan je wilt.",
        slechtReden: "Druk met 'nog maar 2' en 'nu bekeken door 14 mensen' zonder bewijs.",
        goedReden: "Rustige, controleerbare informatie zonder druk.",
        slecht: `<div class="mock"><p class="m-red">Nog maar 2 kamers beschikbaar!</p><p class="m-red">14 mensen bekijken dit nu</p><div class="m-row"><span class="m-btn big">Nu boeken</span></div></div>`,
        goed: `<div class="mock"><p>12 kamers beschikbaar.</p><p class="m-price">Prijs blijft gelijk tot je boekt.</p><div class="m-row"><span class="m-btn">Boeken</span></div></div>`
    },
    {
        id: "kosten",
        naam: "Extra kosten aan de kassa",
        uitleg: "De prijs lijkt laag, maar aan het eind komen er extra's bij.",
        slechtReden: "Servicekosten en een verzekering die al is aangevinkt.",
        goedReden: "Totaalprijs vooraf, extra's zijn optioneel en staan uit.",
        slecht: `<div class="mock"><p><b>Product: € 19,99</b></p><p class="m-price">+ servicekosten € 4,95<br>+ verzekering € 2,50 (aangevinkt)</p><div class="m-row"><span class="m-btn">Betalen: € 27,44</span></div></div>`,
        goed: `<div class="mock"><p><b>Totaal: € 19,99</b></p><p class="m-price">Inclusief alle kosten.<br>Verzekering (€ 2,50) is optioneel: uit.</p><div class="m-row"><span class="m-btn">Betalen: € 19,99</span></div></div>`
    },
    {
        id: "schuldgevoel",
        naam: "Schuldgevoel-knop",
        uitleg: "Nee zeggen wordt met een beschamende tekst lastig gemaakt.",
        slechtReden: "De 'nee'-knop is een verwijt: 'Nee, ik betaal liever te veel'.",
        goedReden: "Neutrale keuzes: gewoon 'Ja' of 'Nee, bedankt'.",
        slecht: `<div class="mock"><p>Mis onze korting niet!</p><div class="m-row"><span class="m-btn big">Ja, ik wil korting</span></div><p class="m-faint">Nee, ik betaal liever te veel</p></div>`,
        goed: `<div class="mock"><p>Wil je 10% korting?</p><div class="m-row"><span class="m-btn">Ja, graag</span><span class="m-btn plain">Nee, bedankt</span></div></div>`
    }
];

// --- DATA: QUIZVRAGEN ---
// voorbeeld = welk voorbeeldscherm erbij getoond wordt
// juist = nummer van het goede antwoord (begint bij 0)
const QUIZ_VRAGEN = [
    {
        voorbeeld: "cookies",
        vraag: "Wat maakt dit design over cookies potentieel problematisch?",
        opties: ["Er staat te veel tekst", "Weigeren is bijna onzichtbaar, accepteren valt op", "De banner heeft de verkeerde kleur", "De cookies worden meteen verwijderd"],
        juist: 1,
        uitleg: "Het zetten van de weigerknop in een klein linkje is een dark pattern."
    },
    {
        voorbeeld: "afmelden",
        vraag: "Wat is er mis met deze nieuwsbrief?",
        opties: ["De afmeldlink is bijna niet te zien", "De tekst is te kort", "Er staat geen logo op", "Je krijgt geen bedankje"],
        juist: 0,
        uitleg: "Afmelden hoort net zo makkelijk te zijn als aanmelden."
    },
    {
        voorbeeld: "schaarste",
        vraag: "Welke truc zie je bij deze boeking?",
        opties: ["Extra kosten aan de kassa", "Verborgen cookies", "Nep-druk met 'nog maar 2' en 'nu bekeken'", "Een eerlijke prijsvergelijking"],
        juist: 2,
        uitleg: "Nep-schaarste zet je onder tijdsdruk, zodat je minder nadenkt."
    },
    {
        voorbeeld: "kosten",
        vraag: "Waarom is deze kassa misleidend?",
        opties: ["De knop is te groot", "Het product is te goedkoop", "Er staat geen prijs", "Er komen extra kosten bij en de verzekering staat al aan"],
        juist: 3,
        uitleg: "Kijk altijd naar het eindbedrag en haal aangevinkte extra's weg."
    },
    {
        voorbeeld: "schuldgevoel",
        vraag: "Wat is er problematisch aan de 'nee'-knop?",
        opties: ["Hij maakt je een schuldgevoel aan", "Hij is te groot", "Hij staat links", "Er is geen 'nee'-knop"],
        juist: 0,
        uitleg: "Een keuze hoort neutraal te zijn, zonder schuldgevoel."
    }
];

// --- DATA: TIPS (startberichten) ---
const TIPS_START = [
    {
        id: 1,
        titel: "Afmelden lukt niet",
        naam: "Voorbeeld: Sanne",
        eigen: false,
        tekst: "De afmeldlink was lichtgrijs onderaan de mail. Tip: zoom in of selecteer alle tekst, dan zie je hem wel.",
        reacties: [{ naam: "Voorbeeld: Mo", tekst: "Handige tip! Ik zoek nu altijd onderaan de mail." }]
    },
    {
        id: 2,
        titel: "Aangevinkte verzekering",
        naam: "Voorbeeld: Piet",
        eigen: false,
        tekst: "Bij het afrekenen stond een verzekering al aangevinkt. Controleer altijd het eindbedrag voor je betaalt.",
        reacties: []
    }
];

// --- HULPFUNCTIES ---
// Korte versie van document.querySelector
function pak(selector, ouder = document) {
    return ouder.querySelector(selector);
}

// Maakt tekst van gebruikers veilig, zodat niemand HTML kan inplakken
function maakVeilig(tekst) {
    const vervangingen = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return String(tekst).replace(/[&<>"']/g, teken => vervangingen[teken]);
}

// Opslag in de browser (localStorage)
// Als opslag niet kan, werkt de pagina gewoon door
const opslag = {
    haal(sleutel, standaard) {
        try {
            return JSON.parse(localStorage.getItem(sleutel)) ?? standaard;
        } catch {
            return standaard;
        }
    },
    zet(sleutel, waarde) {
        try {
            localStorage.setItem(sleutel, JSON.stringify(waarde));
        } catch {
            // opslag niet beschikbaar, niks aan de hand
        }
    }
};

// --- LAYOUT: header en footer ---
// Elke pagina krijgt dezelfde header en footer (consistentie)
function bouwLayout() {
    const huidige = location.pathname.split("/").pop() || "index.html";

    // Menulinks (zonder Home, die zit in het logo)
    let menuLinks = "";
    for (const [bestand, titel] of PAGINAS.slice(1)) {
        const actief = bestand === huidige ? ' aria-current="page"' : "";
        menuLinks += `<a href="${bestand}"${actief}>${titel}</a>`;
    }

    // Footerlinks (wel met Home)
    let footerLinks = "";
    for (const [bestand, titel] of PAGINAS) {
        footerLinks += `<a href="${bestand}">${titel}</a>`;
    }

    document.body.insertAdjacentHTML("afterbegin",
        `<a class="skip" href="#main">Ga naar de inhoud</a>
        <header class="site-header">
            <a class="logo" href="index.html"><img src="images/logo.png" alt="Anti-Dark, naar de homepage"></a>
            <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
            <nav class="site-nav" id="nav" aria-label="Hoofdmenu">${menuLinks}</nav>
        </header>`);

    document.body.insertAdjacentHTML("beforeend",
        `<footer class="site-footer">
            <p>Anti-Dark - zie de trucjes. kies eerlijk.<br>Schoolproject van Ewan Schoonhoven en Tom Douma.</p>
            <p>${footerLinks}</p>
        </footer>`);

    // Menuknop voor op de telefoon
    const menuknop = pak(".menu-btn");
    const menu = pak("#nav");
    menuknop.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        menuknop.setAttribute("aria-expanded", isOpen);
    });
}

// --- PAGINA: VOORBEELDEN (carrousel) ---
// Toestand 1: misleidende versie (eerlijk = false)
// Toestand 2: eerlijke versie (eerlijk = true)
function startVoorbeelden() {
    const vak = pak("#example");
    let nu = 0;
    let eerlijk = false;

    // Via de zoekpagina kun je direct naar een voorbeeld (?v=cookies)
    const gevraagd = new URLSearchParams(location.search).get("v");
    const startIndex = VOORBEELDEN.findIndex(v => v.id === gevraagd);
    if (startIndex >= 0) {
        nu = startIndex;
    }

    function teken() {
        const v = VOORBEELDEN[nu];
        const titelReden = eerlijk ? "Waarom dit eerlijk is:" : "Waarom dit misleidt:";
        const reden = eerlijk ? v.goedReden : v.slechtReden;
        const labelTekst = eerlijk ? "Eerlijk" : "Misleidend";
        const mock = eerlijk ? v.goed : v.slecht;
        const knopTekst = eerlijk ? "Toon misleidende versie" : "Toon eerlijke versie";

        vak.innerHTML = `
            <div>
                <p class="label">Voorbeeld ${nu + 1} van ${VOORBEELDEN.length}</p>
                <h2>Dit is een voorbeeld van: ${v.naam}</h2>
                <p>${v.uitleg}</p>
                <p class="hint"><b>${titelReden}</b> ${reden}</p>
            </div>
            <div>
                <div class="mockwrap ${eerlijk ? "is-good" : ""}">
                    <span class="tag">${labelTekst}</span>${mock}
                </div>
                <p class="center"><button class="btn btn-second" id="flip">${knopTekst}</button></p>
            </div>`;

        // Wisselknop: misleidend <-> eerlijk
        pak("#flip").addEventListener("click", () => {
            eerlijk = !eerlijk;
            teken();
            pak("#flip").focus();
        });
    }

    // Stap vooruit (+1) of terug (-1), na de laatste weer naar de eerste
    function ga(stap) {
        nu = (nu + stap + VOORBEELDEN.length) % VOORBEELDEN.length;
        eerlijk = false;
        teken();
    }

    pak("#prev").addEventListener("click", () => ga(-1));
    pak("#next").addEventListener("click", () => ga(1));

    // Pijltjestoetsen werken ook
    document.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") ga(-1);
        if (event.key === "ArrowRight") ga(1);
    });

    teken();
}

// --- PAGINA: QUIZ ---
// Toestand 1: vraag tonen, wachten op antwoord
// Toestand 2: beantwoord, knop 'volgende' werkt
// Toestand 3: score tonen
function startQuiz() {
    const vak = pak("#quiz");
    let vraagNr = 0;
    let score = 0;
    let beantwoord = false;

    function toonVraag() {
        const vraag = QUIZ_VRAGEN[vraagNr];
        const voorbeeld = VOORBEELDEN.find(v => v.id === vraag.voorbeeld);
        beantwoord = false;

        // Antwoordknoppen met letters A, B, C, D
        let knoppen = "";
        vraag.opties.forEach((optie, nr) => {
            knoppen += `<button class="opt" data-n="${nr}"><b>${"ABCD"[nr]}.</b><span>${optie}</span></button>`;
        });

        const voortgang = vraagNr / QUIZ_VRAGEN.length * 100;
        const laatste = vraagNr === QUIZ_VRAGEN.length - 1;

        vak.innerHTML = `
            <p class="label" id="qcount">Vraag ${vraagNr + 1} van ${QUIZ_VRAGEN.length}</p>
            <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${QUIZ_VRAGEN.length}" aria-valuenow="${vraagNr}">
                <span style="width:${voortgang}%"></span>
            </div>
            <h2 class="center">${vraag.vraag}</h2>
            <div class="quiz-body">
                <div class="mockwrap"><span class="tag">Voorbeeld</span>${voorbeeld.slecht}</div>
                <div class="options" role="group" aria-label="Antwoorden">${knoppen}</div>
            </div>
            <p class="feedback" aria-live="polite">Kies een antwoord (of druk op A, B, C of D).</p>
            <p class="center"><button class="btn" id="nextq" disabled>${laatste ? "Bekijk je score" : "Volgende vraag"}</button></p>`;

        vak.querySelectorAll(".opt").forEach(knop => {
            knop.addEventListener("click", () => geefAntwoord(Number(knop.dataset.n)));
        });

        pak("#nextq").addEventListener("click", () => {
            vraagNr++;
            if (vraagNr < QUIZ_VRAGEN.length) {
                toonVraag();
            } else {
                toonScore();
            }
        });
    }

    function geefAntwoord(keuze) {
        if (beantwoord) return;
        beantwoord = true;

        const vraag = QUIZ_VRAGEN[vraagNr];
        const isGoed = keuze === vraag.juist;
        if (isGoed) score++;

        // Goede antwoord groen, fout gekozen antwoord rood
        vak.querySelectorAll(".opt").forEach((knop, nr) => {
            knop.disabled = true;
            if (nr === vraag.juist) {
                knop.classList.add("right");
            } else if (nr === keuze) {
                knop.classList.add("wrong");
            }
        });

        pak(".feedback").textContent = (isGoed ? "Goed gezien! " : "Bijna! ") + vraag.uitleg;
        pak("#nextq").disabled = false;
        pak("#nextq").focus();
    }

    function toonScore() {
        const beste = Math.max(score, opslag.haal("antidark-best", 0));
        opslag.zet("antidark-best", beste);

        const bericht = score >= 4
            ? "Sterk! Jij herkent de trucjes goed."
            : "Goed bezig! Bekijk de voorbeelden en probeer het nog eens.";

        vak.innerHTML = `
            <div class="center">
                <h2>Je score: ${score} van ${QUIZ_VRAGEN.length}</h2>
                <p>${bericht}</p>
                <p>Beste score op dit apparaat: ${beste} van ${QUIZ_VRAGEN.length}</p>
                <p class="cta-row" style="justify-content:center">
                    <button class="btn" id="again">Quiz opnieuw doen</button>
                    <a class="btn btn-second" href="voorbeelden.html">Bekijk voorbeelden</a>
                </p>
            </div>`;

        pak("#again").addEventListener("click", () => {
            vraagNr = 0;
            score = 0;
            toonVraag();
        });
    }

    // Toetsen A t/m D werken ook, behalve als je in een invulveld zit
    document.addEventListener("keydown", event => {
        const nr = "abcd".indexOf(event.key.toLowerCase());
        const isLetter = event.key.length === 1;
        const opVraag = vak.querySelector(".opt");
        const inInvulveld = event.target.matches("input, textarea");
        if (nr >= 0 && isLetter && opVraag && !inInvulveld) {
            geefAntwoord(nr);
        }
    });

    toonVraag();
}

// --- PAGINA: TIPS ---
// Tips en reacties staan in localStorage (alleen op dit apparaat)
function startTips() {
    const lijst = pak("#posts");
    let berichten = opslag.haal("antidark-tips", TIPS_START);

    function bewaar() {
        opslag.zet("antidark-tips", berichten);
    }

    function teken() {
        if (berichten.length === 0) {
            lijst.innerHTML = "<p>Nog geen tips. Deel de eerste!</p>";
            return;
        }

        let html = "";
        for (const b of berichten) {
            // Reacties onder de tip
            let reactiesHtml = "";
            for (const r of b.reacties) {
                reactiesHtml += `<div class="reply"><b>${maakVeilig(r.naam)}</b><p>${maakVeilig(r.tekst)}</p></div>`;
            }

            // Verwijderknop alleen bij je eigen tips
            const verwijderKnop = b.eigen
                ? `<button class="link-btn" data-del="${b.id}">Verwijder mijn tip</button>`
                : "";

            html += `
                <article class="card post" data-id="${b.id}">
                    <header><h3>${maakVeilig(b.titel)}</h3><span class="by">Door ${maakVeilig(b.naam)}</span></header>
                    <p>${maakVeilig(b.tekst)}</p>
                    ${reactiesHtml}
                    <details>
                        <summary>Reageer</summary>
                        <form class="reply-form" novalidate>
                            <label>Je naam<input name="naam" maxlength="30"></label>
                            <label>Je mening<textarea name="tekst" rows="2" maxlength="300"></textarea></label>
                            <p class="error" role="alert"></p>
                            <button class="btn">Plaats reactie</button>
                        </form>
                    </details>
                    ${verwijderKnop}
                </article>`;
        }
        lijst.innerHTML = html;
    }

    // Reactie plaatsen
    lijst.addEventListener("submit", event => {
        event.preventDefault();
        const formulier = event.target;
        const id = Number(formulier.closest(".post").dataset.id);
        const fout = formulier.querySelector(".error");
        const naam = formulier.naam.value.trim();
        const tekst = formulier.tekst.value.trim();

        if (!naam) {
            fout.textContent = "Vul je naam in om te reageren.";
            return;
        }
        if (tekst.length < 5) {
            fout.textContent = "Schrijf een korte reactie (minstens 5 tekens).";
            return;
        }

        berichten.find(b => b.id === id).reacties.push({ naam, tekst });
        bewaar();
        teken();
    });

    // Eigen tip verwijderen (met een vraag vooraf)
    lijst.addEventListener("click", event => {
        const id = Number(event.target.dataset.del);
        if (!id) return;
        if (confirm("Weet je zeker dat je jouw tip wilt verwijderen?")) {
            berichten = berichten.filter(b => b.id !== id);
            bewaar();
            teken();
        }
    });

    // Nieuwe tip plaatsen
    pak("#new-tip").addEventListener("submit", event => {
        event.preventDefault();
        const formulier = event.target;
        const melding = pak("#tip-msg");
        melding.className = "error";

        const naam = formulier.naam.value.trim();
        const titel = formulier.titel.value.trim();
        const tekst = formulier.tekst.value.trim();

        if (!naam) {
            melding.textContent = "Vul je naam in, zodat anderen weten van wie de tip is.";
            formulier.naam.focus();
            return;
        }
        if (!titel) {
            melding.textContent = "Geef je tip een korte titel.";
            formulier.titel.focus();
            return;
        }
        if (tekst.length < 10) {
            melding.textContent = "Schrijf iets meer (minstens 10 tekens), zodat anderen er wat aan hebben.";
            formulier.tekst.focus();
            return;
        }

        berichten.unshift({ id: Date.now(), titel, naam, tekst, eigen: true, reacties: [] });
        bewaar();
        teken();
        formulier.reset();
        melding.className = "ok";
        melding.textContent = "Bedankt! Je tip is geplaatst.";
    });

    // Alles terugzetten naar de voorbeeldberichten
    pak("#reset-tips").addEventListener("click", () => {
        if (confirm("Alle tips terugzetten naar de voorbeeldberichten? Je eigen tips verdwijnen.")) {
            berichten = JSON.parse(JSON.stringify(TIPS_START));
            bewaar();
            teken();
        }
    });

    teken();
}

// --- PAGINA: ZOEKEN ---
function startZoeken() {
    const invoer = pak("#q");
    const uitvoer = pak("#results");

    function zoek() {
        const zoekterm = invoer.value.trim().toLowerCase();
        if (zoekterm.length < 2) {
            uitvoer.innerHTML = "<p>Typ minstens 2 letters om te zoeken.</p>";
            return;
        }

        // Alles waarin gezocht wordt in 1 lijst: pagina's, voorbeelden en tips
        const alles = [];
        for (const [bestand, titel, omschrijving] of PAGINAS.slice(0, 5)) {
            alles.push({ link: bestand, titel: titel, tekst: omschrijving, soort: "Pagina" });
        }
        for (const v of VOORBEELDEN) {
            alles.push({ link: "voorbeelden.html?v=" + v.id, titel: v.naam, tekst: v.uitleg, soort: "Voorbeeld" });
        }
        for (const b of opslag.haal("antidark-tips", TIPS_START)) {
            alles.push({ link: "deel-je-tips.html", titel: b.titel, tekst: b.tekst, soort: "Tip" });
        }

        const gevonden = alles.filter(item => (item.titel + " " + item.tekst).toLowerCase().includes(zoekterm));

        if (gevonden.length === 0) {
            uitvoer.innerHTML = "<p>Geen resultaten gevonden. Probeer een ander woord, bijvoorbeeld 'cookies' of 'afmelden'.</p>";
            return;
        }

        let lijst = "";
        for (const item of gevonden) {
            lijst += `<li><a href="${item.link}"><b>${maakVeilig(item.titel)}</b></a> <span class="label">${item.soort}</span><br>${maakVeilig(item.tekst)}</li>`;
        }
        const meervoud = gevonden.length > 1 ? "en" : "";
        uitvoer.innerHTML = `<p>${gevonden.length} resultaat${meervoud} gevonden:</p><ul class="results">${lijst}</ul>`;
    }

    // Resultaten verschijnen terwijl je typt
    invoer.addEventListener("input", zoek);
    pak("#search-form").addEventListener("submit", event => {
        event.preventDefault();
        zoek();
    });

    // Zoekterm uit de link overnemen (?q=cookies)
    invoer.value = new URLSearchParams(location.search).get("q") || "";
    if (invoer.value) {
        zoek();
    }
}

// --- START ---
// Elke pagina heeft data-page op de body, daarmee kiezen we wat er start
document.addEventListener("DOMContentLoaded", () => {
    bouwLayout();

    const pagina = document.body.dataset.page;
    if (pagina === "voorbeelden") startVoorbeelden();
    if (pagina === "quiz") startQuiz();
    if (pagina === "tips") startTips();
    if (pagina === "zoek") startZoeken();
});
