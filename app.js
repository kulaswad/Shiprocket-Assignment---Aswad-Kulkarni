const tabs = Array.from(document.querySelectorAll(".switch-tab"));
const screens = {
  patient: document.querySelector("#patient-screen"),
  desk: document.querySelector("#desk-screen"),
};
let toastTimer;
let countdownTimer;

function showScreen(screenName, updateHash = false) {
  const activeScreen = screens[screenName] ? screenName : "patient";

  Object.entries(screens).forEach(([name, screen]) => {
    const isActive = name === activeScreen;
    screen.hidden = !isActive;
    screen.classList.toggle("is-visible", isActive);
  });

  tabs.forEach((tab) => {
    const isActive = tab.hash === `#${activeScreen}`;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-current", isActive ? "page" : "false");
  });

  if (updateHash && window.location.hash !== `#${activeScreen}`) {
    window.location.hash = activeScreen;
  }
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    showScreen(tab.hash.slice(1), true);
  });
});

function syncScreenWithHash() {
  const requestedScreen = window.location.hash.slice(1);
  showScreen(requestedScreen || "patient", !screens[requestedScreen]);
}

window.addEventListener("hashchange", syncScreenWithHash);
syncScreenWithHash();

const initialLeads = [
  {
    id: "lead-01", name: "Aditi Rao", initials: "AR", phone: "+91 98450 21876",
    treatment: "Braces consultation", clinic: "Koramangala, Bengaluru", minutesAgo: 4, elapsed: "4 min ago",
    outcome: "Handoff", stage: "needs-call", urgency: "Swelling mentioned", humanRequested: true, bookedByAI: false,
    summary: ["Enquired about braces for her 16-year-old daughter.", "Asked if a clinic coordinator could explain the next steps.", "Mentioned swelling; the AI did not offer clinical advice."],
    handoffReason: "Swelling was mentioned. Clinical concerns are routed to a staff member.",
    fields: { budget: "Not discussed", time: "Today, after 4 pm", previous: "No prior braces", language: "English" },
    transcript: [["AI assistant", "Hi Aditi, I'm HappySmile's AI assistant. Is now a good time to talk about your braces enquiry?"], ["Aditi", "Yes, I was looking for braces for my daughter. Her cheek is a little swollen too."], ["AI assistant", "I'm sorry to hear that. I can't advise on symptoms, so I'm connecting you with our clinic team to help."], ["Aditi", "Could someone call after 4 pm and explain the options?"], ["AI assistant", "Of course. I've shared your request with the Koramangala team."]]
  },
  {
    id: "lead-02", name: "Rohan Mehta", initials: "RM", phone: "+91 98201 76543",
    treatment: "Dental implants", clinic: "Andheri West, Mumbai", minutesAgo: 8, elapsed: "8 min ago",
    outcome: "Asked for human", stage: "needs-call", urgency: "", humanRequested: true, bookedByAI: false,
    summary: ["Asked about replacing a missing tooth with an implant.", "Requested to speak directly with a clinic coordinator.", "Prefers a callback during his lunch break."],
    handoffReason: "The patient explicitly asked to speak with a person.",
    fields: { budget: "₹35,000–₹50,000", time: "1–2 pm", previous: "Bridge fitted in 2019", language: "Hindi" },
    transcript: [["AI assistant", "Hello Rohan, I'm HappySmile's AI assistant. I'm following up on your dental implant enquiry."], ["Rohan", "I want to understand the process, but I'd rather talk to someone at the clinic."], ["AI assistant", "Absolutely. I'll pass you to our Andheri team. Is there a good time for a call?"], ["Rohan", "Between one and two is best."], ["AI assistant", "Thanks, I've shared that with the team."]]
  },
  {
    id: "lead-03", name: "Sana Iyer", initials: "SI", phone: "+91 99002 11345",
    treatment: "Braces consultation", clinic: "Indiranagar, Bengaluru", minutesAgo: 12, elapsed: "12 min ago",
    outcome: "Handoff", stage: "needs-call", urgency: "Pain mentioned", humanRequested: true, bookedByAI: false,
    summary: ["Enquired about braces and asked about an existing toothache.", "The AI avoided clinical guidance and offered a staff callback.", "Sana is available this afternoon."],
    handoffReason: "Pain was mentioned. A staff member should follow up; the AI did not assess symptoms.",
    fields: { budget: "Not discussed", time: "Today, 2–5 pm", previous: "Retainer after earlier treatment", language: "English" },
    transcript: [["AI assistant", "Hi Sana, I'm calling about your braces enquiry. What would be helpful to know today?"], ["Sana", "I was also wondering about a toothache I've had."], ["AI assistant", "I can't answer clinical questions, but I can ask our clinic team to speak with you."], ["Sana", "That would be good. I'm free this afternoon."], ["AI assistant", "I've noted that for our Indiranagar team."]]
  },
  {
    id: "lead-04", name: "Dev Shah", initials: "DS", phone: "+91 98250 34821",
    treatment: "Teeth whitening", clinic: "Kalyani Nagar, Pune", minutesAgo: 18, elapsed: "18 min ago",
    outcome: "No answer", stage: "needs-call", urgency: "", humanRequested: false, bookedByAI: false,
    summary: ["Enquired about a teeth whitening appointment.", "Call was not answered; no clinical details were discussed.", "One staff follow-up is still due."],
    handoffReason: "The first call was unanswered. Please try once more at a convenient time.",
    fields: { budget: "Not discussed", time: "Not specified", previous: "Not specified", language: "Marathi" },
    transcript: [["AI assistant", "Hello Dev, I'm HappySmile's AI assistant calling about your teeth whitening enquiry."], ["AI assistant", "I couldn't reach you this time. Our clinic team can try again when it suits you."]]
  },
  {
    id: "lead-05", name: "Ananya Nair", initials: "AN", phone: "+91 98470 55128",
    treatment: "Dental implants", clinic: "Jubilee Hills, Hyderabad", minutesAgo: 24, elapsed: "24 min ago",
    outcome: "Asked for human", stage: "needs-call", urgency: "Swelling mentioned", humanRequested: true, bookedByAI: false,
    summary: ["Asked about an implant consultation for a missing molar.", "Mentioned swelling and asked to speak to the clinic.", "Requested a callback in Malayalam if available."],
    handoffReason: "Swelling was mentioned and the patient requested a person. Please follow up directly.",
    fields: { budget: "₹40,000–₹60,000", time: "After 5 pm", previous: "Extraction last month", language: "Malayalam" },
    transcript: [["AI assistant", "Hello Ananya, I'm following up on your implant enquiry."], ["Ananya", "I'd like to know about implants. There is also some swelling."], ["AI assistant", "I can't answer questions about symptoms. I'll have a member of our clinic team call you."], ["Ananya", "Could they call after five, preferably in Malayalam?"], ["AI assistant", "I've shared your preference with the team."]]
  },
  {
    id: "lead-06", name: "Ishaan Kapoor", initials: "IK", phone: "+91 98100 44321",
    treatment: "Braces consultation", clinic: "Saket, New Delhi", minutesAgo: 31, elapsed: "31 min ago",
    outcome: "Booked", stage: "booked", urgency: "", humanRequested: false, bookedByAI: true,
    summary: ["Asked about a first consultation for braces.", "Selected a clinic visit for Friday afternoon.", "AI booked the consultation and sent the confirmation."],
    handoffReason: "No handoff needed. Appointment booked by the AI assistant.",
    fields: { budget: "Not discussed", time: "Friday, 4:30 pm", previous: "No prior braces", language: "Hindi" },
    booking: "Fri, 22 Nov · 4:30 pm",
    transcript: [["AI assistant", "Hi Ishaan, I'm HappySmile's AI assistant. Would you like help booking your braces consultation?"], ["Ishaan", "Yes, Friday afternoon at Saket would work."], ["AI assistant", "I have Friday at 4:30 pm available. Should I reserve it for you?"], ["Ishaan", "Yes, please."], ["AI assistant", "You're booked for Friday at 4:30 pm. We'll send your confirmation shortly."]]
  },
  {
    id: "lead-07", name: "Kavya Deshmukh", initials: "KD", phone: "+91 98900 77214",
    treatment: "Teeth whitening", clinic: "Kalyani Nagar, Pune", minutesAgo: 46, elapsed: "46 min ago",
    outcome: "Booked", stage: "booked", urgency: "", humanRequested: false, bookedByAI: true,
    summary: ["Interested in a whitening consultation before a family event.", "Chose a Saturday morning slot at Kalyani Nagar.", "AI booked the visit and shared the confirmation details."],
    handoffReason: "No handoff needed. Appointment booked by the AI assistant.",
    fields: { budget: "Not discussed", time: "Saturday, 11 am", previous: "Whitening strips at home", language: "Marathi" },
    booking: "Sat, 23 Nov · 11:00 am",
    transcript: [["AI assistant", "Hello Kavya, I'm calling about your teeth whitening enquiry."], ["Kavya", "I'd like a consultation before next month's event."], ["AI assistant", "I can offer Saturday at 11 am at Kalyani Nagar. Would that suit you?"], ["Kavya", "That works."], ["AI assistant", "Your visit is booked. I'll send the details by message."]]
  },
  {
    id: "lead-08", name: "Arjun Bose", initials: "AB", phone: "+91 98310 66420",
    treatment: "Dental implants", clinic: "Salt Lake, Kolkata", minutesAgo: 59, elapsed: "59 min ago",
    outcome: "Booked", stage: "booked", urgency: "", humanRequested: false, bookedByAI: true,
    summary: ["Asked to schedule an implant consultation.", "Chose Tuesday morning at the Salt Lake clinic.", "AI booked the visit; clinical and pricing questions were deferred."],
    handoffReason: "No handoff needed. Appointment booked by the AI assistant.",
    fields: { budget: "Not discussed", time: "Tuesday, 10 am", previous: "Not specified", language: "Bengali" },
    booking: "Tue, 26 Nov · 10:00 am",
    transcript: [["AI assistant", "Hi Arjun, I can help find a time for your implant consultation."], ["Arjun", "Tuesday morning would be convenient."], ["AI assistant", "There's a 10 am slot at Salt Lake. Would you like me to book it?"], ["Arjun", "Yes, please book it."], ["AI assistant", "You're booked for Tuesday at 10 am. The clinic team can answer any clinical or pricing questions at your visit."]]
  },
  {
    id: "lead-09", name: "Mira Kulkarni", initials: "MK", phone: "+91 98922 65310",
    treatment: "Braces consultation", clinic: "Andheri West, Mumbai", minutesAgo: 6, elapsed: "6 min ago",
    outcome: "No answer", stage: "ai-following", urgency: "", humanRequested: false, bookedByAI: false,
    summary: ["Enquired about clear braces options.", "First call was unanswered; AI will retry once later today.", "No concerns or preferences captured yet."],
    handoffReason: "No answer on the first attempt. AI follow-up is scheduled for later today.",
    fields: { budget: "Not discussed", time: "Not specified", previous: "Not specified", language: "English" },
    transcript: [["AI assistant", "Hello Mira, I'm HappySmile's AI assistant calling about your braces enquiry."], ["AI assistant", "I couldn't reach you. I'll try again later today so we can help with your next steps."]]
  },
  {
    id: "lead-10", name: "Nikhil Reddy", initials: "NR", phone: "+91 98490 31256",
    treatment: "Teeth whitening", clinic: "Jubilee Hills, Hyderabad", minutesAgo: 15, elapsed: "15 min ago",
    outcome: "No answer", stage: "ai-following", urgency: "", humanRequested: false, bookedByAI: false,
    summary: ["Asked for information about a whitening visit.", "AI call was unanswered and a second attempt is queued.", "No appointment has been made yet."],
    handoffReason: "No answer so far. The AI will make one more attempt.",
    fields: { budget: "Not discussed", time: "Not specified", previous: "Not specified", language: "Telugu" },
    transcript: [["AI assistant", "Hi Nikhil, I'm following up on your whitening enquiry."], ["AI assistant", "I wasn't able to reach you. I'll try again a little later."]]
  },
  {
    id: "lead-11", name: "Pooja Sethi", initials: "PS", phone: "+91 98111 23890",
    treatment: "Dental implants", clinic: "Saket, New Delhi", minutesAgo: 42, elapsed: "42 min ago",
    outcome: "No answer", stage: "not-interested", urgency: "", humanRequested: false, bookedByAI: false,
    summary: ["Enquired about an implant consultation earlier today.", "After follow-up, asked not to be contacted again for now.", "Lead closed as not interested at this time."],
    handoffReason: "Patient declined further contact. No follow-up is scheduled.",
    fields: { budget: "Not discussed", time: "No follow-up requested", previous: "Not specified", language: "Hindi" },
    transcript: [["AI assistant", "Hello Pooja, I'm following up on your implant enquiry."], ["Pooja", "I've decided not to go ahead right now. Please don't call again."], ["AI assistant", "Understood. I've updated your enquiry and there will be no further follow-up."]]
  },
  {
    id: "lead-12", name: "Farah Khan", initials: "FK", phone: "+91 98451 89023",
    treatment: "Braces consultation", clinic: "Indiranagar, Bengaluru", minutesAgo: 68, elapsed: "1 hr ago",
    outcome: "No answer", stage: "not-interested", urgency: "", humanRequested: false, bookedByAI: false,
    summary: ["Enquired about braces for herself.", "Declined another call and asked to revisit the enquiry later.", "Lead marked not interested for this follow-up cycle."],
    handoffReason: "Patient declined follow-up for now. Reopen only if she contacts the clinic.",
    fields: { budget: "Not discussed", time: "No follow-up requested", previous: "Retainer", language: "Urdu" },
    transcript: [["AI assistant", "Hi Farah, I'm calling about your braces enquiry."], ["Farah", "I'm not ready to talk about this now. Please don't call again."], ["AI assistant", "Of course. I've noted that and won't schedule another call."]]
  }
];

