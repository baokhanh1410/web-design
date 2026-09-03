// Lab 1
const simulateNetworkDelay = (ms, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, ms);
  });
};

simulateNetworkDelay(1000, { user: "Khanh", status: "Active" })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

async function fetchUserData() {
  try {
    const response = await simulateNetworkDelay(1000, {
      user: "Khanh",
      status: "Active",
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

fetchUserData();

// Lab 2: Fetching Real Data

const button = document.getElementById("load-btn");
const statusText = document.getElementById("status");
const container = document.getElementById("card-container");

button.addEventListener("click", async () => {
  statusText.textContent = "Fetching users...";
  container.innerHTML = "";
  button.disabled = true;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const users = await res.json();

    statusText.textContent = `Successfully loaded ${users.length} users.`;

    container.innerHTML = users
      .map(
        (user) => `
          <div class="card">
            <h3>${user.name}</h3>
            <p><strong>Username:</strong> @${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
          </div>
        `,
      )
      .join("");
  } catch (err) {
    statusText.textContent = `Failed to load: ${err.message}`;
  } finally {
    button.disabled = false;
  }
});
