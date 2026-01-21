export default function DemoPage() {
  return (
    <div style={{ 
      padding: "40px", 
      backgroundColor: "#ffffff", 
      minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto",
        backgroundColor: "#f5f5f5",
        padding: "32px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ 
          fontSize: "32px", 
          fontWeight: "600", 
          marginBottom: "16px",
          color: "#1a1a1a"
        }}>
          Component Demo Page
        </h1>
        <p style={{ 
          fontSize: "16px", 
          color: "#666",
          marginBottom: "32px"
        }}>
          Explore various UI components and patterns used throughout the application
        </p>

        <div style={{ 
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "6px",
          marginBottom: "24px"
        }}>
          <h2 style={{ 
            fontSize: "24px", 
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1a1a1a"
          }}>
            Buttons Demo
          </h2>
          <div style={{ 
            display: "flex", 
            gap: "12px",
            flexWrap: "wrap"
          }}>
            <button style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Primary Button
            </button>
            <button style={{
              padding: "8px 16px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Success Button
            </button>
            <button style={{
              padding: "8px 16px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Danger Button
            </button>
          </div>
        </div>

        <div style={{ 
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "6px",
          marginBottom: "24px"
        }}>
          <h2 style={{ 
            fontSize: "24px", 
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1a1a1a"
          }}>
            Cards Demo
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px"
          }}>
            <div style={{
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ 
                fontSize: "18px", 
                fontWeight: "600",
                marginBottom: "8px",
                color: "#1a1a1a"
              }}>
                Card Title 1
              </h3>
              <p style={{ fontSize: "14px", color: "#666" }}>
                This is a sample card with some content to demonstrate the layout.
              </p>
            </div>
            <div style={{
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ 
                fontSize: "18px", 
                fontWeight: "600",
                marginBottom: "8px",
                color: "#1a1a1a"
              }}>
                Card Title 2
              </h3>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Another card demonstrating the grid layout system.
              </p>
            </div>
            <div style={{
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              <h3 style={{ 
                fontSize: "18px", 
                fontWeight: "600",
                marginBottom: "8px",
                color: "#1a1a1a"
              }}>
                Card Title 3
              </h3>
              <p style={{ fontSize: "14px", color: "#666" }}>
                A third card to show responsive behavior.
              </p>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "6px"
        }}>
          <h2 style={{ 
            fontSize: "24px", 
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1a1a1a"
          }}>
            Status
          </h2>
          <div style={{ 
            padding: "16px",
            backgroundColor: "#10b981",
            color: "white",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            ✓ Demo page is successfully rendering!
          </div>
        </div>
      </div>
    </div>
  );
}
