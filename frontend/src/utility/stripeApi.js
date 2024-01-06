const baseURL = "http://localhost:5000/api";

export const createCheckoutSession = async (items) => {
  try {
    console.log(items);
    const response = await fetch(`${baseURL}/orders/checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });
    const session = await response.json();

    if (session.error) {
      alert(session.error);
    } else {
      console.log(session.url);
      window.location.href = session.url;
    }
  } catch (error) {
    console.error("Error during checkout session creation", error);
  }
};
