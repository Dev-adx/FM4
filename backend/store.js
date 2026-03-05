// Shared in-memory store for pre-registration data
// Keyed by phone number, auto-cleaned after 24 hours

const registrationStore = new Map();

// Clean up entries older than 24 hours (runs every hour)
setInterval(() => {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  for (const [key, value] of registrationStore.entries()) {
    if (value.timestamp < cutoff) {
      registrationStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

module.exports = registrationStore;