function cloneLead(lead) {
  return {
    ...lead,
    summary: [...lead.summary],
    fields: { ...lead.fields },
    transcript: lead.transcript.map((line) => [...line])
  };
}

const demoState = {
  leads: initialLeads.map(cloneLead),
  patientCallStatus: "idle",
  createdLeadId: null
};

const leadTabs = Array.from(document.querySelectorAll(".lead-tab"));
const leadList = document.querySelector("#lead-list");
const leadDetail = document.querySelector("#lead-detail");
const leadEmpty = document.querySelector("#lead-empty");
const clinicFilter = document.querySelector("#clinic-filter");
const leadSort = document.querySelector("#lead-sort");
const leadSearch = document.querySelector("#lead-search");
let activeStage = "needs-call";
let selectedLeadId = "lead-01";
let audioTimer;

const clinicNames = [...new Set(demoState.leads.map((lead) => lead.clinic))].sort();
clinicNames.forEach((clinic) => {
  const option = document.createElement("option");
  option.value = clinic;
  option.textContent = clinic;
  clinicFilter.append(option);
});

function outcomeClass(outcome) {
  if (outcome.startsWith("Booked")) return "booked";
  if (outcome === "Asked for human") return "asked-for-human";
  return outcome.toLowerCase().replaceAll(" ", "-");
}

