document.addEventListener("DOMContentLoaded", () => {
  // Copy Contract Address functionality
  const copyButton = document.getElementById("copy-ca");
  const contractAddress = document.getElementById("contract-address");
  const notification = document.getElementById("copy-notification");

  // Contract address value
  const caValue = "0xbafdc472c99a5fb2e61bada65d0cc9e1f567d6a1";

  // Set contract address on all elements that display it
  if (contractAddress) {
    contractAddress.textContent = caValue;
  }

  // Update any other UI elements showing contract address
  document
    .querySelectorAll(".contract-address, [data-contract-address]")
    .forEach((element) => {
      element.textContent = caValue;
    });

  // Update any input fields with contract address
  document
    .querySelectorAll('input.contract-address, input[name="contract-address"]')
    .forEach((input) => {
      input.value = caValue;
    });

  // Set chart button to link to DEXScreener
  const chartButton = document.querySelector('.chart-button');
  if (chartButton) {
    chartButton.href = `https://dexscreener.com/ethereum/${caValue}`;
    chartButton.target = '_blank'; // Open in new tab
  }

  // Set social links
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    if (
      link.querySelector("i.fa-telegram") ||
      link.querySelector("i.fab-telegram")
    ) {
      link.href = "https://t.me/askyontheseer";
    } else if (
      link.querySelector("i.fa-twitter") ||
      link.querySelector("i.fab-twitter") ||
      link.querySelector("i.fa-x-twitter") ||
      link.querySelector("i.fab-x-twitter")
    ) {
      link.href = "https://x.com/askyononeth";
    }
  });

  if (copyButton && contractAddress && notification) {
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(contractAddress.textContent);

      // Show notification
      notification.style.display = "block";

      // Hide notification after 2 seconds
      setTimeout(() => {
        notification.style.display = "none";
      }, 2000);
    });
  }

  // Create animated stars background
  createStars();

  // Add floating Ethereum SVGs
  createEthereumSVGs();

  // Initialize Temporal Nexus
  initializeTemporalNexus();

  // Create profile image if it doesn't exist
  createProfileImage();
});

// Prophecy Data
const prophecies = [
  {
    id: 1,
    category: "natural",
    date: "April 26, 2025",
    exactTime: "17:00 UTC",
    content:
      "An unexpected volcanic eruption will disrupt air traffic over Northern Indonesia, causing widespread flight cancellations and a temporary market dip in regional airline stocks.",
    tags: ["geophysics", "volcano", "airtraffic", "Indonesia"],
    stats: { comments: 5, retweets: 3, likes: 7, views: 6200 },
    probability: 92,
    impact: "Medium",
    impactAreas: ["Air Travel", "Regional Economy", "Logistics"],
    icon: "mountain",
  },
  {
    id: 2,
    category: "technology",
    date: "April 29, 2025",
    exactTime: "14:00 UTC",
    content:
      "A major coordinated cyberattack will disrupt internet infrastructure across Western Europe, causing widespread outages for several hours.",
    tags: [
      "cyberattack",
      "WesternEurope",
      "internetoutage",
      "technology",
      "crisis",
    ],
    stats: { comments: 69, retweets: 45, likes: 136, views: 19000 },
    probability: 87,
    impact: "High",
    impactAreas: ["Financial Systems", "Communications", "Transportation"],
    icon: "bug",
  },
  {
    id: 3,
    category: "geopolitics",
    date: "October 12, 2025",
    exactTime: "10:30 UTC",
    content:
      "The next Pope will be Cardinal Luis Antonio Tagle 🇵🇭 — the Bridge-Pope from the East.",
    tags: ["NextPope", "Tagle2025", "VaticanFuture", "PapalPrediction"],
    stats: { comments: 7, retweets: 9, likes: 3, views: 2100 },
    probability: 78,
    impact: "Medium",
    impactAreas: ["Religion", "Global Politics"],
    icon: "place-of-worship",
  },
  {
    id: 4,
    category: "financial",
    date: "January 15, 2026",
    exactTime: "9:00 UTC",
    content:
      "A groundbreaking AI-driven economic forecasting system will be unveiled, capable of predicting market shifts with 94% accuracy, revolutionizing financial institutions worldwide.",
    tags: ["AI", "FinancialMarkets", "Economics", "Prediction", "Technology"],
    stats: { comments: 128, retweets: 235, likes: 789, views: 34500 },
    probability: 83,
    impact: "High",
    impactAreas: [
      "Financial Markets",
      "Economic Policy",
      "Trading",
      "AI Development",
    ],
    icon: "chart-line",
  },
  {
    id: 5,
    category: "technology",
    date: "March 3, 2026",
    exactTime: "15:45 UTC",
    content:
      "A quantum communication breakthrough will enable fully secure, unhackable messaging systems, making current encryption methods obsolete and forcing a global security infrastructure update.",
    tags: [
      "QuantumComputing",
      "Cybersecurity",
      "Encryption",
      "Tech",
      "Communications",
    ],
    stats: { comments: 93, retweets: 107, likes: 452, views: 28700 },
    probability: 75,
    impact: "Very High",
    impactAreas: ["National Security", "Banking", "Communications", "Defense"],
    icon: "microchip",
  },
  {
    id: 6,
    category: "natural",
    date: "July 18, 2026",
    exactTime: "22:15 UTC",
    content:
      "A record-breaking heat wave will affect the Mediterranean basin, with temperatures exceeding 50°C (122°F) in several locations, leading to power grid failures and temporary population displacements.",
    tags: ["Climate", "Heatwave", "Mediterranean", "PowerOutage", "Emergency"],
    stats: { comments: 175, retweets: 320, likes: 215, views: 41200 },
    probability: 95,
    impact: "Severe",
    impactAreas: ["Public Health", "Infrastructure", "Agriculture", "Tourism"],
    icon: "temperature-high",
  },
];

