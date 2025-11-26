// =========================
// DATA PERSISTENCE - localStorage
// =========================
// All client data is stored in browser's localStorage
// Data persists across page refreshes and browser sessions
const STORAGE_KEY = "fitCRM_clients";

/**
 * Load clients from localStorage
 * @returns {Array} Array of client objects, or empty array if none exist
 */
function loadClients() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Could not parse stored clients", e);
    return [];
  }
}

/**
 * Save clients array to localStorage
 * @param {Array} clients - Array of client objects to save
 */
function saveClients(clients) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

// =========================
// UI HELPERS
// =========================
// Functions for rendering UI components and managing form state

/**
 * Update the client count display text
 * @param {number} count - Number of clients currently visible
 */
function updateClientCount(count) {
  const countEl = document.getElementById("clientCountText");
  if (!countEl) return;

  if (count === 0) {
    countEl.textContent = " (no clients to show)";
  } else if (count === 1) {
    countEl.textContent = " (1 client shown)";
  } else {
    countEl.textContent = ` (${count} clients shown)`;
  }
}

/**
 * Render all clients into the table
 * @param {Array} clients - Array of client objects to display
 */
function renderClientTable(clients) {
  const tableBody = document.getElementById("clientTableBody");
  if (!tableBody) return;

  // Clear existing rows
  tableBody.innerHTML = "";

  // Update count text
  updateClientCount(clients.length);

  // If no clients, show a placeholder row
  if (clients.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; color:#888;">
          No clients added yet.
        </td>
      </tr>
    `;
    return;
  }

  // Add a row for each client
  clients.forEach((client) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${client.fullName}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td>${client.goal}</td>
      <td>${client.startDate}</td>
      <td>${client.endDate || '–'}</td>
      <td class="row-actions">
        <button
          class="icon-btn view-btn"
          type="button"
          aria-label="View ${client.fullName}"
          data-id="${client.id}"
        >
          View
        </button>
        <button
          class="icon-btn edit-btn"
          type="button"
          aria-label="Edit ${client.fullName}"
          data-id="${client.id}"
        >
          <img src="assets/icons/edit.svg" alt="Edit" />
        </button>
        <button
          class="icon-btn danger delete-btn"
          type="button"
          aria-label="Delete ${client.fullName}"
          data-id="${client.id}"
        >
          <img src="assets/icons/delete.svg" alt="Delete" />
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

/**
 * Populate the form with a client's data for editing
 * @param {Object} client - Client object with form data
 */
function fillFormFromClient(client) {
  const fullNameInput = document.getElementById("fullName");
  const ageInput = document.getElementById("age");
  const genderSelect = document.getElementById("gender");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const goalSelect = document.getElementById("goal");
  const goalFreeInput = document.getElementById("goalFree");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  if (!fullNameInput) {
    console.error("Full name input not found!");
    return;
  }

  fullNameInput.value = client.fullName || "";
  ageInput.value = client.age || "";
  genderSelect.value = client.gender || "";
  emailInput.value = client.email || "";
  phoneInput.value = client.phone || "";

  // Put the goal in the custom text field (simplest)
  goalSelect.value = "";
  goalFreeInput.value = client.goal || "";

  startDateInput.value = client.startDate || "";
  endDateInput.value = client.endDate || "";
}

/**
 * Clear all form fields
 */
function clearForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("goal").value = "";
  document.getElementById("goalFree").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
}

/**
 * Display client details on the Client View page
 * @param {Object} client - Client object to display
 */
function showClientDetails(client) {
  const nameEl = document.getElementById("viewName");
  const emailEl = document.getElementById("viewEmail");
  const phoneEl = document.getElementById("viewPhone");
  const goalEl = document.getElementById("viewGoal");
  const startDateEl = document.getElementById("viewStartDate");
  const endDateEl = document.getElementById("viewEndDate");

  if (!nameEl) return; // safety

  nameEl.textContent = client.fullName || "";
  emailEl.textContent = client.email || "";
  phoneEl.textContent = client.phone || "";
  goalEl.textContent = client.goal || "";
  startDateEl.textContent = client.startDate || "";
  endDateEl.textContent = client.endDate || "";

  // Initialize training history section
  displayTrainingHistory(client);
}

/**
 * Display training history for a client (placeholder for future implementation)
 * @param {Object} client - Client object
 */
function displayTrainingHistory(client) {
  const historyContent = document.getElementById("viewHistoryContent");
  const historyPlaceholder = document.getElementById("viewHistoryPlaceholder");
  
  if (!historyContent) return;

  // For now, show placeholder since training history is not yet implemented
  // This can be extended later to show actual training sessions
  if (historyPlaceholder) {
    historyPlaceholder.textContent = "No training history recorded yet.";
  }
}

// =========================
// FORM VALIDATION HELPERS
// =========================
// All validation functions return boolean (true = valid, false = invalid)

/**
 * Validate email format - accepts any email ending in .com or .edu
 * Format: anything@anything.com or anything@anything.edu
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // Accept any email format ending in .com or .edu
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|edu)$/i;
  return emailRegex.test(email.trim());
}

/**
 * Validate age - must be between 5 and 120 years old
 * @param {string|number} age - Age to validate
 * @returns {boolean} True if valid (>= 5 and <= 120), false otherwise
 */
function isValidAge(age) {
  if (!age) return false;
  const ageNum = parseInt(age, 10);
  return !isNaN(ageNum) && ageNum >= 5 && ageNum <= 120;
}

/**
 * Validate phone number - must be exactly 11 digits
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid (exactly 11 digits), false otherwise
 */
function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11;
}

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date formatted as YYYY-MM-DD
 */
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Validate that a date is not in the past
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {boolean} True if date is today or in the future, false if in the past
 */
function isDateNotInPast(dateString) {
  if (!dateString) return false;
  const inputDate = new Date(dateString);
  const today = new Date();
  // Reset time to midnight for accurate date comparison
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  return inputDate >= today;
}

/**
 * Validate that end date is after start date
 * @param {string} startDate - Start date string in YYYY-MM-DD format
 * @param {string} endDate - End date string in YYYY-MM-DD format
 * @returns {boolean} True if end date is after start date, false otherwise
 */
function isEndDateAfterStartDate(startDate, endDate) {
  if (!startDate || !endDate) return false;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return end > start;
}

// =========================
// Wger: Next Session Exercises
// =========================
// Wger API endpoint - retrieves exercises from the online workout manager
// API Documentation: https://wger.de/en/software/api
// Browsable API: https://wger.de/api/v2/exerciseinfo/
// Note: exerciseinfo endpoint includes translations with exercise names
// Language ID 2 = English (en)
const WGER_API_BASE = "https://wger.de/api/v2";
// Use exerciseinfo endpoint which includes exercise names in translations
// language=2 ensures exercises are in English
const WGER_API_URL = `${WGER_API_BASE}/exerciseinfo/?language=2&limit=50`;

async function loadNextSessionExercises() {
  const listEl = document.getElementById("nextExercisesList");
  const placeholderEl = document.getElementById("viewExercisesPlaceholder");
  if (!listEl) return;

  // Clear old items and show a loading message
  listEl.innerHTML = "";
  if (placeholderEl) {
    placeholderEl.textContent = "Loading exercises for the next session…";
  }

  try {
    // Fetch exercises from Wger REST API
    // API endpoint: https://wger.de/api/v2/exercise/
    // Documentation: https://wger.de/en/software/api
    const response = await fetch(WGER_API_URL);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Wger API returns results in a 'results' array
    const results = data.results || [];

    if (results.length === 0) {
      if (placeholderEl) {
        placeholderEl.textContent = "No exercises found from the API at the moment.";
      }
      return;
    }

    // Filter exercises to only include those with English translations (language ID = 2)
    const exercisesWithEnglish = results.filter(exercise => {
      if (exercise.translations && Array.isArray(exercise.translations)) {
        return exercise.translations.some(t => t.language === 2 && t.name);
      }
      return false;
    });

    if (exercisesWithEnglish.length === 0) {
      if (placeholderEl) {
        placeholderEl.textContent = "No English exercises found from the API at the moment.";
      }
      return;
    }

    // Select 5 random exercises from exercises with English translations
    // Only include exercises that have a valid English name
    const selectedExercises = [];
    const availableExercises = [...exercisesWithEnglish]; // Copy array to avoid modifying original
    
    // Keep selecting until we have 5 exercises with valid English names
    while (selectedExercises.length < 5 && availableExercises.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableExercises.length);
      const exercise = availableExercises[randomIndex];
      
      // Verify this exercise has a valid English translation
      let hasEnglishName = false;
      if (exercise.translations && Array.isArray(exercise.translations)) {
        const englishTranslation = exercise.translations.find(t => t.language === 2 && t.name);
        if (englishTranslation && englishTranslation.name && englishTranslation.name.trim()) {
          hasEnglishName = true;
        }
      }
      
      if (hasEnglishName) {
        selectedExercises.push(exercise);
      }
      
      // Remove from available exercises to avoid infinite loop
      availableExercises.splice(randomIndex, 1);
    }

    // Display exercises retrieved from the API - ONLY English names
    selectedExercises.forEach((exercise) => {
      const li = document.createElement("li");

      // Wger API structure: exercise names are in the 'translations' array
      // Each translation object has a 'name' field and 'language' field
      // Language ID 2 = English (en)
      let exerciseName = null;
      
      // STRICT: ONLY use English translation (language ID = 2)
      // Do not fallback to other languages - this ensures English only
      if (exercise.translations && Array.isArray(exercise.translations)) {
        // Find ONLY English translation (language ID = 2)
        const englishTranslation = exercise.translations.find(t => {
          return t.language === 2 && t.name && String(t.name).trim().length > 0;
        });
        
        if (englishTranslation && englishTranslation.name) {
          exerciseName = String(englishTranslation.name).trim();
          
          // Additional validation: ensure it's not empty and looks like English text
          // (basic check - English typically uses ASCII characters)
          if (exerciseName.length === 0) {
            exerciseName = null;
          }
        }
      }
      
      // If no valid English name found, skip this exercise
      if (!exerciseName || exerciseName === '') {
        console.warn("Exercise has no valid English translation. Skipping.", {
          exerciseId: exercise.id,
          translations: exercise.translations?.map(t => ({ language: t.language, name: t.name }))
        });
        return; // Skip this exercise - don't display it
      }

      // Display ONLY the English name
      li.textContent = exerciseName;
      listEl.appendChild(li);
    });

    // Hide the placeholder text once we have items
    if (placeholderEl) {
      placeholderEl.textContent = "";
    }
  } catch (error) {
    console.error("Error loading exercises from Wger API:", error);
    console.error("API URL attempted:", WGER_API_URL);
    
    if (placeholderEl) {
      // More specific error message
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        placeholderEl.textContent =
          "Unable to connect to the Wger exercise API. Please check your internet connection and try again.";
      } else if (error.message.includes('CORS')) {
        placeholderEl.textContent =
          "CORS error: Unable to access the exercise API. The API may have restrictions.";
      } else {
        placeholderEl.textContent =
          `Could not load exercises: ${error.message}. Please try again later.`;
      }
    }
  }
}

// =========================
// Main app logic
// =========================
document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js is connected!");
  console.log("DOM fully loaded");

  const addClientBtn = document.getElementById("addClientBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const tableBody = document.getElementById("clientTableBody");
  const addNewLink = document.querySelector("#list .table-toolbar a.btn.primary");
  const searchInput = document.getElementById("searchName");
  const searchBtn = document.getElementById("searchBtn");
  const editFromViewBtn = document.getElementById("editFromViewBtn");

  // current state
  let clients = loadClients();
  let editingId = null;        // null = adding, not editing
  let currentViewedId = null;  // which client is shown on Page 3

  // initial render
  renderClientTable(clients);

  // Helpers to switch modes
  function enterAddMode() {
    editingId = null;
    if (addClientBtn) addClientBtn.textContent = "Add Client";
    if (cancelEditBtn) cancelEditBtn.style.display = "none";
    clearForm();
  }

  function enterEditMode(client) {
    editingId = client.id;
    fillFormFromClient(client);
    if (addClientBtn) addClientBtn.textContent = "Save Changes";
    if (cancelEditBtn) cancelEditBtn.style.display = "inline-block";

    // Jump to the form
    window.location.hash = "#new";
    const newSection = document.getElementById("new");
    if (newSection) {
      newSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // -------------------------
  // Add / Save Client button
  // -------------------------
  if (addClientBtn) {
    addClientBtn.addEventListener("click", () => {
      const fullName = document.getElementById("fullName").value.trim();
      const age = document.getElementById("age").value.trim();
      const gender = document.getElementById("gender").value;
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const goal = document.getElementById("goal").value.trim();
      const goalFree = document.getElementById("goalFree").value.trim();
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;

      const finalGoal = goal || goalFree;

      // Basic validation
      if (!fullName || !email || !phone || !finalGoal || !startDate || !endDate) {
        alert("Please fill in all required fields.");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address ending in .com or .edu");
        return;
      }

      if (age && !isValidAge(age)) {
        alert("Age must be between 5 and 120 years old.");
        return;
      }

      if (!isValidPhone(phone)) {
        alert("Phone number must be exactly 11 digits.");
        return;
      }

      // Date validation
      if (!isDateNotInPast(startDate)) {
        alert("Membership Start Date cannot be in the past. Please select today or a future date.");
        return;
      }

      if (!isEndDateAfterStartDate(startDate, endDate)) {
        alert("Membership End Date must be after the Start Date.");
        return;
      }

      // Were we in edit mode?
      const wasEditing = editingId !== null;

      if (!wasEditing) {
        // ADD NEW CLIENT
        const client = {
          id: Date.now(),
          fullName,
          age,
          gender,
          email,
          phone,
          goal: finalGoal,
          startDate,
          endDate,
        };

        clients.push(client);
        alert(`New client saved: ${client.fullName}`);
      } else {
        // UPDATE EXISTING CLIENT
        const index = clients.findIndex((c) => c.id === editingId);
        if (index !== -1) {
          clients[index] = {
            ...clients[index],
            fullName,
            age,
            gender,
            email,
            phone,
            goal: finalGoal,
            startDate,
            endDate,
          };
          alert(`Client updated: ${fullName}`);
        }

        // Exit edit mode
        enterAddMode();
      }

      // Save + re-render + clear form
      saveClients(clients);
      renderClientTable(clients);
      clearForm();

      // If we just finished editing, go back to the Client List
      if (wasEditing) {
        window.location.hash = "#list";
        const listSection = document.getElementById("list");
        if (listSection) {
          listSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // -------------------------
  // Cancel Edit button
  // -------------------------
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", (event) => {
      event.preventDefault();

      // Reset back to "Add Client" mode
      enterAddMode();

      // Go back to the Client List page
      window.location.hash = "#list";
      const listSection = document.getElementById("list");
      if (listSection) {
        listSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // -------------------------
  // "Add New" link on list page → go to empty form
  // -------------------------
  if (addNewLink) {
    addNewLink.addEventListener("click", () => {
      enterAddMode();
    });
  }

  // -------------------------
  // SEARCH helpers
  // -------------------------
  function applySearch() {
    if (!searchInput) return;

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      // Empty search → show all
      renderClientTable(clients);
      return;
    }

    const filtered = clients.filter(
      (c) => c.fullName && c.fullName.toLowerCase().includes(query)
    );

    renderClientTable(filtered);
  }

  // Enter key in the search box
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        applySearch();
      } else if (event.key === "Escape") {
        // ESC to clear search and reset table
        searchInput.value = "";
        renderClientTable(clients);
      }
    });
  }

  // Click on the Search button
  if (searchBtn) {
    searchBtn.addEventListener("click", (event) => {
      event.preventDefault();
      applySearch();
    });
  }

  // -------------------------
  // Table clicks (View / Edit / Delete)
  // -------------------------
  if (tableBody) {
    tableBody.addEventListener("click", (event) => {
      const deleteBtn = event.target.closest(".delete-btn");
      const editBtn = event.target.closest(".edit-btn");
      const viewBtn = event.target.closest(".view-btn");

      // If click is not on one of our buttons, ignore
      if (!deleteBtn && !editBtn && !viewBtn) return;

      // DELETE: Remove client from list and localStorage
      // Note: Deletion prompts confirmation before removing
      if (deleteBtn) {
        const idToDelete = Number(deleteBtn.dataset.id);
        const clientToDelete = clients.find((c) => c.id === idToDelete);
        if (!clientToDelete) return;

        // Prompt confirmation before deleting
        const ok = confirm(`Delete client "${clientToDelete.fullName}"?`);
        if (!ok) return; // User cancelled deletion

        // Remove client from the array
        clients = clients.filter((c) => c.id !== idToDelete);
        
        // Save updated clients array to localStorage (removes deleted client)
        saveClients(clients);
        
        // Re-render the table to reflect the deletion
        renderClientTable(clients);
        return;
      }

      // EDIT (from table)
      if (editBtn) {
        const idToEdit = Number(editBtn.dataset.id);
        const clientToEdit = clients.find((c) => c.id === idToEdit);
        if (!clientToEdit) {
          console.warn("No client found for id", idToEdit);
          return;
        }

        enterEditMode(clientToEdit);
        return;
      }

      // VIEW
      if (viewBtn) {
        const idToView = Number(viewBtn.dataset.id);
        const clientToView = clients.find((c) => c.id === idToView);
        if (!clientToView) {
          console.warn("No client found for id", idToView);
          return;
        }

        // Remember which client is being viewed
        currentViewedId = idToView;

        // Fill Page 3 with this client's data
        showClientDetails(clientToView);

        // Load suggested exercises for this client's next session (API)
        loadNextSessionExercises();

        // Navigate to Page 3
        window.location.hash = "#client-view";
        const viewSection = document.getElementById("client-view");
        if (viewSection) {
          viewSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // -------------------------
  // "Edit This Client" on Page 3
  // -------------------------
  if (editFromViewBtn) {
    editFromViewBtn.addEventListener("click", (event) => {
      event.preventDefault();

      if (currentViewedId === null) {
        alert("No client selected to edit.");
        return;
      }

      const clientToEdit = clients.find((c) => c.id === currentViewedId);
      if (!clientToEdit) {
        alert("Could not find this client to edit.");
        return;
      }

      // Re-use the same edit flow as table edit
      enterEditMode(clientToEdit);
    });
  }
});