function leadNeedsHuman(lead) {
  return lead.outcome === "Handoff" || lead.outcome === "Asked for human";
}

function setActiveStage(stage) {
  activeStage = stage;
  leadTabs.forEach((tab) => {
    const selected = tab.dataset.stage === stage;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });
  const activeTab = leadTabs.find((tab) => tab.dataset.stage === stage);
  document.querySelector("#lead-queue-title").textContent = activeTab.textContent.trim().replace(/\s+\d+$/, "");
}

function getVisibleLeads() {
  const searchTerm = leadSearch.value.trim().toLowerCase();
  const matchingLeads = demoState.leads.filter((lead) => {
    const matchesStage = lead.stage === activeStage;
    const matchesClinic = clinicFilter.value === "all" || lead.clinic === clinicFilter.value;
    const matchesSearch = `${lead.name} ${lead.treatment} ${lead.clinic} ${lead.outcome}`.toLowerCase().includes(searchTerm);
    return matchesStage && matchesClinic && matchesSearch;
  });
  const sortMode = leadSort.value;

  matchingLeads.sort((first, second) => {
    const newLeadPriority = Number(second.id === demoState.createdLeadId) - Number(first.id === demoState.createdLeadId);
    if (newLeadPriority !== 0) return newLeadPriority;
    const humanPriority = Number(leadNeedsHuman(second)) - Number(leadNeedsHuman(first));
    if (humanPriority !== 0) return humanPriority;

    if (sortMode === "newest") return first.minutesAgo - second.minutesAgo;
    if (sortMode === "oldest") return second.minutesAgo - first.minutesAgo;
    const urgencyPriority = Number(Boolean(second.urgency)) - Number(Boolean(first.urgency));
    return urgencyPriority || first.minutesAgo - second.minutesAgo;
  });
  return matchingLeads;
}