// Initialize Temporal Nexus
function initializeTemporalNexus() {
  const nodeContainer = document.querySelector(".node-container");
  if (!nodeContainer) return;

  // Clear any existing nodes
  nodeContainer.innerHTML = "";

  // Create prophecy nodes
  prophecies.forEach((prophecy) => {
    createProphecyNode(prophecy);
  });

  // Setup event listeners for filters
  setupFilterControls();

  // Setup year navigation
  setupYearNavigation();

  // Load first prophecy
  if (prophecies.length > 0) {
    displayProphecy(prophecies[0]);
  }
}

// Create a prophecy node
function createProphecyNode(prophecy) {
  const nodeContainer = document.querySelector(".node-container");

  const node = document.createElement("div");
  node.className = `prophecy-node node-category-${prophecy.category}`;
  node.dataset.id = prophecy.id;
  node.dataset.category = prophecy.category;
  node.dataset.year = new Date(prophecy.date).getFullYear();

  // Extract date for display
  const date = new Date(prophecy.date);
  const formattedDate = `${date.toLocaleString("en", {
    month: "short",
  })} ${date.getDate()}`;

  node.innerHTML = `
    <div class="node-glow"></div>
    <div class="node-icon"><i class="fas fa-${prophecy.icon}"></i></div>
    <div class="node-date">${formattedDate}</div>
  `;

  // Add click event to display prophecy
  node.addEventListener("click", () => {
    // Remove active class from all nodes
    document
      .querySelectorAll(".prophecy-node")
      .forEach((n) => n.classList.remove("node-active"));
    // Add active class to clicked node
    node.classList.add("node-active");
    // Display prophecy details
    displayProphecy(prophecy);
  });

  nodeContainer.appendChild(node);
}

