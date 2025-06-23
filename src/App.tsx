import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<Partial<{
    id: string;
    url: string;
    originalUrl: string;
  }> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      enqueueSnackbar("Please enter a valid URL", {
        variant: "error",
      });

      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const res = await response.json();
      if (response.ok) {
        setShortenedUrl(res.data);
        setUrl("");

        enqueueSnackbar("URL shortened successfully!", {
          variant: "success",
        });
      }
    } catch (e) {
      if (e instanceof Error)
        enqueueSnackbar({ message: e.message, variant: "error" });
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Welcome to URL Shortner</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "300px", padding: "10px", marginRight: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Url
        </button>
      </form>

      <div>
        <div
          style={{
            marginTop: 50,
          }}
        >
          {shortenedUrl && (
            <div
              style={{
                height: "auto",
                width: "368px",
                border: "1px solid #ccc",
                padding: 20,
                boxShadow: "8px 12px 20px 1px rgba(255, 248, 248,0.1)",
              }}
            >
              <div>
                <p>Your Short URL:</p>
                <a
                  href={`http://localhost:3000/api/${shortenedUrl.url}`}
                  target="_blank"
                >
                  {`http://localhost:3000/${shortenedUrl.url}`}
                </a>
              </div>
              <div>
                <p>Your Original URL:</p>
                <a href={shortenedUrl.originalUrl} target="_blank">
                  {shortenedUrl.originalUrl}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