function renderLeadList() {
  const visibleLeads = getVisibleLeads();
  leadList.setAttribute("aria-label", `${visibleLeads.length} ${activeStage.replace("-", " ")} leads`);
  leadList.innerHTML = visibleLeads.map((lead) => `
    <div class="lead-list-item" role="listitem"><button class="lead-row${lead.id === selectedLeadId ? " is-selected" : ""}${lead.urgency ? " has-urgency" : ""}" type="button" data-lead-id="${lead.id}" aria-pressed="${lead.id === selectedLeadId}">
      <span class="lead-avatar">${lead.initials}</span>
      <span class="lead-row-main">
        <span class="lead-name-line"><strong>${lead.name}</strong>${lead.urgency ? `<span class="urgency-flag"><i aria-hidden="true">!</i> ${lead.urgency}</span>` : ""}</span>
        <span class="lead-meta-line">${lead.treatment}<span>·</span>${lead.clinic}</span>
        <span class="lead-row-bottom"><span class="outcome-chip outcome-${outcomeClass(lead.outcome)}"><i></i>${lead.outcome}</span><span class="lead-elapsed">${lead.elapsed}</span></span>
      </span>
      <span class="lead-row-arrow" aria-hidden="true">›</span>
    </button></div>
  `).join("");
  leadEmpty.hidden = visibleLeads.length > 0;
  document.querySelector("#lead-visible-count").textContent = `${visibleLeads.length} ${visibleLeads.length === 1 ? "lead" : "leads"}`;
  document.querySelectorAll("[data-tab-count]").forEach((count) => {
    count.textContent = demoState.leads.filter((lead) => lead.stage === count.dataset.tabCount).length;
  });
  document.querySelector("#lead-total").textContent = demoState.leads.length;
  document.querySelector("#kpi-enquiries").textContent = demoState.leads.length;
  document.querySelector("#kpi-booked").textContent = demoState.leads.filter((lead) => lead.bookedByAI).length;
  document.querySelector("#kpi-handoff").textContent = demoState.leads.filter((lead) => leadNeedsHuman(lead)).length;
  document.querySelector("#kpi-call-now").textContent = demoState.leads.filter((lead) =>
    lead.stage === "needs-call" && (lead.urgency || leadNeedsHuman(lead))
  ).length;

  const selectedLeadIsVisible = visibleLeads.some((lead) => lead.id === selectedLeadId);
  if (!selectedLeadIsVisible) selectedLeadId = visibleLeads[0]?.id || null;
  renderLeadDetail(visibleLeads.find((lead) => lead.id === selectedLeadId));
}