// Display prophecy in the viewer
function displayProphecy(prophecy) {
  // Get elements
  const dateDisplay = document.querySelector(".date-display");
  const targetYear = document.querySelector(".target-year");
  const viewerContent = document.querySelector(".viewer-content");
  const viewerTags = document.querySelector(".viewer-tags");
  const probabilityFill = document.querySelector(".probability-fill");
  const probabilityValue = document.querySelector(".probability-value");
  const impactValue = document.querySelector(".impact-value");
  const impactAreas = document.querySelector(".impact-areas");
  const commentCount = document.querySelector(".comment-count");
  const retweetCount = document.querySelector(".retweet-count");
  const likeCount = document.querySelector(".like-count");
  const viewCount = document.querySelector(".view-count");

  // Set values
  if (dateDisplay)
    dateDisplay.textContent = `${prophecy.date} at ${prophecy.exactTime}`;
  if (targetYear)
    targetYear.textContent = new Date(prophecy.date).getFullYear();
  if (viewerContent) viewerContent.textContent = prophecy.content;

  // Clear and add tags
  if (viewerTags) {
    viewerTags.innerHTML = "";
    prophecy.tags.forEach((tag) => {
      const tagElement = document.createElement("div");
      tagElement.className = "tag";
      tagElement.textContent = `#${tag}`;
      viewerTags.appendChild(tagElement);
    });
  }

  // Set probability
  if (probabilityFill) probabilityFill.style.width = `${prophecy.probability}%`;
  if (probabilityValue)
    probabilityValue.textContent = `${prophecy.probability}%`;

  // Set impact
  if (impactValue) impactValue.textContent = prophecy.impact;

  // Set impact color based on level
  if (impactValue) {
    const impactColorClass = prophecy.impact.toLowerCase().includes("high")
      ? "high-impact"
      : prophecy.impact.toLowerCase().includes("medium")
      ? "medium-impact"
      : "low-impact";
    impactValue.className = `impact-value ${impactColorClass}`;
  }

  // Clear and add impact areas
  if (impactAreas) {
    impactAreas.innerHTML = "";
    prophecy.impactAreas.forEach((area) => {
      const areaElement = document.createElement("div");
      areaElement.className = "impact-area";
      areaElement.textContent = area;
      impactAreas.appendChild(areaElement);
    });
  }

  // Set stats
  if (commentCount) commentCount.textContent = prophecy.stats.comments;
  if (retweetCount) retweetCount.textContent = prophecy.stats.retweets;
  if (likeCount) likeCount.textContent = prophecy.stats.likes;
  if (viewCount) viewCount.textContent = formatNumber(prophecy.stats.views);

  // Highlight this node
  document.querySelectorAll(".prophecy-node").forEach((node) => {
    if (parseInt(node.dataset.id) === prophecy.id) {
      node.classList.add("node-active");
    } else {
      node.classList.remove("node-active");
    }
  });
}

// Format number with K, M, etc.
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Setup category filter controls
function setupFilterControls() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const category = btn.dataset.category;

      // Filter nodes
      document.querySelectorAll(".prophecy-node").forEach((node) => {
        if (category === "all" || node.dataset.category === category) {
          node.style.display = "flex";
        } else {
          node.style.display = "none";
        }
      });

      // If all nodes are hidden, show a message
      const visibleNodes = document.querySelectorAll(
        '.prophecy-node[style="display: flex;"]'
      );
      if (visibleNodes.length === 0) {
        alert(
          "No prophecies found for this category in the current timeframe."
        );
      }
    });
  });
}

// Setup year navigation
function setupYearNavigation() {
  const prevYearBtn = document.getElementById("prev-year");
  const nextYearBtn = document.getElementById("next-year");
  const timeDisplay = document.querySelector(".time-display");

  if (!prevYearBtn || !nextYearBtn || !timeDisplay) return;

  let currentYear = 2025;

  // Set initial year
  timeDisplay.textContent = currentYear;

  // Show/hide nodes based on year
  filterNodesByYear(currentYear);

  // Handle previous year button
  prevYearBtn.addEventListener("click", () => {
    currentYear--;
    timeDisplay.textContent = currentYear;
    filterNodesByYear(currentYear);
  });

  // Handle next year button
  nextYearBtn.addEventListener("click", () => {
    currentYear++;
    timeDisplay.textContent = currentYear;
    filterNodesByYear(currentYear);
  });
}