function renderLeadDetail(lead) {
  window.clearTimeout(audioTimer);
  audioTimer = undefined;
  if (!lead) {
    leadDetail.innerHTML = `<div class="detail-empty"><span aria-hidden="true">♡</span><h2>No lead selected</h2><p>Choose another tab or update your filters to see leads.</p></div>`;
    return;
  }

  const summaryLines = lead.summary.map((line) => `<li>${line}</li>`).join("");
  const transcript = lead.transcript.map(([speaker, line]) => `
    <p class="transcript-line"><strong>${speaker}</strong><span>${line}</span></p>
  `).join("");
  const fields = [
    ["Budget range", lead.fields.budget],
    ["Preferred time", lead.fields.time],
    ["Previous treatment", lead.fields.previous],
    ["Language", lead.fields.language]
  ].map(([label, value]) => `<div class="extracted-field"><dt>${label}</dt><dd>${value}</dd></div>`).join("");

  leadDetail.innerHTML = `
    <div class="detail-header">
      <div><p class="eyebrow">LEAD DETAILS</p><h2>${lead.name}</h2><p class="detail-phone">${lead.phone}</p></div>
      <span class="outcome-chip outcome-${outcomeClass(lead.outcome)}"><i></i>${lead.outcome}</span>
    </div>
    <div class="detail-facts"><span>${lead.treatment}</span><i>·</i><span>${lead.clinic}</span><i>·</i><span>${lead.elapsed}</span></div>
    ${lead.urgency ? `<div class="detail-urgency"><span aria-hidden="true">!</span><div><strong>${lead.urgency}</strong><small>Flagged for staff review · please prioritize this call</small></div></div>` : ""}
    <section class="detail-section ai-summary" aria-labelledby="summary-title"><div class="detail-section-heading"><span class="detail-section-icon">✳</span><h3 id="summary-title">AI call summary</h3></div><ol>${summaryLines}</ol></section>
    <section class="handoff-reason"><p class="eyebrow">WHY HANDED OVER</p><p>${lead.handoffReason}</p></section>
    <section class="detail-section extracted-section" aria-labelledby="extracted-title"><div class="detail-section-heading"><span class="detail-section-icon fields-icon">⌗</span><h3 id="extracted-title">What we learned</h3></div><dl class="extracted-fields">${fields}</dl></section>
    <details class="transcript-details"><summary><span>Full call transcript</span><span class="transcript-count">${lead.transcript.length} moments</span></summary><div class="transcript-content">${transcript}</div></details>
    <section class="audio-mock" aria-label="Call audio preview">
      <button class="audio-play" type="button" data-action="audio" aria-label="Play call recording" aria-pressed="false">▶</button>
      <div class="audio-track-wrap"><div class="audio-track"><span class="audio-progress"></span></div><div class="audio-time"><span class="audio-current">0:00</span><span>${lead.transcript.length < 3 ? "0:18" : "1:24"}</span></div></div>
      <span class="audio-label">CALL RECORDING</span>
    </section>
    <div class="detail-actions">
      <button class="detail-action primary-action" type="button" data-action="call"><span aria-hidden="true">↗</span> Call back now</button>
      <button class="detail-action confirm-action" type="button" data-action="book"><span aria-hidden="true">✓</span> Confirm booking</button>
      <button class="detail-action" type="button" data-action="not-interested">Mark not interested</button>
      <button class="detail-action flag-action${lead.aiFlagged ? " is-flagged" : ""}" type="button" data-action="flag"><span aria-hidden="true">⚑</span> ${lead.aiFlagged ? "AI mistake flagged" : "Flag AI mistake"}</button>
    </div>`;
}

leadTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveStage(tab.dataset.stage);
    renderLeadList();
  });
});

leadList.addEventListener("click", (event) => {
  const row = event.target.closest("[data-lead-id]");
  if (!row) return;
  selectedLeadId = row.dataset.leadId;
  renderLeadList();
  leadDetail.querySelector(".detail-header h2").setAttribute("tabindex", "-1");
  leadDetail.querySelector(".detail-header h2").focus();
});

clinicFilter.addEventListener("change", renderLeadList);
leadSort.addEventListener("change", renderLeadList);
leadSearch.addEventListener("input", renderLeadList);

leadDetail.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton || !selectedLeadId) return;
  const lead = demoState.leads.find((item) => item.id === selectedLeadId);
  const action = actionButton.dataset.action;

  if (action === "audio") {
    const isPlaying = actionButton.getAttribute("aria-pressed") !== "true";
    actionButton.setAttribute("aria-pressed", String(isPlaying));
    actionButton.setAttribute("aria-label", isPlaying ? "Pause call recording" : "Play call recording");
    actionButton.textContent = isPlaying ? "Ⅱ" : "▶";
    leadDetail.querySelector(".audio-label").textContent = isPlaying ? "PLAYING PREVIEW" : "CALL RECORDING";
    leadDetail.querySelector(".audio-progress").classList.toggle("is-playing", isPlaying);
    window.clearTimeout(audioTimer);
    if (isPlaying) {
      audioTimer = window.setTimeout(() => {
        actionButton.setAttribute("aria-pressed", "false");
        actionButton.setAttribute("aria-label", "Play call recording");
        actionButton.textContent = "▶";
        leadDetail.querySelector(".audio-label").textContent = "CALL RECORDING";
        leadDetail.querySelector(".audio-progress").classList.remove("is-playing");
      }, 4000);
    }
    return;
  }

  if (action === "call") {
    showToast(`Callback started for ${lead.name} (prototype only).`);
    return;
  }
  if (action === "book") {
    lead.stage = "booked";
    lead.outcome = "Booked";
    lead.booking = "Booking confirmed by clinic";
    activeStage = "booked";
    showToast(`Booking confirmed for ${lead.name}.`);
  } else if (action === "not-interested") {
    lead.stage = "not-interested";
    lead.outcome = "No answer";
    activeStage = "not-interested";
    showToast(`${lead.name} marked not interested.`);
  } else if (action === "flag") {
    lead.aiFlagged = true;
    showToast(`AI review flagged for ${lead.name}.`);
  }

  setActiveStage(activeStage);
  renderLeadList();
});

renderLeadList();

function addPatientLead(outcome) {
  const isBooking = outcome === "booked";
  const id = "lead-patient-demo";
  const existingIndex = demoState.leads.findIndex((lead) => lead.id === id);
  if (existingIndex !== -1) demoState.leads.splice(existingIndex, 1);

  const lead = {
    id,
    name: "Priya S.",
    initials: "PS",
    phone: "+91 98765 12030",
    treatment: "Braces",
    clinic: "Andheri West, Mumbai",
    minutesAgo: 0,
    elapsed: "just now",
    outcome: isBooking ? "Booked, Sat 11:30, Andheri clinic" : "Asked for human",
    stage: isBooking ? "booked" : "needs-call",
    urgency: "",
    humanRequested: !isBooking,
    bookedByAI: isBooking,
    summary: isBooking
      ? ["Enquired about braces and completed a short AI call.", "Chose a Saturday 11:30 am visit at the Andheri clinic.", "Booking confirmation is ready for staff review."]
      : ["Enquired about braces and answered the AI assistant's call.", "Asked to speak with a clinic coordinator.", "No clinical advice was provided by the AI."],
    handoffReason: isBooking
      ? "No handoff needed. The AI assistant booked the requested Saturday 11:30 am slot."
      : "Priya asked to speak with a person. Please call back to help with her braces enquiry.",
    fields: {
      budget: "Not discussed",
      time: isBooking ? "Saturday, 11:30 am" : "As soon as possible",
      previous: "Not discussed",
      language: "English"
    },
    booking: isBooking ? "Sat, 23 Nov · 11:30 am" : undefined,
    transcript: isBooking
      ? [["AI assistant", "Hi Priya, I'm HappySmile's AI assistant calling about your braces enquiry."], ["Priya", "I'd like to book a visit at Andheri on Saturday."], ["AI assistant", "I can offer Saturday at 11:30 am. Would you like me to book that?"]]
      : [["AI assistant", "Hi Priya, I'm HappySmile's AI assistant calling about your braces enquiry."], ["Priya", "Could I speak to a person instead, please?"], ["AI assistant", "Of course. I've shared your request with the Andheri clinic team for a callback."]]
  };

  demoState.leads.unshift(lead);
  demoState.createdLeadId = id;
  selectedLeadId = id;
  activeStage = lead.stage;
  setActiveStage(lead.stage);
  renderLeadList();
}