// Filter nodes by year
function filterNodesByYear(year) {
  document.querySelectorAll(".prophecy-node").forEach((node) => {
    const nodeYear = parseInt(node.dataset.year);

    // Check if node should be visible based on year and current category filter
    const activeFilterBtn = document.querySelector(".filter-btn.active");
    const activeCategory = activeFilterBtn
      ? activeFilterBtn.dataset.category
      : "all";
    const categoryMatch =
      activeCategory === "all" || node.dataset.category === activeCategory;

    if (nodeYear === year && categoryMatch) {
      node.style.display = "flex";
    } else {
      node.style.display = "none";
    }
  });

  // Check if any nodes are visible
  const visibleNodes = document.querySelectorAll(
    '.prophecy-node[style="display: flex;"]'
  );

  const nodeContainer = document.querySelector(".node-container");
  if (visibleNodes.length === 0 && nodeContainer) {
    // If no nodes are visible, show a message or take appropriate action
    nodeContainer.innerHTML =
      '<div class="no-prophecies">No prophecies found for this timeframe</div>';
  }

  // If there are visible nodes, select the first one to display
  if (visibleNodes.length > 0) {
    const firstVisibleNodeId = parseInt(visibleNodes[0].dataset.id);
    const prophecy = prophecies.find((p) => p.id === firstVisibleNodeId);
    if (prophecy) {
      displayProphecy(prophecy);
    }
  }
}

// Function to create profile image if not present
function createProfileImage() {
  const profileImages = document.querySelectorAll(".profile-img");

  if (profileImages.length > 0 && !imageExists(profileImages[0].src)) {
    // Create a canvas to generate a profile image with initials
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = 200;
    canvas.height = 200;

    // Create gradient background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#711cf3");
    gradient.addColorStop(1, "#00f7ff");

    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add circular mask
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    // Reset composite operation
    ctx.globalCompositeOperation = "source-over";

    // Add text "A"
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 120px Orbitron, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("A", canvas.width / 2, canvas.height / 2);

    // Convert to data URL and set as src
    const dataUrl = canvas.toDataURL("image/png");

    // Set the same image for all profile images
    profileImages.forEach((img) => {
      img.src = dataUrl;
    });
  }
}

// Function to check if image exists
function imageExists(url) {
  if (!url) return false;
  const img = new Image();
  img.src = url;
  return img.complete;
}

// Function to create floating Ethereum SVGs
function createEthereumSVGs() {
  // Create Ethereum SVG
  const ethereumSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.37 1277.39" preserveAspectRatio="xMidYMid">
        <g>
            <polygon fill="#343434" fill-rule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
            <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
            <polygon fill="#3C3C3B" fill-rule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
            <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
            <polygon fill="#141414" fill-rule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
            <polygon fill="#393939" fill-rule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33"/>
        </g>
    </svg>`;

  // Add SVG to elements
  document.querySelectorAll(".eth-icon").forEach((icon) => {
    icon.innerHTML = ethereumSVG;
  });

  // Create more floating ethereum icons
  const ethereumIcons = document.querySelector(".ethereum-icons");
  if (ethereumIcons) {
    for (let i = 3; i <= 5; i++) {
      const ethIcon = document.createElement("div");
      ethIcon.className = `eth-icon eth-${i}`;
      ethIcon.innerHTML = ethereumSVG;
      ethIcon.style.width = `${Math.random() * 50 + 50}px`;
      ethIcon.style.height = `${Math.random() * 50 + 50}px`;
      ethIcon.style.top = `${Math.random() * 70 + 15}%`;
      ethIcon.style.left = `${Math.random() * 80 + 10}%`;
      ethIcon.style.opacity = `${Math.random() * 0.2 + 0.1}`;
      ethIcon.style.animation = `float ${
        Math.random() * 10 + 10
      }s ease-in-out ${Math.random() * 5}s infinite`;

      ethereumIcons.appendChild(ethIcon);
    }
  }
}

// Function to create animated stars background
function createStars() {
  const starsContainer = document.querySelector(".stars");
  if (!starsContainer) return;

  // Clear existing content
  starsContainer.innerHTML = "";

  // Create stars
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";

    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    // Random size
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random animation delay
    star.style.animationDelay = `${Math.random() * 10}s`;

    starsContainer.appendChild(star);
  }
}