function completePatientCall() {
  if (demoState.patientCallStatus !== "calling") return;
  stopCountdown();
  demoState.patientCallStatus = "connected";
  addPatientLead("booked");
  const countdownCard = document.querySelector("#countdown-card");
  countdownCard.classList.add("is-connected");
  countdownCard.querySelector(".eyebrow").textContent = "CALL CONNECTED";
  countdownCard.querySelector(".countdown-caption").textContent = "Your Saturday visit is booked";
  const countdown = document.querySelector("#countdown");
  countdown.textContent = "Connected";
  countdown.setAttribute("role", "status");
  setCallHeading("Call connected");
  setCallStatus("You're speaking with our AI assistant. Your braces visit is booked for Saturday at 11:30 am in Andheri.");
  document.querySelector("#simulate-missed").hidden = true;
  document.querySelector("#simulate-human").hidden = true;
  document.querySelector("#reset-call").hidden = true;
}

function simulateHumanRequest() {
  stopCountdown();
  demoState.patientCallStatus = "handoff";
  addPatientLead("human");
  document.querySelector("#countdown-card").hidden = true;
  setCallHeading("A person from our team will call.");
  setCallStatus("Your request has been passed to the Andheri clinic team. They’ll call you back shortly.");
  document.querySelector("#simulate-missed").hidden = true;
  document.querySelector("#simulate-human").hidden = true;
  document.querySelector("#reset-call").hidden = true;
  document.querySelector("#confirmation-title").focus();
}

document.querySelector("#callback-button").addEventListener("click", () => {
  demoState.patientCallStatus = "calling";
  const overview = document.querySelector("#patient-overview");
  const confirmation = document.querySelector("#call-confirmation");
  overview.hidden = true;
  confirmation.hidden = false;
  document.querySelector("#patient-screen").setAttribute("aria-labelledby", "confirmation-title");
  setCallStatus("Thanks, Priya. Your braces enquiry is with our care team.");
  setCallHeading("Thanks, Priya. We're calling you in about 2 minutes.");
  document.querySelector("#countdown-card").hidden = false;
  document.querySelector("#countdown-card").classList.remove("is-connected");
  document.querySelector("#countdown-card").querySelector(".eyebrow").textContent = "CALLING YOU IN";
  document.querySelector("#countdown-card").querySelector(".countdown-caption").textContent = "Keep your phone nearby";
  document.querySelector("#countdown").setAttribute("role", "timer");
  document.querySelector("#simulate-missed").hidden = false;
  document.querySelector("#simulate-human").hidden = false;
  document.querySelector("#reset-call").hidden = true;
  startCountdown();
  document.querySelector("#confirmation-title").focus();
});

function setCallHeading(message) {
  document.querySelector("#confirmation-title").textContent = message;
}

function setCallStatus(message) {
  document.querySelector("#confirmation-message").textContent = message;
}

function stopCountdown() {
  window.clearInterval(countdownTimer);
  countdownTimer = undefined;
}

function startCountdown() {
  stopCountdown();
  let secondsRemaining = 120;
  const countdown = document.querySelector("#countdown");
  const updateCountdown = () => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = String(secondsRemaining % 60).padStart(2, "0");
    countdown.textContent = `${minutes}:${seconds}`;
    if (secondsRemaining === 0) {
      completePatientCall();
      return;
    }
    secondsRemaining -= 1;
  };

  updateCountdown();
  countdownTimer = window.setInterval(updateCountdown, 1000);
}

function pauseCountdownWithMessage(heading, message) {
  stopCountdown();
  document.querySelector("#countdown-card").hidden = true;
  setCallHeading(heading);
  setCallStatus(message);
}

document.querySelector("#back-to-overview").addEventListener("click", (event) => {
  event.preventDefault();
  stopCountdown();
  document.querySelector("#call-confirmation").hidden = true;
  document.querySelector("#patient-overview").hidden = false;
  document.querySelector("#patient-screen").setAttribute("aria-labelledby", "patient-title");
  document.querySelector("#callback-button").focus();
});

document.querySelectorAll(".choice-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".choice-chip").forEach((choice) => {
      const isSelected = choice === button;
      choice.classList.toggle("is-selected", isSelected);
      choice.setAttribute("aria-pressed", String(isSelected));
    });
    setCallStatus(`Call language set to ${button.dataset.language}.`);
  });
});

document.querySelectorAll(".time-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".time-chip").forEach((choice) => {
      choice.setAttribute("aria-pressed", String(choice === button));
    });
    pauseCountdownWithMessage("Your callback is all set.", `We'll call you: ${button.dataset.time}.`);
  });
});

document.querySelector("#whatsapp-button").addEventListener("click", () => {
  pauseCountdownWithMessage("We'll message you on WhatsApp.", "Your braces enquiry is ready for our care team on WhatsApp.");
});

document.querySelector("#human-button").addEventListener("click", () => {
  pauseCountdownWithMessage("A person from our team will call.", "A HappySmile care team member will call you shortly.");
});

document.querySelector("#simulate-missed").addEventListener("click", () => {
  stopCountdown();
  demoState.patientCallStatus = "missed";
  document.querySelector("#countdown-card").hidden = true;
  setCallHeading("We missed you. We'll try once more in 10 minutes, or pick a time.");
  setCallStatus("Choose a callback time below, or we’ll try again in 10 minutes.");
  document.querySelector("#simulate-missed").hidden = true;
  document.querySelector("#simulate-human").hidden = true;
  document.querySelector("#reset-call").hidden = false;
  document.querySelector("#confirmation-title").focus();
});

document.querySelector("#simulate-human").addEventListener("click", simulateHumanRequest);

document.querySelector("#reset-call").addEventListener("click", () => {
  demoState.patientCallStatus = "calling";
  setCallHeading("Thanks, Priya. We're calling you in about 2 minutes.");
  setCallStatus("Your braces enquiry is with our care team.");
  document.querySelector("#countdown-card").hidden = false;
  document.querySelector("#simulate-missed").hidden = false;
  document.querySelector("#simulate-human").hidden = false;
  document.querySelector("#reset-call").hidden = true;
  document.querySelectorAll(".time-chip").forEach((button) => button.setAttribute("aria-pressed", "false"));
  startCountdown();
  document.querySelector("#confirmation-title").focus();
});

document.querySelector("#reset-demo").addEventListener("click", () => {
  stopCountdown();
  window.clearTimeout(audioTimer);
  audioTimer = undefined;
  demoState.leads = initialLeads.map(cloneLead);
  demoState.patientCallStatus = "idle";
  demoState.createdLeadId = null;
  activeStage = "needs-call";
  selectedLeadId = "lead-01";
  leadSearch.value = "";
  clinicFilter.value = "all";
  leadSort.value = "priority";
  setActiveStage("needs-call");
  renderLeadList();

  document.querySelector("#call-confirmation").hidden = true;
  document.querySelector("#patient-overview").hidden = false;
  document.querySelector("#patient-screen").setAttribute("aria-labelledby", "patient-title");
  document.querySelector("#countdown-card").hidden = false;
  document.querySelector("#countdown-card").classList.remove("is-connected");
  document.querySelector("#countdown-card").querySelector(".eyebrow").textContent = "CALLING YOU IN";
  document.querySelector("#countdown-card").querySelector(".countdown-caption").textContent = "Keep your phone nearby";
  document.querySelector("#countdown").textContent = "2:00";
  document.querySelector("#countdown").setAttribute("role", "timer");
  setCallHeading("Thanks, Priya. We're calling you in about 2 minutes.");
  setCallStatus("Your braces enquiry is with our care team.");
  document.querySelector("#simulate-missed").hidden = false;
  document.querySelector("#simulate-human").hidden = false;
  document.querySelector("#reset-call").hidden = true;
  document.querySelectorAll(".time-chip").forEach((button) => button.setAttribute("aria-pressed", "false"));
  document.querySelectorAll(".choice-chip").forEach((button, index) => {
    const selected = index === 0;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  showToast("Demo reset. Back to the original 12 leads.");
});

document.querySelector("#privacy-link").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Your data is handled per HappySmile's privacy policy.");
});
